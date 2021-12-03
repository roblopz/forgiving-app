/* eslint-disable @typescript-eslint/no-explicit-any */

import { ApolloError } from '@apollo/client';
import { GraphQLError } from "graphql";
import { Except } from "type-fest";

import { AppError, AppAuthError, AppValidationError } from '@common/validation/errors';

export type GraphqlWrappedAppError<T = any> = Except<GraphQLError, 'extensions'> & {
  extensions?: {
    appException?: AppError | AppAuthError | AppValidationError<T>
  };
}

export type ApolloWrappedAppError = Except<ApolloError, 'graphQLErrors'> & {
  graphQLErrors: ReadonlyArray<GraphqlWrappedAppError>
}

export function isGraphqlWrappedAppError<T = any>(err: unknown): err is GraphqlWrappedAppError<T> {
  return !!(err as GraphqlWrappedAppError)?.extensions?.appException;
}

export function isApolloError(err: unknown): err is ApolloError {
  return !!(err as ApolloError)?.graphQLErrors;
}

export function isAppError(err: unknown): err is AppError {
  if (err instanceof AppError) return true;
  else if ((err as AppError)?.__errName) return true;
  return false;
}

export function isAppValidationError<T = any>(err: unknown): err is AppValidationError<T> {
  if (err instanceof AppValidationError) return true;
  else if ((err as AppValidationError)?.__errName === AppValidationError.__errName) return true;
  return false;
}

export function isAppAuthError(err: unknown): err is AppAuthError {
  if (err instanceof AppAuthError) return true;
  else if ((err as AppAuthError)?.__errName === AppAuthError.__errName) return true;
  return false;
}

export function hasAppError(err: unknown): boolean {
  if (isAppError(err)) return true;
  else if (isApolloError(err)) {
    return err.graphQLErrors?.some(gqlErr => isGraphqlWrappedAppError(gqlErr));
  }
  else return false;
}

export function getAppError(err: unknown): AppError {
  if (isAppError(err)) return err;
  else if (isApolloError(err)) {
    const wrapped = err.graphQLErrors?.find(gqlErr => isGraphqlWrappedAppError(gqlErr)) as GraphqlWrappedAppError;
    return wrapped ? wrapped.extensions.appException : null;        
  }
  else return null;
}

export function getAppValidationError<T = any>(err: unknown): AppValidationError<T> {
  if (isAppValidationError(err)) return err;
  else {
    const appError = getAppError(err);
    if (isAppValidationError(appError))
      return appError as AppValidationError<T>;
  }
  
  return null;
}

export function getAppAuthError(err: unknown): AppAuthError {
  if (isAppAuthError(err)) return err;
  else {
    const appError = getAppError(err);
    if (isAppAuthError(err))
      return appError as AppAuthError;
  }
  
  return null;
}