"use client";

import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import STTable, { initRows } from "@/components/STTable/STTable";
import { Extension } from "@/lib";
import { FnAxios, FnDialog } from "@/lib/useAxios";
import { BtnAdd, BtnEdit, BtnSubmit, BtnThemplate } from "@/components/mui-elements/Button/ButtonAll";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogProps, DialogTitle, FormControl, Grid } from "@mui/material";
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import Link from 'next/link';

import { HiUserGroup } from "react-icons/hi";

//// import Dialog from "../_component/dialog";
import UploadFileItem from "@/components/input-element/UploadFile";

import DialogUnit from "../_component/dialogUnit";

export const useUserPermissionManagement = () => {
  const frontURL = process.env.NEXT_PUBLIC_APP_URL;

  const DialogFn = FnDialog();
  const AxiosFn = FnAxios();
  const [isLoadding, setIsLoadding] = useState(false);
  const [isLoaddingExcel, setIsLoaddingExcel] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(false);

  const [isPass, setIsPass] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [arrAttachment, setArrAttachment] = useState([]);
  const handleClearAttachment = useRef(null);


  const [UserID, setUserID] = useState(0);
  const [openModalUnit, setOpenModalUnit] = useState(false);



  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const [dataRow, setDataRow] = useState({
    ...initRows,
  });

  const [dataRowExcel, setDataRowExcel] = useState({
    ...initRows,
  });

  const [dataRowNew, setDataRowNew] = useState({
    ...initRows,
  });


  useEffect(() => {
    if (arrAttachment.length > 0) {
      onLoadImportData(dataRowExcel);
    }
    else {
      setDataRowExcel({
        ...dataRowNew,
      })
    }
  }, [arrAttachment]);


  useEffect(() => {
    onGetData(dataRow);
  }, []);

  const onGetData = (p: STTableRow) => {
    let objParam = p || dataRow;
    const param = {
      ...objParam,
    }
    ////console.log(objParam);
    setIsLoadding(true);
    AxiosFn.Post("User/GetDataTable", param, (res) => {
      console.log("GetDataTable", res);

      setDataRow({
        ...objParam,
        arrRows: [...res.lstData],
        nDataLength: res.ObjTable.nDataLength,
        nPageIndex: res.ObjTable.nPageIndex,
      })

      ///setIsSkeleton(false);
      setIsLoadding(false);
    })
  }


  // // const onAdd = () => {
  // //   const html = <Link
  // //     href={{
  // //       pathname: "/admin/permission/userPermission",
  // //       query: { sID: "0" }
  // //     }}>
  // //   </Link>
  // //   return (html)
  // // }

  // // const onEdit = (ID) => {
  // //   const html = <Link
  // //     href={{
  // //       pathname: "/admin/permission/userPermission",
  // //       query: { sID: ID }
  // //     }}>
  // //   </Link>
  // //   return (html)
  // // }


  const onDelete = (item) => {
    if (item && item.length > 0) {
      DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("User/Delete", item, (res) => {
          DialogFn.UnBlockUI();
          DialogFn.Success("ลบสำเร็จ");

          onGetData(dataRow);
        });
      });
    }
  }

  const onLoadImportData = (p: STTableRow) => {
    DialogFn.BlockUI();
    setIsLoaddingExcel(true);
    let objParam = p || dataRowExcel;
    const param = {
      ...objParam,
      sFilePath: arrAttachment[0].sPath,
      sSysFileName: arrAttachment[0].sSysFileName,
    };
    ////console.log(" ImportData param", param);
    AxiosFn.Post("User/ImportDataUser", param, (res) => {
      console.log("ImportDataUser", res);
      setIsPass(res.isPass);
      setDataRowExcel({
        ...objParam,
        arrRows: [...res.lstData],
        nDataLength: res.ObjTable.nDataLength,
        nPageIndex: res.ObjTable.nPageIndex,
      });

      DialogFn.UnBlockUI();
      setIsLoaddingExcel(false);
    })
  }

  const handleCloseModal = () => {
    setDataRowExcel({
      ...dataRowNew,
    })
    setArrAttachment([]);
    setOpenModal(false);
  };


  const onSaveExcel = () => {
    setIsLoaddingExcel(true);
    const param = {
      lstData: dataRowExcel.arrRows,
    };
    console.log("onSaveExcel param", param);

    DialogFn.Submit("คุณต้องการบันทึกข้อมูล ใช่หรือไม่", () => {
      DialogFn.BlockUI();
      AxiosFn.Post("User/SaveExcel", param, (res) => {
        ////console.log("onSaveExcel param", res);
        setIsLoaddingExcel(false);
        DialogFn.UnBlockUI();
        DialogFn.Success("บันทึกข้อมูลเรียบร้อยแล้ว");

        onClearSaveExcel();
      });
    });

  }

  const onClearSaveExcel = () => {
    setArrAttachment([]);
    setOpenModal(false);
    onGetData(dataRow);
  }


  const onDownload = () => {
    const link = frontURL + "assets/Template/Template.xlsx";
    ///console.log("link ", link)
    window.open(link);
    ///onDownloadFile(pathfile + "/" + fileName, fileName)
  }


  const handleCloseModalUnit = () => {
    setOpenModalUnit(false);
  };


  const ActionColumn = {
    renderHeader: () => {
      let html = <Link href={{
        pathname: "/admin/permission/userPermissionForm",
        query: { sID: "" }
      }}>
        <BtnAdd id="add" txt="" IsRadius={true} />
      </Link>
      return (html);
    },
    field: "sID",
    headerName: "",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "7%",
    getAction: (item, index) => {
      let html = <Link href={{
        pathname: "/admin/permission/userPermissionForm",
        query: { sID: item.sIDEnc }
      }}>
        <BtnEdit id="edit" txt="" IsRadius={true} />
      </Link>
      return (html);
    },
  } as STTableColumnDetail;

  // const YearColumn = {
  //   field: "nYear",
  //   headerName: "Year",
  //   bodyAlign: "center",
  //   sortable: false,
  //   isSort: false,
  //   collapse: false,
  //   width: "7%",
  //   isHiddenCol: true,
  // } as STTableColumnDetail;

  const NameColumn = {
    field: "sFullName",
    headerName: "Name",
    bodyAlign: "left",
    sortable: false,
    isSort: true,
    collapse: false,
    width: "35%",
  } as STTableColumnDetail;

  const UnitColum = {
    field: "sUnitAbbr",
    headerName: "Unit Name",
    bodyAlign: "center",
    sortable: false,
    isSort: true,
    collapse: false,
    width: "10%",
  } as STTableColumnDetail;

  const GroupColumn = {
    field: "sGroupName",
    headerName: "Group",
    bodyAlign: "center",
    sortable: false,
    isSort: true,
    collapse: false,
    width: "15%",
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
      const html = (item.lstUnit == null || item.lstUnit.length == 0) ?
        <></>
        :
        <Box sx={{ display: "flex", justifyContent: "center", gap: "7px", cursor: "pointer" }}
          onClick={() => {
            setUserID(item.nUserID);
            setOpenModalUnit(true);
          }}>
          <HiUserGroup style={{ fontSize: "20px" }} />
          <Box sx={{ fontSize: "15px" }}>{item.lstUnit.length}</Box>
        </Box>
      return (html)
    }
  } as STTableColumnDetail;

  const EmailColumn = {
    field: "sEmail",
    headerName: "E-Mail",
    bodyAlign: "center",
    sortable: false,
    isSort: true,
    collapse: false,
    width: "25%",
  } as STTableColumnDetail;


  const dataColumn = [
    ActionColumn,
    ///YearColumn,
    NameColumn,
    UnitColum,
    GroupColumn,
    DeptColumn,
    EmailColumn
  ] as STTableColumnDetail[];


  return {
    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    // onAdd,
    // onEdit,
    onDelete,
    dataColumn,


    openModal,
    setOpenModal,
    handleCloseModal,


    UserID,
    openModalUnit,
    handleCloseModalUnit,


    isPass,
    onLoadImportData,
    arrAttachment,
    setArrAttachment,
    handleClearAttachment,

    onDownload,
    dataRowExcel,
    isLoaddingExcel,
    onSaveExcel,
  }
}



