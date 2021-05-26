import { useTFetch } from "./http";
import { QueryKey, useMutation, useQuery } from "react-query";
import { cleanObject } from "./index";
import { Project, Task } from "../types";
import { useConfig } from "./use-optimistic-options";

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
