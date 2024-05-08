"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, FormControl } from '@mui/material'
import UploadFileItem from "@/components/input-element/UploadFile";
import { Extension } from "@/enum/enum";
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import STTable, { initRows } from "@/components/STTable/STTable";


const dialog = (prop) => {
  const { open,
    handleClose,
    form,
    dataRowExcel,
    setDataRowExcel,
    ImportData
  } = prop;


  //// const [arrAttachmentList, setArrAttachmentList] = useState([]);

  ////const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('lg');
  const handleClearAttachment = useRef(null);



  const [isLoadding, setIsLoadding] = useState(false);


  // const [dataRow, setDataRow] = useState({
  //   ...initRows,
  // });

  // useEffect(() => {
  //   onGetData(dataRow);
  // }, []);

  // const onGetData = (p: STTableRow) => {
  //   let objParam = p || dataRow;
  //   const param = {
  //     ...objParam,
  //   }

  //   setDataRow({
  //     ...objParam,
  //   })
  // }

  const onDelete = (item) => {

  }


  const NoColumn = {
    field: "sFullName",
    headerName: "No",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
  } as STTableColumnDetail;

  const UserName = {
    field: "UserName",
    headerName: "UserName",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
  } as STTableColumnDetail;

  const GroupColumn = {
    field: "sGroupName",
    headerName: "Group",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
  } as STTableColumnDetail;

  const DeptColumn = {
    field: "lstUnit",
    headerName: "Dept./Div.",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
    getAction: (item) => {
      let html = <></>
      return (html)
    }
  } as STTableColumnDetail;


  const CommentColumn = {
    field: "Comment",
    headerName: "Comment",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "25%",
  } as STTableColumnDetail;


  const dataColumn = [
    NoColumn,
    UserName,
    GroupColumn,
    DeptColumn,
    CommentColumn
  ] as STTableColumnDetail[];


  return (
    <Dialog
      fullWidth={true}
      maxWidth={maxWidth}
      open={open}
      onClose={handleClose}
    >
      <DialogTitle sx={{ backgroundColor: "#0d66d9", color: "#fff" }}>Import Data</DialogTitle>
      <DialogContent>

        <DialogContentText>
          Upload Data
        </DialogContentText>

        <DialogContentText>

        </DialogContentText>


        <Box sx={{ marginTop: "1rem" }}>
          <STTable
            width={"100%"}
            column={dataColumn}
            rows={ImportData}
            isLoading={isLoadding}
            onLoadData={dataRowExcel}
            isMenu={true}
            isPage={true}
            // filterField={filter}
            isShowCheckBox={true}
            onDelete={(e) => onDelete(e)}
            // classHead={GetTableHeadClass(system)}
            form={form}
          />
        </Box>

        <Box noValidate
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            m: 'auto',
            width: 'fit-content',
          }}>
          <FormControl sx={{ mt: 2, minWidth: 120 }}>
          </FormControl>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default dialog