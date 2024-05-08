import { Fragment, useState } from "react";
import { TableRow, TableCell, Collapse } from "@mui/material";
import CreateRowTable from "./CreateRowTable";
import { STTableProp } from "../STTableProps";
import DynamicRows from "./DynamicRow";
import { Show } from "@/components/common/Show";
interface CreateRowTableParams {
  param: STTableProp;
  row: any;
  index: any;
  arrColumn: any;
  selectionModel: any;
  setSelectionModel: any;
}
export default function CreateRow(props: CreateRowTableParams) {
  const { param, row, index, arrColumn, selectionModel, setSelectionModel } =
    props;
  const [open, setOpen] = useState(false);
  return (
    <Show>
      <Show.When isTrue={row.child}>
        <Fragment key={props.param.sTableID + "_" + props.row.sID}>
          {DynamicRows({
            param,
            row,
            setOpen,
            open,
            index,
            arrColumn,
            selectionModel,
            setSelectionModel,
          })}
        </Fragment>
      </Show.When>

      <Show.Else>
        <Fragment key={props.param.sTableID + "_" + props.row.sID}>
          <TableRow>
            {CreateRowTable({
              param,
              row,
              setOpen,
              open,
              index,
              arrColumn,
              selectionModel,
              setSelectionModel,
            })}
          </TableRow>
          {row.elCollapse && open ? (
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={arrColumn.length}
              >
                <Collapse in={true} timeout="auto" unmountOnExit>
                  {row.elCollapse}
                </Collapse>
              </TableCell>
            </TableRow>
          ) : null}
        </Fragment>
      </Show.Else>
    </Show>
  );
}
