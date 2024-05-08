

import { useEffect, useState } from "react";
import { AccordionCustom, SkeletonText, Text } from '@/components/mui-elements';
import { SelectItem, TextBoxItem, RadioListItem } from '@/components/input-element';

import { Button, Grid, Typography, InputAdornment } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { IPanelPIC } from '@/hooks/Project/interface';

const CompoenetSkeleton = ({ isSkeleton, isDisable, arrLossGain, arrSource, arrCategoryType, CreateBy, onCategoryTypeChange,isDisableUnit,sUnit }) => {
    
  
    
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

                <Text IsSkeleton={isSkeleton} align="right" variant="body2">{CreateBy}</Text>
            </Grid>
            <Grid item xs={12}>
                <TextBoxItem id="sDepartment" name="sDepartment" label="Department" defaultValue="80001663 ฝ่ายระบบบริหารองค์กร(บอญ.)" IsSkeleton={isSkeleton} disabled={true} required={false} maxLength={3000} />
            </Grid>
            <Grid item xs={3}>
                <SelectItem id="ddlSource" name="ddlSource" label="Source of Loss & Gain" disabled={isDisable} IsSkeleton={isSkeleton} options={arrSource} required={true} />
            </Grid>
            <Grid item xs={12}>
                <TextBoxItem id="sPIC" name="sPIC" label="PIC Issue" IsSkeleton={isSkeleton} required={true} maxLength={300} />
            </Grid>
            <Grid item xs={4}>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    spacing={2}
                    xs={12}
                >
                    <Grid item xs={7}>
                        <SelectItem id="ddlCategoryType" name="ddlCategoryType" label="Category type" disabled={isDisable} IsSkeleton={isSkeleton} options={arrCategoryType} required={true} onChange={(e) => {
                    
                            onCategoryTypeChange(e.value);
                        }} />
                    </Grid>
                    <Grid item xs={5}>
                        <RadioListItem
                            label=""
                            name="nCategoryImpact"
                            IsSkeleton={isSkeleton}
                            options={arrLossGain}
                            IsDisplayLabel={false}
                            required={true}
                        />
                    </Grid>


                </Grid>

            </Grid>
            <Grid item xs={6}>
                <TextBoxItem id="nTargetValue" name="nTargetValue" label="Target Value" IsSkeleton={isSkeleton} disabled={isDisable} required={true} maxLength={3000} />
            </Grid>
            <Grid item xs={2}>
                <TextBoxItem id="sTargetUnit" name="sTargetUnit" label="Target Unit"  IsSkeleton={isSkeleton} disabled={isDisableUnit} required={true} maxLength={25} />
            </Grid>
        </Grid>
    )

}
const Identification = (prop: IPanelPIC) => {
    const { isSkeleton, Header, SubHeader, isDisable, arrLossGain, arrSource, arrCategoryType, CreateBy,isDisableUnit,sUnit,onCategoryTypeChange } = prop;
    return (
        <AccordionCustom header={Header} subheader={SubHeader} bgColor='#0d67d9' isExpanded={true} isSkeleton={isSkeleton} >
            <CompoenetSkeleton isSkeleton={isSkeleton} isDisable={isDisable} arrLossGain={arrLossGain} arrSource={arrSource} arrCategoryType={arrCategoryType} CreateBy={CreateBy} isDisableUnit={isDisableUnit} sUnit={sUnit} onCategoryTypeChange={onCategoryTypeChange}/>
        </AccordionCustom>
    )
}

export default Identification;