import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { Kanban } from "../kanban";
import { Epic } from "../epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  const index = units.findIndex((value) => value === "epic");
  if (index > -1) {
    return "epic";
  } else {
    return "kanban";
  }
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to={"kanban"}>看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/kanban"} element={<Kanban />} />
          <Route path={"/epic"} element={<Epic />} />
          <Navigate to={"kanban"} replace={true} />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.div`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
