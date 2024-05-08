import { Grid, TableCell, Checkbox } from "@mui/material";
import { STTableProp, STTableColumnDetail } from "../STTableProps";
import TableMenu from "./TableMenu";
import TableSort from "./TableSort";
import "./CustomStyle.css";
import { ParseHtml } from "@/lib";

export const renderOption = (item, param, TableSort, selectHead, setSelectHead) => {
  if (item.sortable === true && !item.isCheckBox && !item.renderHeader) {
    return <div className="table-textsort-menu">{TableSort(param, item)}</div>;
  } 
  else if (item.isCheckBox) {
    return (
      <Checkbox
        id={"ckHead_" + param.sTableID}
        disabled={param.isView}
        checked={selectHead}
        sx={{ color: "white" }}
        onChange={() => {
          setSelectHead(!selectHead);
        }}
      />
    )
  } 
  else if (item.renderHeader) {
    return <div className="table-text-menu">{item.renderHeader()}</div>;
  } 
  else {
    return <div className="table-text-menu">{ParseHtml(item.headerName)}</div>;
  }
}

export const Defaultitem: STTableColumnDetail = {
  headerAlign: "center",
  field: "",
  width: "",
  sortable: false,
  isCheckBox: false,
  collapse: false,
  isHiddenCol: false,
}

export default function TableColumn(
  param: STTableProp,
  selectHead,
  setSelectHead,
  item = Defaultitem,
  index
) {
  return (
    <>
    {item.isHiddenCol !== true &&
      <TableCell
        height={"45px"}
        padding={"none"}
        align={item.headerAlign}
        key={param.sTableID + "_" + item.field + "_row" + index}
        style={item.width ? { width: item.width } : {}}
        className={(param.classHead ? param.classHead : "tbcustomcell ") + (item.classHead ? " " + item.classHead : "")}
        rowSpan={item.rowspan ? item.rowspan : undefined}
        colSpan={item.colspan ? item.colspan : undefined}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          className={"table-column-custom"}
        >
          <Grid
            xs={12}
            justifyContent="center"
            alignItems="center"
            textAlign="center"
            item={true}

          >
            {renderOption(item, param, TableSort, selectHead, setSelectHead)}
          </Grid>
          {param.isMenu && item.isSort !== false ? (
            <div className="table-icon-menu">
              {TableMenu(param, item)}
            </div>
          ) : null}
        </Grid>
      </TableCell>
    }
    </>
  );
}

