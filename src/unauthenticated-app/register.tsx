import { useAuth } from "../context/auth-context";
import { Form, Input } from "antd";
import { LongButton } from "./index";
import { useAsync } from "../utils/use-async";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();

  const { run, isLoading } = useAsync(undefined, { throwOnError: true });

  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    cpassword: string;
    username: string;
    password: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("请确保两次输入的密码相等"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e);
    }
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请再次输入密码" }]}
      >
        <Input
          placeholder={"请再次输入密码"}
          type={"cpassword"}
          id={"cpassword"}
        />
      </Form.Item>
      <LongButton loading={isLoading} type={"primary"} htmlType={"submit"}>
        注册
      </LongButton>
    </Form>
  );
};
