import { useTFetch } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "./index";
import { Task } from "../types";

export const useTasks = (param?: Partial<Task>) => {
  const tFetch = useTFetch();
  return useQuery<Task[]>(["tasks", param], () =>
    tFetch("tasks", { data: cleanObject(param || {}) })
  );
};
