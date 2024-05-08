"use client";
import React, { useState, useEffect } from 'react';
import { Convert, DefaultArrayEmpty, formatNumber, parseFloatCheckValue } from "@/lib";
import { useForm } from "react-hook-form";
import { DefaultParamCol, initRows } from '@/components/STTable/STTable';
import { AxiosFn, FnDialog, usefnFail } from '@/lib/useAxios';
import { AssessmentInnovationItemProps, AssessmentInnovationProps } from './interface';
import { ApiAssessmentInnovation } from '@/enum/api';
import { APIStatusCode } from '@/enum/enum';
import { Grid, Typography } from '@mui/material';
import { MultiSelectItem, SelectItem } from '@/components';
import { List as LINQ } from "linqts";
import { EnumGroupUser } from '@/enum/enumSystem';

export const useAssessmentInnovation = (props: AssessmentInnovationProps) => {
    const DialogFn = FnDialog();

    const [isLoading, setIsLoading] = useState(false);
    const [dataRowStage1, setDataRowStage1] = useState({
        ...initRows,
    });
    const [dataRowStage2, setDataRowStage2] = useState({
        ...initRows,
    });

    const [isHiddenCol_Self, setIsHiddenCol_Self] = useState(false);
    const [isHiddenCol_BA, setIsHiddenCol_BA] = useState(false);
    const [isHiddenCol_Innovation, setIsHiddenCol_Innovation] = useState(false); 

    const [nAssessmentInnovationID, setNAssessmentInnovationID] = useState(0);
    const [nPicAssessmentInnovationID, setNPicAssessmentInnovationID] = useState(0);
    const [ObjDataDetail, setObjDataDetail] = useState(null);    
    
    const form = useForm({
        shouldUnregister: false,
        shouldFocusError: true,
        mode: "all",
    });

    useEffect(() => {
        handleSetMode(props.nGroupID);
    }, [props.nGroupID]);

    const handleSetMode = (nGroupID) => {
        if (nGroupID === EnumGroupUser.Administrator) {
            setIsHiddenCol_Self(true);
            setIsHiddenCol_BA(false);
            setIsHiddenCol_Innovation(false);
        }
        else if (nGroupID === EnumGroupUser.QSHE_BA) 
        {
            setIsHiddenCol_Self(true);
            setIsHiddenCol_BA(true);
            setIsHiddenCol_Innovation(false);
        }
        else if (nGroupID === EnumGroupUser.InnovationCommittee) 
        {
            setIsHiddenCol_Self(true);
            setIsHiddenCol_BA(true);
            setIsHiddenCol_Innovation(true);
        }
    }

    useEffect(() => {
        if ((props.nPicAssessmentInnovationID !== null && props.nGroupID !== undefined) || props.nGroupID !== undefined) {
            handleGetDateTable(dataRowStage1);
        }
    }, [props.nPicAssessmentInnovationID, props.nGroupID]);

    const handleGetDateTable = (p) => {
        setIsLoading(true);
        let oParam = {
            ...p,
            nPicAssessmentInnovationID: props.nPicAssessmentInnovationID,
            nGroupID: props.nGroupID,
        }
        AxiosFn.Post(ApiAssessmentInnovation.GetDateTable, oParam, (result) => { onGetDataTableSuccess(result, p); }, usefnFail({ DialogFn }));
    };

    const onGetDataTableSuccess = (result, p) => {
        DialogFn.UnBlockUI();
        if (result.nStatusCode === APIStatusCode.Success) {
            setIsLoading(false);
            setDataRowStage1({
                ...p,
                arrRows: DefaultArrayEmpty(result.lstDataStage1),
                nDataLength: result.nDataLength
            });
            setDataRowStage2({
                ...p,
                arrRows: DefaultArrayEmpty(result.lstDataStage2),
                nDataLength: result.nDataLength
            });
            setObjDataDetail(result.ObjDataDetail);
            setNAssessmentInnovationID(result.ObjDataDetail?.nAssessmentInnovationID);
            setNPicAssessmentInnovationID(result.ObjDataDetail?.nPicAssessmentInnovationID);            
        } else if (result.nStatusCode === APIStatusCode.Warning) {
            DialogFn.Warning(result.sMessage);
        }
        return {};
    };

    const dataColumnStage1 : any = [
        {
            ...DefaultParamCol,
            field: "sQuestion",
            headerName: `หัวข้อประเมิน`,
            bodyAlign: "left",
            flex: 1.5,
            width: "28%",
            sortable: false,
            isSort: false,
        },
        {
            ...DefaultParamCol,
            field: "nAssessmentInnovationStage1AnswerID",
            headerName: `รายละอียดการพิจารณา`,
            // bodyAlign: "right",
            // bodyAlign: "left",
            flex: 0.5,
            width: "27%",
            sortable: false,
            isSort: false,
            // isHiddenCol: !isHiddenCol_Self,
            getAction: (item) => {
                if (item.nAssessmentInnovationStage1ID !== 0) {
                    return [renderCellSelectItemAnswerStage1(item, props.nGroupID, props.isDisable, props.disableMode, props.isSkeleton, handleChangeStage1)];
                } else {
                    return <Typography sx={{ p: 0.5 }} gutterBottom variant="body1" fontWeight="bold" >คะแนนรวม</Typography>;
                }
            },
        },
        {
            ...DefaultParamCol,
            field: "nWeightScore_Self",
            headerName: `Self-Assessment`,
            flex: 1,
            width: "15%",
            sortable: false,
            isSort: false,
            isHiddenCol: !isHiddenCol_Self,
            getAction: (item) => {
                return [formatNumber(item.nWeightScore_Self, 2)];
            },
        },
        {
            ...DefaultParamCol,
            field: "nWeightScore_QSHE_BA",
            headerName: `QSHE BA`,
            flex: 1,
            width: "15%",
            sortable: false,
            isSort: false,
            isHiddenCol: !isHiddenCol_BA,
            getAction: (item) => {
                return [formatNumber(item.nWeightScore_QSHE_BA, 2)];
            },
        },
        {
            ...DefaultParamCol,
            field: "nWeightScore_Innovation",
            headerName: `Innovation Committee`,
            flex: 1,
            width: "15%",
            sortable: false,
            isSort: false,
            isHiddenCol: !isHiddenCol_Innovation,
            getAction: (item) => {
                return [formatNumber(item.nWeightScore_Innovation, 2)];
            },
        },            
    ];

    const dataColumnStage2 : any = [
        {
            ...DefaultParamCol,
            field: "sQuestion",
            headerName: `หัวข้อประเมิน`,
            bodyAlign: "left",
            flex: 1.5,
            width: "22%",
            sortable: false,
            isSort: false,
            getAction: (item) => {
                return <span>{item.sQuestion}<span style={{color: 'red'}}>{item.isRequire ? " *" : ""}</span></span>;
            },
        },
        {
            ...DefaultParamCol,
            field: "nAssessmentInnovationStage2AnswerID_Self",
            headerName: `Self-Assessment`,
            bodyAlign: "left",
            flex: 1,
            width: "26%",
            sortable: false,
            isSort: false,
            isHiddenCol: !isHiddenCol_Self,
            getAction: (item) => {
                return [renderCellSelectItemAnswerStage2(item, props.nGroupID, (isHiddenCol_Self && props.nGroupID !== EnumGroupUser.Administrator), EnumGroupUser.Administrator, props.disableMode, props.isSkeleton, handleChangeStage2)];
            },
        },
        {
            ...DefaultParamCol,
            field: "nAssessmentInnovationStage2AnswerID_QSHE_BA",
            headerName: `QSHE BA`,
            bodyAlign: "left",
            flex: 1,
            width: "26%",
            sortable: false,
            isSort: false,
            isHiddenCol: !isHiddenCol_BA,
            getAction: (item) => {
                return [renderCellSelectItemAnswerStage2(item, props.nGroupID, (isHiddenCol_BA && props.nGroupID !== EnumGroupUser.QSHE_BA), EnumGroupUser.QSHE_BA, props.disableMode, props.isSkeleton, handleChangeStage2)];
            },
        },
        {
            ...DefaultParamCol,
            field: "nAssessmentInnovationStage2AnswerID_Innovation",
            headerName: `Innovation Committee`,
            bodyAlign: "left",
            flex: 1,
            width: "26%",
            sortable: false,
            isSort: false,
            isHiddenCol: !isHiddenCol_Innovation,
            getAction: (item) => {
                return [renderCellSelectItemAnswerStage2(item, props.nGroupID, (isHiddenCol_Innovation && props.nGroupID !== EnumGroupUser.InnovationCommittee), EnumGroupUser.InnovationCommittee, props.disableMode, props.isSkeleton, handleChangeStage2)];
            },
        },            
    ];
    
    const handleChangeStage1 = (event, nGroupID, item) => {
        let lstStage1 = DefaultArrayEmpty(dataRowStage1.arrRows);
        let indEdit = lstStage1.findIndex(f => f.nAssessmentInnovationStage1ID === item.nAssessmentInnovationStage1ID);
        if (event != null) {
            lstStage1[indEdit].nAssessmentInnovationStage1AnswerID = Convert.StringToIntOrNull(event.value);
            lstStage1[indEdit].nWeightScore = parseFloat(event.sValue2);
        } else {
            lstStage1[indEdit].nAssessmentInnovationStage1AnswerID = null;
            lstStage1[indEdit].nWeightScore = null;    
        }
        switch(nGroupID)
        {
            case EnumGroupUser.Administrator: //Self-Assessment
                lstStage1[indEdit].nWeightScore_Self = lstStage1[indEdit].nWeightScore;
                break;
            case EnumGroupUser.QSHE_BA:
                lstStage1[indEdit].nWeightScore_QSHE_BA = lstStage1[indEdit].nWeightScore;
                break;
            case EnumGroupUser.InnovationCommittee:
                lstStage1[indEdit].nWeightScore_Innovation = lstStage1[indEdit].nWeightScore;
                break;
        }            

        //จะหา Sum ทั้งหมด
        let _nTotalWeightScore_Self = new LINQ<any>(lstStage1 || []).Where(w=> w.nAssessmentInnovationStage1ID !== 0).Sum(s => parseFloatCheckValue(s.nWeightScore_Self));
        let _nTotalWeightScore_QSHE_BA = new LINQ<any>(lstStage1 || []).Where(w=> w.nAssessmentInnovationStage1ID !== 0).Sum(s => parseFloatCheckValue(s.nWeightScore_QSHE_BA));
        let _nTotalWeightScore_Innovation = new LINQ<any>(lstStage1 || []).Where(w=> w.nAssessmentInnovationStage1ID !== 0).Sum(s => parseFloatCheckValue(s.nWeightScore_Innovation));
        let _nTotalWeightScore = _nTotalWeightScore_Self + _nTotalWeightScore_QSHE_BA + _nTotalWeightScore_Innovation;

        let indEditSum = lstStage1.findIndex(f => f.nAssessmentInnovationStage1ID === 0);
        lstStage1[indEditSum].nWeightScore_Self = _nTotalWeightScore_Self;
        lstStage1[indEditSum].nWeightScore_QSHE_BA = _nTotalWeightScore_QSHE_BA;
        lstStage1[indEditSum].nWeightScore_Innovation = _nTotalWeightScore_Innovation;
        lstStage1[indEditSum].nWeightScore = _nTotalWeightScore;

        setDataRowStage1({
            ...initRows,
            arrRows: DefaultArrayEmpty([...lstStage1]),
            nDataLength: DefaultArrayEmpty([...lstStage1]).length
        });
    };

    const handleChangeStage2 = (event, nGroupID, item, isMulti) => {
        let lstStage2 = DefaultArrayEmpty(dataRowStage2.arrRows);
        let indEdit = lstStage2.findIndex(f => f.nAssessmentInnovationStage1ID === item.nAssessmentInnovationStage1ID);
        if (event != null) {
            if (!isMulti) {
                lstStage2[indEdit].nAssessmentInnovationStage2AnswerID = Convert.StringToIntOrNull(event.value);
                lstStage2[indEdit].lstDataStage2AnswerID = [];
            } else {
                lstStage2[indEdit].nAssessmentInnovationStage2AnswerID = null;
                lstStage2[indEdit].lstDataStage2AnswerID = event.map(value => Convert.StringToInt(value));
            }
        } else {
            lstStage2[indEdit].nAssessmentInnovationStage2AnswerID = null;
            lstStage2[indEdit].lstDataStage2AnswerID = []; 
        }
        switch(nGroupID)
        {
            case EnumGroupUser.Administrator: //Self-Assessment
                lstStage2[indEdit].nAssessmentInnovationStage2AnswerID_Self = !isMulti ? lstStage2[indEdit].nAssessmentInnovationStage2AnswerID : null;
                lstStage2[indEdit].lstDataStage2AnswerID_Self = isMulti ? lstStage2[indEdit].lstDataStage2AnswerID : [];
                break;
            case EnumGroupUser.QSHE_BA:
                lstStage2[indEdit].nAssessmentInnovationStage2AnswerID_QSHE_BA = !isMulti ? lstStage2[indEdit].nAssessmentInnovationStage2AnswerID : null;
                lstStage2[indEdit].lstDataStage2AnswerID_QSHE_BA = isMulti ? lstStage2[indEdit].lstDataStage2AnswerID : [];
                break;
            case EnumGroupUser.InnovationCommittee:
                lstStage2[indEdit].nAssessmentInnovationStage2AnswerID_Innovation = !isMulti ? lstStage2[indEdit].nAssessmentInnovationStage2AnswerID : null;
                lstStage2[indEdit].lstDataStage2AnswerID_Innovation = isMulti ? lstStage2[indEdit].lstDataStage2AnswerID : [];
                break;
        }
        setDataRowStage2({
            ...initRows,
            arrRows: DefaultArrayEmpty([...lstStage2]),
            nDataLength: DefaultArrayEmpty([...lstStage2]).length
        });
    };
 
    useEffect(() => {
        //ส่งข้อมูลกลับ
        if (props.setObjData) handleSetDataStage(dataRowStage1, dataRowStage2, form.getValues('sComment_1'), form.getValues('sComment_2'));
    }, [dataRowStage1, dataRowStage2, form.watch('sComment_1'), form.watch('sComment_2')]);

    const handleSetDataStage = (dataRowStage1, dataRowStage2, sComment_1, sComment_2) => {
        //ส่งข้อมูลกลับ
        const _ObjData: AssessmentInnovationItemProps = {
            nAssessmentInnovationID: ObjDataDetail?.nAssessmentInnovationID,
            nVersionID: ObjDataDetail?.nVersionID,
            
            lstDataStage1: dataRowStage1.arrRows,
            sCommentStage1: sComment_1,
    
            lstDataStage2: dataRowStage2.arrRows,
            sCommentStage2: sComment_2,
        };            
        props.setObjData(_ObjData);
    }

    return { form, ObjDataDetail, dataColumnStage1, dataRowStage1, dataColumnStage2, dataRowStage2, isLoading, setIsLoading, handleGetDateTable };
};

