"use client";

import { TextBoxItem } from "@/components";
import STTable, { initRows } from "@/components/STTable/STTable";
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import SwitchFormItem from "@/components/input-element/Switch";
import { BtnSave } from "@/components/mui-elements/Button/ButtonAll";
import { FnAxios } from "@/lib/useAxios";
import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { useResultTypeDataManagement } from "./_hook/useResultTypeDataManagement";



function ResultType() {

  const {
    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onSave,
    dataColumn,
  } = useResultTypeDataManagement();



  return (
    <FormProvider {...form}>
      <STTable
        width={"100%"}
        column={dataColumn}
        rows={dataRow}
        isLoading={isLoadding}
        onLoadData={onGetData}
        isMenu={false}
        isPage={false}
        isShowCheckBox={false}
        onDelete={undefined}
        form={form}
      />

      <Grid container sx={{ textAlign: "center" }}>
        <Grid item xs={12}>
          {(dataRow && dataRow.arrRows.length > 0) ?
            <BtnSave
              id="onsave"
              IsSkeleton={false}
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

export default ResultType;