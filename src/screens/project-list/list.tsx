import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "../../components/pin";
import { useEditProject } from "./project";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  retry: () => void;
}

export const List = ({ retry, users, ...props }: ListProps) => {
  const { mutate } = useEditProject();

  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(retry);
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
      ]}
      rowKey={(project) => project.id}
      pagination={false}
      {...props}
    />
  );
};
