"use client";

import { TextAreaItem } from '@/components/input-element';
import { Avatar, Box, Divider, Grid, Typography } from '@mui/material';
import React, { Fragment, useContext } from 'react';
import { AssessmentInnovationContext } from './AssessmentInnovation';
import { FormProvider } from 'react-hook-form';
import { DefaultArrayEmpty, ParseHtml } from '@/lib';
import { EnumGroupUser } from '@/enum/enumSystem';

const AssessmentInnovationComment = ({ nStage }) => { 

    const {
        form,
        ObjDataDetail,
    } = useContext(AssessmentInnovationContext);

  return (
    <Grid container spacing={2} justifyContent={'flex-start'}>
        <FormProvider {...form}>         
            <Grid item xs={12} md={12}>        
                <Divider textAlign="left">หมายเหตุ</Divider>
            </Grid>
            <Grid item xs={12} md={6}>
                <TextAreaItem
                    id={'sComment_' + nStage}
                    name={'sComment_' + nStage}
                    required={false}
                    label={''}
                    maxLength={3000}
                    row={3}
                />
            </Grid>
            <Grid item xs={12} md={6} container spacing={1}>
            {DefaultArrayEmpty(nStage === 1 ? ObjDataDetail?.lstDataCommentStage1 : ObjDataDetail?.lstDataCommentStage2).map((iComment, i) => {
                let sKey = "sKeyComment_" + nStage + "_" + iComment.nGroupID;
                return (
                    <Grid item xs={12} md={12} container spacing={1} justifyContent={'flex-start'} key={sKey} 
                        style={{ 
                            margin: '1%',
                            padding: '1%',
                            backgroundColor: '#fff',
                            boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
                            borderRadius: '8px',
                        }}
                    >                            
                        <Grid item xs={2} md={1} container spacing={1} justifyContent={'center'} alignItems={'center'} direction='column'>
                            <Avatar style={{ width: "42px", height: "42px", color: "white", backgroundColor: (iComment.nGroupID === EnumGroupUser.QSHE_BA ? '#b0e2b2' : (iComment.nGroupID === EnumGroupUser.InnovationCommittee ? '#fccff8' : '#b0b6e2') ) }} src={"/static/images/avatar/2.jpg"} />               
                        </Grid>
                        <Grid item xs={10} md={11} container spacing={1} justifyContent={'flex-start'}>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ pl: 1 }} variant='subtitle2'>{iComment.sGroupName}</Typography>                 
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Typography sx={{ pl: 1, fontSize: '0.8rem' }} variant='body2' color={"#b8b9c1"}>{ParseHtml(iComment.sComment)}</Typography>  
                            </Grid>
                        </Grid>
                    </Grid>
                )})
            }
            </Grid>
        </FormProvider>  
    </Grid>
  )
};

export default AssessmentInnovationComment;