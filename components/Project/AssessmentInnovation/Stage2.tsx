"use client";

import { AssessmentInnovationProps } from '@/hooks/Project/interface';
import { useAssessmentInnovation } from '@/hooks/Project/useAssessmentInnovation';
import { Grid, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { AssessmentInnovationContext } from './AssessmentInnovation';
import { FormProvider } from 'react-hook-form';
import STTable from '@/components/STTable/STTable';
import AssessmentInnovationComment from './Comment';

const AssessmentInnovationStage2 = () => {

  const {
    form,
    dataColumnStage2,
    dataRowStage2,
    isLoading,
    setIsLoading,
    handleGetDateTable,
  } = useContext(AssessmentInnovationContext);

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
        <Typography sx={{ pl: 2}} variant="h6" color='white'>Stage 2 Idea/Improvement Project to PTT Innovation</Typography>
      </Grid>
      <Grid item xs={12} 
        style={{
          padding: '1%',
          backgroundColor: '#f6f6f6',
          boxShadow: 'rgb(168 181 191 / 30%) 0px 1px 2px 0px, rgb(179 193 203 / 15%) 0px 2px 6px 2px',
          borderRadius: '8px',
        }}
      >
        <Grid item xs={12}>
          <FormProvider {...form}>
            <Grid item xs={12} style={{ marginTop: 3 }}>
              <STTable
                width={"100%"}
                column={dataColumnStage2}
                rows={dataRowStage2}
                isLoading={isLoading}
                onLoadData={handleGetDateTable}
                isMenu={true}
                isShowCheckBox={false}
                onDelete={undefined}
                form={form}
                isPage={false}
                setLoadingTable={setIsLoading}
              />
            </Grid>
          </FormProvider>
        </Grid>
        <Grid item xs={12}>
          <AssessmentInnovationComment nStage={2}/>
        </Grid>
      </Grid>
    </Grid>
  )
};

export default AssessmentInnovationStage2;