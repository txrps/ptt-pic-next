"use client";

import React, { useEffect, useState } from "react";
import { TextBoxItem } from "@/components";
import  { initRows } from "@/components/STTable/STTable";
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import { FnAxios, FnDialog } from "@/lib/useAxios";
import { useForm } from "react-hook-form";

export const usePanelHeaderDataManagement = () => {
  const DialogFn = FnDialog();
  const AxiosFn = FnAxios();
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
    ////setIsSkeleton(true);
    setIsLoadding(true);
    AxiosFn.Get("PanelHeader/GetDataTable", {}, (res) => {
      ////console.log("GetDataTable", res);
      setDataRow({
        ...objParam,
        arrRows: [...res.lstData],
        nDataLength: res.lstData.lenght,
        nPageIndex: 1,
      })
      if (res.lstData && res.lstData.length > 0) {
        for (const item of res.lstData) {
          form.setValue("sPanelHeaderName" + item.sID, item.sPanelHeaderName);
        }
      }
      ////setIsSkeleton(false);
      setIsLoadding(false);
    })
  }

  const onSave = () => {
    setIsLoadding(true);
    if (dataRow && dataRow.arrRows.length > 0) {
      const lstParam = [];
      for (const item of dataRow.arrRows) {
        let obj = {
          sID: item.sID,
          sPanelHeaderName: form.getValues("sPanelHeaderName" + item.sID),
        }
        lstParam.push(obj);
      }
      const param = {
        lstData: lstParam,
      }
      ////console.log("PanelHeader Save", param);
      DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("PanelHeader/Save", param, (res) => {
          DialogFn.UnBlockUI();
          DialogFn.Success("บันทึกสำเร็จ");
          setIsLoadding(false);
          onGetData(dataRow);
        });
      });

    }
  }

  const fncPanelHeader = (item) => {
    return (<TextBoxItem
      maxLength={100}
      label=""
      id={"sPanelHeaderName" + item.sID}
      name={"sPanelHeaderName" + item.sID}
      IsSkeleton={isSkeleton}
      required={true}
      disabled={false}
      IsCharacterCount
      disableMode={"text"}
    />)
  }



  const NoColumn = {
    field: "sID",
    headerName: "No",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
  } as STTableColumnDetail;

  const ProcessColumn = {
    field: "sProcessName",
    headerName: "Process",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
  } as STTableColumnDetail;

  const DefintionColumn = {
    field: "sDefinitionName",
    headerName: "Definition",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "35%",
  } as STTableColumnDetail;

  const PanelHeaderColumn = {
    field: "sPanelHeaderName",
    headerName: "Panel Header",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
    getAction: (item, index) => {
      return (fncPanelHeader(item));
    }
  } as STTableColumnDetail;


  const dataColumn = [
    NoColumn,
    ProcessColumn,
    DefintionColumn,
    PanelHeaderColumn,
  ] as STTableColumnDetail[];


  return {
    fncPanelHeader,


    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onSave,
    dataColumn,
  }
}