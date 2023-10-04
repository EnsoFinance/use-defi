import { URLSearchParams } from 'url';

import { ENSO_API } from '../constants';

import { parseApiErrorOrReturn } from './parseApiError';

export const apiFetchGet = async <T>(apiPath: string, qsParams: Record<string, string>): Promise<T> => {
  const response = await fetch(`${ENSO_API}/${apiPath}?${new URLSearchParams(qsParams).toString()}`);
  const data = await response.json();

  return parseApiErrorOrReturn(data as T);
};

export const apiFetchPost = async <T>(
  apiPath: string,
  body?: Record<string, any>,
  qsParams?: Record<string, string>,
  apiKey?: string,
): Promise<T> => {
  const headers = new Headers();
  headers.set('Content-Type', 'application/json');

  if (apiKey) {
    headers.set('Authorization', `Bearer ${apiKey}`);
  }

  const response = await fetch(`${ENSO_API}/${apiPath}?${new URLSearchParams(qsParams).toString()}`, {
    method: 'POST',
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await response.json();

  return parseApiErrorOrReturn(data as T);
};
