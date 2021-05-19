import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Row, Typography } from "antd";
import { useProjects } from "./project";
import { useUsers } from "./user";
import { useProjectsSearchParams } from "./util";

export const ProjectList = ({ onOpen }: { onOpen: () => void }) => {
  const [param, setParam] = useProjectsSearchParams();

  useDocumentTitle("项目管理", false);

  const debounceParam = useDebounce(param, 200);

  const { data: users } = useUsers();

  const { error, data: list, isLoading, retry } = useProjects(debounceParam);

  return (
    <Container>
      <Row>
        <h1>项目列表</h1>
        <Button onClick={onOpen}>创建项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        onOpen={onOpen}
        retry={retry}
        users={users || []}
        dataSource={list || []}
        loading={isLoading}
      />
    </Container>
  );
};

ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
