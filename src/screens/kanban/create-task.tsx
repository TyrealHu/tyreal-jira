import { useEffect, useState } from "react";
import { useAddTask } from "../../utils/task";
import { useProjectIdInUrl, useTasksQueryKey } from "./util";
import { Card, Input } from "antd";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());

  const submit = async () => {
    await addTask({ projectId, name, kanbanId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => {
    setInputMode(!inputMode);
  };

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+添加事务</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"需要做什么"}
        value={name}
        onPressEnter={submit}
        onChange={(event) => setName(event.target.value)}
        autoFocus={true}
      />
    </Card>
  );
};
