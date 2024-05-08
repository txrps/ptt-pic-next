"use client";

import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { initRows } from "@/components/STTable/STTable";
import { useSearchParams } from "next/navigation";
import { STTableRow } from "@/components/STTable/STTableProps";
import { Box, Grid } from "@mui/material";
import Link from "next/link";
import { BtnBack, BtnSubmit } from "@/components/mui-elements/Button/ButtonAll";
import SwitchFormItem from "@/components/input-element/Switch";
import { TextBoxItem } from "@/components";

import { useQuestionnairManagementForm } from "./_hook/useQuestionnairManagementForm";


const QuestionnairForm = () => {

  const {
    onSave,
    form,
  } = useQuestionnairManagementForm();

  return (
    <FormProvider {...form}>
      <Grid container sx={{ mt: 2, gap: "2rem" }}>


        <Grid container sx={{ gap: "30px" }}>
          <Grid item xs={2.5}>
            <TextBoxItem
              maxLength={100}
              label="Order"
              id={"Order"}
              name={"Order"}
              IsSkeleton={false}
              required={false}
              disabled={true}
              disableMode={"input"}
              IsCharacterCount
            />
          </Grid>

          <Grid item xs={6}>
            <TextBoxItem
              maxLength={100}
              label="Question Name"
              id={"Questionnaire"}
              name={"Questionnaire"}
              IsSkeleton={false}
              required={true}
              disabled={false}
              IsCharacterCount
              disableMode={"input"}
            />
          </Grid>
        </Grid>


        <Grid container>
          <Grid item xs={12}>
            {/* <Box sx={{ display: "flex", gap: "6px" }}>
              <Box>สถานะ</Box>
              <Box key={"isActive"} style={{ color: "red" }}> * </Box>
            </Box> */}
            <SwitchFormItem
              id={"isStatus"}
              name={"isStatus"}
              label={"สถานะ"}
              disabled={false}
              required={true}
            />
          </Grid>
        </Grid>


        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Link href={{ pathname: "/admin/Questionnaire/QuestionnaireList" }}>
              <BtnBack id={"back"} txt={"back"} />
            </Link>

            <BtnSubmit
              id={"save"}
              txt={"Save"}
              onClick={form.handleSubmit((e) => onSave(),
                (err) => console.log("err", err)
              )}
            />
          </Grid>
        </Grid>

      </Grid>
    </FormProvider>
  )
}

export default QuestionnairForm