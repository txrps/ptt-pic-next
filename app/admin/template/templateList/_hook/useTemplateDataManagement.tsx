"use client";

import React, { useEffect, useState } from 'react';
import STTable, { initRows } from '@/components/STTable/STTable';
import { STTableColumnDetail, STTableRow } from '@/components/STTable/STTableProps';
import { useForm } from 'react-hook-form';
import { AxiosFn, FnDialog } from '@/lib/useAxios';
import Link from 'next/link';
import { BtnAdd, BtnDownload, BtnEdit } from '@/components/mui-elements/Button/ButtonAll';
import { Box } from '@mui/material';

export const useTemplateDataManagement = (isFrontend) => {
  const DialogFn = FnDialog();
  const [isLoadding, setIsLoadding] = useState(false);

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
    ///console.log("objParam", objParam);
    setIsLoadding(true);

    AxiosFn.Post("Template/GetTemplateTable", param, (res) => {
      console.log("GetTemplateTable", res);
      setDataRow({
        ...objParam,
        arrRows: [...res.lstData],
        nDataLength: res.ObjTable.nDataLength,
        nPageIndex: res.ObjTable.nPageIndex,
      })
      setIsLoadding(false);
    })
  }


  const onDelete = (item) => {
    if (item && item.length > 0) {
      DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("Template/Delete", item, (res) => {
          DialogFn.UnBlockUI();
          onGetData(dataRow);
          DialogFn.Success("ลบสำเร็จ");
        });
      });
    }
  }


  const onDownload = (item) => {
    const link = item[0].sFileLink;
    window.open(link);
    ///onDownloadFile(pathfile + "/" + fileName, fileName)
  }



  const ActionColumn = {
    renderHeader: () => {
      const html = <Link href={{
        pathname: "/admin/template/templateForm",
        query: { sID: "0" }
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
    width: "10%",
    isHiddenCol: isFrontend,
    getAction: (item, index) => {
      let html = <Link href={{
        pathname: "/admin/template/templateForm",
        query: { sID: item.sIDEnc }
      }}>
        <BtnEdit id="edit" txt="" IsRadius={true} />
      </Link>
      return (html);
    },
  } as STTableColumnDetail;

  const FileColumn = {
    field: "sID",
    headerName: "ไฟล์เอกสาร",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
    getAction: (item, index) => {
      const html = <BtnDownload key={item.nID}
        id="btnDownload"
        onClick={() => onDownload(item.lstFile)}
      />
      return (html);
    },
  } as STTableColumnDetail;

  const NoColumn = {
    field: "nNo",
    headerName: "No.",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
    isHiddenCol: !isFrontend,
  } as STTableColumnDetail;

  const TitleColumn = {
    field: "sTemplateTitle",
    headerName: "ชื่อเอกสาร",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "70%",
  } as STTableColumnDetail;

  const StatusColumn = {
    field: "isActive",
    headerName: "Status",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "15%",
    isHiddenCol: isFrontend,
    getAction: (item, index) => {
      const html = item.isActive ? "Active" : "InActive";
      return (html);
    },
  }

  ///อันนี้เอาไว้รวมหัวทั้งหมด
  const dataColumn = [
    ActionColumn,
    FileColumn,
    NoColumn,
    TitleColumn,
    StatusColumn,
  ] as STTableColumnDetail[];




  return {
    form,
    dataRow,
    isLoadding,
    onGetData,
    onDelete,
    dataColumn,
  }
}