
export type ValidationError<T> = {
  [field in keyof T]?: T[field] extends object ? string | string[] | {
    [field1 in keyof T[field]]?: T[field][field1] extends object ? string | string[] | {
      [field2 in keyof T[field][field1]]?: T[field][field1][field2] extends object ? string | string[] | {
        [field3 in keyof T[field][field1][field2]]? : T[field][field1][field2][field3] extends object ? string | string[] | {
          [field4 in keyof T[field][field1][field2][field3]]? : T[field][field1][field2][field3][field4] extends object ? string | string[] | {
            [field5 in keyof T[field][field1][field2][field3][field4]]?: string | string[]
          } : string | string[]
        } : string | string[]
      } : string | string[]
    } : string | string[]
  } : string | string[]
}

export class AppError extends Error {
  static __errName = 'AppError';
  __errName = AppError.__errName;
  status = 500;
  originalError: Error;

  serializable(includeStack = true): AppError {
    return {
      ...this,
      message: this.message,
      stack: includeStack ? this.stack : '',
      originalError: this.originalError ? {
        message: this.originalError.message,
        stack: includeStack ? this.originalError.stack : ''
      } : null
    };
  }

  constructor(errorOrMessage: Error | string) {
    super(typeof errorOrMessage === 'string' ? errorOrMessage : errorOrMessage?.message);
    this.message = this.originalError?.message || 'UNKNOWN APP ERROR (not provided)'
    
    if (errorOrMessage instanceof Error)
      this.originalError = errorOrMessage;
  }
}

export class AppValidationError<T = any> extends AppError {
  static __errName = 'AppValidationError';
  __errName = AppValidationError.__errName;
  status = 400;

  serializable(includeStack = true): AppValidationError<T> {
    return super.serializable(includeStack) as AppValidationError<T>;
  }

  constructor(message: string, public validationError?: ValidationError<T>, originalError?: Error) {
    super(originalError || message);
    this.message = message || 'Validation Error';    
  }
}

export class AppAuthError extends AppError {
  static __errName = 'AppAuthError';
  __errName = AppAuthError.__errName;
  status = 401;

  serializable(includeStack = true): AppAuthError {
    return super.serializable(includeStack) as AppAuthError;
  }

  constructor(message?: string, public redirectToPath?: string, public isAuthorizationError = false, originalError?: Error) {
    super(originalError || message);
    this.message = message || (isAuthorizationError ? 'Unauthorized' : 'Unauthenticated');
    if (isAuthorizationError) this.status = 403;
  }

  get redirect() {
    return !!this.redirectToPath;
  }
}