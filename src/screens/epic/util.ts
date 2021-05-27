import { useProjectIdInUrl } from "../kanban/util";

export const useEpicSearchParams = () => ({ projectId: useProjectIdInUrl() });

export const useEpicsQueryKey = () => ["epics", useEpicSearchParams()];
