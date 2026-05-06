import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Body, Modal, Title } from "../../../components/Modal";
import { useState, useEffect } from "react";
import { deleteDescription, editDescription } from "../api";
import Button from "../../../components/Button";
import { useParams } from "react-router-dom";
import { updateComponentInTree } from "../../../utils/data.helper";

const Description = ({
  open,
  onClose,
  description,
  componentId
}: {
  open: boolean;
  onClose: () => void;
  description: string;
  componentId: string;
}) => {
  const queryClient = useQueryClient()
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(description);
  const { id, editId } = useParams();

  const projectId = id || editId

  // keep input in sync when modal opens / data changes
  useEffect(() => {
    setEditValue(description);
    setEditing(false);
  }, [description, open]);

  // ✏️ update mutation
  const updateDescriptionMutation = useMutation({
    mutationFn: (value: string) =>
      editDescription(componentId, value),
    onSuccess: (_,variable) => {
      // queryClient.invalidateQueries({queryKey:["projects"]});
      queryClient.setQueryData(["projects",projectId],(oldData:any)=>{
        // if (!oldData) return oldData;
        console.log("old data",oldData)
    if (!oldData) return oldData;

    return {
      ...oldData,
      data: {
        ...oldData.data,
        components: updateComponentInTree(
          oldData.data.components,
          componentId,
          (node) => ({
            ...node,
            description: variable
          })
        )
      }
    };
      })
      setEditing(false);
    }
  });

  // 🗑 delete mutation
  const deleteDescriptionMutation = useMutation({
    mutationFn: () => deleteDescription(componentId),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:["projects"]});
    }
  });

  return (
    <Modal open={open} onClose={onClose} rootClassName="!w-100">
      <Title hasCloseButton closeButtonOnClick={onClose}>
        Description
      </Title>

      <Body>
          <div className="w-full flex flex-col bg-gray rounded-md p-1 gap-3 items-center">
            
            {editing ? (
              <>
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  rows={4}
                  className="border px-3 py-2 rounded !w-full resize-none"
                  placeholder="Enter description..."
                />

                <Button
                  onClick={() =>
                    updateDescriptionMutation.mutate(editValue)
                  }
                >
                  Save
                </Button>
              </>
            ) : (
              <>
                <span>{description || "No description added"}</span>

                <div className="flex gap-2 mt-3">
                  <Button onClick={() => setEditing(true)}>
                    {description ?"Edit":"Add"}
                  </Button>

                  <Button
                    onClick={() =>
                      deleteDescriptionMutation.mutate()
                    }
                  >
                    Delete
                  </Button>
                </div>
              </>
            )}
          </div>
        
      </Body>
    </Modal>
  );
};

export default Description;