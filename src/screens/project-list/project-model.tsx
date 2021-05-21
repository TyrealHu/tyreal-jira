import { Button, Drawer, Form, Input, Spin } from "antd";
import { useProjectModel } from "./util";
import { UserSelect } from "../../components/user-select";
import { useAddProject, useEditProject } from "./project";
import { useEffect } from "react";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

export const ProjectModel = () => {
  const { projectModelOpen, close, editProject, isLoading } = useProjectModel();
  const useMutateProject = !!editProject ? useEditProject : useAddProject;
  const title = !!editProject ? "编辑项目" : "创建项目";
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject();
  const [form] = Form.useForm();
  const onFinish = (formValue: any) => {
    mutateAsync({ ...editProject, ...formValue }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModel = () => {
    form.resetFields();
    close();
  };

  useEffect(() => {
    form.setFieldsValue(editProject);
  }, [editProject, form]);

  return (
    <Drawer
      forceRender={true}
      width={"100%"}
      onClose={closeModel}
      visible={projectModelOpen}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                name={"name"}
                label={"名称"}
                rules={[{ required: true, message: "请输入项目名称" }]}
              >
                <Input placeholder={"请输入项目名称"} />
              </Form.Item>
              <Form.Item
                name={"organization"}
                label={"部门"}
                rules={[{ required: true, message: "请输入部门名称" }]}
              >
                <Input placeholder={"请输入部门名称"} />
              </Form.Item>
              <Form.Item name={"personId"} label={"负责人"}>
                <UserSelect defaultOptionName={"负责人"} />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
