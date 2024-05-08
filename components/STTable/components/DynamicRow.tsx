"use client";

import { TableRow } from "@mui/material";
import React, { Fragment, useState } from "react";
import { STTableProp } from "../STTableProps";
import CreateRowTable from "./CreateRowTable";

interface CreateRowTableParams {
  param: STTableProp;
  row: any;
  index: any;
  arrColumn: any;
  selectionModel: any;
  setSelectionModel: any;
}

export const useDynamicRows = (
  param,
  index,
  arrColumn,
  selectionModel,
  setSelectionModel
) => {
  const [tableData, setTableData] = useState<any>(param.rows.arrRows);
  const [open, setOpen] = useState(false);

  const toggleExpansion = (sID: string) => {
    const newData = [...tableData];
    const objData = findRowByID(tableData, sID);
    objData.expanded = !objData.expanded;
    setTableData(newData);
  };

  const findRowByID = (rows, sID: string) => {
    const row = rows.find((f) => f.sID === sID);
    if (row) {
      return row;
    }
    for (const row of rows) {
      if (row.child) {
        const foundRow = findRowByID(row.child, sID);
        if (foundRow) {
          return foundRow;
        }
      }
    }
    return undefined;
  };

  const renderRows = (rows) => {
    return rows.map((row) => (
      <Fragment key={param.sTableID + "_" + row.sID}>
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
            toggleExpansion,
          })}
        </TableRow>
        {row.expanded && row.child && renderRows(row.child)}
      </Fragment>
    ));
  };

  return { renderRows, toggleExpansion, setOpen, findRowByID };
};

const DynamicRows: React.FC<any> = (props: CreateRowTableParams) => {
  const { param, row, index, arrColumn, selectionModel, setSelectionModel } =
    props;
  const open = false;
  const { renderRows, toggleExpansion, setOpen } = useDynamicRows(
    param,
    index,
    arrColumn,
    selectionModel,
    setSelectionModel
  );

  return (
    <>
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
          toggleExpansion,
        })}
      </TableRow>
      {row.child && row.expanded && renderRows(row.child)}
    </>
  );
};

export default DynamicRows;
