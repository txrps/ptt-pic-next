

import { useState, useContext, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";

import { usePathname, useParams, useSearchParams } from 'next/navigation'
import { AccordionCustom, SkeletonText, Text } from '@/components/mui-elements';
import { SelectItem, TextBoxItem, RadioListItem } from '@/components/input-element';

import { Button, Grid, Typography, InputAdornment } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';
import { IPanelPIC } from '@/hooks/Project/interface';
import { Identifacation, Registration, Innovation, Recognition, Result, Suggestion, CustomizedSteppers } from '@/components/Project/PIC/Components';
import { usePicForm } from '@/hooks/Project/PIC/usePicForm';
import { GetQuerystring } from '@/lib/utils';
import { BtnBack, BtnSave, BtnSubmit, BtnApprove, BtnReject } from "@/components/mui-elements/Button/ButtonAll";

const PicDetail = () => {
    const {
        form,
        isSkeleton, DisableIndetification, DisableRegistration, DisableResult, DisableInnovation, ShowInnovation, ShowInnovationState2, DisableRecognition, ShowRecognition,
        DisableSuggestion, ShowSuggestion,
        NamePanel1,
        NamePanel2,
        NamePanel3,
        NamePanel4,
        NamePanel5,
        NamePanel6,
        SubNamePanel1,
        SubNamePanel2,
        SubNamePanel3,
        SubNamePanel4,
        SubNamePanel5,
        SubNamePanel6,
        InitialForm,
        arrSource,
        arrLossGain,
        arrCategoryType,
        arrQtool,
        arrTeamPosition,
        arrStep,
        StepID,
        isSave,
        isSubmit,
        isApprove,
        isReject,
        isRegister,
        onSaveData,
        CreateBy,
        isDisableUnit,
        sUnit,
        onCategoryTypeChange,
        dataColumn,
        dataRow,
        loadding,
        getTable
    } = usePicForm();
    const sEncryptID = GetQuerystring(useSearchParams().get("sID"));
    useEffect(() => {
        InitialForm(sEncryptID);
    }, [])
    return (
      
        <FormProvider {...form}>
            <Grid item container spacing={3} xs={12} md={12} justifyContent={"center"} alignItems={"center"} alignContent={"center"} style={{ borderBottom: '1%' }}>
                <CustomizedSteppers arrStep={arrStep} nStepID={StepID} />
                <Identifacation isSkeleton={isSkeleton} Header={NamePanel1} SubHeader={SubNamePanel1} isDisable={DisableIndetification} isShow={true} isShow2={true} arrCategoryType={arrCategoryType} arrSource={arrSource} arrLossGain={arrLossGain} arrQtool={arrQtool} arrTeamPosition={arrTeamPosition} CreateBy={CreateBy} isDisableUnit={isDisableUnit} sUnit={sUnit} onCategoryTypeChange={onCategoryTypeChange}/>
                <Registration isSkeleton={isSkeleton} Header={NamePanel2} SubHeader={SubNamePanel2} isDisable={DisableRegistration} isShow={isRegister} isShow2={true} arrCategoryType={arrCategoryType} arrSource={arrSource} arrLossGain={arrLossGain} arrQtool={arrQtool} arrTeamPosition={arrTeamPosition} form={form} onSaveData={onSaveData} isDisableUnit={isDisableUnit}
                 dataColumn={dataColumn}
                 dataRow={dataRow}
                 loadding={loadding}
                 getTable={getTable}
                />
                <Result isSkeleton={isSkeleton} Header={NamePanel3} SubHeader={SubNamePanel3} isDisable={DisableResult} isShow={true} isShow2={true} arrCategoryType={arrCategoryType} arrSource={arrSource} arrLossGain={arrLossGain} arrQtool={arrQtool} arrTeamPosition={arrTeamPosition} isDisableUnit={isDisableUnit}/>
                <Suggestion isSkeleton={isSkeleton} Header={NamePanel4} SubHeader={SubNamePanel4} isDisable={DisableSuggestion} isShow={ShowSuggestion} isShow2={true} arrCategoryType={arrCategoryType} arrSource={arrSource} arrLossGain={arrLossGain} arrQtool={arrQtool} arrTeamPosition={arrTeamPosition} isDisableUnit={isDisableUnit}/>
                <Innovation isSkeleton={isSkeleton} Header={NamePanel5} SubHeader={SubNamePanel5} isDisable={DisableInnovation} isShow={ShowInnovation} isShow2={ShowInnovationState2} arrCategoryType={arrCategoryType} arrSource={arrSource} arrLossGain={arrLossGain} arrQtool={arrQtool} arrTeamPosition={arrTeamPosition} isDisableUnit={isDisableUnit}/>
                <Recognition isSkeleton={isSkeleton} Header={NamePanel6} SubHeader={SubNamePanel6} isDisable={DisableRecognition} isShow={ShowRecognition} isShow2={true} arrCategoryType={arrCategoryType} arrSource={arrSource} arrLossGain={arrLossGain} arrQtool={arrQtool} arrTeamPosition={arrTeamPosition} isDisableUnit={isDisableUnit}/>
            </Grid>
            <Grid container marginTop={"1rem"} justifyContent="space-between">
                <Grid item xs={"auto"} >
                    <BtnBack
                        onClick={() => { }}
                        id={"btnBack"}
                        // className="button-margin"
                    />
                </Grid>
                <Grid item xs={"auto"} justifyContent="space-between" >
                {
                    isSave ?
                    <BtnSave
                    onClick={form.handleSubmit(
                        () => { onSaveData(1) }
                    )} 
                    id={"BtnSave"}
                    className="button-margin-action"
                />
                    
                    : null
                }   
                {
                    isSubmit ?
                    <BtnSubmit
                    onClick={() => { }}
                    id={"BtnSubmit"}
                    className="button-margin-action"
                />
                    : null
                }
                   {
                    isApprove ?
                    <BtnApprove
                        onClick={() => { }}
                        id={"BtnApprove"}
                        className="button-margin-action"
                    />
                    : null
                   }
                    
                   {
                    isReject ? 
                    <BtnReject
                    onClick={() => { }}
                    id={"btnReject"}
                    className="button-margin-action"
                />
                    
                    : null
                   }
                </Grid>
            </Grid>
        </FormProvider>
    )
}

export default PicDetail;