"use client";

import STTable from '@/components/STTable/STTable';
import { BtnCancel, BtnSave } from '@/components/mui-elements/Button/ButtonAll';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { FormProvider} from 'react-hook-form';
import { useQuestionForm } from './_component/useQuestionForm';
import Link from 'next/link';

const QuestionnaireForm = () => {

  const {
    form,
    dataColumn,
    isSkeleton,
    dataRow,
    isLoadding,
    GetEdit,
    onSubmit,
    DialogHint,
    fncAddQuestion,
    onDelete
  } = useQuestionForm();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        {fncAddQuestion()}
        <Grid item xs={10}>
          <Typography>
            Question
            <span key={"isActive"} style={{ color: "red" }}> * </span>
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <Typography>
            1. สามารถ Category เพิ่มได้จาก Tab หัวประเมิน
          </Typography>
          <Typography>
            2. Question สามารถระบุได้จาก Column Queation Name
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <STTable
            width={"100%"}
            column={dataColumn}
            rows={dataRow}
            isLoading={isLoadding}
            onLoadData={GetEdit}
            isMenu={true}
            isPage={false}
            isShowCheckBox={true}
            isSkeleton={isSkeleton}
            onDelete={(e) => onDelete(e)}
            form={form}
          />
        </Grid>
      </Grid>
      <Grid container justifyContent={"center"} spacing={3} style={{ marginTop: 6 }}>
        <Grid item container justifyContent={"end"} xs={6}>
          <Link href={{ pathname: "/admin/Questionnaire/ManageQuestionnaire" }}>
            <BtnCancel id={"back"} txt={"Cancel"} />
          </Link>
        </Grid>
        <Grid item xs={6}>
          <BtnSave id="onsave" IsSkeleton={false}
            onClick={form.handleSubmit((e) => onSubmit(e),
              (err) => console.log("err", err)
            )} />
        </Grid>
      </Grid>
      {DialogHint()}
    </FormProvider>
  )
};

export default QuestionnaireForm;