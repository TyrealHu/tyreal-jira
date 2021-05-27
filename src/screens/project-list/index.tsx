import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Row, Typography } from "antd";
import { useUsers } from "./user";
import { useProjectModel, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox } from "../../components/lib";
import { useProjects } from "../../utils/projects";

export const ProjectList = () => {
  const [param, setParam] = useProjectsSearchParams();

  useDocumentTitle("项目管理", false);

  const { open } = useProjectModel();

  const debounceParam = useDebounce(param, 200);

  const { data: users } = useUsers();

  const { error, data: list, isLoading } = useProjects(debounceParam);

  return (
    <Container>
      <Row style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={() => open()}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 3.2rem;
`;
