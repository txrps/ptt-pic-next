"use client";


import { MultiSelectItem, RadioListItem, SelectItem } from '@/components/input-element';
import { BtnAdd, BtnCancel, BtnEdit, BtnSave } from '@/components/mui-elements/Button/ButtonAll';
import { Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import "./../../../.././styles/custominput.css";
import "./../../../.././styles/customtailwind.css";
import "./../../../.././styles/daypicker.css"
import {
    STTableColumn,
    STTableColumnDetail,
} from "../../../../components/STTable/STTableProps";
import { initRows } from '@/components/STTable/STTable';
import { AxiosFn, FnDialog } from '@/lib/useAxios';
import {  } from '@/lib';
import { CheckCircle } from '@mui/icons-material';
import SwitchFormItem from '@/components/input-element/Switch';

export const useApproval = () => {
    const form = useForm({
        shouldUnregister: false,
        shouldFocusError: true,
        mode: "all"
    });

    const DialogFn = FnDialog();
    const [dataRow, setDataRow] = useState({
        ...initRows,
    });
    const [loadding, setLoadding] = useState(false)
    const [arrType, setArrType] = useState([])
    const [arrQtool, setArrQtool] = useState([])
    const [arrTypeApprove, setArrTypeApprove] = useState([])
    const [arrUnit, setArrUnit] = useState([])
    const [nTypeID, setNTypeID] = useState(0);
    const [sID, setSID] = useState("");
    const [isAdd, setisAdd] = useState(false)

    const onGetInitialTable = () => {
        AxiosFn.Get("AssignApprove/GetInitialTable", {}, (res) => {
            setArrQtool(res.arrQtool);
            setArrType(res.arrType);
            setArrTypeApprove(res.arrTypeApprove);
            setArrUnit(res.arrUnit)
        })
    }

    const onGetDataTable = () => {
        const param = {
            ...dataRow,
        }
        setLoadding(true);
        AxiosFn.Post("AssignApprove/GetDataTable", param, (res) => {
            setLoadding(false);
            setDataRow({
                ...dataRow,
                arrRows: res.lstData,
                nDataLength: res.ObjTable?.nDataLength,
                nPageIndex: res.ObjTable?.nPageIndex,
            })
        })
    }

    useEffect(() => {
        onGetInitialTable();
        onGetDataTable();
    }, []);

    const onSubmit = () => {
        let param = {
            sID: sID,
            nID: 0,
            nTypeID: form.getValues("nTypeID"),
            nApproveTypeID: form.getValues("nApproveTypeID"),
            isActive: form.getValues("isActive"),
            sUnitCode: form.getValues("sUnitCode"),
            lstQtool: form.getValues("nQToolID"),
        };

        DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
            DialogFn.BlockUI();
            AxiosFn.Post(`AssignApprove/onSave`, param, (result) => {
                DialogFn.UnBlockUI();
                DialogFn.Success("บันทึกสำเร็จ");
                onGetDataTable();
                form.setValue("nTypeID", null);
                form.setValue("nApproveTypeID", null);
                form.setValue("sUnitCode", null);
                form.setValue("nQToolID", null);
                form.setValue("isActive", true);
                setSID("");
            },
                (err) => {
                    DialogFn.UnBlockUI();
                    if (!err.response) {
                        DialogFn.Warning(err.sMessage);
                    }
                });
        }
        );
    };

    const onEdit = (sID, ObjData) => {
        setisAdd(true)
        window.scrollTo(0, 0);
        setSID(sID);
        let ObjDataEdit = {
            nTypeID: ObjData.nTypeID,
            nApproveTypeID: ObjData.nApproveTypeID,
            isActive: ObjData.isActive,
            sUnitCode: ObjData.sUnitCode,
            lstQtool: ObjData.lstQtool,
        };
        setNTypeID(ObjDataEdit.nTypeID)
        form.setValue("nTypeID", ObjDataEdit.nTypeID+"");
        form.setValue("nApproveTypeID", ObjDataEdit.nApproveTypeID+"");
        form.setValue("sUnitCode", ObjDataEdit.sUnitCode);
        form.setValue("isActive", ObjDataEdit.isActive);
        form.setValue("nQToolID", ObjDataEdit.lstQtool);
    }

    const onCancle = () => {
        setisAdd(false);
        form.setValue("nTypeID", null);
        form.clearErrors("nTypeID");
        form.setValue("nApproveTypeID", null);
        form.setValue("sUnitCode", null);
        form.setValue("nQToolID", null);
        form.setValue("isActive", true);
        setSID("");
    }

    const onDelete = (val) => {
        const param = {
            lstID: val,
        };
        DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
            DialogFn.BlockUI();
            AxiosFn.Post("AssignApprove/OnDelete", param, (result) => {
                DialogFn.UnBlockUI();
                DialogFn.Success("ลบสำเร็จ");
                onGetDataTable();
            })

        }
        );
    }
    const TableCommander = (item) => {
        if (item.nApproveTypeID == EnumType.nCommander) {
            return (
                <Grid item container justifyContent={"center"}>
                    <CheckCircle style={{ color: "#008c76" }} />
                </Grid>
            )
        }
    }

    const TableDivisionDirector = (item) => {
        if (item.nApproveTypeID == EnumType.nDivisionDirector) {
            return (
                <Grid item container justifyContent={"center"}>
                    <CheckCircle style={{ color: "#008c76" }} />
                </Grid>
            )
        }
    }

    const TableDepartment = (item) => {
        if (item.nApproveTypeID == EnumType.nDepartmentDirector) {
            return (
                <Grid item container justifyContent={"center"}>
                    <CheckCircle style={{ color: "#008c76" }} />
                </Grid>
            )
        }
    }

    const EditColumn = {
        renderHeader: () => {
            return [
                <BtnAdd
                    txt=""
                    key={"btnAdd"}
                    id="btnAdd"
                    onClick={() => setisAdd(true)}
                />
            ]
        },
        field: "",
        headerName: "",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "1%",

        getAction: (item) => {
            return [
                <BtnEdit
                    key={item.sID}
                    id="btnEdit"
                    onClick={() => onEdit(item.sID, item)}
                />
            ]
        }
    } as STTableColumnDetail;

    const NoColumn = {
        field: "nNo",
        headerName: "No",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "3%",
    } as STTableColumnDetail;

    const TypeColumn = {
        field: "sType",
        headerName: "รูปแบบ",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15%",
    } as STTableColumnDetail;

    const sQtoolColumn = {
        field: "sQtool",
        headerName: "Qtool",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "12%",
    } as STTableColumnDetail;

    const LineworkColumn = {
        field: "sUnitName",
        headerName: "ใช้กับสายงาน",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "25%",
    } as STTableColumnDetail;

    const LevelColumn = {
        field: "",
        headerName: "ผู้อนุมัติ",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "40%",
        classHead: "th-right-sticky",
        classBody: "td-right-sticky",
    } as STTableColumnDetail;

    const Level1Column = {
        field: "nApproveTypeID",
        headerName: "ผู้บังคับบัญชา",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        getAction: (item) => {
            return [
                <>
                    {TableCommander(item)}
                </>
            ]
        }
    } as STTableColumnDetail;

    const Level2Column = {
        field: "nApproveTypeID",
        headerName: "ผจ.ส่วน",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        getAction: (item) => {
            return [
                <>
                    {TableDivisionDirector(item)}
                </>
            ]
        }
    } as STTableColumnDetail;

    const Level3Column = {
        field: "nApproveTypeID",
        headerName: "ผจ.ฝ่าย/ผจ.ส่วนขึ้นตรง",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "13%",
        getAction: (item) => {
            return [
                <>
                    {TableDepartment(item)}
                </>
            ]
        }
    } as STTableColumnDetail;

    const StatusColumn = {
        field: "sActive",
        headerName: "Status",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15%",
    } as STTableColumnDetail;

    let dataColumn = [] as STTableColumnDetail[];
    let dataColumn2 = [] as STTableColumnDetail[];
    let dataColumn3 = [] as STTableColumnDetail[];

    ///อันนี้เอาไว้รวมหัวทั้งหมด
    EditColumn.rowspan = 2;
    NoColumn.rowspan = 2;
    TypeColumn.rowspan = 2;
    sQtoolColumn.rowspan = 2;
    LineworkColumn.rowspan = 2;
    StatusColumn.rowspan = 2;
    LevelColumn.colspan = 3;
    dataColumn = [
        EditColumn,
        NoColumn,
        TypeColumn,
        sQtoolColumn,
        LineworkColumn,
        Level1Column,
        Level2Column,
        Level3Column,
        StatusColumn,
    ];

    dataColumn3 = [
        Level1Column,
        Level2Column,
        Level3Column,

    ];
    dataColumn2 = [
        EditColumn,
        NoColumn,
        TypeColumn,
        sQtoolColumn,
        LineworkColumn,
        LevelColumn,
        StatusColumn,
    ];

    let dataMerge = [] as STTableColumn[];
    if (dataColumn2.length > 0) {
        const dataMergeDetail2 = {
            column: dataColumn2

        } as STTableColumn;
        const dataMergeDetail = {
            column: dataColumn3

        } as STTableColumn;
        dataMerge.push(dataMergeDetail2);
        dataMerge.push(dataMergeDetail);
    }
    else {
        dataMerge = undefined;
    }

    const setType = (e) => {
        setNTypeID(e ? +e.value : null)
    }
    const SelectQTool = (nTypeID) => {
        if (nTypeID == EnumType.nQtoolID) {
            return (
                <MultiSelectItem
                    label="Q Tool"
                    name="nQToolID"
                    IsSkeleton={false}
                    required={nTypeID == EnumType.nQtoolID}
                    disabled={false}
                    disableMode={'input'}
                    options={arrQtool}
                />
            )
        }
    }

    const RenderAdd = (isAdd) => {
        if (isAdd) {
            return (
                <>
                    <Grid item xs={5}>
                        <SelectItem
                            label="รูปแบบ"
                            name={`nTypeID`}
                            IsSkeleton={false}
                            required={true}
                            disabled={false}
                            disableMode={'input'}
                            options={arrType}
                            onChange={(e) => {
                                setType(e)
                            }}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        {SelectQTool(nTypeID)}
                    </Grid>

                    <Grid item xs={5}>
                        <SelectItem
                            label="ใช้งานกับสายงาน"
                            name={`sUnitCode`}
                            IsSkeleton={false}
                            required={true}
                            disabled={false}
                            disableMode={'input'}
                            options={arrUnit}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <RadioListItem
                            label="ผู้อนุมัติ"
                            name="nApproveTypeID"
                            IsSkeleton={false}
                            required={true}
                            disabled={false}
                            disableMode={"input"}
                            options={arrTypeApprove}
                        />

                    </Grid>
                    <Grid item xs={10}>
                        <SwitchFormItem
                            id={`isActive`}
                            name={`isActive`}
                            label={"สถานะ"}
                            disabled={false}
                            required={true}
                        />
                    </Grid>

                    <Grid container justifyContent={"center"} spacing={3} style={{ marginTop: 6 }}>
                        <Grid item container justifyContent={"end"} xs={6}>
                            <BtnCancel id="onBack" IsSkeleton={false} txt={"Cancel"}
                                onClick={() => { onCancle() }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <BtnSave id="onsave" IsSkeleton={false} onClick={form.handleSubmit(
                                () => onSubmit(),
                                (err) => console.log("err", err)
                            )} />
                        </Grid>
                    </Grid>
                </>
            )
        }
    }

    return {
        form,
        onSubmit,
        dataColumn,
        dataRow,
        loadding,
        dataMerge,
        onGetDataTable,
        isAdd,
        onDelete,
        onCancle,
        RenderAdd,
        onGetInitialTable,
        onEdit,
        SelectQTool,
        TableCommander,
        TableDivisionDirector,
        TableDepartment,
    }
}
export const enum EnumType {
    nQtoolID = 3, //Qtool
    nCommander = 5,
    nDivisionDirector = 6,
    nDepartmentDirector = 7,
}
