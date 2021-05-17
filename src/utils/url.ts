import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "./index";

export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams, setSearchParam] = useSearchParams();
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
      const _params = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      setSearchParam(_params);
    },
  ] as const;
};
