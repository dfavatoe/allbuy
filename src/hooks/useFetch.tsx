import { useEffect, useState } from "react";

type HookReturnType<T> = {
  data: T | null;
};

function useFetch<T>(url: string): HookReturnType<T> {
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await fetch(url); //? Add conditions to the response if(!ok)...etc
        const result = (await response.json()) as T;
        console.log("result :>> ", result);
        setData(result);
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
