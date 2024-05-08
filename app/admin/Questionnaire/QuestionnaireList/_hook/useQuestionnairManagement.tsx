"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import STTable, { initRows } from "@/components/STTable/STTable";
import { AxiosFn ,FnDialog } from "@/lib/useAxios";
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import Link from 'next/link';
import { BtnAdd, BtnEdit } from "@/components/mui-elements/Button/ButtonAll";
import { Box } from "@mui/material";
import { MdWindow } from "react-icons/md";
import ChangeOrder from "../../_component/ChangeOrder";

export const useQuestionnairManagement = () => {
  const DialogFn = FnDialog();
  const [isLoadding, setIsLoadding] = useState(false);
  const [isSkeleton, setIsSkeleton] = useState(false);

  const [openModalDialog, setOpenModalDialog] = useState(false);
  const [questionnaireID, setQuestionnaireID] = useState(0);
  const [orderMax, setOrderMax] = useState("0");

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
  }, [])


  const onGetData = (p: STTableRow) => {
    DialogFn.BlockUI();
    let objParam = p || dataRow;
    const param = {
      ...objParam,
    }
    setIsLoadding(true);
    AxiosFn.Post("QuestionnairManagement/GetDataTable", param, (res) => {
      ////console.log("QuestionnairManagement", res);
      setOrderMax(res.nMaxOrderPush + "");
      setDataRow({
        ...objParam,
        arrRows: [...res.lstData],
        nDataLength: res.ObjTable.nDataLength,
        nPageIndex: res.ObjTable.nPageIndex,
      });

      setIsLoadding(false);
      DialogFn.UnBlockUI();
    })
  }

  const onDelete = (item) => {
    if (item && item.length > 0) {
      DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("QuestionnairManagement/Delete", item, (res) => {
          DialogFn.UnBlockUI();
          DialogFn.Success("ลบสำเร็จ");
          onGetData(dataRow);
        });
      });
    }
  }

  const onChangeOrder = (sID, nOrder) => {
    ////setChangeOrder(sID);
    const param = {
      nID: sID,
      nOrder: nOrder
    }
    setIsLoadding(true);

    DialogFn.Submit("คุณต้องการแก้ไขลำดับ ใช่หรือไม่", () => {
      DialogFn.BlockUI();
      AxiosFn.Post("QuestionnairManagement/ChangeOrder", param, (res) => {
        ///console.log("QuestionnairManagement/ChangeOrder", res);
        DialogFn.UnBlockUI();
        DialogFn.Success("แก้ไขสำเร็จ");

        onGetData(dataRow);
        setIsLoadding(false);
      });
    });
  }

  const handleCloseModalDialog = () => {
    setOpenModalDialog(false);
  };

  const fncAdd = () => {
    const html = <Link href={{
      pathname: "/admin/Questionnaire/QuestionnaireForm",
      query: {
        id: "0",
        order: orderMax
      }
    }}>
      <BtnAdd id="add" txt="" IsRadius={true} />
    </Link>
    return (html);
  }

  const fncEdit = (item) => {
    const html = <Link href={{
      pathname: "/admin/Questionnaire/QuestionnaireForm",
      query: {
        id: item.sID,
        order: "0"
      }
    }}>
      <BtnEdit id="edit" txt="" IsRadius={true} />
    </Link>
    return (html);
  }



  const ActionColumn = {
    renderHeader: () => {
      return (fncAdd());
    },
    field: "sID",
    headerName: "",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "9%",
    getAction: (item, index) => {
      return (fncEdit(item));
    },
  } as STTableColumnDetail;

  const nOrderColumn = {
    field: "nOrder",
    headerName: "Order",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "13%",
    getAction: (item) => {
      return (<ChangeOrder item={item} onChangeOrder={onChangeOrder} />)
    },
  } as STTableColumnDetail;

  const QuestionnaireColumn = {
    field: "sQuestionnaire",
    headerName: "หัวข้อคำถาม",
    bodyAlign: "left",
    sortable: false,
    isSort: true,
    collapse: false,
    width: "50%",
  } as STTableColumnDetail;

  const QuestioCountColumn = {
    field: "nQuestioCount",
    headerName: "คำถามที่ใช้",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
    getAction: (item) => {
      const html = <Box sx={{ display: "flex", justifyContent: "center", cursor: "pointer" }}
        onClick={() => {
          setQuestionnaireID(item.sID);
          setOpenModalDialog(true);
        }}>
        <Box sx={{ fontSize: "15px" }}>{item.nQuestioCount}</Box>
        <MdWindow style={{ fontSize: "20px" }} />
      </Box>
      return (html)
    },
  } as STTableColumnDetail;

  const StatusColumn = {
    field: "isActive",
    headerName: "Status",
    bodyAlign: "center",
    sortable: false,
    isSort: true,
    collapse: false,
    width: "15%",
    getAction: (item) => {
      const string = item.isActive ? "Active" : "InActive";
      return (<Box>{string}</Box>)
    },
  } as STTableColumnDetail;

  const dataColumn = [
    ActionColumn,
    nOrderColumn,
    QuestionnaireColumn,
    QuestioCountColumn,
    StatusColumn,
  ] as STTableColumnDetail[];



  return {
    fncAdd,
    fncEdit,

    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onDelete,
    onChangeOrder,

    questionnaireID,
    openModalDialog,
    handleCloseModalDialog,

    dataColumn,
  }
}