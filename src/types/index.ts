export type StrOrNum = string | number;

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

export interface Task {
  id: number;
  name: string;
  processorId: number;
  projectId: number;
  epicId: number;
  kanbanId: number;
  typeId: number;
  note: string;
}

export interface Kanban {
  id: number;
  name: string;
  projectId: number;
}

export interface TaskType {
  id: number;
  name: string;
}

export interface SortProps {
  type: "before" | "after";
  referenceId: number;
  fromId: number;
  fromKanbanId?: number;
  toKanbanId?: number;
}
