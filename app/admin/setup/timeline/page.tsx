"use client";

import { BtnLogkey, BtnSave } from '@/components/mui-elements/Button/ButtonAll';
import { Grid } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import STTable from '@/components/STTable/STTable';
import { DatePickerMonthItem, YearPickerItem } from '@/components/input-element/STDatePicker';
import { useTimeline } from './useTimeline';

const Timeline = () => {
  const {
    form,
    onGetTargetDate,
    onGetData,
    onSubmit,
    dataColumn,
    IsSkeleton,
    isLogkey,
    dataRow,
    loadding,
    setLogkey,
  } = useTimeline();

  return (
    <FormProvider {...form}>
      <Grid container spacing={2}>
        <Grid item md={1}> </Grid>
        <Grid item >
          <YearPickerItem
            label="Year"
            name="dYear"
            IsSkeleton={IsSkeleton}
            required={true}
            disabled={false}
            onChange={() => onGetTargetDate()}
          />
        </Grid>
        <Grid item >
          <DatePickerMonthItem
            label="Target Date"
            name="dTargetDate"
            IsSkeleton={IsSkeleton}
            required={true}
            disabled={!isLogkey}
          />
        </Grid>
        <Grid item >
          <BtnLogkey id="Logkey" bgColor={isLogkey ? "#19af55" : "#fc3434"} bgColorHover={isLogkey ? "#19af55" : "#fc3434"} IsCircleWithOutText IsSkeleton={false} onClick={() => { setLogkey(!isLogkey) }} />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 3 }}>
          <STTable
            width={"100%"}
            column={dataColumn}
            rows={dataRow}
            isLoading={loadding}
            onLoadData={onGetData}
            isMenu={true}
            isShowCheckBox={false}
            onDelete={undefined}
            form={form}
            isPage={false}
          />
        </Grid>
        <Grid item container justifyContent={"center"}>
          <BtnSave id="onsave" IsSkeleton={IsSkeleton} IsDisabled={isLogkey}
            onClick={form.handleSubmit(
              (e) => onSubmit(e),
              (err) => console.log("err", err)
            )} />

        </Grid>
      </Grid>
    </FormProvider>
  )
};

export default Timeline;




