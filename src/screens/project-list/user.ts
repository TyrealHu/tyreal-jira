import { useTFetch } from "../../utils/http";
import { useAsync } from "../../utils/use-async";
import { cleanObject, useMount } from "../../utils";
import { User } from "./search-panel";

export const useUsers = (param?: Partial<User>) => {
  const tFetch = useTFetch();
  const { run, ...result } = useAsync<User[]>();
  useMount(() => {
    run(tFetch("users", { data: cleanObject(param || {}) }));
  });
  return result;
};
