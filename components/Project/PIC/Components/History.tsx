

import { useState } from "react";
import { AccordionCustom, SkeletonText, Text } from '@/components/mui-elements';
import { SelectItem, TextBoxItem, RadioListItem } from '@/components/input-element';

import { Button, Grid, Typography,InputAdornment } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import {IPanelPIC} from '@/hooks/Project/interface';

const CompoenetSkeleton = (prop : IPanelPIC) => {
    const {isSkeleton,Header,SubHeader,isDisable} = prop;

    return (

        <AccordionCustom header={Header} subheader={SubHeader} bgColor='#0d67d9' isExpanded={false} isSkeleton={isSkeleton}>
        Comment
        </AccordionCustom>
    )

}
const PicHistory = () => {
    const [arrHistory,setArrHistory] = useState([]);
    return (
       
        arrHistory.map((item) => {
            return   <CompoenetSkeleton key={item.sID} Header="test" SubHeader="test2" isDisable={false} isSkeleton={false} isShow={false} isShow2={false} arrCategoryType={[]} arrLossGain={[]} arrQtool={[]} arrSource={[]} arrTeamPosition={[]} isDisableUnit={false}/>
        })
       
     
    )
}

export default PicHistory;