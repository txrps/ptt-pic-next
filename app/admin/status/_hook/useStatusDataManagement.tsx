"use client";

import React, { useEffect, useState } from "react";
import { TextBoxItem } from "@/components";
import { initRows } from "@/components/STTable/STTable";
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import { AxiosFn, FnDialog } from "@/lib/useAxios";
import { useForm } from "react-hook-form";

export const useStatusDataManagement = () => {
  const DialogFn = FnDialog();
  const [isLoadding, setIsLoadding] = useState(false)
  const [isSkeleton, setIsSkeleton] = useState(false)

  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const [dataRow, setDataRow] = useState({
    ...initRows,
    nPageSize: 9999
  });

  useEffect(() => {
    onGetData(dataRow);
  }, []);

  const onGetData = (p: STTableRow) => {
    let objParam = p || dataRow;
    setIsLoadding(true);

    AxiosFn.Get("Status/GetDataTable", {}, (res) => {
      ///console.log("GetDataTable", res);
      setDataRow({
        ...objParam,
        arrRows: [...res.lstData],
        nDataLength: res.lstData.lenght,
        nPageIndex: 1,
      })

      if (res.lstData && res.lstData.length > 0) {
        for (const item of res.lstData) {
          form.setValue("sStatusShowName" + item.sID, item.sStatusShowName);
        }
      }

      setIsLoadding(false);
    })
  }

  const onSave = () => {
    setIsLoadding(true);

    ////console.log("dataRow", dataRow);
    if (dataRow && dataRow.arrRows.length > 0) {
      const lstParam = [];
      for (const item of dataRow.arrRows) {
        let obj = {
          sID: item.sID,
          sStatusShowName: form.getValues("sStatusShowName" + item.sID),
        }
        lstParam.push(obj);
      }
      const param = {
        lstData: lstParam,
      }
      ///console.log("param Save", param);

      DialogFn.Submit("คุณต้องการบันทึกข้อมูล ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("Status/Save", param, (res) => {
          DialogFn.UnBlockUI();
          DialogFn.Success("บันทึกข้อมูลเรียบร้อยแล้ว");

          setIsLoadding(false);
          onGetData(dataRow);
        });
      });
    }
  }


  const inputStatusShowName = (item) => {
    const html = <TextBoxItem
      maxLength={100}
      label=""
      id={"sStatusShowName" + item.sID}
      name={"sStatusShowName" + item.sID}
      IsSkeleton={isSkeleton}
      required={true}
      disabled={false}
      IsCharacterCount
      disableMode={"text"}
    />
    return (html)
  }




  const NoColumn = {
    field: "sID",
    headerName: "No.",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
  } as STTableColumnDetail;

  const StatusName = {
    field: "sStatusName",
    headerName: "Status",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "35%",
  } as STTableColumnDetail;

  const StatusShowName = {
    field: "sStatusShowName",
    headerName: "StatusName",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
    getAction: (item, index) => {
      return (inputStatusShowName(item));
    }
  } as STTableColumnDetail;

  const dataColumn = [
    NoColumn,
    StatusName,
    StatusShowName,
  ] as STTableColumnDetail[];



  return {
    inputStatusShowName,


    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onSave,
    dataColumn,
  }
}