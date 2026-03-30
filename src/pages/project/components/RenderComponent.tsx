import React, { type JSX } from "react";
import type { ComponentDTO } from "../dto/component.dto";

const RenderComponent = ({ type, className, children, text }:ComponentDTO) => {
  

  const Tag =   type ;

  return (
    <Tag className={className}>
      {text}
      {children?.map((child, i) => (
        <React.Fragment key={i}>
          <RenderComponent {...child} />
        </React.Fragment>
      ))}
    </Tag>
  );
};

export default RenderComponent;