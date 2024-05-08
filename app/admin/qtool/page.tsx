"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import STTable, { initRows } from "@/components/STTable/STTable";
import {
  STTableColumnDetail,
  STTableRow,
} from "@/components/STTable/STTableProps";
import { BtnAdd, BtnSave } from "@/components/mui-elements/Button/ButtonAll";
import { FnAxios } from '@/lib/useAxios';
import { SelectItem, TextBoxItem } from "@/components";
import { Grid } from "@mui/material";
import SwitchFormItem from "@/components/input-element/Switch";

import { useQtoolDataManagement } from "./_hook/useQtoolDataManagement";


const Qtool = () => {

  const {
    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onSave,
    onDelete,
    dataColumn,
  } = useQtoolDataManagement();


  return (
    <FormProvider {...form}>
      <STTable
        width={"100%"}
        column={dataColumn}
        rows={dataRow}
        isLoading={isLoadding}
        onLoadData={onGetData}
        isMenu={true}
        ////เอาเพจจิ้นออก delete มันจะหลุดออกด้วย
        isPage={false}
        isShowCheckBox={true}
        onDelete={(e) => onDelete(e)}
        form={form}
      />

      <Grid container sx={{ textAlign: "center" }}>
        <Grid item xs={12}>
          {(dataRow && dataRow.arrRows.length > 0) ?
            <BtnSave id="onsave"
              onClick={form.handleSubmit((e) => onSave(),
                (err) => console.log("err", err)
              )} />
            :
            <></>
          }
        </Grid>
      </Grid>

    </FormProvider>
  )
}


export default Qtool;
