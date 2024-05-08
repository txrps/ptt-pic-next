"use client";
import React, { useState, useEffect } from 'react';
import { Convert, DefaultArrayEmpty, formatNumber, parseFloatCheckValue } from "@/lib";
import { useForm } from "react-hook-form";
import { initRows, DefaultParamCol } from '@/components/STTable/STTable';
import { AxiosFn, usefnFail, FnDialog } from '@/lib/useAxios';
import { APIStatusCode } from '@/enum/enum';
import { ApiSuggestionScoring } from '@/enum/api';
import { SuggestionScoringItemProps, SuggestionScoringProps } from './interface';
import { Grid, IconButton, Tooltip } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { InputNumberFormat, SelectItem } from '@/components';
import { List as LINQ } from "linqts";

export const useSuggestionScoring = (props: SuggestionScoringProps) => {
    const DialogFn = FnDialog();

    const [isLoading, setIsLoading] = useState(false);
    const [isHiddenCol, setIsHiddenCol] = useState(false);    
    const [dataRow, setDataRow] = useState({
        ...initRows,
    });
    const [isPreview, setIsPreview] = useState(false);
    const [messagePopper, setMessagePopper] = useState("");
    const [nTotalScore, setnTotalScore] = useState(0);

    const form = useForm({
        shouldFocusError: true,
        mode: "all",
        defaultValues: {} as any,
    });

    useEffect(() => {
        if(props.nQtoolID !== 0 && (props.nPicQuestionID !== undefined)) handleGetDateTable(dataRow);
    }, [props.nQtoolID, props.nPicQuestionID]);

    // const handleGetDate = () => {
    //     AxiosFn.Get(ApiSuggestionScoring.GetDate, {nQtoolID: props.nQtoolID}, onGetDataSuccess, usefnFail({ DialogFn }));
    // };

    // const onGetDataSuccess = (result) => {
    //     DialogFn.UnBlockUI();
    //     if (result.nStatusCode === APIStatusCode.Success) {            
    //         handleGetDateTable(dataRow);
    //     } else if (result.nStatusCode === APIStatusCode.Warning) {
    //         DialogFn.Warning(result.sMessage);
    //     }
    //     return {};
    // };

    const handleGetDateTable = (p) => {
        setIsLoading(true);
        let oParam = {
            ...p,
            nQtoolID: props.nQtoolID,
            nPicQuestionID: props.nPicQuestionID,
        }
        AxiosFn.Post(ApiSuggestionScoring.GetDateTable, oParam, (result) => { onGetDataTableSuccess(result, p); }, usefnFail({ DialogFn }));
    };   

    const onGetDataTableSuccess = (result, p) => {
        DialogFn.UnBlockUI();
        if (result.nStatusCode === APIStatusCode.Success) {
            setIsLoading(false);
            setDataRow({
                ...p,
                arrRows: DefaultArrayEmpty(result.lstData),
                nDataLength: result.nDataLength
            });
            setnTotalScore(result.nTotalScore);
            setIsHiddenCol(result.isHiddenCol);
        } else if (result.nStatusCode === APIStatusCode.Warning) {
            DialogFn.Warning(result.sMessage);
        }
        return {};
    };

    const dataColumn: any = [
        {
            ...DefaultParamCol,
            field: "sQuestionnaire",
            headerName: `หัวข้อประเมิน`,
            bodyAlign: "left",
            flex: 1.5,
            width: "30%",
            sortable: false,
            isSort: false,
        },
        {
            ...DefaultParamCol,
            field: "sQuestion",
            headerName: `คำถาม`,
            bodyAlign: "left",
            flex: 1.5,
            width: "20%",
            sortable: false,
            isSort: false,
            isHiddenCol: isHiddenCol,
        },
        {
            ...DefaultParamCol,
            field: "sHint",
            headerName: `รายละเอียดในการพิจารณา`,
            bodyAlign: "left",
            flex: 0.5,
            width: "15%",
            sortable: false,
            isSort: false,
            getAction: (item) => {
                return [renderCellHint(item, handleClickHint, props.isDisable)];
            },
        },
        {
            ...DefaultParamCol,
            field: "nChoiceTypeID",
            headerName: `คะแนน`,
            flex: 3.5,
            width: "15%",
            sortable: false,
            isSort: false,
            getAction: (item) => {
                return [renderCellSelectItem(item, props.isDisable, props.disableMode, props.isSkeleton, handleChange)];
            },
        },
        {
            ...DefaultParamCol,
            field: "nWeigthScore",
            headerName: `น้ำหนัก`,
            flex: 1,
            width: "10%",
            sortable: false,
            isSort: false,
        },
        {
            ...DefaultParamCol,
            field: "nToatalWeigthScore",
            headerName: `รวม`,
            flex: 1,
            width: "10%",
            sortable: false,
            isSort: false,
            getAction: (item) => {
                return [formatNumber(item.nToatalWeigthScore, 2)];
            },
        }        
    ];

    const handleClickHint = (item) => {
        setIsPreview(true);
        setMessagePopper(item.sHint);
    };

    const handleChange = (event, item, isMode) => {
        // isMode = Number > true | Select > false
        if (isMode) //Number
        {
            item.nChoiceTypeDataID = null;
            item.nScore = event.target.value === undefined ? null : event.target.value;
            item.nToatalWeigthScore = item.nScore !== null ? parseFloat(item.nScore) * item.nWeigthScore : 0;       
        }
        else //Select
        {
            if (event != null) {
                item.nChoiceTypeDataID = Convert.StringToIntOrNull(event.value);
                item.nScore = event.nScore;
                item.nToatalWeigthScore = parseFloat(item.nScore) * item.nWeigthScore;         
            } else {
                item.nChoiceTypeDataID = null;
                item.nScore = null;
                item.nToatalWeigthScore = 0;         
            }
        }
        //จะหา % ทั้งหมด Sum (คะแนนที่ได้ตามค่าน้ำหนัก) * 100 (%) / คะแนนเต็ม 100
        let _nTotalScoreMax = formatNumber(new LINQ<any>(dataRow.arrRows || []).Sum(s => parseFloatCheckValue(s.nMax)), 2);
        let _nTotalScoreWeigth = formatNumber(new LINQ<any>(dataRow.arrRows || []).Sum(s => parseFloatCheckValue(s.nToatalWeigthScore)), 2);
        let _nTotalScore = (_nTotalScoreWeigth * 100) / _nTotalScoreMax; //85 * 100 / 95 = 89.47
        setnTotalScore(_nTotalScore);
    };

    useEffect(() => {
        //ส่งข้อมูลกลับ
        if (props.setnTotalScore) props.setnTotalScore(nTotalScore);
        if (props.setArrData && DefaultArrayEmpty(dataRow.arrRows).length > 0) 
        {
            const _arrData: SuggestionScoringItemProps[] = [];            
            DefaultArrayEmpty(dataRow.arrRows).forEach(iRows =>
            {
                _arrData.push({
                    nPicQuestionCategoryID: iRows.nPicQuestionCategoryID,
                    nPicQuestionID: iRows.nPicQuestionID,
                    nQuestionCategoryID: iRows.nQuestionCategoryID,
                    nScore: iRows.nScore,
                    nWeigthScore: iRows.nWeigthScore,
                    nToatalWeigthScore: iRows.nToatalWeigthScore,
                    nChoiceTypeDataID: iRows.nChoiceTypeDataID,
                });
            });            
            props.setArrData(_arrData);
        }
    }, [nTotalScore]);

    return { form, dataColumn, dataRow, isLoading, setIsLoading, handleGetDateTable, isPreview, setIsPreview, messagePopper, nTotalScore };
};

