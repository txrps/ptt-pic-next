export interface SwitchProps {
  id?: string;
  disabled?: boolean;
  IsNoLabel?: boolean;
  label?: string;
  LeftText?: string;
  name: string;
  offColor?: string;
  onBlur?: (event: any) => void;
  onChange?: (value: any) => void;
  onColor?: string;
  required?: boolean;
  RightText?: string;
  styleSwitch?: React.CSSProperties;
  styleSwitch?: React.CSSProperties;
  Text?: string;
  value?: boolean;
  width?: number;
  height?: number;
  IsSkeleton?: boolean;
  IsShowMessageError?: boolean;
}

export interface SwitchFromProps extends SwitchProps {
  required?: boolean;
  name: string;
}

export interface SwitchItemProps {
  id?: string;
  name: string;
  label?: string;
  checkText?: string;
  uncheckText?: string;
  width?: number;
  height?: number;
  onChange?: (value: any) => void;
  disabled?: boolean;
  fontColor?: string;
  offColor?: string;
  onColor?: string;
  direction?: "row" | "column";
  defaultValue?: boolean;
  required: boolean;
  IsDisplayLabel?: boolean;
  IsSkeleton?: boolean;
  disableMode?: string;
  IsShowMessageError?: boolean;
}
