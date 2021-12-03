/* eslint-disable no-console */

import { merge } from 'lodash';
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
    errMessage = 'Undetermined error occurred!';
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

export interface IHandleErrorOptions {
  handleError?(err: unknown): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleValidationError?<T = any>(err: AppValidationError<T>): void;
  handleAuthError?(err: AppAuthError): void;
}

export function handleError(err: unknown, options: IHandleErrorOptions = {}): void {
  options = merge({
    handleError: defaultErrorHandler,
    handleValidationError: defaultValidationErrorHandler,
    handleAuthError: defaultAuthErrorHandler
  } as IHandleErrorOptions, options);

  const appError = getAppError(err);
  if (appError) {
    if (isAppValidationError(appError)) {
      options.handleValidationError(appError);
      return;
    } else if (isAppAuthError(appError)) {
      options.handleAuthError(appError);
      return;
    }
  }

  options.handleError(err);
}