const UserPermission = () => {
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('lg');

  const {
    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onDelete,
    dataColumn,

    openModal,
    setOpenModal,
    handleCloseModal,

    UserID,
    openModalUnit,
    handleCloseModalUnit,

    isPass,
    onLoadImportData,
    arrAttachment,
    setArrAttachment,
    handleClearAttachment,

    onDownload,
    dataRowExcel,
    isLoaddingExcel,
    onSaveExcel,
  } = useUserPermissionManagement();




  //////////////////////////////////////////////// Dialog

  const DialogNoColumn = {
    field: "nNo",
    headerName: isPass ? "No" : "รายการที่",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
  } as STTableColumnDetail;

  const DialogUserName = {
    field: "sEmpCode",
    headerName: "UserName",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
    isHiddenCol: !isPass,
  } as STTableColumnDetail;

  const DialogGruop = {
    field: "sGroupName",
    headerName: "Gruop",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    isHiddenCol: !isPass,
    width: "10%",
  } as STTableColumnDetail;

  const DialogDepartment = {
    field: "lstUnit",
    headerName: "Department",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
    isHiddenCol: !isPass,
    getAction: (item) => {
      ////console.log("DialogDepartment", item);
      const html = (item.lstUnit == null || item.lstUnit.length == 0) ?
        <></>
        :
        <Box sx={{ display: "flex", justifyContent: "center", gap: "7px" }}
          onClick={() => { }}>
          <HiUserGroup style={{ fontSize: "20px" }} />
          <Box sx={{ fontWeight: "500" }}>{item.lstUnit.length}</Box>
        </Box>
      return (html)
    }
  } as STTableColumnDetail;

  const DialogComment = {
    field: "Comment",
    headerName: "Comment",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
    isHiddenCol: !isPass,
  } as STTableColumnDetail;

  const DialogDetail = {
    field: "sDetail",
    headerName: "Detail",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "90%",
    isHiddenCol: isPass,
  } as STTableColumnDetail;

  const DialogDataColumn = [
    DialogNoColumn,
    DialogUserName,
    DialogGruop,
    DialogDepartment,
    DialogComment,
    DialogDetail
  ] as STTableColumnDetail[];




  return (
    <>
      <FormProvider {...form}>

        <Button variant="outlined" sx={{ marginBottom: "1rem" }} onClick={() => { setOpenModal(true); }}>
          Import Data
        </Button>

        <STTable
          width={"100%"}
          column={dataColumn}
          rows={dataRow}
          isLoading={isLoadding}
          onLoadData={onGetData}
          isMenu={true}
          isPage={true}
          // filterField={filter}
          isShowCheckBox={true}
          onDelete={(e) => onDelete(e)}
          // classHead={GetTableHeadClass(system)}
          form={form}
        />

        <Grid container sx={{ textAlign: "center" }}>
          <Grid item xs={12}>
          </Grid>
        </Grid>


        {/* <Dialog
        open={openModal}
        handleClose={handleClose}

        ImportData={ImportData}
        arrAttachment={arrAttachment}
        setArrAttachment={setArrAttachment}
        dataRowExcel={dataRowExcel}
        setDataRowExcel={setDataRowExcel}
      /> */}


        {/* ===========================================================Dialog================================================== */}


        <Dialog
          fullWidth={true}
          maxWidth={maxWidth}
          open={openModal}
          onClose={handleCloseModal}
        >
          <DialogTitle sx={{ backgroundColor: "#0d66d9", color: "#fff" }}>Import Data</DialogTitle>
          <DialogContent>

            <DialogContentText sx={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
              <Box>Upload Data</Box>

              <BtnThemplate id="btnImport" onClick={() => onDownload()} />
            </DialogContentText>

            <DialogContentText>
              <UploadFileItem
                id="arrUploadFile"
                name={"arrUploadFile"}
                required={false}
                arrFile={arrAttachment}
                setarrFile={setArrAttachment}
                IsFolder={false}
                IsMultiple={false}
                Extension={[...Extension.Excel]}
                nLimitFile={50}
                sLimitFile={"MB"}
                onClearFile={handleClearAttachment}
                sPositionText="right"
                modeDisplay="list"
                disabled={false}
              />
            </DialogContentText>


            <Box sx={{ marginTop: "1rem" }}>
              <STTable
                width={"100%"}
                column={DialogDataColumn}
                rows={dataRowExcel}
                isLoading={isLoaddingExcel}
                onLoadData={onLoadImportData}
                isMenu={true}
                isPage={true}
                // filterField={filter}
                isShowCheckBox={false}
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
            <Button onClick={(handleCloseModal)}>Close</Button>

            {isPass ?
              <BtnSubmit
                id={"save"}
                txt={"Save"}
                onClick={(e) => onSaveExcel()}
              />
              :
              <></>
            }

          </DialogActions>
        </Dialog>


      </FormProvider>


      <DialogUnit
        ID={UserID}
        openModalDialogUnit={openModalUnit}
        handleCloseModalDialogUnit={handleCloseModalUnit}
      />

    </>
  )
}

export default UserPermission;