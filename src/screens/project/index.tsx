import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { Kanban } from "../kanban";
import { Epic } from "../epic";

export const ProjectScreen = () => {
  return (
    <div>
      ProjectScreen
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<Kanban />} />
        <Route path={"/epic"} element={<Epic />} />
        <Navigate to={"kanban"} replace={true} />
      </Routes>
    </div>
  );
};
