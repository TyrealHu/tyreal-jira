import { useTFetch } from "./http";
import { useQuery } from "react-query";
import { cleanObject } from "./index";
import { Kanban } from "../types";

export const useKanbans = (param?: Partial<Kanban>) => {
  const tFetch = useTFetch();
  return useQuery<Kanban[]>(["kanbans", param], () =>
    tFetch("kanbans", { data: cleanObject(param || {}) })
  );
};
