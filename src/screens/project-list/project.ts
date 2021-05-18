import { useEffect } from "react";
import { cleanObject } from "../../utils";
import { useAsync } from "../../utils/use-async";
import { Project } from "./list";
import { useTFetch } from "../../utils/http";

export const useProjects = (param?: Partial<Project>) => {
  const tFetch = useTFetch();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    let tFetchFunc = () =>
      tFetch("projects", { data: cleanObject(param || {}) });
    run(tFetchFunc(), { retry: tFetchFunc });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const tFetch = useTFetch();
  const mutate = (params: Partial<Project>) => {
    return run(
      tFetch(`projects/${params.id}`, {
        method: "PATCH",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const tFetch = useTFetch();
  const mutate = (params: Partial<Project>) => {
    return run(
      tFetch(`projects`, {
        method: "POST",
        data: params,
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
