import { useKanbansSearchParams, useProjectInUrl } from "./util";
import { useKanbans } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils";
import { KanbanColumn } from "./kanban-column";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";

export const Kanban = () => {
  useDocumentTitle("看板列表");
  const { data: kanbans } = useKanbans(useKanbansSearchParams());
  const { data: currentProject } = useProjectInUrl();
  return (
    <Container>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans?.map((kanban) => {
          return <KanbanColumn kanban={kanban} key={kanban.id} />;
        })}
      </ColumnContainer>
    </Container>
  );
};

const ColumnContainer = styled.div`
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
