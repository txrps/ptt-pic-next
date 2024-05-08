
import { useState } from "react";
import { AccordionCustom, SkeletonText, Text } from '@/components/mui-elements';
import { SelectItem, TextBoxItem, TextAreaItem, RadioListItem } from '@/components/input-element';

import { Button, Grid, Typography, InputAdornment, Paper } from "@mui/material";
import { IPanelPIC } from '@/hooks/Project/interface';
const CompoenetCostReduction = (isSkeleton, isDisable) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            xs={12}
        >
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="Money Value ที่ได้จาการปรับปรุงของ PIC Project" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="ให้ผลต่อเนื่องในการปรับปรุง" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="ค่าเสื่อมราคาทรัพย์สินที่ใช้ในการปรับปรุง (Depreciation)" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="ค่าใช้จ่ายในการปรับปรุง (Expense)" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="ต้นทุนขาย (Cost of Good Sold)" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="PIC Project ของท่านสร้าง Value Added" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="Target Value" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={true} required={false} maxLength={3000} /></Grid>
        </Grid>
    )
}
const CompoenetOpportunityLoss = ({ isSkeleton, isDisable }) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            xs={12}
        >
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="Money Value ที่ได้จาการปรับปรุงของ PIC Project" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="ค่าใช้จ่ายในการปรับปรุง (Expense)" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="PIC Project ของท่านสร้าง Value Added" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="Target Value" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={true} required={false} maxLength={3000} /></Grid>
        </Grid>
    )
}
const CompoenetLossTimeReduction = ({ isSkeleton, isDisable }) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            xs={12}
        >
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="เวลาก่อนปรับปรุง" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="เวลาหลังปรับปรุง" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="เวลาที่ปรับปรุงได้" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="Target Value" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={true} required={false} maxLength={3000} /></Grid>
        </Grid>
    )
}
const CompoenetOther = ({ isSkeleton, isDisable }) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            xs={12}
        >
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="ก่อนปรับปรุง" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="หลังปรับปรุง" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="ปรับปรุงได้" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={isDisable} required={false} maxLength={3000} /></Grid>
            <Grid item xs={12}> <TextBoxItem id="sValue" name="sValue" label="Target Value" IsSkeleton={isSkeleton} endAdornment={<InputAdornment position="end">บาท/ปี</InputAdornment>} disabled={true} required={false} maxLength={3000} /></Grid>
        </Grid>
    )
}
const CompoenetSkeleton = ({ isSkeleton, isDisable }) => {

    return (

        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
            xs={12}
        >

            <Grid item xs={12}>
                <TextAreaItem id="sOperationBefore" name="sOperationBefore" label="สภาพก่อนปรับปรุง" IsSkeleton={isSkeleton} required={!isDisable} maxLength={300} disabled={isDisable}/>
            </Grid>
            <Grid item xs={12}>
                <TextAreaItem id="sOperationDetails" name="sOperationDetails" label="รายละเอียดการดำเนินงาน" IsSkeleton={isSkeleton} required={!isDisable} maxLength={300} disabled={isDisable}/>
            </Grid>
            <Grid item xs={4}>
                <SelectItem id="ddlResulteType" name="ddlResulteType" label="ประเภทผลลัพธ์ที่ได้/Result type" disabled={isDisable} IsSkeleton={isSkeleton} options={[]} required={!isDisable} />
            </Grid>
            <Grid item xs={8}>
                {CompoenetCostReduction(isSkeleton,isDisable)}
            </Grid>
        </Grid>
    )

}
const Resulte = (prop: IPanelPIC) => {
    const { isSkeleton, Header, SubHeader, isDisable } = prop;
    return (
        <AccordionCustom header={Header} subheader={SubHeader} bgColor='#0d67d9' isExpanded={true} isSkeleton={isSkeleton}>
            <CompoenetSkeleton isSkeleton={isSkeleton} isDisable={isDisable} />
        </AccordionCustom>
    )
}
export default Resulte;