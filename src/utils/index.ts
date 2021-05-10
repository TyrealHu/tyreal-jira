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

export const useDebounce = <T>(value: T, delay?: number): T => {
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

interface useArrayRet<T> {
  value: T[];
  clear: () => void;
  removeIndex: (index: number) => void;
  add: (value: T) => void;
}

export const useArray = <T>(value: T[]): useArrayRet<T> => {
  const [arr, setArr] = useState(value);
  function add(value: T) {
    setArr([...arr, value]);
  }
  function clear() {
    setArr([]);
  }
  function removeIndex(index: number) {
    let _arr = [...arr];
    _arr.splice(index, 1);
    setArr(_arr);
  }
  return {
    value: arr,
    add,
    clear,
    removeIndex,
  };
};
