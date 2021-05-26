import { Kanban } from "../../types";
import { useTasks } from "../../utils/task";
import { useKanbansQueryKey, useTaskModel, useTasksSearchParams } from "./util";
import { useTaskTypes } from "../../utils/task-type";
import Bug from "../../assets/bug.svg";
import Task from "../../assets/task.svg";
import styled from "@emotion/styled";
import { Button, Card, Dropdown, Menu, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Mark } from "./mark";
import { useDeleteKanban } from "../../utils/kanban";
import { ButtonNoPadding, Row } from "../../components/lib";

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const currentTasks = allTasks?.filter((task) => task.kanbanId === kanban.id);
  const { start } = useTaskModel();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TasksContainer>
        {currentTasks?.map((task) => (
          <Card
            onClick={() => start(task.id)}
            style={{ marginBottom: "0.5rem", cursor: "pointer" }}
            key={task.id}
          >
            <Mark name={task.name} keyword={keyword} />
            <TaskTypesIcon id={task.typeId} />
          </Card>
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

const TaskTypesIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) {
    return null;
  }
  const src = name === "bug" ? Bug : Task;
  return <img alt={"task-item"} src={src} />;
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbansQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return deleteKanban({ id: kanban.id });
      },
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <ButtonNoPadding type={"link"} onClick={startEdit}>
          删除
        </ButtonNoPadding>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
