import { useTFetch } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "./index";
import { Kanban, SortProps } from "../types";
import { useConfig } from "./use-optimistic-options";
import { reorder } from "./reorder";

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

export const useReorderKanban = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    (params: SortProps) => {
      return tFetch(`kanbans/reorder`, {
        data: params,
        method: "POST",
      });
    },
    useConfig(queryKey, (target, old) => reorder({ list: old, ...target }))
  );
};
