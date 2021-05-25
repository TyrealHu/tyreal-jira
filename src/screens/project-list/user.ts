import { useTFetch } from "../../utils/http";
import { useAsync } from "../../utils/use-async";
import { cleanObject, useMount } from "../../utils";
import { useCallback } from "react";
import { User } from "../../types";

export const useUsers = (param?: Partial<User>) => {
  const tFetch = useTFetch();
  const { run, ...result } = useAsync<User[]>();
  useMount(
    useCallback(() => {
      run(tFetch("users", { data: cleanObject(param || {}) }));
    }, [param, run, tFetch])
  );
  return result;
};
