import { Divider, List, Popover, Typography } from "antd";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModel } from "../screens/project-list/util";
import { useProjects } from "../utils/projects";

export const ProjectPopover = () => {
  const { data: projects, isLoading } = useProjects();
  const { open } = useProjectModel();
  const pinnedProjects = projects?.filter((project) => project.pin);
  console.log(pinnedProjects);
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={"link"}>
        创建项目
      </ButtonNoPadding>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <span>项目</span>
    </Popover>
  );
};

const ContentContainer = styled.div`
  min-width: 30rem;
`;
