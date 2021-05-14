import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();

  const { run, isLoading } = useAsync();

  const handleSubmit = (values: { username: string; password: string }) => {
    run(login(values).catch(onError));
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input type={"text"} id={"username"} placeholder={"请输入用户名"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"请输入密码"} type={"password"} id={"password"} />
      </Form.Item>
      <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
        登录
      </LongButton>
    </Form>
  );
};
