import { type JSX } from "react";
export interface ComponentDTO {
    type: AllowedTags;
    className?: string;
    children?: ComponentDTO[];
    text?: string;
    id:string;
    description?:string
}

type UnsafeTags =
  | "script"
  | "iframe"
  | "style"
  | "link"
  | "meta"
  | "object"
  | "embed";

type AllowedTags = Exclude<AllTags, UnsafeTags>;

type AllTags = keyof JSX.IntrinsicElements;