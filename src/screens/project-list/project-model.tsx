import { Drawer } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModelOpen,
} from "./project-list.slice";

export const ProjectModel = () => {
  const dispatch = useDispatch();
  const projectModelOpen = useSelector(selectProjectModelOpen);
  return (
    <Drawer
      width={"100%"}
      onClose={() => dispatch(projectListActions.closeProjectModel())}
      visible={projectModelOpen}
    >
      <h1>Project Model</h1>
    </Drawer>
  );
};
