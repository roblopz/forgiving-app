/* eslint-disable @typescript-eslint/no-explicit-any */

import { AppValidationError, ValidationError } from '@common/validation/errors';
import { Paths } from '@common/util/types';
import { isAppValidationError } from './extractor';

export function flatValidationErrors<T = any>(
  err: AppValidationError<T> | ValidationError<T>
): Partial<Record<Paths<T>, string>> {
  const res: Partial<Record<Paths<T>, string>> = {};

  const validationError = isAppValidationError(err) ? err.validationError : err;

  (function flat(err: ValidationError<T>, parentKey = '') {
    for (const key in err) {
      if (typeof err[key] === 'object' && !Array.isArray(err[key])) {
        flat((err as any)[key], `${parentKey}${key}.`);
      } else {
        const errString = Array.isArray(err[key]) ? (err[key] as any).join(', ') : err[key];
        (res as any)[parentKey + key] = errString;
      }
    }
  })(validationError);

  return res;
}