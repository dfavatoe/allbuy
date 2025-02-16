import { useEffect, useState } from "react";

type HookReturnType<T> = {
  data: T | null;
};

function useFetch<T>(url: string): HookReturnType<T> {
  var [data, setData] = useState<T | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(url);
        if (!response.ok)
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        const result = await response.json();
        const array = result.products as T;
        console.log("array result :>> ", array);
        setData(array);
      };
      fetchData();
    } catch (err) {
      {
        const error = err as Error;
        console.log("error message :>> ", error.message);
      }
    }
  }, [url]);

  return {
    data: data,
  };
}

export default useFetch;
