import  { useState } from "react";
import type { ComponentDTO } from "../dto/component.dto";
import { useProjectStore } from "../../../store/project.store";
import HoverTools from "../../../components/HoverTools";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { useNavigate, useParams } from "react-router-dom";

const VOID_ELEMENTS = ["input", "img", "br", "hr", "meta", "link","textarea"];

const RenderComponent = ({
  type,
  className,
  children,
  text,
  id,
  description,
  conditions = [],
  style,
}: ComponentDTO) => {
  const navigate = useNavigate();
  const{ projectId ,componentId} = useParams();
  const Tag = type as any;
  const { conditions: projectConditions, selectedComponentId, setSelectedComponentId ,aiUpdateComponentData } = useProjectStore();

  const [isHovered, setIsHovered] = useState(false);
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  // const [selectedId, setSelectedId] = useState<string | null>(null);

  // const [openRules, setOpenRules] = useState(false);
  // const [openDescription, setOpenDescription] = useState(false);
  const [openDeleteConfirm ,setOpenDeleteConfirm] = useState(false);
  // const [openAIEdit ,setOpenAIEdit] = useState(false);

  // ✅ HIDDEN
  const isHidden = projectConditions.some(
    (c) =>
      conditions.find((cond) => cond.conditionId === c.conditionId) &&
      c.active &&
      c.action === "HIDDEN",
  );

  if (isHidden) return null;

  // ✅ DISABLED
  const isDisabled = projectConditions.some(
    (c) =>
      conditions.find((cond) => cond.conditionId === c.conditionId) &&
      c.active &&
      c.action === "DISABLED",
  );
  const commonProps = {
    "data-id": id,
    ...(Tag === "button" ? { type: "button" } : {}),
    onClick: (e: any) => {
      e.stopPropagation();
      setSelectedComponentId(id);
    },
    style,
    onMouseOver: (e: any) => {
      e.stopPropagation();
      setIsHovered(true);
      const rect = e.currentTarget.getBoundingClientRect();
      setHoverRect(rect);
    },
    onMouseOut: (e: any) => {
      e.stopPropagation();
      setIsHovered(false);
    },
    className: `${className} ${
      isHovered ? "relative outline outline-1 outline-blue-500" : ""
    } ${selectedComponentId === id || componentId === id ? "ring-2 ring-red-600" : ""}`,
    title: description,
    disabled: isDisabled,
  };
const handleToolClick = (
  button: "edit"|"editWithAI" | "delete" | "close" | "rules" | "description"
) => {
  switch (button) {
    case "edit":
      // handle edit
      navigate(`/project/${projectId}/${id}`);
      setSelectedComponentId(null)
      break;

    case "delete":
      // handle delete
      setOpenDeleteConfirm(true);
      setSelectedComponentId(null);
      break;

    case "close":
      setSelectedComponentId(null)
      break;

    // case "rules":
    //   // handle rules
    //   setOpenRules(true);
    //   setSelectedComponentId(null);
    //   break;

    // case "description":
    //   // handle description
    //   setOpenDescription(true);
    //   setSelectedComponentId(null);
    //   break;
    // case "editWithAI" :
    //   //handle edit with ai
    //   setOpenAIEdit(true);
    //   setSelectedComponentId(null);
    //   break;

    default:
      break;
  }
};
  return (
    <>
      {VOID_ELEMENTS.includes(type) ? (
        <Tag {...commonProps} />
      ) : (
        <Tag {...commonProps}>
          {text}
          {children?.map((child) => (
            <RenderComponent key={child.id} {...child} />
          ))}
        </Tag>
      )}
      {!aiUpdateComponentData && selectedComponentId === id && hoverRect && (
        <HoverTools
       
          style={{
            position: "fixed",
            top: hoverRect.top - 25,
            left: hoverRect.left,
            zIndex: 9999,
          }}
          onEdit={() => {handleToolClick("edit")}}
          onDelete={() => {handleToolClick("delete")}}
          // onEditWithAI={() => {handleToolClick("editWithAI")}}
          onClose={() => {
            handleToolClick("close");
          }}
          // onRules={() => handleToolClick("rules")}
          // onDescription={() => handleToolClick("description")}
        />
      )}
       {/* <Rules open={openRules} onClose={() => setOpenRules(false)} rules={rules||""} componentId={id} />
       
        <Description
          open={openDescription}
          onClose={() => setOpenDescription(false)}
          description={description||""}
          componentId={id}
        /> */}
        <DeleteConfirmModal open={openDeleteConfirm} onClose={()=>{
          setOpenDeleteConfirm(false)
        }} componentId={id}/>

        {/* <AIEditModal open={openAIEdit} onClose={()=>{
          setOpenAIEdit(false)
        }}
        componentId={id}
        /> */}
      
    </>
  );
};

export default RenderComponent;
