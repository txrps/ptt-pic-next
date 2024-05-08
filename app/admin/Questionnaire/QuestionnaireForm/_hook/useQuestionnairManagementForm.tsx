"use client";

import React, { useEffect, useState } from "react";
import { FnAxios, FnDialog } from "@/lib/useAxios";
import { FormProvider, useForm } from "react-hook-form";
import { initRows } from "@/components/STTable/STTable";
import { useSearchParams, redirect } from "next/navigation";
import { STTableRow } from "@/components/STTable/STTableProps";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import { BtnBack, BtnSubmit } from "@/components/mui-elements/Button/ButtonAll";
import SwitchFormItem from "@/components/input-element/Switch";
import { TextBoxItem } from "@/components";


export const useQuestionnairManagementForm = () => {
  const searchParams = useSearchParams();
  const DialogFn = FnDialog();
  const AxiosFn = FnAxios();
  ///const [isLoadding, setIsLoadding] = useState(false);
  ///const [isSkeleton, setIsSkeleton] = useState(false);

  const id = searchParams.get("id");
  const order = searchParams.get("order");


  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });


  const [dataRow, setDataRow] = useState({
    ...initRows,
  });


  useEffect(() => {
    onGetdData(dataRow);
  }, []);


  const onGetdData = (p: STTableRow) => {
    if (id == "0") {
      form.setValue("Order", order + "");
    }
    else {
      let objParam = p || dataRow;
      const param = {
        id: id,
        ...objParam,
      }

      DialogFn.BlockUI();
      AxiosFn.Post("QuestionnairManagement/GetDataTable", param, (res) => {
        ///console.log("GetDataTable Form", res);
        if (res.lstData.length > 0) {
          for (const item of res.lstData) {
            form.setValue("Order", item.nOrder + "");
            form.setValue("Questionnaire", item.sQuestionnaire);
            form.setValue("isStatus", item.isActive);
          }
          DialogFn.UnBlockUI();
        }
      });
    }
  }


  const onSave = () => {
    const param = {
      nID: id,
      nOrder: form.getValues("Order") || "0",
      sQuestionnaire: form.getValues("Questionnaire") || "",
      isActive: form.getValues("isStatus"),
    }
    ////console.log("onSave", param)

    DialogFn.Submit("คุณต้องการบันทึกข้อมูล ใช่หรือไม่", () => {
      DialogFn.BlockUI();
      AxiosFn.Post("QuestionnairManagement/Save", param, (res) => {
        DialogFn.UnBlockUI();

        ////DialogFn.Success("บันทึกข้อมูลเรียบร้อยแล้ว");
        window.location.href = process.env.NEXT_PUBLIC_APP_URL + "admin/Questionnaire/QuestionnaireList";
      });
    });
  }

  return {
    onSave,
    form,
  }
}
