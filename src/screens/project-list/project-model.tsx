import { Button, Drawer } from "antd";

export const ProjectModel = ({
  projectModelOpen,
  onClose,
}: {
  projectModelOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer onClose={() => onClose()} width={"100%"} visible={projectModelOpen}>
      <h1>Project Model</h1>
    </Drawer>
  );
};
