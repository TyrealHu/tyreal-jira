import {
  useKanbansQueryKey,
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksQueryKey,
  useTasksSearchParams,
} from "./util";
import { useKanbans, useReorderKanban } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useReorderTask, useTasks } from "../../utils/task";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModel } from "./task-model";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { Drag, Drop, DropChild } from "../../components/drag-and-drop";
import { useCallback } from "react";

export const Kanban = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbansSearchParams()
  );
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: tasksLoading } = useTasks(useTasksSearchParams());
  const isLoading = tasksLoading || kanbanLoading;
  const onDragEnd = useDragEnd();
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <ColumnContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"kanban"}
            >
              <DropChild style={{ display: "flex" }}>
                {kanbans?.map((kanban, index) => {
                  return (
                    <Drag
                      draggableId={"kanban" + kanban.id}
                      key={kanban.id}
                      index={index}
                    >
                      <KanbanColumn kanban={kanban} key={kanban.id} />
                    </Drag>
                  );
                })}
              </DropChild>
            </Drop>
            <CreateKanban />
          </ColumnContainer>
        )}
        <TaskModel />
      </Container>
    </DragDropContext>
  );
};

export const useDragEnd = () => {
  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  const { mutate: reorderKanban } = useReorderKanban(useKanbansQueryKey());
  const { data: tasks = [] } = useTasks(useTasksSearchParams());
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      if (type === "COLUMN") {
        const fromId = kanbans?.[source.index].id;
        const toId = kanbans?.[destination.index].id;
        if (!fromId || !toId || fromId === toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderKanban({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromKanbanId = Number(source.droppableId);
        const toKanbanId = Number(destination.droppableId);
        const fromTask = tasks.filter((task) => task.kanbanId === fromKanbanId)[
          source.index
        ];
        const toTask = tasks.filter((task) => task.kanbanId === toKanbanId)[
          destination.index
        ];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        const type =
          fromKanbanId === toKanbanId && destination.index > source.index
            ? "after"
            : "before";
        reorderTask({
          type,
          fromId: fromTask?.id,
          referenceId: toTask?.id,
          fromKanbanId,
          toKanbanId,
        });
      }
    },
    [reorderTask, tasks, kanbans, reorderKanban]
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

export const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
