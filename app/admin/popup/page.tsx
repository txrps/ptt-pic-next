"use client";

import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Box, FormControlLabel, Grid } from '@mui/material';
import { CheckBoxListItem } from "@/components/input-element";
import { BtnBack, BtnSave } from "@/components/mui-elements/Button/ButtonAll";
import UploadFileItem from '@/components/input-element/UploadFile';
import { Extension } from '@/enum/enum';
import SwitchFormItem from "@/components/input-element/Switch";
import { DateRangPickerItem } from "@/components/input-element/STDatePicker";

import { usePopupDataManagement } from "./_hook/usePopupDataManagement";


const Popup = () => {
  const handleClearAttachment = useRef(null);

  const {
    form,
    onSave,
    arrAttachmentList,
    setArrAttachmentList,
    isSkeleton,
    setIsSkeleton,

    setIsDate,
    isDate,
    isRequitDate,
    setIsRequitDate,

  } = usePopupDataManagement();



  return (
    <FormProvider {...form}>
      <Grid container sx={{ mt: 2, gap: "1rem" }}>

        <Grid container sx={{ gap: "2rem" }}>
          <Grid item xs={2}>
            <Box sx={{ display: "flex", gap: "6px" }}>
              <Box>ช่วงเวลาแสดงผล</Box>
              <Box style={{ color: "red" }}> * </Box>
            </Box>
          </Grid>

          <Grid item xs={5}>
            <DateRangPickerItem
              label="วันที่เริ่มต้น"
              name="dStartDate"
              label2="วันที่สิ้นสุด"
              name2="dEndDate"
              IsSkeleton={false}
              required={isRequitDate}
              disabled={isDate}
              disableMode={"input"}
            />
          </Grid>

          <Grid item xs={2}>
            <CheckBoxListItem
              id="checkBoxActive"
              name="checkBoxActive"
              label=""
              IsSelectAllOption={false}
              IsSkeleton={isSkeleton}
              required={false}
              disabled={false}
              //disableMode={disableMode}
              options={[
                { label: "ตลอดเวลา", value: "1", color: "#009900", disable: false },
              ]}
              onChange={(item) => {
                ////console.log(item);
                if (item.length > 0) {
                  form.resetField("dStartDate");
                  form.resetField("dEndDate");
                  setIsDate(true);
                  setIsRequitDate(false);
                } else {
                  setIsDate(false);
                  setIsRequitDate(true);
                }
              }}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={12}>
            <Box sx={{ display: "flex", gap: "6px" }}>
              <Box> รูปภาพ IntroPage</Box>
              <Box style={{ color: "red" }}> * </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <UploadFileItem
              id="arrUploadFile"
              name={"arrUploadFile"}
              required={true}
              arrFile={arrAttachmentList}
              setarrFile={setArrAttachmentList}
              IsFolder={false}
              IsMultiple={false}
              Extension={[...Extension.Image]}
              nLimitFile={50}
              sLimitFile={"MB"}
              onClearFile={handleClearAttachment}
              sPositionText="right"
              modeDisplay="gallery"
              disabled={false}
              sFolderTemp="PopUpEvent"
            />
          </Grid>
        </Grid>

        <Grid container sx={{ marginTop: "0.5rem" }}>
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
            <BtnBack
              id="btnBack"
              txt={"Back"}
              IsRadius={false}
              onClick={() => { }}
            />

            <BtnSave
              id="btnSave"
              txt={"Save"}
              IsRadius={false}
              IsDisabled={false}
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

export default Popup