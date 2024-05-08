export type ValueFormatter = (value: number) => string;

const colorValues = [
  "slate",
  "gray",
  "zinc",
  "neutral",
  "stone",
  "red",
  "orange",
  "amber",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "purple",
  "fuchsia",
  "pink",
  "rose",
] as const;

export type Color = (typeof colorValues)[number];



type Typevariant = "outlined" | "filled" | "standard";
type Typemargin = "none" | "dense" | "normal";
type Typesize = "small" | "medium";
type TypetextAlign = "left" | "center" | "right";

export interface InputElement {
  defaultValue?: string | boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  IsDisplayLabel?: boolean;
  IsShowMessageError?: boolean;
  IsSkeleton?: boolean;
  label: string;
  label2?: string;
  name: string;
  name2?: string;
  onChange?: (event: any) => void;
  onBlur?: (event: any) => void;
  placeholder?: string;
  required: boolean;
  disableMode?: "input" | "text";
  onKeyPress?: (event: any) => void;
};

export interface IOptionsSelect {
  value: string;
  label: string;
  disable?: boolean;
  color?: string;
  isUnit?: boolean;
  value2?: string;
}

export interface ITextbox extends InputElement {
  autoComplete?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  IsCharacterCount?: boolean;
  IsShrink?: boolean;
  margin?: Typemargin;
  maxLength: number;
  pattern?: "th" | "th-number" | "en" | "en-number" | "password";
  size?: Typesize;
  type?: "text" | "email" | "password";
  variant?: Typevariant;
  isPatternPassword?: boolean;
  onKeyPress?: (event: any) => void;
}

export interface ITextarea extends InputElement {
  autoComplete?: string;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  IsCharacterCount?: boolean;
  IsShrink?: boolean;
  margin?: Typemargin;
  maxLength: number;
  maxRows?: number;
  row?: number;
  size?: Typesize;
  variant?: Typevariant;
  pattern?: "th" | "en";
}

export interface IInputNumber extends InputElement {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  IsShrink?: boolean;
  IsThousandSeparator?: boolean;
  IsAllowMinus?: boolean;
  margin?: Typemargin;
  min?: number;
  max?: number;
  maxDigits?: number;
  maxLength?: number;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  ShowDigits?: number;
  size?: Typesize;
  style?: React.CSSProperties;
  textAlign?: TypetextAlign;
  variant?: Typevariant;
  valueType: "number" | "string";
}

export interface ISelect extends Omit<InputElement, "onChange"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  IsShrink?: boolean;
  IsPopperCustom?: boolean;
  disableClearable?: boolean;
  notOptionsText?: React.ReactNode;
  options: IOptionsSelect[];
  onChange?: (value: IOptionsSelect, event: React.SyntheticEvent) => void;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  size?: Typesize;
  textAlign?: "left" | "center" | "right";
  variant?: Typevariant;
}

export interface IMultiSelect extends Omit<InputElement, "onChange"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  IsShrink?: boolean;
  IsSelectAllOption?: boolean;
  IsPopperCustom?: boolean;
  IsShowCountSelected?: boolean;
  disableClearable?: boolean;
  limits?: number;
  limitTag?: number;
  notOptionsText?: React.ReactNode;
  options: IOptionsSelect[];
  onChange?: (value: any, event: any) => void;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  size?: Typesize;
  textAlign?: TypetextAlign;
  variant?: Typevariant;
}

export interface IAutocomplete extends InputElement {
  startAdornment?: any;
  disableClearable?: boolean;
  limitTag?: number; //จำนวณที่จะแสดง Tag
  TextFilterCont?: number; //จำนวณที่จะเริ่มค้นหา
  sUrlAPI?: string;
  sParam?: string; //{ "strSearch": sSearch, "sParam": sParam } การส่งค่าแบบตัวเดียวควรใช้ sParam
  ParamUrl?: any; //{ "strSearch": sSearch, "sDate": sDate, "nValue": nValue, "sName": sName } การส่งค่าแบบหลายๆตัวควรใช้ ParamUrl
  sMethodAxios?: "GET" | "POST"; //("POST" / "GET") default "GET"
  IsPopperCustom?: boolean;
  size?: Typesize;
  variant?: Typevariant;
}

export interface IDatePicker extends InputElement {
  defaultMonth?: Date;
  formatDate?: string;
  localeDate?: "th" | "en";
  minYear?: number;
  maxYear?: number;
  minMonth?: number;
  maxMonth?: number;
  maxDate?: any
  minDate?: any
  onFocus?: (event: any) => void;
  size?: Typesize;
  variant?: Typevariant;
  arrDisable?: []
}
export interface ITimePicker extends InputElement {
  defaultMonth?: Date;
  formatDate?: string;
  maxTime?: any
  minTime?: any
  size?: Typesize;
  variant?: Typevariant;
}


export interface ICheckbox extends InputElement {
  options: IOptionsSelect[];
  row?: boolean;
  size?: Typesize;
  optionSub?: IOptionsSelect[];
  IsSelectAllOption?: boolean;
}

export interface IRadio extends InputElement {
  options: IOptionsSelect[];
  row?: boolean;
  size?: Typesize;
}

export interface IMultiTreeSelect extends Omit<InputElement, "onChange"> {
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  IsShrink?: boolean;
  IsSelectAllOption?: boolean;
  IsPopperCustom?: boolean;
  IsShowCountSelected?: boolean;
  disableClearable?: boolean;
  limits?: number;
  limitTag?: number;
  notOptionsText?: React.ReactNode;
  options: IOptionsTreeSelect[];
  onChange?: (value: any) => void;
  onFocus?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyPress?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  size?: Typesize;
  textAlign?: TypetextAlign;
  variant?: Typevariant;
  onClearOptions?: any;
}

export interface IOptionsTreeSelect {
  value: string;
  label: string;
  disable?: boolean;
  color?: string;
  bgcolor?: string;

  nLevel: number;
  IsParent?: boolean;
  sParentID?: string;
  sParentCode?: string;
}

export interface IAvatar {
  sEmpCode: string;
  sFullNameTH: string;
  sEmail: string;
  sPathImgEmp: string;
  sUnitCode: string;
  sUnitAbbr: string;
  sUnitName: string;
  lstGroupAll: [];
  lstUnitAll: [];
  lstMenuHomePageAll: IMenuHomePageDetail[];
  // lstMenuAll: IMenuDetail[];
  // lstMenuFrontEndTopAll: IMenuDetail[];
  // lstMenuFrontEndLeftAll: IMenuDetail[];
  lstMenuBackEndAll: IMenuDetail[];
}

export interface IMenuHomePageDetail {
  nID: number;
  nPageID: number;
  sTitle: string;
  sDescription?: string;
  sUrl: string;
  isPTT: boolean;
  isApprover: boolean;
  isAdmin: boolean;
  isBA: boolean;
  isCorp: boolean;
  isInnovation: boolean;
  isDisable: boolean;
  nNotify: number;
}

export interface IMenuDetail {
  nMenuID: number;
  nMenuOrder: number;
  sMenuName: string;
  sMenuLink: string;
  nMenuHead?: number;
  nMenuType: number;
  sIcon?: string;
  nLevel: number;
  isShowBreadcrumb: boolean;
  isDisplay: boolean;
  isPTT: boolean;
  isApprover: boolean;
  isAdmin: boolean;
  isBA: boolean;
  isCorp: boolean;
  isInnovation: boolean;
  isDisable: boolean;
  lstChild: IMenuDetail[];
}