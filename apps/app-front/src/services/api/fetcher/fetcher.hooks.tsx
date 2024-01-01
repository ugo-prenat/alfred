import { useState } from 'react';
import { IInitialStates, Status } from './fetcher.models';

export function useFetcher<T, U extends unknown[] = []>(
  fetchFunc: (...args: U) => Promise<T>,
  initialStates: IInitialStates<T> = {}
) {
  const [data, setData] = useState<T | undefined>(initialStates?.initialData);
  const [status, setStatus] = useState<Status>(
    initialStates?.initialStatus || 'idle'
  );

  const handleFetch = (...args: U): Promise<T> => {
    setStatus('loading');

    return fetchFunc(...args)
      .then((data) => {
        setData(data);
        setStatus('success');
        return data;
      })
      .catch(() => {
        setStatus('error');
        return Promise.reject();
      });
  };

  return {
    data,
    status,
    setData,
    setStatus,
    handleFetch
  };
}
