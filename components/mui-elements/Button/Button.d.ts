import { SxProps } from "@mui/material";

export interface ButtonCustomProp {
  IsDisabled?: boolean;
  IsSkeleton?: boolean;
  IsHidden?: boolean;
  IsRadius?: boolean;
  isFullwidth?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  startIcon?: any;
  txt?: string;
  id: string;
  fontColor?: string;
  bgcolor?: string;
  className?: string;
  sx?: any;
  bgcolorHover?: string;
  IsCircleWithOutText?: boolean;
  sx?: SxProps;
  size?: "small" | "medium" | "large";
  tooltipPlacement?:
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top";
  href?: string
  isBtnUpload?: boolean
}

export interface BtnProp {
  IsDisabled?: boolean;
  IsHidden?: boolean;
  IsRadius?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  onMouseDown?: React.MouseEventHandler<HTMLButtonElement>;
  txt?: string;
  IsCircleWithOutText?: boolean;
  icon?: any;
  id: string;
  className?: string;
  IsPin?: boolean;
  sSize?: "small" | "medium" | "large";
  bgColor?: string;
  bgColorHover?: string;
  isBtnUpload?: boolean;
  IsSkeleton?: boolean;
}

export interface BtnTableProp {
  IsDisabled?: boolean;
  IsHidden?: boolean;
  IsRadius?: boolean;
  onClick?: any;
  txt?: string;
  IsCircleWithOutText?: boolean;
  icon?: any;
  id: string;
  className?: string;
  href?: string;
}

export interface IBtnMenuAddOnTable {
  IsDisabled?: boolean;
  IsHidden?: boolean;
  IsRadius?: boolean;
  onClick?: any;
  handleAddItem?: any;
  txt?: string;
  IsCircleWithOutText?: boolean;
  icon?: any;
  id: string;
  className?: string;
  href?: string;
  arrTableMenu?: any;
  setAnchorEL?: any;
  anchorEL?: any;
  nItemRowId?: string;
  nOrderNumber?: number;
}