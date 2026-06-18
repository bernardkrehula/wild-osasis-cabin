import type { ReactNode } from "react";

export type BtnType = {
  variation?: string;
  size?: string;
  type: "button" | "submit" | "reset";
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  children: string | ReactNode;
  disabled?: boolean;
  name?: string;
};
