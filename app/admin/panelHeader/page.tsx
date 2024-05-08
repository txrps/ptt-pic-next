"use client";

import React, { useEffect, useRef, useState } from "react";
import { TextBoxItem } from "@/components";
import STTable, { initRows } from "@/components/STTable/STTable";
import { STTableColumnDetail, STTableRow } from "@/components/STTable/STTableProps";
import { BtnSave } from "@/components/mui-elements/Button/ButtonAll";
import { FnAxios } from "@/lib/useAxios";
import { Grid } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import { usePanelHeaderDataManagement } from "./_hook/usePanelHeaderDataManagement";


function PanelHeader() {

  const {
    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onSave,
    dataColumn,
  } = usePanelHeaderDataManagement();


  return (
    <FormProvider {...form}>
      <STTable
        width={"100%"}
        column={dataColumn}
        rows={dataRow}
        isLoading={isLoadding}
        onLoadData={onGetData}
        isMenu={true}
        isPage={false}
        // filterField={filter}
        isShowCheckBox={false}
        onDelete={undefined}
        // classHead={GetTableHeadClass(system)}
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

export default PanelHeader;