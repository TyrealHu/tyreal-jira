import { useTFetch } from "utils/http";
import { User } from "types";
import { useQuery } from "react-query";

export const useUsers = (param?: Partial<User>) => {
  const tFetch = useTFetch();

  return useQuery<User[]>(["users", param], () =>
    tFetch("users", { data: param })
  );
};
