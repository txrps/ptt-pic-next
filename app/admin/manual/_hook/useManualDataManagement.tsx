"use client";

import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FaDownload } from "react-icons/fa";
import { CiYoutube } from "react-icons/ci";
import { AxiosFn } from '@/lib/useAxios';
import STTable, { initRows } from '@/components/STTable/STTable';
import { STTableColumnDetail, STTableRow } from '@/components/STTable/STTableProps';
import Button from "@mui/material/Button";


export const useManualDataManagement = () => {
  const frontURL = process.env.NEXT_PUBLIC_APP_URL;

  const [isLoadding, setIsLoadding] = useState(false)
  const [isSkeleton, setIsSkeleton] = useState(false);


  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const [dataRow, setDataRow] = useState({
    ...initRows,
  });


  useEffect(() => {
    onGetData(dataRow);
  }, []);


  const onGetData = (p: STTableRow) => {
    let objParam = p || dataRow;
    const param = {
      ...objParam,
    }
    ////console.log("param", param);
    setIsLoadding(true);
    AxiosFn.Post("Manual/GetDataMannualTable", param, (res) => {
      ///console.log("GetDataMannualTable", res);
      setDataRow({
        ...objParam,
        arrRows: res.lstData,
        nDataLength: res.ObjTable?.nDataLength,
        nPageIndex: res.ObjTable?.nPageIndex,
      })
      setIsLoadding(false);
    })
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

  const TitleColumn = {
    field: "sTitle",
    headerName: "รายการ",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
  } as STTableColumnDetail;

  const UrlColumn = {
    field: "sUrl",
    headerName: "VDO",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
    getAction: (item) => {
      let html = item.isDownload ?
        <Button variant="outlined" startIcon={<FaDownload style={{ fontSize: "20px" }} />}
          sx={{ fontSize: "13px" }}
          onClick={() => {
            const link = frontURL + item.sUrl;
            window.open(link);
          }}>
          Download
        </Button>
        :
        <Button variant="outlined" startIcon={<CiYoutube style={{ fontSize: "25px" }} />}
          onClick={() => {
            const link = "http://" + item.sUrl;
            window.open(link);
          }}>
          ดูวีดีโอ
        </Button>
      return (html)
    }
  } as STTableColumnDetail;

  ///อันนี้เอาไว้รวมหัวทั้งหมด
  const dataColumn = [
    NoColumn,
    TitleColumn,
    UrlColumn
  ] as STTableColumnDetail[];


  return {
    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    dataColumn
  }
}