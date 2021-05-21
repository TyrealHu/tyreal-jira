import { useUrlQueryParam, useSetUrlSearchParam } from "../../utils/url";
import { useMemo } from "react";
import { useProject } from "./project";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);

  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam,
  ] as const;
};

export const useProjectModel = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam([
    "projectCreate",
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId",
  ]);

  const setUrlParams = useSetUrlSearchParam();
  const { data: editProject, isLoading } = useProject(Number(editingProjectId));

  const open = () => {
    setProjectCreate({
      projectCreate: true,
    });
  };
  const close = () => setUrlParams({ projectCreate: "", editingProjectId: "" });
  const edit = (id: number) => {
    setEditingProjectId({
      editingProjectId: id,
    });
  };

  return {
    projectModelOpen: projectCreate === "true" || !!editingProjectId,
    open,
    close,
    edit,
    editProject,
    isLoading,
  };
};
