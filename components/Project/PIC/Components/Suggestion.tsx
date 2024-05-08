"use client";

import { useState } from "react";
import { AccordionCustom, SkeletonText, Text } from '@/components/mui-elements';
import { SelectItem, TextBoxItem, RadioListItem } from '@/components/input-element';

import { Button, Grid, Typography,InputAdornment } from "@mui/material";
import {IPanelPIC} from '@/hooks/Project/interface';
const CompoenetSkeleton = ({ isSkeleton,isDisable }) => {

    return (

        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            xs={12}
        >

            <Grid item textAlign={"right"} xs={12}>

                <Text IsSkeleton={isSkeleton} align="right" variant="body2"> Create By : 540314 นาย ณัฏฐวัธน์ รุจิระชุณห์ 07/03/2024 16:14 น.</Text>
            </Grid>
            <Grid item xs={12}>
                <TextBoxItem id="sDepartment" name="sDepartment" label="Department" defaultValue="80001663 ฝ่ายระบบบริหารองค์กร(บอญ.)" IsSkeleton={isSkeleton} disabled={true} required={false} maxLength={3000} />
            </Grid>
            <Grid item xs={3}>
                <SelectItem id="ddlSource" name="ddlSource" label="Source of Loss & Gain" disabled={false} IsSkeleton={isSkeleton} options={[]} required={true} />
            </Grid>
            <Grid item xs={12}>
                <TextBoxItem id="sPIC" name="sPIC" label="PIC Issue" IsSkeleton={isSkeleton} required={true} maxLength={300} />
            </Grid>
            <Grid item xs={4}>
                <SelectItem id="ddlCategoryType" name="ddlCategoryType" label="Category type" disabled={false} IsSkeleton={isSkeleton} options={[]} required={true} />

            </Grid>
            <Grid item xs={2}>
                <RadioListItem
                    label="radio1"
                    name="radio1"
                    IsSkeleton={isSkeleton}
                    options={[
                        { label: "Loss", value: "Loss", disable: false },
                        { label: "Gain", value: "Gain", disable: false },
                    ]}
                    IsDisplayLabel={false}
                    required={true}

                />
            </Grid>
            <Grid item xs={4}>
                <Typography fontWeight={700}>Target</Typography>
                <TextBoxItem id="sValue" name="sValue" label="Value" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={false} required={false} maxLength={3000} />
                
            </Grid>
            <Grid item xs={2}>
            <TextBoxItem id="sUnit" name="sUnit" label="Unit" defaultValue="บาท/ปี" IsSkeleton={isSkeleton} disabled={false} required={false} maxLength={25} />
            </Grid>
            
            {/* <Grid item xs={6}>
                <TextBoxItem id="sValue" name="sValue" label="Value" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={false} required={false} maxLength={3000} />
            </Grid>
            <Grid item xs={6}>
                {/* <TextBoxItem id="sUnit" name="sUnit" label="Unit" defaultValue="บาท/ปี" IsSkeleton={isSkeleton} disabled={true} required={false} maxLength={3000} />
            </Grid> */}
        </Grid>
    )

}
const Suggestion = (prop : IPanelPIC) => {
    const {isSkeleton,Header,SubHeader,isDisable,isShow} = prop;
    return (
        isShow?  <AccordionCustom header={Header} subheader={SubHeader} bgColor='#0d67d9' isExpanded={true} isSkeleton={isSkeleton}>
            <CompoenetSkeleton isSkeleton={isSkeleton} isDisable={isDisable}/>
        </AccordionCustom> : null
    )
}
export default Suggestion;