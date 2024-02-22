import { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';

function useFetch<T>(url: string): { loading: boolean; data: T | null; error: Error | null | string } {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null | string>(null);

  useEffect(() => {
    setLoading(true);
    setData(null);
    setError(null);

    fetchData(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch(() => {
        setLoading(false);
        setError('Something went wrong.');
      });
  }, [url]);

  return { loading, data, error };
}

export default useFetch;
