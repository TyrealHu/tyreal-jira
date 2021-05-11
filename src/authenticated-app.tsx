import { useAuth } from "./context/auth-context";
import { ProjectList } from "./screens/project-list";
import styled from "@emotion/styled";
import { Row } from "./components/lib";

export const AuthenticatedApp = () => {
  const { logout } = useAuth();

  return (
    <div>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h2>Logo</h2>
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <button
            onClick={() => {
              logout();
            }}
          >
            登出
          </button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectList />
      </Main>
    </div>
  );
};

const Header = styled(Row)`
  height: 6rem;
`;

const HeaderLeft = styled(Row)``;

const HeaderRight = styled.div``;

const Main = styled.main`
  height: calc(100vh - 6rem);
`;
