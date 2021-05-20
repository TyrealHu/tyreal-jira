import { useUrlQueryParam } from "../../utils/url";
import { useMemo } from "react";

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
  const open = () =>
    setProjectCreate({
      projectCreate: true,
    });
  const close = () =>
    setProjectCreate({
      projectCreate: undefined,
    });

  return {
    projectModelOpen: projectCreate === "true",
    open,
    close,
  };
};
