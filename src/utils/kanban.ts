import { useTFetch } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "./index";
import { Kanban } from "../types";
import { useConfig } from "./use-optimistic-options";

export const useKanbans = (param?: Partial<Kanban>) => {
  const tFetch = useTFetch();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    tFetch("kanbans", { data: cleanObject(param || {}) })
  );
};

export const useAddKanban = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    (params: Partial<Kanban>) =>
      tFetch(`kanbans`, {
        method: "POST",
        data: params,
      }),
    useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]))
  );
};

export const useDeleteKanban = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    ({ id }: { id: number }) =>
      tFetch(`kanbans/${id}`, {
        method: "DELETE",
      }),
    useConfig(
      queryKey,
      (target, old) => old?.filter((kanban) => kanban.id !== target.id) || []
    )
  );
};
