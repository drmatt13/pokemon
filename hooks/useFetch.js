import { useState, useEffect } from "react";

const useFetch = (
  url = "https://jsonplaceholder.typicode.com/todos/1",
  options = {
    method = "GET", // GET, POST, PUT, DELETE
    body = undefined, // body for POST, PUT
    credentials = "include", // include, same-origin, *omit
  }
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method,
          body,
          credentials,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await response.json();
        if (!isCancelled) {
          setData(json);
          setLoading(false);
        }
      } catch (error) {
        if (!isCancelled) {
          setError(error);
          setLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [url, options]);
  return { data, loading, error };
};

export default useFetch;
