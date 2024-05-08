import { STTableProp } from "../STTableProps";
import { TableCell, IconButton, Collapse, Checkbox, Box } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../components/CustomStyle.css";

interface UncollapseDynamicRowCompParams {
  param: STTableProp;
  row: any;
  setOpen: any;
  open: any;
  selectionModel: any;
  setSelectionModel: any;
  item: any;
  nRow: any;
  toggleExpansion? :any;
}

export const uncollapseDynamicRowComp = (
  params: UncollapseDynamicRowCompParams
) => {
  return ColSpanComp(params);
};

const isGetAction = (item, row) => {
  return !item.collapse && item.getAction && !row.nColSpan
}

export const GetActionFunc = (params: UncollapseDynamicRowCompParams) => {
  const {
    param,
    row,
    setOpen,
    open,
    selectionModel,
    setSelectionModel,
    item,
    nRow,
    toggleExpansion
  } = params;
  if (isGetAction(item, row)) {

    return item.getAction(row, nRow);
  } else if (!item.collapse && !item.getAction) {
    if (item.isCheckBox) {
      return (
        <Checkbox
          id={"ckHead_" + param.sTableID}
          disabled={param.isView || row.isDisable === true || row.child != null}
          checked={
            selectionModel.length > 0 &&
              !(param.isView || row.isDisable === true)
              ? selectionModel.includes(row.sID)
              : false
          }
          onChange={(e) => {
            if (param.rows) {
              const isCheck = e.target.checked;
              let arrTemp = selectionModel.filter((w) => w !== row.sID);
              if (!arrTemp) {
                arrTemp = [];
              }
              if (isCheck) {
                arrTemp.push(row.sID);
              }
              setSelectionModel(arrTemp);
            }
          }}
        />
      );
    } else {
      return row[item.field];
    }
  } else if(item.collapse && row.child) {
    return (
      <>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => toggleExpansion(row.sID)}
        sx={{mr : row.nLevel ? (row.nLevel - 1) * 5 : 0}}
      >
        {row.expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}  
      </IconButton>
      {row[item.field]}
      </>
      
    );
  }else if(item.collapse && row.child == null) {
    return (
      <Box sx={{ml : row.nLevel ? (row.nLevel - 1) * 5 : 0}}>{row[item.field]} </Box>
    );
  }else{
    return (
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => setOpen(!open)}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    );
  }
};

export const UnColSpanComp = (params: UncollapseDynamicRowCompParams) => {
  const { param, row, item } = params;
  return <TableCell
    key={param.sTableID + "_" + row.sID + "_" + item.field}
    style={GetStyleTd(item)}
    className={"tbCellBody " + (item.classBody ? item.classBody : "")}
  >

    <div style={{ textAlign: item.bodyAlign }}>{GetActionFunc(params)}</div>
  </TableCell>
};

export const GetColSpanAction = (item, row, nRow) => {

  if (!item.collapse && item.getAction && !row.nColSpan) {
    return item.getAction(row, nRow);
  } else if (!item.collapse && !item.getAction) {
    return row[item.field];
  } else {
    return null;
  }
};

export const ColSpanComp = (params: UncollapseDynamicRowCompParams) => {
  const { param, row, item, nRow } = params;
  return (
    <>
      {item.isHiddenCol !== true &&
        (item.colspanrow && row.nColSpan ? (
          <TableCell
            key={param.sTableID + "_" + row.sID + "_" + item.field}
            height={52}
            colSpan={row.nColSpan}
            style={item.width ? { width: item.width } : {}}
            className={`tbCellBody ${item.classrowcolspanrow && row.nColSpan
              ? ` ${item.classrowcolspanrow}`
              : ""
              }`}
          >
            {GetColSpanAction(item, row, nRow)}
          </TableCell>
        ) : row.nColSpan ? null : (
          UnColSpanComp(params)
        ))
      }
    </>
  );
};

export const collapseDynamicRow = (item, open, setOpen,toggleExpansion) => {
  return item.collapseHead ? (
    <IconButton
      aria-label="expand row"
      size="small"
      onClick={() => {
        console.log("toggle1")
        if(toggleExpansion){
          toggleExpansion(item.sID)
        }else{setOpen(!open)}
      }}
    >
      {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
    </IconButton>
  ) : (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <IconButton
        aria-label="expand row"
        size="small"
        onClick={() => {
          console.log("toggle2")
          if(toggleExpansion){
            toggleExpansion(item.sID)
          }else{setOpen(!open)}
        }}
      >
        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </Collapse>
  );
};

interface CreateRowTableParams {
  param: STTableProp;
  row: any;
  setOpen: any;
  open: any;
  index: any;
  arrColumn: any;
  selectionModel: any;
  setSelectionModel: any;
  toggleExpansion?: any;
}

export default function CreateRowTable(params: CreateRowTableParams) {
  const {
    param,
    row,
    setOpen,
    open,
    index,
    arrColumn,
    selectionModel,
    setSelectionModel,
    toggleExpansion
  } = params;

  const nPage = param.rows.nPageIndex + (param.DataMode === "client" ? 1 : 0);
  const maxRowSizePerPage = nPage * param.rows.nPageSize;
  const nRow = index + 1 + maxRowSizePerPage;
  return arrColumn.map((item) =>
    uncollapseDynamicRowComp({
      param,
      row,
      setOpen,
      open,
      selectionModel,
      setSelectionModel,
      item,
      nRow,
      toggleExpansion
    })
  );
}

const GetStyleTd = (item) => {
  const objStyle = {};
  if (item.width) {
    objStyle["width"] = item.width;
  }
  if (item.bodyVerticalAlign) {
    objStyle["verticalAlign"] = item.bodyVerticalAlign;
  }
  return objStyle;
};
