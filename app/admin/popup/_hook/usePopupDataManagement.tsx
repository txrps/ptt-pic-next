"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosFn, FnDialog } from '@/lib/useAxios';
import moment from "moment";

export const usePopupDataManagement = () => {
  const DialogFn = FnDialog();

  const [arrAttachmentList, setArrAttachmentList] = useState([]);
  const [isSkeleton, setIsSkeleton] = useState(false);

  const [isDate, setIsDate] = useState(false);
  const [isRequitDate, setIsRequitDate] = useState(true);


  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });


  useEffect(() => {
    onGetData();
  }, []);


  const onGetData = () => {
    const param = {
    }
    AxiosFn.Get("PopUpEvent/GetDetail", param, (res) => {
      console.log("GetDetail", res);
      for (const item of res.lstData) {

        if (item.isForever) {
          form.setValue("checkBoxActive", ['1']);
          setIsDate(true);
          setIsRequitDate(false);
        }
        form.setValue("isStatus", item.isActive);

        setArrAttachmentList(item.lstFile);
      }
    });
  }

  const onSave = () => {
    if (arrAttachmentList.length > 0) {
      const isForever = form.getValues("checkBoxActive").length >= 1;
      let param = {
        Id: 1,
        ///dateStart: form.getValues("dStartDate") || null,
        ///dateEnd: form.getValues("dEndDate") || null,
        isForever: isForever,
        isActive: form.getValues("isStatus"),
        lstFile: arrAttachmentList,

        nStartDate: moment(form.getValues("dStartDate")).valueOf() || null,
        nEndDate: moment(form.getValues("dEndDate")).valueOf() || null,
      }
      ////console.log("param beforeSave", param);

      DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("PopUpEvent/onSave", param, (res) => {
          DialogFn.UnBlockUI();
          DialogFn.Success("บันทึกสำเร็จ");

          window.location.reload();
          ////window.location.href = frontURL + "admin/popup";
          ///onGetData();
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
    arrAttachmentList,
    setArrAttachmentList,
    isSkeleton,
    setIsSkeleton,

    setIsDate,
    isDate,
    isRequitDate,
    setIsRequitDate,
  }
}
