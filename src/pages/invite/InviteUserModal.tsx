import { Modal, Form, Input, Select } from "antd";

const InviteUserModal = ({
  open,
  onClose,
  onInvite,
  loading,
}: {
  open: boolean;
  onClose: () => void;
  onInvite: (data: { email: string; role: string }) => void;
  loading?: boolean;
}) => {
  const [form] = Form.useForm();

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onInvite(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      title="Invite User"
      open={open}
      onCancel={onClose}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input placeholder="Enter user email" />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: "Viewer", value: "VIEWER" },
              { label: "Editor", value: "EDITOR" },
              { label: "Admin", value: "ADMIN" },
            ]}
            placeholder="Select user role"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InviteUserModal;