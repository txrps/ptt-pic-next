"use client";

import { Grid, Typography } from "@mui/material";
import React from "react";
import {
  TimelineDescription,
  optionsChoice,
  optionsRequired,
  useAdQuestionForm,
} from "../hooks/useAdQuesion";
import SelectItem from "@/components/input-element/Select/SelectItem";
import { FormProvider } from "react-hook-form";
import TextBoxItem from "@/components/input-element/TextBox/TextBox";
import CheckboxItem from "@/components/input-element/Checkbox/CheckboxItem";
import MultiSelectItem from "@/components/input-element/Select/MultiSelectItem";
import MultiTreeSelectItem from "@/components/input-element/Select/MultiTreeSelectItem";
import RadioListItem from "@/components/input-element/Radio/RadioListItem";
import DateRangPickerItem from "@/components/input-element/STDatePicker/DateRangPickerItem";
import DynamicComponentChoice from "./DynamicComponentChoice";
import "../css/AdQuestion.css";

const AdditionalQuestionsForm = () => {
  const { form, option, state, choices, setChoices } = useAdQuestionForm();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <SelectItem
            label="ลำดับ"
            name="optOrder"
            IsSkeleton={state.isSkeleton}
            required={true}
            disabled={false}
            options={option.optionOrder}
          />
        </Grid>
        <Grid item xs={5}>
          <TextBoxItem
            maxLength={500}
            label="Question"
            name="sQuestion"
            required={true}
            IsSkeleton={state.isSkeleton}
            IsCharacterCount
            disabled={false}
          />
        </Grid>
        <Grid item xs={2}>
          <CheckboxItem
            label=""
            name="checkBox1"
            IsSkeleton={state.isSkeleton}
            required={false}
            disabled={false}
            options={optionsRequired}
          />
        </Grid>
        <Grid item xs={4}>
          <MultiSelectItem
            label="Q Tool"
            name="optQtool"
            IsSkeleton={state.isSkeleton}
            required
            disabled={false}
            options={option.optionQtool}
          />
        </Grid>
        <Grid item xs={8}>
          <MultiTreeSelectItem
            label="ใช้กับสายงาน"
            name="optionOrganization"
            IsSkeleton={state.isSkeleton}
            required
            disabled={false}
            limitTag={4}
            options={option.optionOrganization}
          />
        </Grid>
        <Grid item xs={4}>
          <RadioListItem
            label="ประเภทตัวเลือก"
            name="rChoice"
            IsSkeleton={state.isSkeleton}
            required
            disabled={false}
            defaultValue="0"
            options={optionsChoice}
          />
        </Grid>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <DateRangPickerItem
            label="วันที่เริ่มต้น"
            name="dStartDate"
            label2="วันที่สิ้นสุด"
            name2="dEndDate"
            IsSkeleton={state.isSkeleton}
            required
            disabled={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography
            sx={{ fontSize: "0.75rem !important" }}
            className="remark-date"
          >
            {TimelineDescription.THAI_DESCRIPTION}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <DynamicComponentChoice
            state={state}
            form={form}
            choices={choices}
            setChoices={setChoices}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
};

export default AdditionalQuestionsForm;
