"use client";
import React, { useState, useEffect } from 'react';
import { Convert, DefaultArrayEmpty} from "@/lib";
import { FormProvider, useForm } from "react-hook-form";
import { DefaultParamCol, initRows } from '@/components/STTable/STTable';
import { AxiosFn, FnDialog, usefnFail } from '@/lib/useAxios';
import { ApiManageAssessmentInnovation } from '@/enum/api';
import { APIStatusCode } from '@/enum/enum';
import { List as LINQ } from "linqts";
import { IDetailStage1Props, IDetailAnswerStage1Props, ManageAssessmentInnovationStage1Props, ManageAssessmentInnovationStage2Props, IDetailAnswerStage2Props, IDetailStage2Props, ITableAnswerStage1Props } from './interface';
import { BtnAdd, BtnEdit } from '@/components/mui-elements/Button/ButtonAll';
import ChangeOrder from '@/components/input-element/Select/ChangeOrder';
import { InputNumberFormat, TextAreaItem, TextBoxItem } from '@/components';
import { Grid } from '@mui/material';
import SwitchFormItem from '@/components/input-element/Switch';

export const useManageAssessmentInnovationStageAll = () => {
    const DialogFn = FnDialog();

    const [isDisable, setIsDisable] = useState(false);
    const [isSkeleton, setIsSkeleton] = useState(false);
    const [disableMode, setDisableMode] = useState("text");

    const [nAssessmentInnovationID, setNAssessmentInnovationID] = useState(0);
    const [lstDataStage1, setLstDataStage1] = useState([]);
    const [lstDataStage2, setLstDataStage2] = useState([]);
    const [nMinScore, setNMinScore] = useState(null);
    const [nMaxScore, setNMaxScore] = useState(null);

    useEffect(() => {
        //Check Permission
        // setIsDisable();
    }, []);

    const handleSaveDateStageAll = () => {
        let isError = false;
        let sMgeError = "กรุณาเพิ่มข้อมูลในส่วน <br/>";
        if (DefaultArrayEmpty(lstDataStage1).length === 0) {
            isError = true;
            sMgeError += " - Stage 1 อย่างน้อย 1 หัวข้อพิจารณา <br/>";
        }
        if (DefaultArrayEmpty(lstDataStage2).length === 0) {
            isError = true;
            sMgeError += " - Stage 2 อย่างน้อย 1 รายการ <br/>";
        }
        if (isError) {
            return DialogFn.Warning(sMgeError);
        }

        DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
            DialogFn.BlockUI();
            let oParam = {
                nAssessmentInnovationID: nAssessmentInnovationID,
                lstDataStage1: DefaultArrayEmpty(lstDataStage1),
                nMinScore: Convert.StringToFloat(nMinScore),
                nMaxScore: Convert.StringToFloat(nMaxScore),
                lstDataStage2: DefaultArrayEmpty(lstDataStage2),
            };
            AxiosFn.Post(ApiManageAssessmentInnovation.SaveDateStageAll, oParam, (result) => { onSaveDateStageSuccess(result, DialogFn); }, usefnFail({ DialogFn }));
        });
    };

    return { nAssessmentInnovationID, setNAssessmentInnovationID, handleSaveDateStageAll, setLstDataStage1, setLstDataStage2, setNMinScore, setNMaxScore, isDisable, isSkeleton, disableMode };
};

const onSaveDateStageSuccess = (result, DialogFn) => {
    DialogFn.UnBlockUI();
    if (result.nStatusCode === APIStatusCode.Success) {
        DialogFn.UnBlockUI();
        DialogFn.Success("บันทึกสำเร็จ");
        // window.location.reload();
    } else if (result.nStatusCode === APIStatusCode.Warning) {
        DialogFn.Warning(result.sMessage);
    }
    return {};
};

