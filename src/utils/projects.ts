import { QueryKey, useMutation, useQuery } from "react-query";
import { Project } from "../screens/project-list/list";
import { useTFetch } from "./http";
import { cleanObject } from "./index";
import { useConfig } from "./use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const tFetch = useTFetch();
  return useQuery<Project[]>(["projects", param], () =>
    tFetch("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    (params: Partial<Project>) =>
      tFetch(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    useConfig(queryKey, (target, old) => {
      return (
        old?.map((project) =>
          project.id === target.id ? { ...project, ...target } : project
        ) || []
      );
    })
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    ({ id }: { id: number }) =>
      tFetch(`projects/${id}`, {
        method: "DELETE",
      }),
    useConfig(
      queryKey,
      (target, old) => old?.filter((project) => project.id !== target.id) || []
    )
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const tFetch = useTFetch();
  return useMutation(
    (params: Partial<Project>) =>
      tFetch(`projects`, {
        method: "POST",
        data: params,
      }),
    useConfig(queryKey, (target, old) => (old ? [...old, target] : [target]))
  );
};

export const useProject = (id?: number) => {
  const tFetch = useTFetch();
  return useQuery<Project>(["project", id], () => tFetch(`projects/${id}`), {
    enabled: !!id,
  });
};
