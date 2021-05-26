import { useLocation } from "react-router";
import { useProject } from "../../utils/projects";
import { useSetUrlSearchParam, useUrlQueryParam } from "../../utils/url";
import { useCallback, useMemo } from "react";
import { useTask } from "../../utils/task";
// import {useDebounce} from "../../utils";

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
  // const debouncedName = useDebounce(param.name, 200);
  return useMemo(
    () => ({
      projectId,
      name: param.name,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
    }),
    [param, projectId]
  );
};

export const useKanbansQueryKey = () => ["kanbans", useKanbansSearchParams()];

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTaskModel = () => {
  const [{ editTaskId }, setEditTaskId] = useUrlQueryParam(["editTaskId"]);
  const { data: editTask, isLoading } = useTask(Number(editTaskId));
  const setUrlParams = useSetUrlSearchParam();

  const start = useCallback(
    (id: number) => {
      setEditTaskId({ editTaskId: id });
    },
    [setEditTaskId]
  );

  const close = useCallback(() => {
    setUrlParams({ editTaskId: undefined });
  }, [setUrlParams]);

  return {
    editTaskId,
    editTask,
    isLoading,
    close,
    start,
  };
};
