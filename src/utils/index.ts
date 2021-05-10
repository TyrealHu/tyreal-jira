import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

export const cleanObject = (object: object) => {
  let result: any = { ...object };
  Object.keys(result).forEach((key) => {
    let value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });

  return result;
};

export const useMount = (callBack: () => void) => {
  useEffect(() => {
    callBack();
  }, []);
};

export const useDebounce = (value: unknown, delay?: number): any => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};
