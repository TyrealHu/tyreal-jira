import { useTFetch } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "./index";
import { Epic } from "../types";
import { useConfig } from "./use-optimistic-options";

export const useEpics = (param?: Partial<Epic>) => {
  const tFetch = useTFetch();
  return useQuery<Epic[]>(["epics", param], () =>
    tFetch("epics", { data: cleanObject(param || {}) })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    (params: Partial<Epic>) =>
      tFetch(`epics`, {
        method: "POST",
        data: params,
      }),
    useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]))
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    ({ id }: { id: number }) =>
      tFetch(`epics/${id}`, {
        method: "DELETE",
      }),
    useConfig(
      queryKey,
      (target, old) => old?.filter((epic) => epic.id !== target.id) || []
    )
  );
};
