export interface STFilterField {
  sFieldName: string,
  fieldSearch?: string,
  optionSelect?: STOption[],
  sTypeFilterMode: "input"|"number" | "select" | "multiselect" | "daterange" | "date" | "checkbox" | "Year",
  sLabel: string
}
export interface STOption {
  label: string,
  value: string,
}

export interface STTableColumnDetail {
  field: string,
  headerName?: string,
  headerAlign?: "center" | "left" | "right" | "inherit" | "justify",
  bodyAlign?: "center" | "left" | "right" | "inherit" | "justify",
  bodyVerticalAlign?: "baseline" | "sub" | "super" | " text-top" | "text-bottom" | "middle" | "top" | "bottom",
  sortable: boolean,
  minwidth?: number,
  colspan?: number,
  colspanrow?: boolean
  rowspan?: number,
  getAction?: (row: any, index: any) => void;
  order?: string,
  orderactive?: boolean,
  collapse: boolean,
  isCheckBox?: boolean,
  isSort?: boolean,
  width?: string,
  renderHeader?: () => React.ReactNode;
  classrowcolspanrow?: stirng,
  classHead?: string,
  isHiddenCol?: boolean,
}
export interface STTableColumn {
  column: STTableColumnDetail[]
}
export interface STTableRow {
  nPageIndex: number;
  nPageSize: number;
  arrRows?: any[];
  nDataLength: number;
  sSortExpression: string;
  sSortDirection: string;

}
export interface STTableProp {
  columnmerge?: STTableColumn[];
  column?: STTableColumnDetail[];
  rows?: STTableRow;
  modeFilter?: 1 | 2 | 3;
  isHiddenToolHead?: boolean;
  isLoading: boolean;
  onLoadData: (e: STTableRow) => void,
  onDelete?: (value: any) => void,
  onSubmit?: (value: any) => void,
  txtSubmit?: string,
  DataMode: "server" | "client";
  sTableID: string;
  isMenu: boolean;
  isSortMulti: boolean;
  filterField: STFilterField[];
  stylehead?: "",
  stylerowmerge?: "",
  isPageSize: boolean,
  lstPageSize: number[],
  isPage: boolean,
  isShowCheckBox: boolean,
  isView: boolean,
  classHead?: string,
  width?: string
}