//#region Stage 1
export const useManageAssessmentInnovationStage1 = (props: ManageAssessmentInnovationStage1Props) => {
    const DialogFn = FnDialog();

    const formStage1 = useForm({
        shouldUnregister: false,
        shouldFocusError: true,
        mode: "all",
    });

    const formStage1Answer = useForm({
        shouldUnregister: false,
        shouldFocusError: true,
        mode: "all",
    });

    const [lstDataStage1, setLstDataStage1] = useState([]);

    useEffect(() => {
        handleGetDateStage1();
    }, []);

    const handleGetDateStage1 = () => {
        AxiosFn.Get(ApiManageAssessmentInnovation.GetDateStage1, {}, (result) => { onGetDateStage1Success(result); }, usefnFail({ DialogFn }));
    };

    const onGetDateStage1Success = (result) => {
        DialogFn.UnBlockUI();
        if (result.nStatusCode === APIStatusCode.Success) {
            props.setNAssessmentInnovationID(result.nAssessmentInnovationID);
            props.setNMinScore(result.nMinScore);
            props.setNMaxScore(result.nMaxScore);   
            props.setLstDataStage1(result.lstDataStage1);
            formStage1.setValue("nMinScore", result.nMinScore);
            formStage1.setValue("nMaxScore", result.nMaxScore);
            setLstDataStage1(result.lstDataStage1);
            if(DefaultArrayEmpty(result.lstDataStage1).length === 0) handleAddStage1();
        } else if (result.nStatusCode === APIStatusCode.Warning) {
            DialogFn.Warning(result.sMessage);
        }
        return {};
    };

    const handleSaveDateStage1 = () => {
        if (DefaultArrayEmpty(lstDataStage1).length === 0) {
            return DialogFn.Warning("กรุณาเพิ่มข้อมูลอย่างน้อย 1 หัวข้อพิจารณา");
        }
        DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
            let oParam = {
                nAssessmentInnovationID: props.nAssessmentInnovationID,
                lstDataStage1: DefaultArrayEmpty(lstDataStage1),
                nMinScore: Convert.StringToFloatOrNull(formStage1.getValues("nMinScore")),
                nMaxScore: Convert.StringToFloatOrNull(formStage1.getValues("nMaxScore")),
            };
            AxiosFn.Post(ApiManageAssessmentInnovation.SaveDateStage1, oParam, (result) => { onSaveDateStageSuccess(result, DialogFn); }, usefnFail({ DialogFn }));
        });
    };

    const handleAddStage1 = () => {
        let ObjFormAnswer = formStage1Answer.getValues();
        if (Object.values(ObjFormAnswer).filter(f => f == null).length > 0) {
            document.getElementById("BtnAddAnswerStage1").click();
        } 
        else
        {
            let nMax = lstDataStage1.length > 0 ? Math.max(...lstDataStage1.map(o => o.nStageID)) + 1 : 1;
            let _ObjDataAnswer: IDetailAnswerStage1Props = {
                nAnswerID: 1,
                sID: "1",
                nOrder: 1,
                sAnswer: null,
                nScore: null,
                isActive: false,
                nStageID: nMax,
                nAssessmentInnovationStage1AnswerID: null,
                nAssessmentInnovationStage1ID: null,
            };
            let _ObjData: IDetailStage1Props = {
                nStageID: nMax,
                sQuestion: null,
                nWeight: null,
                nAssessmentInnovationStage1ID: null,
                lstDataAnswerStage1: [_ObjDataAnswer],
            };
            let _arrData = [...lstDataStage1, _ObjData];
            setLstDataStage1(_arrData);        
        }
    };

    const handleDeleteStage1 = (_nStageID) => {
        DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
            let _lstDataStage1 = lstDataStage1.filter((w) => w.nStageID !== _nStageID); //nStageID : ID NoDel     
            setLstDataStage1(_lstDataStage1);
            // onClearForm(_nStageID);
            DialogFn.UnBlockUI();
            DialogFn.Success("ลบข้อมูลสำเร็จ");
        });
    }

    // const onClearForm = (_nStageID) => {
    //     let _lstDele = lstDataStage1.filter((w) => w.nStageID === _nStageID); //nStageID : ID NoDel 
    //     Object.keys(formStage1.getValues()).forEach((key) => {
    //         formStage1.setValue(key, null);
    //         formStage1.clearErrors(key);
    //     });
    // };
    
    useEffect(() => {
        props.setLstDataStage1 && props.setLstDataStage1(lstDataStage1);
        props.setNMinScore && props.setNMinScore(formStage1.getValues("nMinScore"));
        props.setNMaxScore && props.setNMaxScore(formStage1.getValues("nMaxScore"));
    }, [lstDataStage1, formStage1]);

    return {
        formStage1,        
        lstDataStage1,
        handleGetDateStage1,
        handleSaveDateStage1,
        handleAddStage1,
        handleDeleteStage1,
        formStage1Answer,
    };
};

