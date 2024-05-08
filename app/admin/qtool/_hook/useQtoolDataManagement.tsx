"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import STTable, { initRows } from "@/components/STTable/STTable";
import {
  STTableColumnDetail,
  STTableRow,
} from "@/components/STTable/STTableProps";
import { BtnAdd, BtnSave } from "@/components/mui-elements/Button/ButtonAll";
import { FnAxios, FnDialog } from '@/lib/useAxios';
import { SelectItem, TextBoxItem } from "@/components";
import { Grid } from "@mui/material";
import SwitchFormItem from "@/components/input-element/Switch";


export const useQtoolDataManagement = () => {
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
    const param = {
      ...objParam,
    }
    ////setIsSkeleton(true);
    setIsLoadding(true);
    AxiosFn.Post("Qtool/GetDataTable", param, (res) => {
      ///console.log("Qtool/GetDataTable", res);
      setDataRow({
        ...objParam,
        arrRows: [...res.lstData],
        nDataLength: res.lstData.lenght,
        nPageIndex: 1,
      })

      if (res.lstData && res.lstData.length > 0) {
        for (const item of res.lstData) {
          form.setValue("sName" + item.sID, item.sName);
          form.setValue("sOrder" + item.sID, item.nOrder);
          form.setValue("Minimum" + item.sID, item.nMinimum);
          form.setValue("Maximum" + item.sID, item.nMaximum);
          form.setValue("status" + item.sID, item.isActive);
        }
      }

      ////setIsSkeleton(false);
      setIsLoadding(false);
    })
  }


  const onAdd = (p: STTableRow) => {
    if (p.arrRows.length > 0) {
      ////DialogFn.BlockUI();
      const Rowspush = p.arrRows.length + 1;
      const objDropdown = {
        value: Rowspush + "", label: Rowspush + "", sValue2: null
      }
      const lstDropdown = p.arrRows[0].lstOrder;
      lstDropdown.push(objDropdown);
      let obj = {
        sID: Rowspush + "",
        nID: Rowspush,
        nOrder: Rowspush,
        sName: "sName" + Rowspush,
        sDescription: "",
        isActive: true,
        isManage: false,
        lstOrder: lstDropdown,
        nMinimum: 0,
        nMaximum: 11 + 1,
      }
      p.arrRows.push(obj);

      setDataRow({
        ...p,
      })
      ////DialogFn.UnBlockUI();
    }
  }

  const onSave = () => {
    if (dataRow && dataRow.arrRows.length > 0) {
      const lstParam = [];
      for (const item of dataRow.arrRows) {
        let obj = {
          sID: item.sID,
          nOrder: form.getValues("sOrder" + item.sID),
          sName: form.getValues("sName" + item.sID),
          nMinimum: form.getValues("Minimum" + item.sID),
          nMaximum: form.getValues("Maximum" + item.sID),
          isActive: form.getValues("status" + item.sID),
          sDescription: null,
        }
        lstParam.push(obj);
      }
      const param = {
        lstData: lstParam,
      }
      ///console.log("param Save", param);

      DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("Qtool/Save", param, (res) => {
          DialogFn.UnBlockUI();
          DialogFn.Success("บันทึกสำเร็จ");
          onGetData(dataRow);
        },
          (err) => {
            DialogFn.Warning(err.sMessage);
          });
      });
    }
  }

  const onDelete = (item) => {
    ////console.log("onssssDelete", item);
    if (item && item.length > 0) {
      DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
        DialogFn.BlockUI();
        AxiosFn.Post("Qtool/Delete", item, (res) => {
          DialogFn.UnBlockUI();
          DialogFn.Success("ลบสำเร็จ");
          onGetData(dataRow);
        });
      });
    }
  }




  const fncOrder = (item) => {
    const html = <SelectItem
      key={"sOrder" + item.sID}
      id={"sOrder" + item.sID}
      name={"sOrder" + item.sID}
      label={""}
      IsSkeleton={false}
      required={true}
      disabled={false}
      options={item.lstOrder}
    />
    return (html)
  }

  const fncName = (item) => {
    return (<TextBoxItem
      maxLength={100}
      label=""
      id={"sName" + item.sID}
      name={"sName" + item.sID}
      IsSkeleton={false}
      required={true}
      disabled={false}
      IsCharacterCount
      disableMode={"text"}
    />)
  }

  const fncMinimum = (item) => {
    const lstOption = [
      { label: "1", value: "1", disable: false },
      { label: "2", value: "2", disable: false },
      { label: "3", value: "3", disable: false },
      { label: "4", value: "4", disable: false },
      { label: "5", value: "5", disable: false },
      { label: "6", value: "6", disable: false },
      { label: "7", value: "7", disable: false },
      { label: "8", value: "8", disable: false },
      { label: "9", value: "9", disable: false },
      { label: "10", value: "10", disable: false },
      { label: "Unlimit", value: "999", disable: false },
    ]

    for (const element of lstOption) {
      const value = parseInt(element.value);
      if (item.nMaximum <= value) {
        element.disable = true;
      }
    }

    const html = <SelectItem
      label={""}
      id={"Minimum" + item.sID}
      name={"Minimum" + item.sID}
      IsSkeleton={false}
      required={true}
      disabled={false}
      //// disableMode={false}
      options={lstOption}
    />
    return (html)
  }

  const fncMaximum = (item) => {
    const lstOption = [
      { label: "1", value: "1", disable: false },
      { label: "2", value: "2", disable: false },
      { label: "3", value: "3", disable: false },
      { label: "4", value: "4", disable: false },
      { label: "5", value: "5", disable: false },
      { label: "6", value: "6", disable: false },
      { label: "7", value: "7", disable: false },
      { label: "8", value: "8", disable: false },
      { label: "9", value: "9", disable: false },
      { label: "10", value: "10", disable: false },
      { label: "Unlimit", value: "999", disable: false },
    ]

    for (const element of lstOption) {
      const value = parseInt(element.value);
      if (item.nMinimum >= value) {
        element.disable = true;
      }
    }

    const html = <SelectItem
      label={""}
      id={"Maximum" + item.sID}
      name={"Maximum" + item.sID}
      IsSkeleton={false}
      required={true}
      disabled={false}
      //// disableMode={false}
      options={lstOption}
    />
    return (html)
  }

  const fncStatus = (item) => {
    const html = <SwitchFormItem
      id={"status" + item.sID}
      name={"status" + item.sID}
      label={""}
      disabled={false}
      required={true}
    />
    return (html)
  }



  const OrderColumn = {
    renderHeader: () => {
      return <BtnAdd
        id="add"
        txt=""
        IsRadius={true}
        onClick={() => onAdd(dataRow)}
      />
    },
    field: "nOrder",
    headerName: "Order.",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
    getAction: (item, index) => {
      return (fncOrder(item));
    },
  } as STTableColumnDetail;

  const NameColumn = {
    field: "sName",
    headerName: "Qtool",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
    getAction: (item, index) => {
      return (fncName(item));
    }
  } as STTableColumnDetail;

  const DescripColumn = {
    field: "sDescription",
    headerName: "Description",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "30%",
  } as STTableColumnDetail;

  const MinimumColumn = {
    field: "nMinimum",
    headerName: "Minimum",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "10%",
    getAction: (item, index) => {
      return (fncMinimum(item));
    },
  } as STTableColumnDetail;

  const MaximumColumn = {
    field: "nMaximum",
    headerName: "Maximum",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "15%",
    getAction: (item, index) => {
      return (fncMaximum(item));
    },
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
      return (fncStatus(item));
    },
  } as STTableColumnDetail;

  const dataColumn = [
    OrderColumn,
    NameColumn,
    DescripColumn,
    MinimumColumn,
    MaximumColumn,
    StatusColumn
  ] as STTableColumnDetail[];


  return {
    fncOrder,
    fncName,
    fncMinimum,
    fncMaximum,
    fncStatus,


    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onSave,
    onDelete,
    dataColumn,
  }
}