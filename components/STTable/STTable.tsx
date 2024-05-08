import { STTableProp, STTableRow } from "./STTableProps";
import { Box } from '@mui/material';
import CreateTable from "./components/CreateTable";

export default function STTable(props) {
  return <Box
    sx={{
      width: "100%",
      "& .remove-cell-padding": {
        padding: "0px !important",
      },
    }}
  >
    {CreateTable(props)}
  </Box>
}

export const initRows: STTableRow = {
  nPageIndex: 1,
  nPageSize: 10,
  
  arrRows: [],
  nDataLength: 0,
  sSortExpression: "sUpdateDate",
  sSortDirection: "desc",
};

const defaultProp: STTableProp = {
  rows: initRows,
  modeFilter: 3,
  isHiddenToolHead: true,
  isLoading: false,
  onLoadData: () => { },
  DataMode: "server",
  sTableID: "tb1",
  isMenu: true,
  isSortMulti: false,
  filterField: [],
  lstPageSize: [10, 30, 50, 100],
  isPageSize : true,
  isPage : true,
  isShowCheckBox : false,
  isView : false
};

STTable.defaultProps = defaultProp;

type Alignment = "center" | "left" | "right";

export interface IParamCol {
  field: string
  headerName: string
  headerAlign: Alignment
  align: Alignment     
  bodyAlign : Alignment
  resizable: boolean 
  sortable: boolean
  disableReorder: boolean
  editable: boolean
  flex : number
  minWidth : number,
  isHiddenCol?: boolean
}

export const DefaultParamCol: IParamCol = {
  field: "",
  headerName: "",
  headerAlign: "center",
  align: "center",
  bodyAlign: "center",
  resizable: false,
  sortable: true,
  editable: false,
  disableReorder: true,
  flex: 1,
  minWidth: 100
}

//// export function CreateColumn(
////   Param: IParamCol,
////   renderHeader: (item: any) => React.JSX.Element = (item) => {
////     return (item.value);
////   },
////   renderCell: (item: any) => React.JSX.Element = (item) => {
////     return (item.value);
////   },
//// ) {
////   return {
////     field: Param.field,
////     headerName: Param.headerName,
////     headerAlign: Param.headerAlign,
////     sortable: Param.sortable,
////     align: Param.align,
////     resizable: Param.resizable,
////     editable: Param.editable,
////     flex: Param.flex,
////     minWidth: Param.minWidth,
////     renderHeader,
////     renderCell
////   };
//// }