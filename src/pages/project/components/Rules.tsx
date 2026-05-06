import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Body, Modal, Title } from "../../../components/Modal";
import { useState, useEffect } from "react";
import { deleteRules, editRules } from "../api"; 
import Button from "../../../components/Button";
import { useParams } from "react-router-dom";
import { updateComponentInTree } from "../../../utils/data.helper";

const Rules = ({
  open,
  onClose,
  rules,
  componentId
}: {
  open: boolean;
  onClose: () => void;
  rules: string;
  componentId: string;
}) => {
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(rules);

  const { id, editId } = useParams();
  const projectId = id || editId;

  useEffect(() => {
    setEditValue(rules);
    setEditing(false);
  }, [rules, open]);

  // ✏️ update rules
  const updateRuleMutation = useMutation({
    mutationFn: (value: string) =>
      editRules(componentId, value), 
    onSuccess: (_, variable) => {
      queryClient.setQueryData(["projects", projectId], (oldData: any) => {
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
                rules: variable
              })
            )
          }
        };
      });

      setEditing(false);
    }
  });

  // 🗑 delete rules
  const deleteRuleMutation = useMutation({
    mutationFn: () => deleteRules(componentId), // ✅ FIXED
    onSuccess: () => {
      queryClient.setQueryData(["projects", projectId], (oldData: any) => {
        if (!oldData) return oldData;
        console.log("")
        return {
          ...oldData,
          data: {
            ...oldData.data,
            components: updateComponentInTree(
              oldData.data.components,
              componentId,
              (node) => ({
                ...node,
                rules: "" // clear rules
              })
            )
          }
        };
      });
    }
  });

  return (
    <Modal open={open} onClose={onClose} rootClassName="!w-100">
      <Title hasCloseButton closeButtonOnClick={onClose}>
        Rules {/* ✅ FIXED */}
      </Title>

      <Body>
        <div className="w-full flex flex-col items-center bg-gray rounded-md p-3 gap-3">
          
          {editing ? (
            <>
              <textarea
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                rows={4}
                className="border px-3 py-2 rounded w-full resize-none"
                placeholder="Enter rules..."
              />

              <div className="flex gap-2">
                <Button onClick={() => setEditing(false)}>
                  Cancel
                </Button>

                <Button
                  onClick={() => {
                    if (!editValue.trim()) return;
                    updateRuleMutation.mutate(editValue);
                  }}
                >
                  Save
                </Button>
              </div>
            </>
          ) : (
            <>
              <span className="whitespace-pre-wrap">
                {rules || "No rules added"}
              </span>

              <div className="flex gap-2 justify-end mt-2">
                <Button onClick={() => setEditing(true)}>
                  {rules?"Edit":"Add"}
                </Button>

                <Button
                  onClick={() => deleteRuleMutation.mutate()}
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

export default Rules;