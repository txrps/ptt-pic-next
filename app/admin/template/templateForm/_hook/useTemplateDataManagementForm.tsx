"use client";

import React, { useEffect, useRef, useState } from 'react';
import { AxiosFn, FnDialog } from '@/lib/useAxios';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { initRows } from "@/components/STTable/STTable";
import { STTableRow } from "@/components/STTable/STTableProps";

export const useTemplateDataManagementForm = () => {
  const searchParams = useSearchParams();
  const DialogFn = FnDialog();
  const [arrAttachment, setArrAttachment] = useState([]);
  const handleClearAttachment = useRef(null);

  const frontURL = process.env.NEXT_PUBLIC_APP_URL;
  const sID = searchParams.get("sID") || "0";

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
    if (sID != "0") {
      let objParam = p || dataRow;
      const param = {
        sIDDnc: sID,
        ...objParam,
      }
      DialogFn.BlockUI();
      AxiosFn.Post("Template/GetTemplateByID", param, (res) => {
        ///console.log("GetTemplateByID", res);
        for (const item of res.lstData) {
          form.setValue("status", item.isActive);
          setArrAttachment(item.lstFile);
        }
        DialogFn.UnBlockUI();
      });
    }
  }


  const onSave = () => {
    if (arrAttachment && arrAttachment.length > 0) {
      const param = {
        sIDDnc: sID,
        lstFile: arrAttachment,
        isActive: form.getValues("status"),
      }
      ///console.log("onSave ", param);
      DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("Template/Save", param, (res) => {
          DialogFn.UnBlockUI();
          ///DialogFn.Success("บันทึกสำเร็จ");
          window.location.href = frontURL + "admin/template/templateList";
        },
          (err) => {
            DialogFn.Warning(err.sMessage);
          });
      });

    }
  }

  return {
    form,
    onSave,

    setArrAttachment,
    arrAttachment,
    handleClearAttachment,
  }
}