export class AuthenticationError extends Error {}

export class HttpError<T = any> extends Error {
  response: Response;
  body: T;

  constructor(response: Response, body: T) {
    super(response.statusText);
    this.response = response;
    this.body = body;
  }
}

export function isAuthenticationError(
  error: Error
): error is AuthenticationError {
  return error instanceof AuthenticationError;
}

export function isHttpError(error: Error): error is HttpError {
  return error instanceof HttpError;
}
