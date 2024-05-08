"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import STTable, { initRows } from "@/components/STTable/STTable";

import DialogTable from "../_component/DialogTable";
import { useQuestionnairManagement } from "./_hook/useQuestionnairManagement";



const Questionnair = () => {

  const {
    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    onDelete,

    questionnaireID,
    openModalDialog,
    handleCloseModalDialog,

    dataColumn,
  } = useQuestionnairManagement();



  return (
    <>
      <FormProvider {...form}>
        <STTable
          width={"100%"}
          column={dataColumn}
          rows={dataRow}
          isLoading={isLoadding}
          onLoadData={onGetData}
          isMenu={true}
          isPage={true}
          isShowCheckBox={true}
          isSkeleton={isSkeleton}
          onDelete={(e) => onDelete(e)}
          form={form}
        />
      </FormProvider>

      <DialogTable nID={questionnaireID}
        openModalDialog={openModalDialog}
        handleCloseModalDialog={handleCloseModalDialog}
      />
    </>
  )
}

export default Questionnair