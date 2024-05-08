"use client";

import { TextBoxItem } from "@/components";
import STTable, { initRows } from "@/components/STTable/STTable";
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import SwitchFormItem from "@/components/input-element/Switch";
import { BtnSave } from "@/components/mui-elements/Button/ButtonAll";
import { AxiosFn, FnDialog } from "@/lib/useAxios";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export const useResultTypeDataManagement = () => {
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
    DialogFn.BlockUI();

    let objParam = p || dataRow;
    setIsLoadding(true);
    AxiosFn.Get("ResultType/GetDataTable", {}, (res) => {
      ////console.log("GetDataTable", res);
      setDataRow({
        ...objParam,
        arrRows: [...res.lstData],
        nDataLength: res.lstData.lenght,
        nPageIndex: 1,
      })

      if (res.lstData && res.lstData.length > 0) {
        for (const item of res.lstData) {
          form.setValue("sResultTypeName" + item.sID, item.sResultTypeName);
          form.setValue("status" + item.sID, item.isActive);
        }
      }

      setIsLoadding(false);
      DialogFn.UnBlockUI();
    })
  }

  const onSave = () => {
    setIsLoadding(true);
    if (dataRow && dataRow.arrRows.length > 0) {
      const lstParam = [];
      for (const item of dataRow.arrRows) {
        let obj = {
          sID: item.sID,
          sResultTypeName: form.getValues("sResultTypeName" + item.sID),
          isActive: form.getValues("status" + item.sID),
        }
        lstParam.push(obj);
      }
      const param = {
        lstData: lstParam,
      }

      DialogFn.Submit("คุณต้องการบันทึกข้อมูล ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("ResultType/Save", param, (res) => {
          DialogFn.UnBlockUI();
          DialogFn.Success("บันทึกข้อมูลเรียบร้อยแล้ว");

          setIsLoadding(false);
          onGetData(dataRow);
        });
      });
    }
  }


  const fncResultName = (item) => {
    let html = <TextBoxItem
      maxLength={100}
      label=""
      id={"sResultTypeName" + item.sID}
      name={"sResultTypeName" + item.sID}
      IsSkeleton={false}
      required={false}
      disabled={false}
      IsCharacterCount
      disableMode={"text"}
    />
    return (html)
  }

  const fncResultStatus = (item) => {
    let html = <SwitchFormItem
      id={"status" + item.sID}
      name={"status" + item.sID}
      label={""}
      disabled={false}
      required={true}
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

  const CategoryTypeColumn = {
    field: "sCategoryTypeName",
    headerName: "Category Type",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
  } as STTableColumnDetail;

  const ImpactColumn = {
    field: "sImpactName",
    headerName: "Impact",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
  } as STTableColumnDetail;

  const ResultTypeColumn = {
    field: "sResultTypeName",
    headerName: "Result Type",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
    getAction: (item, index) => {
      return (fncResultName(item))
    }
  } as STTableColumnDetail;

  const StatusColumn = {
    field: "isActive",
    headerName: "Status",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "15%",
    getAction: (item, index) => {
      return (fncResultStatus(item))
    },
  } as STTableColumnDetail;

  const dataColumn = [
    NoColumn,
    CategoryTypeColumn,
    ImpactColumn,
    ResultTypeColumn,
    StatusColumn
  ] as STTableColumnDetail[];

  return {
    fncResultName,
    fncResultStatus,


    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onSave,
    dataColumn,
  }
}