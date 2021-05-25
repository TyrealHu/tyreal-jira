import { useLocation } from "react-router";
import { useProject } from "../../utils/projects";
import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useKanbansSearchParams = () => ({
  projectId: useProjectIdInUrl(),
});

export const useTasksSearchParams = () => {
  const projectId = useProjectIdInUrl();
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId",
  ]);
  return useMemo(
    () => ({
      projectId,
      name: param.name || undefined,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
    }),
    [param, projectId]
  );
};

export const useKanbansQueryKey = () => ["kanbans", useKanbansSearchParams()];

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];
