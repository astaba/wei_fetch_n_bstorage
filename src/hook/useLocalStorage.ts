import { useEffect, useState } from "react";

const useLocalStorage = <T extends string | object | boolean | null | number>(
  storageKey: string,
  defaulValue: T,
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const initialValue = JSON.stringify(defaulValue);

  const [value, setValue] = useState<T>(
    JSON.parse(localStorage.getItem(storageKey) || initialValue),
  );

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [storageKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
