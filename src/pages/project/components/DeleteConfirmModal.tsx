import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Body, Title } from "../../../components/Modal";
import Button from "../../../components/Button";
import { deleteComponent } from "../api";
import { useParams } from "react-router-dom";
import { removeComponentFromTree } from "../../../utils/data.helper";

const DeleteConfirmModal = ({
  open,
  onClose,
  componentId
}: {
  open: boolean;
  onClose: () => void;
  componentId: string | null;
}) => {
  const queryClient = useQueryClient();
  const { id, editId } = useParams();

  const projectId = id || editId;

  const deleteMutation = useMutation({
    mutationFn: () => deleteComponent(componentId!),
    onSuccess: () => {
      queryClient.setQueryData(["projects", projectId], (oldData: any) => {
        if (!oldData) return oldData;

        return {
          ...oldData,
          data: {
            ...oldData.data,
            components: removeComponentFromTree(
              oldData.data.components,
              componentId!
            )
          }
        };
      });

      onClose();
    }
  });

  const handleDelete = () => {
    if (!componentId) return;
    deleteMutation.mutate();
  };

  return (
    <Modal open={open} onClose={onClose} rootClassName="!w-96">
      <Title hasCloseButton closeButtonOnClick={onClose}>
        Delete Component
      </Title>

      <Body>
        <div className="p-4 space-y-4">
          
          <div className="text-red-500 font-semibold text-sm">
            Are you sure you want to delete this component?
          </div>

          <div className="text-sm text-gray-600">
            This action will permanently delete this component and all its child components.
            This cannot be undone.
          </div>

          <div className="flex justify-center items-center gap-2 pt-2">
            <Button onClick={onClose} disabled={deleteMutation.isPending}>
              Cancel
            </Button>

            <Button
              className="bg-red-500 text-white"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </div>
      </Body>
    </Modal>
  );
};

export default DeleteConfirmModal;