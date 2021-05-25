import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { ButtonNoPadding } from "../../components/lib";
import { useProjectModel, useProjectQueryKey } from "./util";
import { useDeleteProject, useEditProject } from "../../utils/projects";
import { Project, User } from "../../types";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectQueryKey());

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });
  return (
    <Table
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${project.id}`}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "name",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      rowKey={(project) => project.id}
      pagination={false}
      {...props}
    />
  );
};
const More = ({ project }: { project: Project }) => {
  const { mutate: deleteMutate } = useDeleteProject(useProjectQueryKey());

  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除项目吗？",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteMutate({ id });
      },
    });
  };

  const { edit } = useProjectModel();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={() => edit(project.id)}>
            编辑
          </Menu.Item>
          <Menu.Item
            key={"delete"}
            onClick={() => confirmDeleteProject(project.id)}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
