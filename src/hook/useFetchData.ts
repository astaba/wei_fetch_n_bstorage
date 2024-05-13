import { useEffect, useState } from "react";
import axios from "axios";

function useFetchData<T>({
  initialData,
  watchedUrl,
}: {
  initialData: T;
  watchedUrl: string;
}) {
  const [data, setData] = useState<T>(initialData);
  const [url, setUrl] = useState(watchedUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsError("");
      setIsLoading(true);
      try {
        const result = await axios.get(url);
        // console.log(result);
        // Unless using zod state schema library
        // Taylor result to fit T state type
        setData(result.data.hits);
      } catch (err) {
        console.log(err);
        if (err instanceof Error) {
          setIsError(err.message);
        } else {
          setIsError("Something went wrong!");
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return {
    setUrl,
    fetcher: { isLoading, isError, data },
  };
}

export default useFetchData;
