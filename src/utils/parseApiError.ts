import { API_Error, API_Response } from '../types/enso';

export function parseApiErrorOrReturn<T>(apiResponse: API_Response<T>) {
  const apiError = apiResponse as API_Error;
  if (apiError.message) {
    throw new Error(`Invalid Response from Enso API: ${apiError.error ?? apiError.message} (${apiError.statusCode})`);
  }

  return apiResponse as T;
}
