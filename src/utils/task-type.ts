import { useTFetch } from "./http";
import { useQuery } from "react-query";
import { TaskType } from "../types";

export const useTaskTypes = () => {
  const tFetch = useTFetch();
  return useQuery<TaskType[]>(["taskTypes"], () => tFetch("taskTypes"));
};
