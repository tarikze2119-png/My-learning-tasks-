import { useState, useEffect } from "react";

/**
 * Custom Hook: useFetch
 * Reusable data fetching hook that encapsulates loading, error, data state,
 * and handles cleanup with AbortController to prevent race conditions & memory leaks.
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    fetch(url, { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch data: HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        // Ignore aborted requests caused by component unmount or URL change
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong while fetching data");
          setLoading(false);
        }
      });

    // Cleanup: cancel pending request if url changes or component unmounts
    return () => ctrl.abort();
  }, [url]);

  return { data, loading, error };
}
