
import { useState } from "react";
import { AccordionCustom, SkeletonText, Text } from '@/components/mui-elements';
import { SelectItem, TextBoxItem, RadioListItem } from '@/components/input-element';

import { Button, Grid, Typography, InputAdornment } from "@mui/material";
import { IPanelPIC } from '@/hooks/Project/interface';
import { BtnAddMember, BtnRegister } from "@/components/mui-elements/Button/ButtonAll";
import STTable, { initRows } from '@/components/STTable/STTable';
const CompoenetSkeleton = ({ isSkeleton, isDisable,isShow,form,onSaveData,arrQtool,dataColumn,dataRow,loadding,getTable }) => {

    return (

        <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
            xs={12}
        >


            <Grid item xs={5}>
                <SelectItem id="ddlQtool" name="ddlQtool" label="Q Tool" disabled={isDisable} IsSkeleton={isSkeleton} options={arrQtool} required={!isDisable} />
                <Text IsSkeleton={isSkeleton} align="left" variant="caption"> หมายเหตุ : กรณีเป็น ODOP ต้องเป็น Cross Fonctional Team ที่มีสมาชิกจากหน่วยงานอื่นด้วย</Text>
            </Grid>
            <Grid item xs={12}>
                <Typography fontWeight={700}>Team Member</Typography>
                <Grid item xs={12}>
      <STTable
            column={dataColumn}
            rows={dataRow}
            isLoading={loadding}
            onLoadData={getTable}
            isMenu={false}
            filterField={[]}
            isShowCheckBox={false}
            form={form}
            isPage={false}
            isPageSize={false}
          />
      </Grid>
            </Grid>
            {
                isShow ? 
                <Grid item xs={12} textAlign={"right"}>
                <BtnRegister id="approve" IsSkeleton={isSkeleton}   
                 onClick={form.handleSubmit(() => { onSaveData(2) })} 
                />
            </Grid>
                : null
            }
       

        </Grid>
    )

}
const Registration = (prop: IPanelPIC) => {
    const { isSkeleton, Header, SubHeader, isDisable,isShow,form,onSaveData,arrQtool,dataColumn,dataRow,loadding,getTable } = prop;
   
    return (
        <AccordionCustom header={Header} subheader={SubHeader} bgColor='#0d67d9' isExpanded={true} isSkeleton={isSkeleton}>
            <CompoenetSkeleton isSkeleton={isSkeleton} isDisable={isDisable} isShow={isShow} form={form} onSaveData={onSaveData} arrQtool={arrQtool}
            dataColumn={dataColumn}
            dataRow={dataRow}
            loadding={loadding}
            getTable={getTable}
            />
        </AccordionCustom>
    )
}

export default Registration;