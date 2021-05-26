import { useTaskModel, useTasksQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { useDeleteTask, useEditTask } from "../../utils/task";
import { useEffect } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/task-type-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const TaskModel = () => {
  const { close, editTask, editTaskId } = useTaskModel();
  const [form] = useForm();

  const { mutateAsync: editTaskMutate, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOK = async () => {
    await editTaskMutate({ ...editTask, ...form.getFieldsValue() });
    close();
  };

  const { mutateAsync: deleteTask } = useDeleteTask(useTasksQueryKey());

  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      async onOk() {
        await deleteTask({ id: Number(editTaskId) });
        close();
        form.resetFields();
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editTask);
  }, [form, editTask]);

  return (
    <Modal
      visible={!!editTaskId}
      onCancel={onCancel}
      onOk={onOK}
      okText={"确认"}
      cancelText={"取消"}
      title={"编辑任务"}
      confirmLoading={editLoading}
      forceRender={true}
    >
      <Form {...layout} initialValues={editTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"经办人"} />
        </Form.Item>
        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>
      <div style={{ textAlign: "right" }}>
        <Button onClick={startEdit} style={{ fontSize: "14px" }} size={"small"}>
          删除
        </Button>
      </div>
    </Modal>
  );
};
