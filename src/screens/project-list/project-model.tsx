import { Drawer } from "antd";
import { useProjectModel } from "./util";

export const ProjectModel = () => {
  const { projectModelOpen, close } = useProjectModel();
  return (
    <Drawer width={"100%"} onClose={close} visible={projectModelOpen}>
      <h1>Project Model</h1>
    </Drawer>
  );
};
