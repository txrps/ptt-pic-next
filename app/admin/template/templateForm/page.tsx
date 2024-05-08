"use client";

import React, { useEffect, useRef, useState } from 'react';
import { initRows } from '@/components/STTable/STTable';
import SwitchFormItem from '@/components/input-element/Switch';
import UploadFileItem from '@/components/input-element/UploadFile';
import { BtnBack, BtnSubmit } from '@/components/mui-elements/Button/ButtonAll';
import { Extension } from '@/enum/enum';
import { AxiosFn } from '@/lib/useAxios';
import { Box, Grid } from '@mui/material';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FormProvider, useForm } from 'react-hook-form';

import { useTemplateDataManagementForm } from './_hook/useTemplateDataManagementForm';


const TemplateForm = () => {

  const {
    form,
    onSave,

    setArrAttachment,
    arrAttachment,
    handleClearAttachment,

  } = useTemplateDataManagementForm();


  return (
    <FormProvider {...form}>
      <Grid container sx={{ gap: "2rem" }}>

        <Grid container>
          <Grid item xs={12}>
            <UploadFileItem
              id="arrUploadFile"
              name={"arrUploadFile"}
              required={true}
              arrFile={arrAttachment}
              setarrFile={setArrAttachment}
              IsFolder={false}
              IsMultiple={false}
              Extension={[...Extension.IaAttacth]}
              nLimitFile={30}
              sLimitFile={"MB"}
              onClearFile={handleClearAttachment}
              sPositionText="right"
              modeDisplay="gallery"
              disabled={false}
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
              id={"status"}
              name={"status"}
              label={"สถานะ"}
              disabled={false}
              required={true}
            />
          </Grid>
        </Grid>


        <Grid container>
          <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
            <Link href={{ pathname: "/admin/template/templateList" }}>
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

export default TemplateForm