export const useManageAssessmentInnovationStage1Answer = (props: ITableAnswerStage1Props) => {
    const DialogFn = FnDialog();

    const [isLoading, setIsLoading] = useState(false);
    const [dataRowStage1Answer, setDataRowStage1Answer] = useState({
        ...initRows,
    });
    const [lstDataAnswer, setLstDataAnswer] = useState(DefaultArrayEmpty(props.lstDataAnswerStage1));
  
    useEffect(() => {
        setIsLoading(true);
        handleGetDateStage1Answer(props.lstDataAnswerStage1);
    }, [props.lstDataAnswerStage1]);

    const handleGetDateStage1Answer = (_lstDataAnswerStage1) => {
        setIsLoading(false);
        setLstDataAnswer(_lstDataAnswerStage1);
        setDataRowStage1Answer({
            ...initRows,
            arrRows: DefaultArrayEmpty(_lstDataAnswerStage1),
            nDataLength: DefaultArrayEmpty(_lstDataAnswerStage1).nDataLength
        });
    }
    
    const dataColumn: any = [
        {
            ...DefaultParamCol,
            field: "nOrder",
            headerName: "",
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "10%",
            renderHeader: () => {
                return (
                    <BtnAdd 
                        id="BtnAddAnswerStage1" 
                        txt="Add" 
                        IsRadius={true} 
                        IsCircleWithOutText={true} 
                        onClick={props.formStage1Answer.handleSubmit((e) => handleAddAnswerStage1(),(err) => {
                            document.getElementById(Object.keys(err)[0])?.focus();
                            console.log("err", err)
                        })}
                    />
                );
            },           
        },
        {
            ...DefaultParamCol,
            field: "sAnswer",
            headerName: `รายละเอียดการพิจารณา`,
            bodyAlign: "left",
            flex: 3,
            width: "55%",
            sortable: false,
            isSort: false,
            getAction: (item) => {
                return [renderCellTextArea(item, props.isDisable, props.disableMode, props.isSkeleton, handleChange, props.formStage1Answer, setIsLoading)];
            },
        },
        {
            ...DefaultParamCol,
            field: "nScore",
            headerName: `คะแนน`,
            bodyAlign: "center",
            flex: 1,
            width: "20%",
            sortable: false,
            isSort: false,
            getAction: (item) => {
                return [renderCellInputNumber(item, props.isDisable, props.disableMode, props.isSkeleton, handleChange, props.formStage1Answer, setIsLoading)];
            },
        },
        {
            ...DefaultParamCol,
            field: "isActive",
            headerName: `Status`,
            bodyAlign: "center",
            flex: 1,
            width: "15%",
            sortable: false,
            isSort: false,
            getAction: (item) => {
                return [renderCellSwitch(item, props.isDisable, props.disableMode, props.isSkeleton, handleChange, props.formStage1Answer, setIsLoading)];
            },
        }, 
    ];

    const handleChange = (event, item, sMode) => {
        let lstStage1Answer = DefaultArrayEmpty(dataRowStage1Answer.arrRows);
        let indEdit = lstStage1Answer.findIndex(f => f.nAnswerID === item.nAnswerID);
        switch (sMode) {
            case "sAnswer":
                lstStage1Answer[indEdit].sAnswer = event.target.value;
                break;
            case "nScore":
                lstStage1Answer[indEdit].nScore = (event.target.value || event.target.value === 0) ? event.target.value : null; //Convert.StringToFloatOrNull(event.target.value);
                break;
            case "isActive":
                lstStage1Answer[indEdit].isActive = event;
                break;
        }
        let _lstStage1Answer = DefaultArrayEmpty([...lstStage1Answer]);
        setDataRowStage1Answer({
            ...initRows,
            arrRows: _lstStage1Answer,
            nDataLength: _lstStage1Answer.length
        });
        setIsLoading(false);
        setLstDataAnswer(_lstStage1Answer);
    };

    const handleAddAnswerStage1 = () => {
        let _nStageID = props.nStageID;
        let nMax = lstDataAnswer.length > 0 ? Math.max(...lstDataAnswer.map(o => o.nAnswerID)) + 1 : 1;
        let nOrder = lstDataAnswer.length > 0 ? Math.max(...lstDataAnswer.map(o => o.nOrder)) + 1 : 1;
        let _ObjDataAnswer: IDetailAnswerStage1Props = {
            sID: nMax.toString(),
            nAnswerID: nMax,
            sAnswer: null,
            nOrder: nOrder,
            nScore: null,
            isActive: true,
            nStageID: _nStageID,
            nAssessmentInnovationStage1AnswerID: null,
            nAssessmentInnovationStage1ID: null,
        };
        let _arrData = [...lstDataAnswer, _ObjDataAnswer];
        setDataRowStage1Answer({
            ...initRows,
            arrRows: _arrData,
            nDataLength: _arrData.length
        });
        setIsLoading(false);
        setLstDataAnswer(_arrData);        
    };

    const handleDeleteAnswerStage1 = (item) => {
        if (item && item.length > 0) {
            setIsLoading(true);
            DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
                let _arrDataStage2Answer = DefaultArrayEmpty(dataRowStage1Answer.arrRows);
                let result = _arrDataStage2Answer.filter((w) => !item.includes(w.sID)); //ID No Del  
                //เรียง Order ใหม่
                let nOrder = 1;
                result.sort((a, b) => a.nOrder - b.nOrder).forEach((f) => { f.nOrder = nOrder++; });
                let _arrRows = DefaultArrayEmpty(result); //[...result];
                setDataRowStage1Answer({
                    ...initRows,
                    arrRows: _arrRows,
                    nDataLength: _arrRows.length,
                });
                setIsLoading(false);
                setLstDataAnswer(_arrRows);
                DialogFn.UnBlockUI();
                DialogFn.Success("ลบข้อมูลสำเร็จ");
            });
        }
    }

    useEffect(() => {
        props.setLstDataAnswerStage1 && props.setLstDataAnswerStage1(lstDataAnswer);
    }, [lstDataAnswer]);

    return {
        isLoading,  
        setIsLoading, 
        dataColumn,
        dataRowStage1Answer,
        handleDeleteAnswerStage1,
    };
}

