/* eslint-disable @typescript-eslint/no-explicit-any */
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { ValidationError as ClassValidatorValidationError } from 'class-validator';
import { AppValidationError, AppError } from '@common/validation/errors';

type ClassValidatorNativeValidationError = Error & {
  validationErrors: ClassValidatorValidationError[]
};

function isClassValidatorError(
  err: unknown
): err is ClassValidatorNativeValidationError {
  const cvErr = err as ClassValidatorNativeValidationError;
  if (cvErr?.validationErrors?.length) {
    return cvErr.validationErrors[0] instanceof ClassValidatorValidationError;
  }
}

function classValidationErrorToAppValidationError(
  error: ClassValidatorNativeValidationError
): AppValidationError<any> {
  const appValidationError = new AppValidationError<any>('Validation failed', null, error);

  appValidationError.validationError = error.validationErrors.reduce((acc, curr) => {
    acc[curr.property] = Object.keys(curr.constraints).map(key => curr.constraints[key]);
    return acc;
  }, {} as any);

  return appValidationError.serializable();
}

export function errorFormatter(error: GraphQLError): GraphQLFormattedError {
  if (isClassValidatorError(error.originalError))
    error.extensions.appException = classValidationErrorToAppValidationError(error.originalError);

  if (error.originalError instanceof AppError)
    error.extensions.appException = error.originalError.serializable();

  return error;
}