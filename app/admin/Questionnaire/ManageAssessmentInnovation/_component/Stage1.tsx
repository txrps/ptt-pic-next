"use client";

import { useManageAssessmentInnovationStage1 } from '@/hooks/Admin/Questionnaire/useManageAssessmentInnovation';
import { Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { ManageAssessmentInnovationContext } from '../page';
import { FormProvider } from 'react-hook-form';
import { InputNumberFormat, TextBoxItem } from '@/components';
import { Convert, DefaultArrayEmpty } from '@/lib';
import { BtnAdd, BtnDelete, BtnSave } from '@/components/mui-elements/Button/ButtonAll';
import TableStage1 from './TableStage1';

const ManageAssessmentInnovationStage1 = () => {

  const {
    nAssessmentInnovationID, 
    setNAssessmentInnovationID,
    setLstDataStage1,
    setNMinScore,
    setNMaxScore,
    isDisable, 
    isSkeleton, 
    disableMode
} = useContext(ManageAssessmentInnovationContext);

  const {
    formStage1,        
    lstDataStage1,
    handleSaveDateStage1,
    handleAddStage1,
    handleDeleteStage1,
    formStage1Answer,
  } = useManageAssessmentInnovationStage1({ 
    nAssessmentInnovationID, 
    setNAssessmentInnovationID,
    setLstDataStage1,
    setNMinScore,
    setNMaxScore,
  });
  
  return (
    <Grid container spacing={1} justifyContent={'flex-start'}>
      <Grid item xs={12}
        style={{
          padding: '5px',
          backgroundColor: '#0058a9',
          borderRadius: '8px',
          minHeight: '35px',
        }}
      >
        <Typography sx={{ pl: 2}} variant="h6" color='white'>Stage 1</Typography>
      </Grid>
      <Grid xs={12} container justifyContent={'flex-start'} alignItems={"start"}
        style={{
          padding: '2%',
          boxShadow: 'rgb(168 181 191 / 30%) 0px 1px 2px 0px, rgb(179 193 203 / 15%) 2px 2px 6px 2px',
          borderRadius: '8px',
        }}
      >
        <FormProvider {...formStage1}>
          <Grid sx={{ mt: 1, gap: 2}} container justifyContent={'center'}>
            <Grid container sx={{ gap: 1 }} justifyContent={'flex-start'}
              style={{
                padding: '2%',
                backgroundColor: '#e5e5e5',
                borderRadius: '8px',
              }}
            >
              <Grid item xs={12}>
                <Typography variant="body1" gutterBottom fontWeight="bold">เงื่อนไขเกณฑ์การประเงิน Stage 1</Typography>
              </Grid>
              <Grid item xs={12} container spacing={1} justifyContent={'flex-start'} alignItems={'center'}>
                <Grid item>
                  <Typography variant="body2">คะแนนรายละเอียดการพิจารณาในแต่ละข้อ ต้องได้คะแนนไม่ต่ำกว่า</Typography>
                </Grid>
                <Grid item xs={8} md={2}>
                  <InputNumberFormat
                    label=""
                    name="nMinScore"
                    IsThousandSeparator={false}
                    maxLength={6}
                    min={0}
                    max={Convert.StringToNumberOrNull(formStage1.watch("nMaxScore"))}
                    valueType="number"
                    required={true}
                    disabled={isDisable}
                    disableMode={disableMode}
                    IsSkeleton={isSkeleton}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2">คะแนน</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} container spacing={1} justifyContent={'flex-start'} alignItems={'center'}>
                <Grid item>
                  <Typography variant="body2">คะแนนรวมต้องมากกว่าหรือเท่ากับ</Typography>
                </Grid>
                <Grid item xs={8} md={2}>
                  <InputNumberFormat
                    label=""
                    name="nMaxScore"
                    // IsAllowMinus={false}
                    IsThousandSeparator={false}
                    maxLength={6}
                    min={Convert.StringToNumberOrNull(formStage1.watch("nMinScore"))}
                    // max={100}
                    valueType="number"
                    required={true}
                    disabled={isDisable}
                    disableMode={disableMode}
                    IsSkeleton={isSkeleton}
                  />
                </Grid>
                <Grid item>
                  <Typography variant="body2">คะแนนขึ้นไป</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container sx={{ mt: 1, gap: 2 }} justifyContent={'flex-start'}>
              <Grid container sx={{ mt: 2, gap: 3 }}  justifyContent={'flex-start'}>
                {DefaultArrayEmpty(lstDataStage1).map((iStage, index) => {
                  let sKey = "sKeyStage1_" + iStage.nStageID + "_" + index;
                  return (
                    <Grid key={sKey} container sx={{ gap: 1 }} justifyContent={'flex-start'} alignItems={'start'}
                      style={{
                        padding: '2%',
                        boxShadow: 'rgb(124 132 139 / 70%) 0px 1px 2px 0px, rgb(145 156 165 / 10%) 2px 5px 8px 3px',
                        borderRadius: '8px',
                        backgroundColor: '#fdfdfd',
                      }}
                    >                      
                      <Grid container spacing={1} justifyContent={'flex-start'} alignItems={'start'}>                            
                        <Grid item xs={12} md={8}>
                          <TextBoxItem
                            label="หัวข้อการพิจารณา"
                            name={"sQuestion_" + iStage.nStageID}
                            required={true}
                            maxLength={3000}
                            disabled={isDisable}
                            disableMode={disableMode}
                            IsSkeleton={isSkeleton}
                            defaultValue={iStage.sQuestion}
                            onChange={(event) => { iStage.sQuestion = (event.target.value === "" ? null : event.target.value); }}
                          />
                        </Grid>
                        <Grid item xs={12} md={2}>
                          <InputNumberFormat
                            label="Weight"
                            name={"nWeight_" + iStage.nStageID}
                            required={true}
                            valueType="number"
                            maxLength={6}
                            min={0}
                            IsThousandSeparator={false}
                            disabled={isDisable}
                            disableMode={disableMode}
                            IsSkeleton={isSkeleton}
                            defaultValue={iStage.nWeight}
                            onChange={(event) => { iStage.nWeight = Convert.StringToFloatOrNull(event.target.value); }}
                          />
                        </Grid> 
                        {!isDisable &&
                          <Grid item xs={12} md={2} container spacing={1} justifyContent={'flex-end'} alignItems={'center'} style={{ marginTop: '1px', }}>        
                            <BtnDelete
                              id={"BtnDele_" + iStage.nStageID}
                              txt="Delete"
                              IsCircleWithOutText={false}
                              IsDisabled={isDisable}
                              onClick={() => { handleDeleteStage1(iStage.nStageID); }}
                            />
                          </Grid>        
                        }          
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TableStage1
                          formStage1Answer={formStage1Answer}
                          isDisable={isDisable} 
                          isSkeleton={isSkeleton} 
                          disableMode={disableMode}
                          nStageID={iStage.nStageID}
                          lstDataAnswerStage1={iStage.lstDataAnswerStage1}
                          setLstDataAnswerStage1={(arrDataAnswer)=> {
                            console.log("arrDataAnswer", arrDataAnswer);                            
                            iStage.lstDataAnswerStage1 = arrDataAnswer;
                          }}
                        />
                      </Grid>
                    </Grid>
                  )
                })}
              </Grid>  
              <Grid xs={12} container sx={{ gap: 1 }} justifyContent={'flex-end'}>
                <Grid item>
                  <BtnAdd 
                    id="BtnAdd_Stage1"
                    txt="Add"
                    IsDisabled={isDisable}
                    onClick={formStage1.handleSubmit((e) => handleAddStage1(),(err) => {
                      document.getElementById(Object.keys(err)[0])?.focus();
                      console.log("err", err)
                    })}
                  />
                </Grid>
              </Grid>
              <Grid xs={12} container sx={{ mt: 1, gap: 1 }} justifyContent={"center"} alignItems={"start"}>
                <Grid item>
                  <BtnSave 
                    id="BtnSubmit_ManageAssessmentInnovationStage1" 
                    onClick={formStage1.handleSubmit((e) => handleSaveDateStage1(),(err) => {
                      document.getElementById(Object.keys(err)[0])?.focus();
                      console.log("err", err)
                    })} />
                </Grid>
              </Grid>  
            </Grid>     
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  )
};

export default ManageAssessmentInnovationStage1;