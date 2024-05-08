"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { BtnAdd } from "@/components/mui-elements/Button/ButtonAll";

export default function Homapage() {


  const form = useForm({
    shouldFocusError: true,
    shouldUnregister: false,
    mode: "all",
    defaultValues: {}
  });


  return (
    <FormProvider {...form}>
      <Grid container spacing={2} alignItems={"flex-start"} justifyContent={"center"} style={{ padding: '4rem' }}>
        <Grid item xs={12}>
          <h1>Page : Unit Test</h1>
        </Grid>
        <Grid item xs={12}>
        </Grid>

      </Grid>
    </FormProvider>
  )
};
