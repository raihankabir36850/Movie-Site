import { useEffect, useState } from 'react';
import { fetchData } from '../utils/api';

export const useFetch = (url: string) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

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
};

export default useFetch;
