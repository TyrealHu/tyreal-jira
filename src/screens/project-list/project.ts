import { useCallback, useEffect } from "react";
import { cleanObject } from "../../utils";
import { useAsync } from "../../utils/use-async";
import { Project } from "./list";
import { useTFetch } from "../../utils/http";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const tFetch = useTFetch();
  return useQuery<Project[]>(["projects", param], () =>
    tFetch("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = () => {
  const queryClient = useQueryClient();
  const tFetch = useTFetch();
  return useMutation(
    (params: Partial<Project>) =>
      tFetch(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useAddProject = () => {
  const queryClient = useQueryClient();
  const tFetch = useTFetch();
  return useMutation(
    (params: Partial<Project>) =>
      tFetch(`projects`, {
        method: "POST",
        data: params,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
};

export const useProject = (id?: number) => {
  const tFetch = useTFetch();
  return useQuery<Project>(["project", id], () => tFetch(`projects/${id}`), {
    enabled: !!id,
  });
};