export const renderCellTextArea = ( item, isDisable, disableMode, isSkeleton, handleChange, formStage1Answer, setIsLoading) => {
    return (
        <Grid item xs={12}>
            <FormProvider {...formStage1Answer}>
                <TextAreaItem
                    label=""
                    name={`sAnswer_${item.nStageID}_${item.nAnswerID}`}
                    required={true}
                    maxLength={3000}
                    row={1}
                    IsCharacterCount={true}
                    disabled={isDisable}
                    disableMode={disableMode}
                    IsSkeleton={isSkeleton}
                    onChange={(e)=>{ setIsLoading(true); handleChange(e, item, "sAnswer"); }}
                    defaultValue={item.sAnswer}
                    IsShowMessageError={false}
                /> 
            </FormProvider>
        </Grid>         
    )
};
export const renderCellInputNumber = ( item, isDisable, disableMode, isSkeleton, handleChange, formStage1Answer, setIsLoading) => {
    return (
        <Grid item xs={12}>
            <FormProvider {...formStage1Answer}>
                <InputNumberFormat
                    label=""
                    name={`nScore_${item.nStageID}_${item.nAnswerID}`}
                    maxDigits={2}
                    maxLength={6}
                    min={0}
                    valueType="number"
                    // textAlign={"center"}
                    required={true}
                    disabled={isDisable}
                    disableMode={disableMode}
                    IsSkeleton={isSkeleton}
                    onChange={(e)=>{ setIsLoading(true); handleChange(e, item, "nScore"); }}
                    defaultValue={item.nScore}
                    IsShowMessageError={false}
                />
            </FormProvider>
        </Grid>
    )
};
export const renderCellSwitch = ( item, isDisable, disableMode, isSkeleton, handleChange, formStage1Answer, setIsLoading) => {
    return (
        <Grid item xs={12}>
            <FormProvider {...formStage1Answer}>
                <SwitchFormItem
                    label={""}
                    name={`isActive_${item.nStageID}_${item.nAnswerID}`}
                    required={true}
                    disabled={isDisable}
                    disableMode={disableMode}
                    IsSkeleton={isSkeleton}
                    onChange={(e)=>{ setIsLoading(true); handleChange(e, item, "isActive"); }}
                    defaultValue={item.isActive}
                />
            </FormProvider>
        </Grid>
    )
};
//#endregion

