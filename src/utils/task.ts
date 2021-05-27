import { useTFetch } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "./index";
import { Project, SortProps, Task } from "../types";
import { useConfig } from "./use-optimistic-options";
import { useTasksQueryKey, useTasksSearchParams } from "../screens/kanban/util";
import { reorder } from "./reorder";

export const useTasks = (param?: Partial<Task>) => {
  const tFetch = useTFetch();
  return useQuery<Task[]>(["tasks", param], () =>
    tFetch("tasks", { data: cleanObject(param || {}) })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    (params: Partial<Task>) =>
      tFetch(`tasks`, {
        method: "POST",
        data: params,
      }),
    useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]))
  );
};

export const useTask = (id?: number) => {
  const tFetch = useTFetch();
  return useQuery<Task>(["task", id], () => tFetch(`tasks/${id}`), {
    enabled: !!id,
  });
};

export const useEditTask = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    (params: Partial<Task>) =>
      tFetch(`tasks/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useConfig(queryKey, (target, old) => {
      return (
        old?.map((task) =>
          task.id === target.id ? { ...task, ...target } : task
        ) || []
      );
    })
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    ({ id }: { id: number }) =>
      tFetch(`tasks/${id}`, {
        method: "DELETE",
      }),
    useConfig(
      queryKey,
      (target, old) => old?.filter((task) => task.id !== target.id) || []
    )
  );
};

export const useReorderTask = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    (params: SortProps) => {
      return tFetch(`tasks/reorder`, {
        data: params,
        method: "POST",
      });
    },
    useConfig(queryKey, (target, old) => {
      const orderedList = reorder({ list: old, ...target }) as Task[];
      return orderedList.map((item) => {
        return item.id === target.fromId
          ? { ...item, kanbanId: target.toKanbanId }
          : item;
      });
    })
  );
};
