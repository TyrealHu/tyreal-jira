import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { cleanObject } from "./index";

export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams] = useSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const result = {};
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, result as { [key in T]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      return setSearchParams(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return useCallback(
    (params: { [key in string]: unknown }) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setSearchParam(o);
    },
    [searchParams, setSearchParam]
  );
};
