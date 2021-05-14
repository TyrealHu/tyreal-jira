import { useEffect } from "react";
import { cleanObject } from "../../utils";
import { useAsync } from "../../utils/use-async";
import { Project } from "./list";
import { useTFetch } from "../../utils/http";

export const useProjects = (param?: Partial<Project>) => {
  const tFetch = useTFetch();
  const { run, ...result } = useAsync<Project[]>();
  useEffect(() => {
    run(tFetch("projects", { data: cleanObject(param || {}) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param]);
  return result;
};
