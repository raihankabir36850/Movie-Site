const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_ACCESS_TOKEN = import.meta.env.VITE_API_ACCESS_TOKEN;

const headers = {
  accept: 'application/json',
  Authorization: `Bearer ${TMDB_API_ACCESS_TOKEN}`,
};

export const fetchData = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
