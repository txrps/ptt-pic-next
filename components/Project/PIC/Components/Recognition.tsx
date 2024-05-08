
import { useState } from "react";
import { AccordionCustom, SkeletonText, Text } from '@/components/mui-elements';
import { SelectItem, TextBoxItem, CheckboxItem } from '@/components/input-element';

import { Button, Grid, Typography, InputAdornment } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { IPanelPIC } from '@/hooks/Project/interface';
const CompoenetSkeleton = ({ isSkeleton, isDisable }) => {

    return (

        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            xs={12}
        >
            <Grid item xs={2}>
                <CheckboxItem label="สนใจสมัคร Award หรือไม่" name="RegisAward" IsDisplayLabel={true} options={[
                    { label: "สนใจ", value: "1", disable: false },
                ]} required={false} IsSkeleton={isSkeleton} disabled={isDisable} />
            </Grid>
        </Grid>
    )

}
const Recognition = (prop: IPanelPIC) => {
    const { isSkeleton, Header, SubHeader, isDisable,isShow } = prop;
    return (
        isShow?   <AccordionCustom header={Header} subheader={SubHeader} bgColor='#0d67d9' isExpanded={true} isSkeleton={isSkeleton}>
        <CompoenetSkeleton isSkeleton={isSkeleton} isDisable={isDisable}/>
    </AccordionCustom> : null
    )
}

export default Recognition;