/** @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
import { UserSelect } from "../../components/user-select";
import { Project, User } from "../../types";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(event) => {
            setParam({
              ...param,
              name: event.target.value,
            });
          }}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value || 0,
            })
          }
          defaultOptionName={"负责人"}
        />
      </Form.Item>
    </Form>
  );
};
