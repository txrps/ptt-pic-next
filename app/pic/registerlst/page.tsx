"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { BtnAdd } from "@/components/mui-elements/Button/ButtonAll";
import PicList from "@/components/Project/PIC/List";
export default function PicRegister() {



  return (
    <>
          <PicList />
    </>
  )
};