"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosFn, FnDialog, usefnFail } from '@/lib/useAxios';
import { ApiPicForm } from '@/enum/api';
import { IOptionsSelect } from "@/lib/inputTypes";
import { ArrowLeft } from "@mui/icons-material";
import STTable, { initRows } from '@/components/STTable/STTable';
import { Box } from "@mui/material";
import { SelectItem, TextBoxItem, RadioListItem, AutocompleteItem } from '@/components/input-element';
import { AccordionCustom, SkeletonText, Text } from '@/components/mui-elements';
import { STTableColumnDetail, STTableRow, STFilterField, STTableColumn } from '@/components/STTable/STTableProps';
import { BtnDelete } from "@/components/mui-elements/Button/ButtonAll";


export interface MemberTable {
    sID: number;
    nOrder: number;
    sName: string;
    sUnit: string;
    sPosition: string;
    isDel: boolean;
}
export const usePicForm = () => {
    const form = useForm({
        shouldFocusError: true,
        // shouldUnregister: false,
        mode: "all",
        defaultValues: {} as any
    });

    const DialogFn = FnDialog();
    const [isSkeleton, setIsSkeleton] = useState(false);
    const [DisableIndetification, setDisableIndetification] = useState(false);
    const [DisableRegistration, setDisableRegistration] = useState(false);
    const [DisableResult, setDisableResult] = useState(false);
    const [DisableSuggestion, setDisableSuggestion] = useState(true);
    const [ShowSuggestion, setShowSuggestion] = useState(false);
    const [DisableInnovation, setDisableInnovation] = useState(true);
    const [ShowInnovation, setShowInnovation] = useState(false);
    const [ShowInnovationState2, setShowInnovationState2] = useState(false);
    const [DisableRecognition, setDisableRecognition] = useState(true);
    const [ShowRecognition, setShowRecognition] = useState(false);
    const [arrStep, setArrStep] = useState([]);


    const [NamePanel1, setNamePanel1] = useState("");
    const [NamePanel2, setNamePanel2] = useState("");
    const [NamePanel3, setNamePanel3] = useState("");
    const [NamePanel4, setNamePanel4] = useState("");
    const [NamePanel5, setNamePanel5] = useState("");
    const [NamePanel6, setNamePanel6] = useState("");

    const [SubNamePanel1, setSubNamePanel1] = useState("");
    const [SubNamePanel2, setSubNamePanel2] = useState("");
    const [SubNamePanel3, setSubNamePanel3] = useState("");
    const [SubNamePanel4, setSubNamePanel4] = useState("");
    const [SubNamePanel5, setSubNamePanel5] = useState("");
    const [SubNamePanel6, setSubNamePanel6] = useState("");

    const [arrSource, setArrSource] = useState([] as IOptionsSelect[]);
    const [arrLossGainMaster, setArrLossGainMaster] = useState([] as IOptionsSelect[]);
    const [arrLossGain, setArrLossGain] = useState([] as IOptionsSelect[]);
    const [arrCategoryType, setArrCategoryType] = useState([] as IOptionsSelect[]);
    const [arrQtool, setArrQtool] = useState([] as IOptionsSelect[]);
    const [arrTeamPosition, setArrTeamPosition] = useState([] as IOptionsSelect[]);

    const [StepID, setStepID] = useState(0);
    const [isSave, setIsSave] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false);
    const [isApprove, setIsApprove] = useState(false);
    const [isReject, setIsReject] = useState(false);
    const [isRegister, setIsRegister] = useState(true);
    const [loadding, setLoadding] = useState(false);


    const [CreateBy, setCreateBy] = useState("");
    const [arrTeam, setArrTeam] = useState([]);


    const [isDisableUnit, setIsDisableUnit] = useState(true);
    const [sUnit, setUnit] = useState("");
    const [dataRow, setDataRow] = useState({
        ...initRows,
    });
    const onCategoryTypeChange = (value) => {
        let sUnit = "บาท/ปี";
        let arrValue = arrLossGainMaster
        let isDisUnit = true;
        if (value === "14") {
            sUnit = "ชม./ปี";
            arrValue = arrLossGainMaster.filter((f) => f.value == "12");
        }
        else if (value === "13") {
            sUnit = "";
            isDisUnit = false;
        }
        if (DisableIndetification) {
            isDisUnit = DisableIndetification;
        }

        setArrLossGain(arrValue);
        form.setValue("sTargetUnit", sUnit);
        setIsDisableUnit(isDisUnit);
        setUnit(sUnit);
    }
    const onGetInitialForm = (o, sID) => {


        setNamePanel1(o.sNamePanel1);
        setNamePanel2(o.sNamePanel2);
        setNamePanel3(o.sNamePanel3);
        setNamePanel4(o.sNamePanel4);
        setNamePanel5(o.sNamePanel5);
        setNamePanel6(o.sNamePanel6);

        setArrSource(o.arrSource);
        setArrLossGainMaster(o.arrLossGain);

        setArrCategoryType(o.arrCategoryType);
        setArrQtool(o.arrQtool);
        setArrTeamPosition(o.arrTeamPosition);

        setIsSkeleton(false);
        GetPicForm(sID);

    }
    const onGetPicForm = (o) => {
        setDisableIndetification(o.isDisableIndetification);
        setDisableRegistration(o.isDisableRegistration);
        setDisableResult(o.isDisableResult);
        setDisableSuggestion(o.isDisableSuggestion);
        setShowSuggestion(o.isShowSuggestion);
        setDisableInnovation(o.isDisableInnovation);
        setShowInnovation(o.isShowInnovation);
        setShowInnovationState2(o.isShowInnovationState2);
        setDisableRecognition(o.isDisableRecognition);
        setShowRecognition(o.isShowRecognition);
        setArrStep(o.lstStep)
        setStepID(o.nStatusID - 1);
        console.log("o", o)
        form.setValue("sDepartment", o.sDepartment);
        form.setValue("ddlSource", o.nSourceID);
        form.setValue("sPIC", o.sPicIssue);
        form.setValue("ddlCategoryType", o.nCategoryType);
        form.setValue("nCategoryImpact", o.nCategoryImpact);
        form.setValue("nTargetValue", o.nTargetValue);
        form.setValue("sTargetUnit", o.sTargetUnit);


        onCategoryTypeChange(o.nCategoryType + "");


    }
    const InitialForm = (props) => {
        const { sID } = props;
        let oParam = {
            sID: sID
        };
        AxiosFn.Get(ApiPicForm.GetInitial, oParam, (result) => { onGetInitialForm(result, sID); }, usefnFail({ DialogFn }));
    };

    const GetPicForm = (sID) => {
        let oParam = {
            sID: sID
        };
        AxiosFn.Get(ApiPicForm.GetPicForm, oParam, (result) => { onGetPicForm(result); }, usefnFail({ DialogFn }));
    };
    const AddMember = () => {
        let arrClone = dataRow;
        let arrNewItem = [];
        let arrID = arrClone.arrRows.length > 0 ? arrClone.arrRows.map((m) => m.sID) : [];
        let nID = (arrID.length > 0 ? Math.max(...arrID) : 0) + 1;
        arrNewItem.push(...arrClone.arrRows);

        //Add New Item 
        let arrIDOnItem = arrNewItem.map((m) => m.sID);
        let arrOrderOnItem = arrNewItem.map((m) => m.nOrder);
        let sID = arrNewItem.length > 0 ? Math.max(...arrIDOnItem) + 1 : nID;

        let objNewItem: MemberTable = {
            sID: sID,
            nOrder: arrNewItem.length > 0 ? Math.max(...arrOrderOnItem) + 1 : nID,
            sName: "",
            sUnit: "",
            sPosition: "",
            isDel: false
        };
        arrClone.arrRows = [...arrNewItem];
        setDataRow({ ...arrClone });

    }
    const getTable = (p?: STTableRow) => {
        // DialogFn.BlockUI();
        setLoadding(true);
        const objParam = p || dataRow;
        const obj = {
            ...objParam,
        }
        AxiosFn.Post(ApiPicForm.GetTable, obj, (result) => {
            // DialogFn.UnBlockUI();
            setLoadding(false);

            setDataRow({
                ...objParam,
                arrRows: [...result.lstData],
                nDataLength: result.ObjTable?.nDataLength,
                nPageIndex: result.ObjTable?.nPageIndex,
            });

        });
    }
    const onSaveData = (nStatusID) => {
        let oParam = {
            sID: nStatusID
        };
        AxiosFn.Get(ApiPicForm.GetPicForm, oParam, (result) => { onGetPicForm(result); }, usefnFail({ DialogFn }));
    };
    const OrderColumn = {
        field: "nOrder",
        headerName: "ลำดับ",
        bodyAlign: "left",
        sortable: true,
        collapse: false,
        width: "150px",
    } as STTableColumnDetail;
    const NameColumn = {
        field: "sName",
        headerName: "รหัส-ชื่อ สกุล",
        bodyAlign: "center",
        sortable: true,
        collapse: false,
        width: "150px",
        getAction: (item) => {
            return [
                <Box key={item.sID}>
                    <AutocompleteItem
                        name={`sName_${item.sID}`}
                        label="UserName"
                        IsDisplayLabel={false}
                        IsSkeleton={isSkeleton}
                        required={true}
                        disabled={DisableIndetification}
                        disableMode={"input"}
                        sParam={""}
                        sUrlAPI={"Pic/SearchEmpPosition"}
                    />
                </Box>
            ];
        }
    } as STTableColumnDetail;
    const UnitColumn = {
        field: "sUnit",
        headerName: "หน่วยงาน",
        bodyAlign: "center",
        sortable: true,
        collapse: false,
        width: "150px",
    } as STTableColumnDetail;
    const PositionColumn = {
        field: "sPosition",
        headerName: "ตำแหน่ง",
        bodyAlign: "center",
        sortable: true,
        collapse: false,
        width: "150px",
        getAction: (item) => {
            return
            item.nPosition === 19 ?
                <Text IsSkeleton={isSkeleton} align="right" variant="body2">{item.sPosition}</Text>
                :
                <Box key={item.sID}><SelectItem
                    id={`ddlPosition_${item.sID}`} name={`ddlPosition_${item.sID}`} label="" IsDisplayLabel={false} disabled={DisableIndetification} IsSkeleton={isSkeleton} options={arrSource} required={true}
                />
                </Box>
                ;
        }
    } as STTableColumnDetail;
    const DelColumn = {
        field: "elDel",
        headerName: "",
        bodyAlign: "center",
        sortable: true,
        collapse: false,
        width: "150px",
        getAction: (item) => {
            return
            item.isDel ?
                <BtnDelete
                    onClick={() => { }}
                    id={"BtnSave"}
                    className="button-margin-action" />
                :
                null
                ;
        }
    } as STTableColumnDetail;

    // <Text IsSkeleton={isSkeleton} align="right" variant="body2">{CreateBy}</Text>
    let dataColumn = [OrderColumn, NameColumn, UnitColumn, PositionColumn, DelColumn];


    return {
        form,
        isSkeleton, DisableIndetification, DisableRegistration, DisableResult, DisableInnovation, ShowInnovation, ShowInnovationState2, DisableRecognition, ShowRecognition,
        ShowSuggestion,
        DisableSuggestion,
        NamePanel1,
        NamePanel2,
        NamePanel3,
        NamePanel4,
        NamePanel5,
        NamePanel6,
        SubNamePanel1,
        SubNamePanel2,
        SubNamePanel3,
        SubNamePanel4,
        SubNamePanel5,
        SubNamePanel6,
        InitialForm,
        arrSource,
        arrLossGain,
        arrCategoryType,
        arrQtool,
        arrTeamPosition,
        arrStep,
        StepID,
        isSave,
        isSubmit,
        isApprove,
        isReject,
        isRegister,
        onSaveData,
        CreateBy,
        isDisableUnit,
        sUnit,
        dataColumn,
        dataRow,
        loadding, getTable,
        onCategoryTypeChange
    }
}  