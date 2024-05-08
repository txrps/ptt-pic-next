"use client";

import { AssessmentInnovationProps } from '@/hooks/Project/interface';
import { useAssessmentInnovation } from '@/hooks/Project/useAssessmentInnovation';
import { Grid } from '@mui/material';
import React, { createContext, useMemo } from 'react';
import AssessmentInnovationStage1 from './Stage1';
import AssessmentInnovationStage2 from './Stage2';
import { BtnSubmit } from '@/components/mui-elements/Button/ButtonAll';

const AssessmentInnovationContext = createContext(null);
const AssessmentInnovation = (props: AssessmentInnovationProps) => {

    const {
        form,
        ObjDataDetail,
        dataColumnStage1,
        dataRowStage1,
        dataColumnStage2,
        dataRowStage2,
        isLoading,
        setIsLoading,
        handleGetDateTable,
    } = useAssessmentInnovation(props);

  return (
    <AssessmentInnovationContext.Provider
        value={useMemo(() => ({
            form: form,
            ObjDataDetail: ObjDataDetail,
            dataColumnStage1: dataColumnStage1,
            dataRowStage1: dataRowStage1,
            dataColumnStage2: dataColumnStage2,
            dataRowStage2: dataRowStage2,
            isLoading: isLoading,
            setIsLoading: setIsLoading,
            handleGetDateTable: handleGetDateTable,
        }), 
        [
            form,
            ObjDataDetail,
            dataColumnStage1,
            dataRowStage1,
            dataColumnStage2,
            dataRowStage2,
            isLoading,
            setIsLoading,
            handleGetDateTable,
        ])} 
    >
        <Grid item xs={12} md={12} container spacing={3} justifyContent={'flex-start'}>
            <Grid item xs={12}>        
                <AssessmentInnovationStage1/>
            </Grid>
            {props.nScore >= 80 &&
                <Grid item xs={12}>                    
                   <AssessmentInnovationStage2/>
                </Grid>
            }
            <Grid item xs={12} container spacing={1} justifyContent={"flex-end"} alignItems={"start"}> 
                <BtnSubmit id="BtnSubmit_AssessmentInnovation"
                    onClick={form.handleSubmit((e) => console.log("Assessment Innovation Success"),(err) => {
                        document.getElementById(Object.keys(err)[0])?.focus();
                        console.log("err", err);
                    })}
                />
          </Grid>
        </Grid>
    </AssessmentInnovationContext.Provider>
  )
};

export default AssessmentInnovation;
export { AssessmentInnovationContext };