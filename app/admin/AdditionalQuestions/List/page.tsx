"use client";

import React from "react";
import { useAdQuestionList } from "../hooks/useAdQuesion";
import STTable, { initRows } from "@/components/STTable/STTable";
import { FormProvider } from "react-hook-form";

const AdditionalQuestionsList = () => {
  const { form, DataColumn } = useAdQuestionList();
  return (
    <FormProvider {...form}>
      <STTable
        width={"100%"}
        column={DataColumn}
        rows={initRows}
        isLoading={false}
        onLoadData={() => {}}
        isMenu={true}
        isPage={true}
        isShowCheckBox={true}
        onDelete={(e) => {}}
        form={form}
      />
    </FormProvider>
  );
};

export default AdditionalQuestionsList;
