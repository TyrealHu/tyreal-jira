import { QueryKey, useQueryClient } from "react-query";
import { Project } from "../types";

export const useConfig = (
  queryKey: QueryKey,
  callback: (target: any, old?: any[]) => any[]
) => {
  const queryClient = useQueryClient();
  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      let prevItems = queryClient.getQueryData(queryKey);
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old);
      });
      return { prevItems };
    },
    onError(error: Error, newItem: any, context: any) {
      queryClient.setQueryData(
        queryKey,
        (context as { prevItems: Project[] }).prevItems
      );
    },
  };
};
