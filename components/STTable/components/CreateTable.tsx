import { TableContainer, Table } from '@mui/material';
import CreateTableHeader from './CreateTableHeader'
import CreateTableBody from './CreateTableBody';
import CreateNoRow from './CustomNoRowsOverlay';
import CustomPagination from './CustomPagination';
import { STTableColumnDetail } from '../STTableProps';

import { Fragment, useMemo, useState } from "react";
export default function CreateTable(props) {
  const [selectionModel, setSelectionModel] = useState([]);
  const [selectHead, setSelectHead] = useState(false);
  const arrRow = props.rows ? props.rows.arrRows : [];
  const elCheckBox = {
    field: "elCheckbox_" + props.sTableID,
    headerName: "",
    bodyAlign: "center",
    sortable: true,
    collapse: false,
    isCheckBox: true,
    isSort: false,
    width: "40px"
  } as STTableColumnDetail;
  let arrColumn = [];
  if (props.isShowCheckBox && props.column) {
    arrColumn.push(elCheckBox);
  }
  arrColumn = arrColumn.concat(props.column);

  useMemo(() => {
    // if (!selectHead) {
    //   setSelectionModel([]);
    // }
    // else {
    //   const arrTemp = [];
    //   arrRow.map((row) => {
    //     if (!row.isDisable) {
    //       arrTemp.push(row.sID);
    //     }
    //   });
    // }
    const _arrRow = arrRow.filter((f) => !f.isDisable).map((m) => m.sID);
    if (!selectHead && _arrRow.length === selectionModel.length) {
      setSelectionModel([]);
    }
    else if (selectHead) {
      setSelectionModel(_arrRow);
    }
  }, [selectHead]);

  useMemo(() => {
    let _arrRow = arrRow.filter((f) => !f.isDisable);
    if (selectHead && _arrRow.length !== selectionModel.length) {
      setSelectHead(false);
    } else if (!selectHead && _arrRow.length === selectionModel.length && selectionModel.length > 0) {
      setSelectHead(true);
    }
  }, [selectionModel]);

  useMemo(() => {
    if (props.isLoading) setSelectionModel([]);
  }, [props.isLoading]);

  return <Fragment>
    <TableContainer sx={{ maxWidth: "100%", minWidth: "100%", paddingBottom: "1rem" }}>
      <Table size='small' style={props.width ? { width: props.width, minWidth: "100%" } : { width: "100%", minWidth: "100%" }}>
        {CreateTableHeader(props, arrColumn, selectHead, setSelectHead)}
        {CreateTableBody(props, arrColumn, selectionModel, setSelectionModel)}
      </Table>
    </TableContainer>
    {
      arrRow.length === 0 ? <CreateNoRow /> : null
    }
    {
     (arrRow.length > 0 || props.isPage === true || (props.isPage === false && props.isShowCheckBox === true)) ? <CustomPagination props={props} selectionModel={selectionModel} /> : null
    }
  </Fragment>

}