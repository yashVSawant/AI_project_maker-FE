import { useState } from "react";
import { Button, Tag, Space, Avatar, Typography, Modal } from "antd";
import { CrownOutlined, UserOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InviteUserModal from "./InviteUserModal";
import CommonTable from "../../components/Table";
import { showToast } from "../../store/toast.store";
import {  getProjectUsers, inviteUsers, removeUser } from "./api";
import { useProjectStore } from "../../store/project.store";
import { useParams } from "react-router-dom";

const { Text } = Typography;

type UserItem = {
  id: string;
  email: string;
  name?: string | null;
  role: string;
  isOwner?: boolean;
};

const ProjectMembers = () => {
  const queryClient = useQueryClient();
  const [inviteOpen, setInviteOpen] = useState(false);

  const { projectId } = useParams<{ projectId: string }>();

  // ✅ Fetch users
  const { data , isLoading } = useQuery({
    queryKey: ["project-member", projectId],
    queryFn: () => getProjectUsers(projectId!)
  });

  const users = data?.data;
  console.log(users)

  // ✅ Invite user
  const { mutate: inviteUser, isPending: inviteLoading } = useMutation({
    mutationFn: (payload: { email: string; role: string ,projectId:string }) =>inviteUsers(payload),

    onSuccess: () => {
      showToast({ type: "success", message: "Invite sent!" });
      setInviteOpen(false);
      queryClient.invalidateQueries({ queryKey: ["project-users", projectId] });
    },
  });

  // ✅ Remove user
  const { mutate: removeUserMuate } = useMutation({
    mutationFn: (id: string) =>removeUser(id,projectId!),

    onSuccess: () => {
      showToast({ type: "success", message: "User removed" });
      queryClient.invalidateQueries({ queryKey: ["project-users", projectId] });
    },
  });

  // ✅ Confirm remove
  const handleRemove = (record: UserItem) => {
    Modal.confirm({
      title: "Remove User",
      content: `Are you sure you want to remove ${record.email}?`,
      okText: "Remove",
      okButtonProps: { danger: true },
      onOk: () => removeUserMuate(record.id),
    });
  };

  // ✅ Table columns
  const columns = [
    {
      title: "User",
      key: "user",
      render: (_: any, record: UserItem) => {
        const isPending = !record.name;

        return (
          <Space>
            <Avatar icon={<UserOutlined />} />
            <div>
              <div style={{ display: "flex", gap: 6 }}>
                <Text strong>
                  {record.name || "Invited User"}
                </Text>

                {record.isOwner && (
                  <Tag color="gold" icon={<CrownOutlined />}>
                    Owner
                  </Tag>
                )}
              </div>

              <Text type="secondary">{record.email}</Text>

              {isPending && (
                <div>
                  <Tag color="orange">Pending</Tag>
                </div>
              )}
            </div>
          </Space>
        );
      },
    },
    {
      title: "Role",
      key: "role",
      dataIndex: "role",
      render: (role: string) => {
        const color =
          role === "admin"
            ? "red"
            : role === "manager"
            ? "blue"
            : "default";

        return <Tag color={color}>{role.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: UserItem) =>
        record.name ? (
          <Tag color="green">Joined</Tag>
        ) : (
          <Tag color="orange">Pending</Tag>
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: UserItem) => {
        if (record.isOwner) return null;

        const isPending = !record.name;

        return (
          <Space>
            {isPending && (
              <Button
                size="small"
                onClick={() => {
                  projectId &&
                  inviteUser({email:record.email , role:record.role , projectId})
                }}
              >
                Resend
              </Button>
            )}

            <Button
              danger
              size="small"
              onClick={() => handleRemove(record)}
            >
              Remove
            </Button>
          </Space>
        );
      },
    },
  ];

  if(!users) return <div>loading...</div>

  return (
    <div className="p-20 bg-gray-200 w-full h-full">
      {/* Header */}
      <div className="flex justify-between mb-16"
      >
        <h2 className="">Project Members</h2>

        <Button type="primary" onClick={() => setInviteOpen(true)}>
          Invite User
        </Button>
      </div>

      {/* Table */}
      <CommonTable
        columns={columns}
        data={users}
        loading={isLoading}
      />

      {/* Invite Modal */}
      <InviteUserModal
        open={inviteOpen}
        onClose={() => setInviteOpen(false)}
        onInvite={(data) => {
          projectId&&
          inviteUser({...data,projectId})
        }}
        loading={inviteLoading}
      />
    </div>
  );
};

export default ProjectMembers;