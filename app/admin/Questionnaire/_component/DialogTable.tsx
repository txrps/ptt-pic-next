"use client";

import React, { useEffect, useRef, useState } from "react";

import STTable, { initRows } from '@/components/STTable/STTable'
import { Box, Button, DialogActions, FormControl } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'


import { useForm } from 'react-hook-form'
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import { FnAxios, FnDialog } from "@/lib/useAxios";
import { CheckCircle } from "@mui/icons-material";

const DialogTable = (prop) => {
  const { nID, openModalDialog, handleCloseModalDialog } = prop;

  const DialogFn = FnDialog();
  const AxiosFn = FnAxios();
  const [isLoadding, setIsLoadding] = useState(false);


  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const [dataRowDialog, setDataRowDialog] = useState({
    ...initRows,
  });


  useEffect(() => {
    onLoadData(dataRowDialog);
  }, [nID])


  const onLoadData = (p: STTableRow) => {
    DialogFn.BlockUI();
    setIsLoadding(true);

    let objParam = p || dataRowDialog;
    const param = {
      ...objParam,
      nID: nID,
    }
    AxiosFn.Post("QuestionnairManagement/GetTableQuestionCategory", param, (res) => {
      ////console.log("GetTableQuestionCategory", res);
      setDataRowDialog({
        ...objParam,
        arrRows: [...res.lstCategoryData],
        nDataLength: res.ObjTable.nDataLength,
        nPageIndex: res.ObjTable.nPageIndex,
      });

      setIsLoadding(false);
      DialogFn.UnBlockUI();
    });
  }



  const NoColumn = {
    field: "nNo",
    headerName: "No",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "5%",
  } as STTableColumnDetail;

  const TopicColumn = {
    field: "sQuestionnaire",
    headerName: "หัวข้อคำถาม",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "25%",
  } as STTableColumnDetail;

  const QuestionColumn = {
    field: "sQuestionCategory",
    headerName: "หัวข้อประเมิน",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "35%",
  } as STTableColumnDetail;

  const ChoiceTypeColumn = {
    field: "sQuestionChoiceType",
    headerName: "Type",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
  } as STTableColumnDetail;

  const RequireColumn = {
    field: "isRequire",
    headerName: "Require",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "6%",
    getAction: (item) => {
      let html = <></>
      if (item.isRequire) {
        html = <CheckCircle style={{ color: "#008c76" }} />
      }
      return (html)
    },
  } as STTableColumnDetail;

  const WeigthScoreColumn = {
    field: "nWeigthScore",
    headerName: "Weigth",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "7%",
  } as STTableColumnDetail;

  const MinScoreColumn = {
    field: "nMinScore",
    headerName: "Min",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "6%",
  } as STTableColumnDetail;

  const MaxScoreColumn = {
    field: "nMaxScore",
    headerName: "Max",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "6%",
  } as STTableColumnDetail;


  const DialogDataColumn = [
    NoColumn,
    TopicColumn,
    QuestionColumn,
    ChoiceTypeColumn,
    RequireColumn,
    WeigthScoreColumn,
    MinScoreColumn,
    MaxScoreColumn,
  ] as STTableColumnDetail[];



  return (
    <Dialog
      fullWidth={true}
      maxWidth={"lg"}
      open={openModalDialog}
      onClose={handleCloseModalDialog}
    >
      <DialogTitle sx={{ backgroundColor: "#0d66d9", color: "#fff" }}>Data Table</DialogTitle>
      <DialogContent>

        <Box sx={{ marginTop: "1rem" }}>
          <STTable
            width={"100%"}
            column={DialogDataColumn}
            rows={dataRowDialog}
            isLoading={isLoadding}
            onLoadData={onLoadData}
            isMenu={true}
            isPage={true}
            isShowCheckBox={false}
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
        <Button onClick={handleCloseModalDialog}>Close</Button>
      </DialogActions>
    </Dialog>

  )
}

export default DialogTable