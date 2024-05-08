"use client";

import { Grid } from '@mui/material';
import React from 'react';
import STTable from '@/components/STTable/STTable';
import { useQuestionList } from './_component/useQuestionList';
import { FormProvider } from 'react-hook-form';

const ManageQuestionnaireList = () => {

  const {
    form,
    dataColumn,
    isSkeleton,
    dataRow,
    filter,
    isLoadding,
    onGetDataTable,
    onDelete,
    DialogQuestion,
  } = useQuestionList();

  return (
    <>
      <FormProvider {...form}>
        <Grid item xs={12}>
          <STTable
            width={"100%"}
            column={dataColumn}
            rows={dataRow}
            isLoading={isLoadding}
            onLoadData={onGetDataTable}
            isMenu={true}
            isPage={true}
            isShowCheckBox={true}
            isSkeleton={isSkeleton}
            onDelete={(e) => onDelete(e)}
            filterField={filter}
            form={form}
          />
        </Grid>
      </FormProvider>
      {DialogQuestion()}
    </>
  )
};

export default ManageQuestionnaireList;

export const enum EnumQuestionType {
  nToppic = 1,
  nQuestion = 2,

}