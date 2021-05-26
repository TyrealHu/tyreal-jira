import {
  useKanbansSearchParams,
  useProjectInUrl,
  useTasksSearchParams,
} from "./util";
import { useKanbans } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useTasks } from "../../utils/task";
import { FullPageLoading } from "../../components/lib";
import { Spin } from "antd";
import { CreateKanban } from "./create-kanban";
import { TaskModel } from "./task-model";

export const Kanban = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbansSearchParams()
  );
  const { data: currentProject } = useProjectInUrl();
  const { isLoading: tasksLoading } = useTasks(useTasksSearchParams());
  const isLoading = tasksLoading || kanbanLoading;
  return (
    <Container>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <ColumnContainer>
          {kanbans?.map((kanban) => {
            return <KanbanColumn kanban={kanban} key={kanban.id} />;
          })}
          <CreateKanban />
        </ColumnContainer>
      )}
      <TaskModel />
    </Container>
  );
};

export const ColumnContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
