"use client";

import { Grid, Typography } from '@mui/material';
import React from 'react';
import STTable from '../STTable/STTable';
import { useSuggestionScoring } from '@/hooks/Project/useSuggestionScoring';
import { SuggestionScoringProps } from '@/hooks/Project/interface';
// import RenderCellPopover from '../mui-elements/Popover/RenderCellPopover';
import { FormProvider } from 'react-hook-form';
import DialogPreview from '../mui-elements/DialogPreview/DialogPreview';
import { ParseHtml } from '@/lib';
import { BtnSubmit } from '../mui-elements/Button/ButtonAll';

const SuggestionScoring = (props: SuggestionScoringProps) => {

  const {
    form,
    dataColumn,
    dataRow,
    isLoading,
    setIsLoading,
    handleGetDateTable,
    isPreview, 
    setIsPreview, 
    messagePopper,
    nTotalScore,
  } = useSuggestionScoring(props);

  return (
    <Grid container spacing={1} justifyContent={'flex-start'}>
      <Grid item xs={12}>
        <FormProvider {...form}>
          <Grid item xs={12} style={{ marginTop: 3 }}>
            <STTable
              width={"100%"}
              column={dataColumn}
              rows={dataRow}
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
          <Grid xs={12} container spacing={1} justifyContent={"flex-end"} alignItems={"start"}>
            <Grid item xs={11} container spacing={1} justifyContent={"flex-end"} alignItems={"start"}>
              <Typography sx={{ p: 2 }}>คะแนนที่ได้คิดเป็น</Typography>
            </Grid>
            <Grid item xs={1} container spacing={1} justifyContent={"center"} alignItems={"start"}>
              <Typography sx={{ p: 2 }}>{nTotalScore + "%"}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12} container spacing={1} justifyContent={"flex-end"} alignItems={"start"}> 
          {/* style={{ display: 'none'}} */}
            <BtnSubmit id="BtnSubmit_SuggestionScoring"
              onClick={form.handleSubmit((e) => console.log("Suggestion Scoring Success"),(err) => {
                document.getElementById(Object.keys(err)[0])?.focus();
                console.log("err", err);
              })}
            />
            {/* document.getElementById("BtnSubmit_SuggestionScoring").click(); */}
          </Grid>
          {/* <RenderCellPopover
            anchorEl={isPreview}
            setAnchorEl={setIsPreview}
            MessagePopper={messagePopper}
          /> */}
          <DialogPreview
            IsOpen={isPreview}
            Title={"ระดับคะแนน"}
            onClose={() => { setIsPreview(false); }}
            sMaxWidth='lg'
            CloseSave={true}
          >
            <Typography sx={{ p: 2 }}>{ParseHtml(messagePopper)}</Typography>
          </DialogPreview>
        </FormProvider>
      </Grid>
    </Grid>
  )
};
export default SuggestionScoring;