//#region Stage 2
export const useManageAssessmentInnovationStage2 = (props: ManageAssessmentInnovationStage2Props) => {
    const DialogFn = FnDialog();

    const formStage2 = useForm({
        shouldUnregister: false,
        shouldFocusError: true,
        mode: "all",
    });
    
    const formStage2Answer = useForm({
        shouldUnregister: false,
        shouldFocusError: true,
        mode: "all",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [dataRowStage2, setDataRowStage2] = useState({
        ...initRows,
    });

    const [lstDataStage2, setLstDataStage2] = useState([]);
    const [nAssessmentInnovationID, setNAssessmentInnovationID] = useState(0);

    const [nStageID, setNStageID] = useState(null);
    const [lstDataStage2Answer, setLstDataStage2Answer] = useState([]);

    useEffect(() => {
        handleGetDateStage2();
    }, []);

    const handleGetDateStage2 = () => {
        setIsLoading(true);
        let oParam = {
            ...initRows,
        }
        AxiosFn.Get(ApiManageAssessmentInnovation.GetDateStage2, oParam, (result) => { onGetDateStage2Success(result); }, usefnFail({ DialogFn }));
    };

    const onGetDateStage2Success = (result) => {
        DialogFn.UnBlockUI();
        if (result.nStatusCode === APIStatusCode.Success) {
            setIsLoading(false);
            setDataRowStage2({
                ...initRows,
                arrRows: DefaultArrayEmpty(result.lstDataStage2),
                nDataLength: result.nDataLength
            });
            setNAssessmentInnovationID(result.nAssessmentInnovationID);
            setLstDataStage2(result.lstDataStage2);         
        } else if (result.nStatusCode === APIStatusCode.Warning) {
            DialogFn.Warning(result.sMessage);
        }
        return {};
    };

    const handleSaveDateStage2 = () => {
        if (DefaultArrayEmpty(lstDataStage2).length === 0) {
            return DialogFn.Warning("กรุณาเพิ่มข้อมูลอย่างน้อย 1 รายการ");
        }
        DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
            let oParam = {
                nAssessmentInnovationID: nAssessmentInnovationID,
                lstDataStage2: DefaultArrayEmpty(lstDataStage2),
            };
            AxiosFn.Post(ApiManageAssessmentInnovation.SaveDateStage2, oParam, (result) => { onSaveDateStageSuccess(result, DialogFn); }, usefnFail({ DialogFn }));
        });
    };

    const handleChangeOrder = (nNewOrder, nOldOrder) => {
        DialogFn.Submit("คุณต้องการแก้ไขลำดับ ใช่หรือไม่", () => {
            setIsLoading(true);
            let _arrData = dataRowStage2;
            let _arrDataPlan = _arrData.arrRows;
            let objSelf = _arrDataPlan.find((f) => f.nOrder === nOldOrder);
            //Order ใหม่มากกว่าเก่า
            if (nNewOrder > nOldOrder) {
                //เคสที่มากกว่าตัวเอง
                let arrChange = _arrDataPlan.filter((f) => f.nOrder > nOldOrder && f.nOrder <= nNewOrder);
                arrChange.forEach((f) => {f.nOrder--; });
            } else {
                //Order ใหม่น้อยกว่าเก่า
                //เคสที่น้อยกว่าตัวเอง
                let arrChange = _arrDataPlan.filter( (f) => f.nOrder < nOldOrder && f.nOrder >= nNewOrder);
                arrChange.forEach((f) => { f.nOrder++;});
            }
            //อัพเดทตัวเอง
            objSelf.nOrder = nNewOrder;
            //เรียงลำดับ
            _arrDataPlan = _arrDataPlan.slice().sort((a, b) => a.nOrder - b.nOrder);

            _arrData.arrRows = [..._arrDataPlan];
            setDataRowStage2({ ..._arrData });
            setLstDataStage2([..._arrDataPlan]);                        
            setIsLoading(false);
            DialogFn.Success("แก้ไขสำเร็จ");            
        });
    }

    const dataColumn: any = [
        {
            ...DefaultParamCol,
            field: "nStageID",
            headerName: "",
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "8%",
            renderHeader: () => {
                return <BtnAdd id="AddStage2" txt="Add" IsRadius={true} IsCircleWithOutText={true} onClick={handleAddStage2} />;
            },
            getAction: (item) => {
                return <BtnEdit id={"EditStage2" + item.nStageID} txt="Edit" IsRadius={true} IsCircleWithOutText={true} onClick={(e) => { handleEditDateStage2(item); }} />;
            },
        },
        {
            ...DefaultParamCol,
            field: "nOrder",
            headerName: "Order",
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            flex: 1,
            width: "12%",
            getAction: (item) => {
                let lstnOrder = new LINQ<any>(DefaultArrayEmpty(lstDataStage2)).Where(w=> w.nOrder !== 0).OrderBy(o=> o.value).Select(function(elem) {return { label: elem.nOrder, value: elem.nOrder, }}).ToArray();
                return (
                    <ChangeOrder
                        id={"nOrder_" + item.nStageID}
                        item={item}
                        value={item.nOrder}
                        onChangeOrder={(nOrder) => handleChangeOrder(Convert.StringToInt(nOrder), Convert.StringToInt(item.nOrder))}
                        optOrder={DefaultArrayEmpty(lstnOrder)}
                        IsView={false}
                        disabled={false}
                    />
                )
            },
        },
        {
            ...DefaultParamCol,
            field: "sQuestion",
            headerName: `Question`,
            bodyAlign: "left",
            flex: 0.5,
            width: "50%",
            sortable: false,
            isSort: false,
        },
        {
            ...DefaultParamCol,
            field: "sChoiceType",
            headerName: `ประเภทตัวเลือก`,
            bodyAlign: "center",
            flex: 0.5,
            width: "15%",
            sortable: false,
            isSort: false,
        },
        {
            ...DefaultParamCol,
            field: "sStatus",
            headerName: `Status`,
            bodyAlign: "center",
            flex: 0.5,
            width: "15%",
            sortable: false,
            isSort: false,
        },
    ];
    
    useEffect(() => {
        props.setLstDataStage2 && props.setLstDataStage2(lstDataStage2);
    }, [lstDataStage2]);

    const handleAddStage2 = async () => {
        await onClearForm();
        let _arrDataStage2 = DefaultArrayEmpty(dataRowStage2.arrRows);
        let nOrder = new LINQ<any>(_arrDataStage2).Any() ? new LINQ<any>(_arrDataStage2).Max((m) => m.nOrder) + 1 : 1;
        let ObjAnswerStage2: IDetailAnswerStage2Props = {
            nAnswerID: 1,
            sAnswer: null,
            nStageID: 0,
            nAssessmentInnovationStage2AnswerID: null,
            nAssessmentInnovationStage2ID: null,
        }        
        formStage2.setValue("nOrder", nOrder);
        formStage2.setValue("nChoiceType", 0);
        formStage2.setValue("isActive", true);        
        setLstDataStage2Answer([ObjAnswerStage2]);
        setNStageID(0);
        document.getElementById("myDivStage2").scrollIntoView({ behavior: "smooth" });
    };

    const handleAddDateStage2 = (_nStageID) => {
        let ObjFormAnswer = formStage2Answer.getValues();
        if (Object.values(ObjFormAnswer).filter(f => f == null).length > 0) {
            document.getElementById("AddStage2Answer").click();
        } 
        else
        {
            let oForm = formStage2.getValues();
            let _arrDataStage2 = DefaultArrayEmpty(dataRowStage2.arrRows);
            let ObjDuplicate = _arrDataStage2.filter((f) => (_nStageID !== 0 ? f.nStageID !== _nStageID : true) && f.sQuestion === oForm.sQuestion);
            if ((ObjDuplicate || []).length === 0)
            {      
                let nAssessmentInnovationStage2ID = null;
                let nMaxID = new LINQ<any>(_arrDataStage2).Any() ? new LINQ<any>(_arrDataStage2).Max((m) => m.nStageID) + 1 : 1;
                let nOrder = new LINQ<any>(_arrDataStage2).Any() ? new LINQ<any>(_arrDataStage2).Max((m) => m.nOrder) + 1 : 1;
                if (_nStageID !== 0) {
                    nMaxID = _nStageID;
                    let ObjStage = _arrDataStage2.find((f) => f.nStageID === _nStageID); //ID Edit
                    nOrder = ObjStage?.nOrder;
                    nAssessmentInnovationStage2ID = ObjStage?.nAssessmentInnovationStage2ID;
                    _arrDataStage2 = _arrDataStage2.filter((f) => f.nStageID !== _nStageID); //ID No Edit
                }

                let _lstDataStage2Answer = DefaultArrayEmpty(lstDataStage2Answer);
                _lstDataStage2Answer.forEach(iAnswer => {
                    let sAnswer = formStage2Answer.getValues(`sAnswer_${iAnswer.nAnswerID}`);
                    iAnswer.sAnswer = sAnswer;
                    iAnswer.nStageID = nMaxID;
                    iAnswer.nAssessmentInnovationStage2ID = nAssessmentInnovationStage2ID;                    
                });

                let ObjDataStage2 : IDetailStage2Props = {
                    sID: nMaxID.toString(),
                    nStageID: nMaxID,
                    nAssessmentInnovationStage2ID: nAssessmentInnovationStage2ID,
                    sQuestion: oForm.sQuestion,
                    nChoiceType: Convert.StringToInt(oForm.nChoiceType),
                    sChoiceType: Convert.StringToInt(oForm.nChoiceType) === 0 ? "ตัวเลือกเดียว" : "หลายตัวเลือก",
                    nOrder: nOrder,
                    isRequire: (oForm.isRequire == "Y" || oForm.isRequire === true),
                    isActive: oForm.isActive,
                    sStatus: oForm.isActive ? "Active" : "Inactive",
                    lstDataAnswerStage2: _lstDataStage2Answer,
                };

                let result = [..._arrDataStage2, ObjDataStage2];
                let arrTable = new LINQ<any>(result || []).OrderBy(o=> o.nOrder).ToArray();
                setDataRowStage2({
                    ...initRows,
                    nDataLength: arrTable.length,
                    arrRows: arrTable,
                });
                setLstDataStage2(arrTable);               
                onClearForm();
            } 
            else {
                DialogFn.Warning("ข้อมูลซ้ำกัน");
            }
        }
    };
    
    const handleEditDateStage2 = (item) => {
        onClearForm();
        setNStageID(item.nStageID); 
        let ObjAnswerStage2: IDetailAnswerStage2Props = {
            nAnswerID: 1,
            sAnswer: null,
            nStageID: item.nStageID,
            nAssessmentInnovationStage2AnswerID: null,
            nAssessmentInnovationStage2ID: null,
        }
        let _arrDataAnswer = DefaultArrayEmpty(item.lstDataAnswerStage2).length === 0 ? [ObjAnswerStage2] : item.lstDataAnswerStage2;
        setLstDataStage2Answer(_arrDataAnswer);

        formStage2.setValue("nOrder", item.nOrder);
        formStage2.setValue("sQuestion", item.sQuestion);
        formStage2.setValue("isRequire", item.isRequire ? "Y" : null); //Y = true
        formStage2.setValue("nChoiceType", item.nChoiceType); //0 = ตัวเลือกเดียว | 1 = หลายตัวเลือก
        formStage2.setValue("isActive", item.isActive); //true

        _arrDataAnswer.forEach(iAnswer => {
            formStage2Answer.setValue(`sAnswer_${iAnswer.nAnswerID}`, iAnswer.sAnswer);
        });
        document.getElementById("myDivStage2").scrollIntoView({ behavior: "smooth" });
    };

    const onClearForm = async () => {
        setNStageID(null);
        setLstDataStage2Answer([]);
        Object.keys(formStage2.getValues()).forEach((key) => {
            formStage2.setValue(key, null);
            formStage2.clearErrors(key);
        });
        Object.keys(formStage2Answer.getValues()).forEach((key) => {
            formStage2Answer.setValue(key, null);
            formStage2Answer.clearErrors(key);
        });
    };
    
    const handleDeleteDateStage2 = (item) => {
        if (item && item.length > 0) {
            DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
                let _arrDataStage2 = DefaultArrayEmpty(dataRowStage2.arrRows);
                let result = _arrDataStage2.filter((w) => !item.includes(w.sID)); //ID No Del  
                //เรียง Order ใหม่
                let nOrder = 1;
                result.sort((a, b) => a.nOrder - b.nOrder).forEach((f) => { f.nOrder = nOrder++; });
                let _arrRows = [...result];
                setDataRowStage2({
                    ...initRows,
                    arrRows: _arrRows,
                    nDataLength: _arrRows.length,
                });
                setLstDataStage2(_arrRows);
                DialogFn.UnBlockUI();
                DialogFn.Success("ลบข้อมูลสำเร็จ");
            });
        }
    }

    const handleAddDateAnswerStage2 = (_nStageID) => {
        let nMax = lstDataStage2Answer.length > 0 ? Math.max(...lstDataStage2Answer.map(o => o.nAnswerID)) + 1 : 1;
        let ObjAnswerStage2: IDetailAnswerStage2Props = {
            nAnswerID: nMax,
            sAnswer: null,
            nStageID: _nStageID,
            nAssessmentInnovationStage2AnswerID: null,
            nAssessmentInnovationStage2ID: null,
        }
        let _arrAddAnswer = [...lstDataStage2Answer, ObjAnswerStage2];
        setLstDataStage2Answer(_arrAddAnswer);
    };

    const handleCheckDuplicateAnswerStage2 = (e, _nAnswerID) => {
        let _lstDataStage2Answer = DefaultArrayEmpty(lstDataStage2Answer);
        let _sAnswer = e.target.value === "" ? null : e.target.value;
        let ObjDuplicate = _lstDataStage2Answer.filter((f) => (_nAnswerID !== 0 ? f.nAnswerID !== _nAnswerID : true) && f.sAnswer !== null && f.sAnswer === _sAnswer);
        if (DefaultArrayEmpty(ObjDuplicate).length > 0) {
            DialogFn.Warning("ข้อมูล Answer ซ้ำกัน");
            formStage2Answer.setValue(`sAnswer_${_nAnswerID}`, "");
        } else {
            let indEdit = _lstDataStage2Answer.findIndex(f => f.nAnswerID === _nAnswerID);
            _lstDataStage2Answer[indEdit].sAnswer = _sAnswer;
        }
    }

    const handleDeleteAnswerStage2 = (nAnswerID) => {
        let arrDel = lstDataStage2Answer.filter(f => f.nAnswerID !== nAnswerID);
        setLstDataStage2Answer(arrDel);
    }

    return {
        formStage2,
        lstDataStage2, 
        formStage2Answer,
        dataRowStage2,
        lstDataStage2Answer,
        handleGetDateStage2, 
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
    };
};
//#endregion
