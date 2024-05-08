"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Link from "next/link";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";

export default function Homapage() {

  const [value, setValue] = React.useState('en');

  const form = useForm({
    shouldFocusError: true,
    shouldUnregister: false,
    mode: "all",
    defaultValues: {}
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return(
  <FormProvider {...form}>
      <Grid container spacing={2} alignItems={"flex-start"} justifyContent={"center"} style={{ padding: '4rem' }}>
        <Grid item >
          <Button onClick={form.handleSubmit((e) => { console.log(e) })}>
            Submit
          </Button>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Locale</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel value="en" control={<Radio />} label="en" />
              <FormControlLabel value="th" control={<Radio />} label="th" />
            </RadioGroup>
          </FormControl>

        </Grid>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={6} md={3}>
        </Grid>

      </Grid>
    </FormProvider>
  )
};