export const renderCellSelectItemAnswerStage1 = ( item, nGroupID, isDisable, disableMode, isSkeleton, handleChangeStage1 ) => {
    return (
        <Grid item xs={12}>
            <SelectItem
                name={`Select_nTypeID_${item.nAssessmentInnovationStage1ID}`}
                label={""}
                IsSkeleton={isSkeleton}
                required={!isDisable}
                disabled={isDisable}
                disableMode={disableMode}
                //IsShowMessageError={false}
                placeholder='-- Select --'
                options={DefaultArrayEmpty(item.arrDataDropDownStage1Answer)}
                onChange={(e)=>{ handleChangeStage1(e, nGroupID, item); }}
                defaultValue={item.nAssessmentInnovationStage1AnswerID}
            />
        </Grid>
    )
};

export const renderCellSelectItemAnswerStage2 = ( item, nGroupID, isDisable, nGroupUser, disableMode, isSkeleton, handleChangeStage2 ) => {
    let nAssessmentInnovationStage2AnswerID = item.nAssessmentInnovationStage2AnswerID;
    let lstDataStage2AnswerID = item.lstDataStage2AnswerID;
    switch (nGroupUser)
    {
        case EnumGroupUser.Administrator: //Self-Assessment
            nAssessmentInnovationStage2AnswerID = item.nChoiceType === 0 ? item.nAssessmentInnovationStage2AnswerID_Self : null;
            lstDataStage2AnswerID = item.nChoiceType === 1 ? item.lstDataStage2AnswerID_Self : [];
            break;
        case EnumGroupUser.QSHE_BA:
            nAssessmentInnovationStage2AnswerID = item.nChoiceType === 0 ? item.nAssessmentInnovationStage2AnswerID_QSHE_BA : null;
            lstDataStage2AnswerID = item.nChoiceType === 1 ? item.lstDataStage2AnswerID_QSHE_BA : [];
            break;
        case EnumGroupUser.InnovationCommittee:
            nAssessmentInnovationStage2AnswerID = item.nChoiceType === 0 ? item.nAssessmentInnovationStage2AnswerID_Innovation : null;
            lstDataStage2AnswerID = item.nChoiceType === 1 ? item.lstDataStage2AnswerID_Innovation : [];
            break;
    }

    return (
        <Grid item xs={12}>
            {item.nChoiceType === 1 ? //0 = ตัวเลือกเดียว, 1 = หลายตัวเลือก
                <MultiSelectItem
                    name={`MultiSelect_nAnswerID_${nGroupUser}_${item.nAssessmentInnovationStage2ID}`}
                    label={""}
                    IsSkeleton={isSkeleton}
                    required={item.isRequire}
                    disabled={isDisable}
                    disableMode={disableMode}
                    limitTag={1}
                    placeholder='-- Select --'
                    options={DefaultArrayEmpty(item.arrDataDropDownStage2Answer)}
                    onChange={(e)=>{ handleChangeStage2(e, nGroupID, item, true); }}
                    defaultValue={lstDataStage2AnswerID}
                />
            :
                <SelectItem
                    name={`Select_nAnswerID_${nGroupUser}_${item.nAssessmentInnovationStage2ID}`}
                    label={""}
                    IsSkeleton={isSkeleton}
                    required={item.isRequire}
                    disabled={isDisable}
                    disableMode={disableMode}
                    //IsShowMessageError={false}
                    placeholder='-- Select --'
                    options={DefaultArrayEmpty(item.arrDataDropDownStage2Answer)}
                    onChange={(e)=>{ handleChangeStage2(e, nGroupID, item, false); }}
                    defaultValue={nAssessmentInnovationStage2AnswerID}
                />
            }
        </Grid>
    )
};