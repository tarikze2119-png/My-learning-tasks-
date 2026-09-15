import { useState, useEffect } from "react";

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
        
        try {
          const urlObj = new URL(url, window.location.origin);
          const categoryParam = urlObj.searchParams.get("category") || urlObj.searchParams.get("c");
          
          let filtered = json;
          if (categoryParam && categoryParam !== "All" && Array.isArray(json)) {
            filtered = json.filter((item) => item.category === categoryParam);
          }
          setData(filtered);
        } catch {
          setData(json);
        }
        setLoading(false);
      })
      .catch((err) => {
        
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong while fetching data");
          setLoading(false);
        }
      });

    return () => ctrl.abort();
  }, [url]);

  return { data, loading, error };
}
