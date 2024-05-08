"use client";

import React, { useEffect, useRef, useState } from "react";
import STTable, { initRows } from '@/components/STTable/STTable'
import { Box, Button, DialogActions, FormControl } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

import { FormProvider, useForm } from 'react-hook-form'
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import { FnAxios, FnDialog } from "@/lib/useAxios";

function dialogUnit(prop) {
  const { ID, openModalDialogUnit, handleCloseModalDialogUnit } = prop;
  const DialogFn = FnDialog();
  const AxiosFn = FnAxios();
  const [isLoadding, setIsLoadding] = useState(false);

  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const [dataRowUnit, setDataRowUnit] = useState({
    ...initRows,
  });

  useEffect(() => {
    onLoadData(dataRowUnit);
  }, [ID])

  const onLoadData = (p: STTableRow) => {
    DialogFn.BlockUI();
    setIsLoadding(true);
    let objParam = p || dataRowUnit;
    const param = {
      ...objParam,
      ID: ID,
    }
    AxiosFn.Post("User/GetUnitByID", param, (res) => {
      ////console.log("GetUnitByID", res);
      setDataRowUnit({
        ...objParam,
        arrRows: [...res.lstData],
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
    width: "10%",
  } as STTableColumnDetail;

  const UnitCodeColumn = {
    field: "sUnitCode",
    headerName: "UnitCode",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "20%",
  } as STTableColumnDetail;

  const UnitFullNameColumn = {
    field: "sUnitFullName",
    headerName: "Unit Name",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "45%",
  } as STTableColumnDetail;

  const dialogColumn = [NoColumn, UnitCodeColumn, UnitFullNameColumn] as STTableColumnDetail[];


  return (
    <FormProvider {...form}>
      <Dialog fullWidth={true} maxWidth={"md"} open={openModalDialogUnit} onClose={handleCloseModalDialogUnit}>
        <DialogTitle sx={{ backgroundColor: "#0d66d9", color: "#fff" }}>Data Table</DialogTitle>
        <DialogContent>

          <Box sx={{ marginTop: "1rem" }}>
            <STTable
              width={"100%"}
              column={dialogColumn}
              rows={dataRowUnit}
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
          <Button onClick={handleCloseModalDialogUnit}>Close</Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  )
}

export default dialogUnit