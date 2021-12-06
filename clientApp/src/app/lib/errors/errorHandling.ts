/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { Except } from "type-fest";

import { AppAuthError, AppValidationError } from "@common/validation/errors";
import { 
  isApolloError,
  isAppError,
  isAppValidationError, 
  isAppAuthError, 
  getAppError
} from './extractor';
import { flatValidationErrors } from './util';
import { uiStore } from '@store/uiStore'; 

function defaultErrorHandler(err: unknown) {
  console.error(err);

  let errMessage = '';
  if (isAppError(err) || isApolloError(err) || err instanceof Error) {
    errMessage = err.message;
  } else {
    errMessage = 'Ocurrió un error!';
  }

  uiStore.enqueueSnackbar(errMessage, { variant: 'error' });
}

function defaultValidationErrorHandler(err: AppValidationError) {
  if (err.validationError) {
    let errString = '';
    const flatted = flatValidationErrors(err.validationError);
    for (const field in flatted)
      errString += `${field}: ${flatted[field]}\n`;
    
    console.log(errString);
  }
}

function defaultAuthErrorHandler(err: AppAuthError) {
  console.log(err.message);
  if (err.redirect)
    console.log('Redirected to: ' + err.redirectToPath);
}

export type ErrorHandler<E> = (e: E) => void;
export type HandlerOrDefault<E> = ErrorHandler<E> | 'HANDLE_DEFAULT';

interface ICompositeHandlers<T = any> {
  onValidationError(handler: HandlerOrDefault<AppValidationError<T>>): Except<ICompositeHandlers<T>, 'onValidationError'>;
  onAuthError(handler: HandlerOrDefault<AppAuthError>): Except<ICompositeHandlers<T>, 'onAuthError'>;
  onAnyError(handler: HandlerOrDefault<unknown>): void;
}

export function handleError<T = any>(err: unknown): ICompositeHandlers<T> {
  let handled = false;
  const appError = getAppError(err);  

  const onAnyComposition = function(handler: HandlerOrDefault<unknown>): void {
    if (!handled) {
      handled = true;
      if (typeof handler === 'function') {
        handler(err);
      } else {
        defaultErrorHandler(err);
      }
    }
  };

  const onValidationComposition = function<T>(
    handler: HandlerOrDefault<AppValidationError<T>>
  ) {
    if (!handled) {
      if (appError && isAppValidationError(appError)) {
        handled = true;
        if (typeof handler === 'function') handler(appError);
        else defaultValidationErrorHandler(appError);
      }
    }

    return { 
      onAnyError: onAnyComposition, 
      onAuthError: onAuthComposition
    };
  };  

  const onAuthComposition = function(
    handler: HandlerOrDefault<AppAuthError>
  ) {    
    if (!handled) {
      if (appError && isAppAuthError(appError)) {
        handled = true;
        if (typeof handler === 'function') handler(appError);
        else defaultAuthErrorHandler(appError);
      }
    }

    return { 
      onAnyError: onAnyComposition, 
      onValidationError: onValidationComposition
    };
  };

  return {
    onAnyError: onAnyComposition,
    onValidationError: onValidationComposition,
    onAuthError: onAuthComposition
  };
}