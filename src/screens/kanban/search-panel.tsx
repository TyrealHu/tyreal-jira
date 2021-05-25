import { useTasksSearchParams } from "./util";
import { useSetUrlSearchParam } from "../../utils/url";
import { Row } from "../../components/lib";
import { Button, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";
import { debounce } from "../../utils";

export const SearchPanel = () => {
  const searchParam = useTasksSearchParams();
  const setSearchParam = useSetUrlSearchParam();
  const reset = () => {
    setSearchParam({
      projectId: undefined,
      name: undefined,
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"任务名"}
        value={searchParam.name}
        onChange={(event) =>
          debounce(setSearchParam({ name: event.target.value }), 50)
        }
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParam.processorId}
        onChange={(value) => setSearchParam({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParam.typeId}
        onChange={(value) => setSearchParam({ typeId: value })}
      />
      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};
