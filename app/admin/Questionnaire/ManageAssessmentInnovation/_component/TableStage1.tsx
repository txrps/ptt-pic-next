"use client";

import React from 'react';
import STTable from '@/components/STTable/STTable';
import { ITableAnswerStage1Props } from '@/hooks/Admin/Questionnaire/interface';
import { useManageAssessmentInnovationStage1Answer } from '@/hooks/Admin/Questionnaire/useManageAssessmentInnovation';
import { Grid } from '@mui/material';

const TableStage1 = (props: ITableAnswerStage1Props) => {

  const {
    isLoading,  
    setIsLoading,    
    dataColumn,
    dataRowStage1Answer,
    handleDeleteAnswerStage1,
  } = useManageAssessmentInnovationStage1Answer(props);

  return (
    <Grid container sx={{ mt: 2, gap: 2 }} justifyContent={'flex-start'}>
      <STTable
        width={"100%"}
        name={"STTable_" + props.nStageID}
        form={props.formStage1Answer}
        column={dataColumn}
        rows={dataRowStage1Answer}
        isLoading={isLoading}
        setLoadingTable={setIsLoading}
        onLoadData={(e)=>{}}
        isMenu={true}
        isPage={false}
        isShowCheckBox={true}
        onDelete={(e) => handleDeleteAnswerStage1(e) }
        disabled={props.isDisable}
        isSkeleton={props.isSkeleton}
        disableMode={props.disableMode}
      />
    </Grid>
  )
};

export default TableStage1;