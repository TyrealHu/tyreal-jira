import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "./project";
import { useUsers } from "./user";
import { useProjectsSearchParams } from "./util";

export const ProjectList = () => {
  const [param, setParam] = useProjectsSearchParams();

  useDocumentTitle("项目管理", false);

  const debounceParam = useDebounce(param, 200);

  const { data: users } = useUsers();

  const { error, data: list, isLoading } = useProjects(debounceParam);

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List users={users || []} dataSource={list || []} loading={isLoading} />
    </Container>
  );
};

ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