export const renderCellHint = ( item, handleClick, isDisable ) => {
    return (
        <>
            <Tooltip title={`ระดับคะแนน`}>
                <IconButton id={`btnHint_${item.nQuestionCategoryID}`} size="small" onClick={()=>{ handleClick(item); }} disabled={isDisable}>
                    <ErrorOutline style={{ color: "#6e130d" }} />
                </IconButton>
            </Tooltip>
            <span>{"ระดับคะแนน"}</span>
        </>
    )
};

export const renderCellSelectItem = ( item, isDisable, disableMode, isSkeleton, handleChange ) => {
    return (
        <Grid item xs={12}>
            {item.isEditMinMax ?
                <InputNumberFormat
                    name={`InputNumber_nChoiceTypeID_${item.nQuestionCategoryID}`}
                    label=""
                    maxDigits={2}
                    valueType="number"
                    IsSkeleton={isSkeleton}
                    required={item.isRequire}
                    disabled={isDisable}
                    disableMode={disableMode}
                    min={item.nMin}
                    max={item.nMax}
                    //IsShowMessageError={false}
                    onChange={(e)=>{ handleChange(e, item, true); }}
                    defaultValue={item.nScore}
                />
                :
                <SelectItem
                    name={`Select_nChoiceTypeID_${item.nQuestionCategoryID}`}
                    label={""}
                    IsSkeleton={isSkeleton}
                    required={item.isRequire}
                    disabled={isDisable}
                    disableMode={disableMode}
                    //IsShowMessageError={false}
                    placeholder='-- Select --'
                    options={DefaultArrayEmpty(item.lstOptionChoiceType)}
                    onChange={(e)=>{ handleChange(e, item, false); }}
                    defaultValue={item.nChoiceTypeDataID}
                />
            }
        </Grid>
    )
};