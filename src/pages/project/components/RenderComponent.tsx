import React, { useState } from "react";
import type { ComponentDTO } from "../dto/component.dto";
import { useProjectStore } from "../../../store/project.store";
import HoverTools from "../../../components/HoverTools";
import Rules from "./Rules";
import Description from "./Description";

const VOID_ELEMENTS = ["input", "img", "br", "hr", "meta", "link"];

const RenderComponent = ({
  type,
  className,
  children,
  text,
  id,
  description,
  conditions = [],
  rule,
}: ComponentDTO) => {
  const Tag = type as any;
  const { conditions: projectConditions, selectedComponentId, setSelectedComponentId } = useProjectStore();

  const [isHovered, setIsHovered] = useState(false);
  const [hoverRect, setHoverRect] = useState<DOMRect | null>(null);
  // const [selectedId, setSelectedId] = useState<string | null>(null);

  const [openRules, setOpenRules] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);

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
    onClick: (e: any) => {
      e.stopPropagation();
      setSelectedComponentId(id);
    },
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
    } ${selectedComponentId === id ? "ring-2 ring-red-600" : ""}`,
    title: description,
    disabled: isDisabled,
  };
const handleToolClick = (
  button: "edit" | "delete" | "close" | "rules" | "description"
) => {
  switch (button) {
    case "edit":
      // handle edit
      break;

    case "delete":
      // handle delete
      break;

    case "close":
      setSelectedComponentId(null)
      break;

    case "rules":
      // handle rules
      setOpenRules(true);
      setSelectedComponentId(null);
      break;

    case "description":
      // handle description
      setOpenDescription(true);
      setSelectedComponentId(null);
      break;

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
      {selectedComponentId === id && hoverRect && (
        <HoverTools
        showValues={{rules:Boolean(rule),description:Boolean(description)}}
          style={{
            position: "fixed",
            top: hoverRect.top - 25,
            left: hoverRect.left,
            zIndex: 9999,
          }}
          onEdit={() => {}}
          onDelete={() => {}}
          onAI={() => {}}
          onClose={() => {
            handleToolClick("close");
          }}
          onRules={() => handleToolClick("rules")}
          onDescription={() => handleToolClick("description")}
        />
      )}
      {rule && <Rules open={openRules} onClose={() => setOpenRules(false)} rules={[rule]} />}
      {description && (
        <Description
          open={openDescription}
          onClose={() => setOpenDescription(false)}
          descriptions={[description]}
        />
      )}
    </>
  );
};

export default RenderComponent;
