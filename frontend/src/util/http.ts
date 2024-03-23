import { AuthenticationError, HttpError } from "./error";

function isJsonResponse(response: Response) {
  return (
    response.headers.get("content-type")?.indexOf("application/json") !== -1
  );
}

type Handler<T> = (response: Response) => Promise<T>;
interface ResponseOptions<T = any> {
  responseHandler: Handler<T>;
}

const defaultOptions: ResponseOptions = {
  responseHandler: (response) =>
    isJsonResponse(response) ? response.json() : Promise.resolve(response),
};

export class HttpClient {
  private baseUrl?: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = <T>(path: string, query?: object, options?: ResponseOptions<T>) => {
    const stringifiedQuery = Object.entries(query ?? {})
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    const q = stringifiedQuery ? `?${stringifiedQuery}` : "";
    return this.invoke<T>("GET", `${path}${q}`, options);
  };

  post = <T>(path: string, body?: unknown, options?: ResponseOptions<T>) => {
    return this.invoke<T>("POST", path, body, options);
  };

  put = <T>(path: string, body?: unknown, options?: ResponseOptions<T>) => {
    return this.invoke<T>("PUT", path, body, options);
  };

  del = <T>(path: string, options?: ResponseOptions<T>) => {
    return this.invoke<T>("DELETE", path, options);
  };

  private invoke = async <T>(
    method: string,
    path: string,
    body?: unknown,
    options?: ResponseOptions<T>
  ) => {
    const { abort, signal } = new AbortController();
    const headers = this.getHeaders(body);

    const request = new Request(`${this.baseUrl}${path}`, {
      method,
      headers,
      credentials: "include",
      body: body instanceof FormData ? body : JSON.stringify(body),
      signal,
    });

    const promise = fetch(request)
      .then(this.validateResponse)
      .then(
        options?.responseHandler ??
          (defaultOptions.responseHandler as Handler<T>)
      );

    // @ts-ignore
    promise.cancel = () => abort();

    return promise;
  };

  private validateResponse = (response: Response) => {
    if (response.status === 401) {
      return Promise.reject(new AuthenticationError());
    }

    if (!response.ok) {
      if (isJsonResponse(response)) {
        return response
          .json()
          .then((body) => Promise.reject(new HttpError(response, body)));
      }
      return Promise.reject(
        new HttpError(response, { message: "Internal server error" })
      );
    }

    return response;
  };

  private getHeaders = (body?: unknown) => {
    const headers = new Headers();

    if (body instanceof FormData) {
      return headers;
    }

    headers.append("Content-Type", "application/json");
    return headers;
  };
}

export const httpClient = new HttpClient("/api");
