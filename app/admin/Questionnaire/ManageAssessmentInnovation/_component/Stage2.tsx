"use client";

import { useManageAssessmentInnovationStage2 } from '@/hooks/Admin/Questionnaire/useManageAssessmentInnovation';
import { Divider, FormLabel, Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { ManageAssessmentInnovationContext } from '../page';
import { FormProvider } from 'react-hook-form';
import { BtnAdd, BtnClose, BtnDelete, BtnSave } from '@/components/mui-elements/Button/ButtonAll';
import STTable from '@/components/STTable/STTable';
import { CheckboxItem, RadioListItem, TextBoxItem } from "@/components/input-element";
import { OptionsChoiceType, OptionsRequire } from '@/enum/enumSystem';
import SwitchFormItem from '@/components/input-element/Switch';
import { DefaultArrayEmpty } from '@/lib';
import { Add, Remove, Save } from '@mui/icons-material';

const ManageAssessmentInnovationStage2 = () => {
  
  const {
    nAssessmentInnovationID, 
    setNAssessmentInnovationID,
    setLstDataStage2,
    isDisable, 
    isSkeleton, 
    disableMode
} = useContext(ManageAssessmentInnovationContext);

  const {
    formStage2,
    dataRowStage2, 
    formStage2Answer,
    lstDataStage2Answer,
    handleSaveDateStage2, 
    dataColumn,
    isLoading,
    nStageID, 
    setNStageID, 
    handleAddDateStage2, 
    handleDeleteDateStage2,
    handleAddDateAnswerStage2,
    handleDeleteAnswerStage2,
    handleCheckDuplicateAnswerStage2,
  } = useManageAssessmentInnovationStage2({
    nAssessmentInnovationID, 
    setNAssessmentInnovationID,
    setLstDataStage2,
  });

  return (
    <Grid id={"myDivStage2"} container spacing={1} justifyContent={'flex-start'}>
      <Grid item xs={12}
        style={{
          padding: '5px',
          backgroundColor: '#0058a9',
          borderRadius: '8px',
          minHeight: '35px',
        }}
      >
        <Typography sx={{ pl: 2}} variant="h6" color='white'>Stage 2</Typography>
      </Grid>
      <Grid xs={12} container justifyContent={'flex-start'} alignItems={"start"}
        style={{
          padding: '2%',
          boxShadow: 'rgb(168 181 191 / 30%) 0px 1px 2px 0px, rgb(179 193 203 / 15%) 0px 2px 6px 2px',
          borderRadius: '8px',
        }}
      >
        <FormProvider {...formStage2}>
          <Grid sx={{ mt: 1, gap: 2}} container justifyContent={'center'}>
            {nStageID !== null &&
              <Grid container sx={{ gap: 2 }} justifyContent={'flex-start'} alignItems={"start"}
                style={{
                  padding: '2%',
                  backgroundColor: '#f6f6f6',
                  borderRadius: '8px',
                }}
              >
                <Grid item xs={12} md={12}>
                  <Typography>Order : {formStage2.getValues("nOrder")}</Typography>
                </Grid>
                <Grid item xs={12} container spacing={2} justifyContent={'flex-start'} alignItems={"start"}>
                  <Grid item xs={12} md={9}>
                    <TextBoxItem
                      label="Question"
                      name="sQuestion"
                      required={true}
                      maxLength={3000}
                      IsCharacterCount={true}
                      IsSkeleton={isSkeleton}
                      disabled={isDisable}
                      disableMode={disableMode}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <CheckboxItem
                      label="" //Required Field
                      name="isRequire"
                      required={false}
                      disabled={isDisable}
                      disableMode={disableMode}
                      IsSkeleton={isSkeleton}
                      options={OptionsRequire}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={4} justifyContent={'flex-start'} alignItems={"center"}>
                  <Grid item>
                    <FormLabel component="legend" sx={{ color: '#121212'}} focused={false}>{"ประเภทตัวเลือก"} <span style={{ color: "red" }}> * </span></FormLabel>
                  </Grid>
                  <Grid item>
                    <RadioListItem
                      label="ประเภทตัวเลือก"
                      name="nChoiceType"
                      required={true}
                      disabled={isDisable}
                      disableMode={disableMode}
                      IsSkeleton={isSkeleton}
                      options={OptionsChoiceType}
                      IsDisplayLabel={false}
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} container spacing={2} justifyContent={'flex-start'} alignItems={"start"}>
                  <Grid item xs={12}>
                    <Divider textAlign="left">Answer <span style={{ color: "red" }}> * </span></Divider>
                  </Grid>
                  <Grid item xs={12} container spacing={2} justifyContent={'flex-start'} alignItems={"start"}>
                    <FormProvider {...formStage2Answer}>
                      {DefaultArrayEmpty(lstDataStage2Answer).map((iAnswer, index) => {
                        let skey = "sKeyAnswer_" + iAnswer.nStageID + "_" + index;
                        return(
                          <Grid item container spacing={2} justifyContent={"flex-start"} alignItems={"start"} key={skey}>
                            <Grid item xs={9} md={10}>
                              <TextBoxItem
                                label=""
                                name={`sAnswer_${iAnswer.nAnswerID}`}
                                required={true}
                                maxLength={3000}
                                IsCharacterCount={true}
                                IsSkeleton={isSkeleton}
                                disabled={isDisable}
                                disableMode={disableMode}
                                onChange={(e) => { handleCheckDuplicateAnswerStage2(e, iAnswer.nAnswerID); }}
                              />
                            </Grid>                            
                            <Grid item xs={3} md={2}>
                              {!isDisable &&
                                <Grid container spacing={1}>
                                  {DefaultArrayEmpty(lstDataStage2Answer).length === (index + 1) &&
                                      <Grid item>
                                          <BtnAdd
                                            id={`AddAnswer_${iAnswer.nAnswerID}`}
                                            txt={'Add'}
                                            IsCircleWithOutText={true}
                                            icon={<Add/>}
                                            bgColor={"#40aa3a"}
                                            bgColorHover={"#2c9c26"}
                                            onClick={formStage2Answer.handleSubmit((e) => handleAddDateAnswerStage2(iAnswer.nStageID),(err) => {
                                                document.getElementById(Object.keys(err)[0])?.focus();
                                                console.log("err", err)
                                            })}
                                          />
                                      </Grid>
                                  }
                                  {DefaultArrayEmpty(lstDataStage2Answer).length > 1 &&
                                      <Grid item>
                                          <BtnDelete
                                            id={`DeleteAnswer_${iAnswer.nAnswerID}`}
                                            txt={'Delete'}
                                            IsCircleWithOutText={true}
                                            icon={<Remove/>}
                                            onClick={() => handleDeleteAnswerStage2(iAnswer.nAnswerID)}
                                          />
                                      </Grid>
                                  }
                                </Grid>
                              }
                            </Grid>
                          </Grid>
                        );
                      })}
                      <Grid item style={{ display: 'none', }}>
                        {!isDisable &&
                            <BtnAdd
                                id={"AddStage2Answer"}
                                onClick={formStage2Answer.handleSubmit((e) => ()=>{},(err) => {
                                    document.getElementById(Object.keys(err)[0])?.focus();
                                    console.log("err", err)
                                })}
                            />
                        }
                      </Grid>
                    </FormProvider>
                  </Grid>                  
                </Grid>
                <Grid item xs={12}>
                  <SwitchFormItem
                    label={"สถานะ"}
                    name={"isActive"}
                    required={true}
                    disabled={isDisable}
                    disableMode={disableMode}
                    IsSkeleton={isSkeleton}
                  />
                </Grid>
                <Grid xs={12} container sx={{ mt: 1, gap: 1 }} justifyContent={"center"} alignItems={"start"}>
                  <Grid item>
                    <BtnClose 
                      id="BtnClose_Stage2"
                      IsDisabled={isDisable}
                      onClick={(e) => { formStage2.reset(); setNStageID(null); }} 
                    />
                  </Grid>
                  <Grid item>
                    <BtnSave 
                      id="BtnSave_Stage2"
                      txt={nStageID === 0 ? "Add" : "Save"}
                      icon={nStageID === 0 ? <Add /> : <Save />}
                      bgColor={nStageID === 0 ? "#05a6e8" : "#33a64c"}
                      bgColorHover={nStageID === 0 ? "#05a6e8" : "#33a64c"}
                      IsDisabled={isDisable}
                      onClick={formStage2.handleSubmit((e) => handleAddDateStage2(nStageID),(err) => {
                          document.getElementById(Object.keys(err)[0])?.focus();
                          console.log("err", err)
                      })}
                    />
                  </Grid>
                </Grid> 
              </Grid>
            }
            <Grid container sx={{ mt: 1, gap: 2 }} justifyContent={'flex-start'}>
              <Grid item xs={12} style={{ marginTop: 3 }}>
                <STTable
                  width={"100%"}
                  column={dataColumn}
                  rows={dataRowStage2}
                  isLoading={isLoading}
                  onLoadData={(e)=>{}}
                  isMenu={true}
                  isPage={false}
                  isShowCheckBox={true}
                  onDelete={(e) => handleDeleteDateStage2(e)}
                  form={formStage2}
                  disabled={isDisable}
                  isSkeleton={isSkeleton}
                  disableMode={disableMode}
                />
              </Grid>
              <Grid xs={12} container sx={{ mt: 1, gap: 1 }} justifyContent={"center"} alignItems={"start"}>
                <Grid item>
                  <BtnSave id="BtnSubmit_ManageAssessmentInnovationStage2" onClick={handleSaveDateStage2} />
                </Grid>
              </Grid>  
            </Grid>     
          </Grid>
        </FormProvider>
      </Grid>
    </Grid>
  )
};

export default ManageAssessmentInnovationStage2;