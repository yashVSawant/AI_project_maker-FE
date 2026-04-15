import React from "react";
import type { ComponentDTO } from "../dto/component.dto";

const VOID_ELEMENTS = ["input", "img", "br", "hr", "meta", "link"];

const RenderComponent = ({ type, className, children, text ,id , description}:ComponentDTO) => {
  

  const Tag =   type ;

  if (VOID_ELEMENTS.includes(type)) {
    return <Tag className={className} key={id} />;
  }

  return (
    <Tag className={className} key={id} title={description}>
      {text}
      {children?.map((child, i) => (
        <React.Fragment key={i+"-"+child.id}>
          <RenderComponent {...child} key={child.id} />
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default RenderComponent;