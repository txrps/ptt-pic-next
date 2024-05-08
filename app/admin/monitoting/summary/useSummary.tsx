import { initRows } from "@/components/STTable/STTable";
import { AxiosFn, FnAxios, FnDialog } from "@/lib/useAxios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EnumPICResult } from "./page";
import { STTableColumn, STTableColumnDetail } from "@/components/STTable/STTableProps";
import { Grid } from "@mui/material";
import MultiSelectItem from "@/components/input-element/Select/MultiSelectItem";

export const useSummary = () => {
    const DialogFn = FnDialog();
    const [dataRow, setDataRow] = useState({
        ...initRows,
    });
    const [loadding, setLoadding] = useState(false)
    const [arrQtool, setarrQtool] = useState([] as any);
    const [arrResultType, SetarrResultType] = useState([] as any);
    const [PICResult, setPICResult] = useState(false)
    const [TabelQtoolID, setTabelQtoolID] = useState([] as any);
    const [TabelResultID, setTabelResultID] = useState([] as any);
    const [nColspanResult, setColspanResult] = useState(0);
    const [nColspanQtool, setColspanQtool] = useState(0);
    const [arrQtoolID, setarrQtoolID] = useState([] as any);
    const [arrResultTypeID, SetarrResultTypeID] = useState([] as any);

    const form = useForm({
        shouldFocusError: true,
        mode: "all",
        defaultValues: {
            nTypeID: EnumPICResult.nPICRegistration,
        } as any,

    });

    const onGetInitialTable = () => {
        AxiosFn.Get("Summary/GetInitialTable", {}, (res) => {
            setarrQtool(res.arrQtool);
            SetarrResultType(res.arrResultType);
            setarrQtoolID(res.lstQtoolID);
            SetarrResultTypeID(res.lstResultTypeID);
            form.setValue("nQToolID", res.lstQtoolID);
            form.setValue("nResultTypeID", res.lstResultTypeID);
        })
    }

    const onGetDataTable = () => {
        const param = {
            ...dataRow,
            nTypeID: form.getValues("nTypeID"),
            lstQToolID: form.getValues("nQToolID"),
            lstResultTypeID: form.getValues("nResultTypeID"),
            nStartDate: new Date(form.getValues("dStartDate")).valueOf(),
            nEndDate: new Date(form.getValues("dEndDate")).valueOf()
        }
        setLoadding(true);
        AxiosFn.Post("Summary/GetDataTable", param, (res) => {
            setLoadding(false);
            setDataRow({
                ...dataRow,
                arrRows: res.lstData,
                nDataLength: res.ObjTable?.nDataLength,
                nPageIndex: res.ObjTable?.nPageIndex,
            })
            setTabelQtoolID(res.lstQtoolTable);
            setTabelResultID(res.lstResultTypeTable);
            setColspanResult(res.nResultType);
            setColspanQtool(res.nTotalQtoolID);
        })
    }

    const handleExportExcel = () => {
        DialogFn.BlockUI();
        //Download Excel
        const objParam = {
            nTypeID: form.getValues("nTypeID"),
            lstQToolID: form.getValues("nQToolID"),
            lstResultTypeID: form.getValues("nResultTypeID"),
            nStartDate: new Date(form.getValues("dStartDate")).valueOf(),
            nEndDate: new Date(form.getValues("dEndDate")).valueOf()
        };
        let sFileName = `Pic Registration.xlsx`
        AxiosFn.DowloadFile(`Summary/onExportReport`, objParam, sFileName, (result) => {
            DialogFn.UnBlockUI();
        }
        );
    };

    const NoColumn = {
        field: "sOrder",
        headerName: "No.",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "8px",
    } as STTableColumnDetail;

    const DepartmentColumn = {
        field: "sDepartment",
        headerName: "Department / Division",
        bodyAlign: "left",
        sortable: false,
        isSort: false,
        collapse: false,
        width: PICResult ? "30px" : "50px",
    } as STTableColumnDetail;

    const RegistrationColumn = {
        field: "",
        headerName: "PIC Registration",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "50px",
    } as STTableColumnDetail;

    const Project1Column = {
        field: "nProjectAllCount",
        headerName: "จำนวน PIC Project",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10px",
    } as STTableColumnDetail;

    const Project2Column = {
        field: "nProjectMoneyCount",
        headerName: "จำนวน PIC Project Money (Project)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10px",
    } as STTableColumnDetail;

    const Project3Column = {
        field: "nProjectTimeCount",
        headerName: "จำนวน PIC Project Time (Project)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10px",
    } as STTableColumnDetail;

    const Project4Column = {
        field: "nProjectOtherCount",
        headerName: "จำนวน PIC Project Other (Project)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10px",
    } as STTableColumnDetail;

    const Project5Column = {
        field: "nProjectofMoney",
        headerName: "PIC Project Registration of Money (MBaht)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10px",
    } as STTableColumnDetail;

    const Project6Column = {
        field: "nProjectofTime",
        headerName: "PIC Project Registration of Time (Hrs.)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10px"
    } as STTableColumnDetail;

    const StatusColumn = {
        field: "sStatus",
        headerName: "Status",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "25px",
    } as STTableColumnDetail;

    const PICResultColumn = {
        field: "",
        headerName: "PIC Project Result of Money Value (MBaht)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "50px",
    } as STTableColumnDetail;

    let dataColumn3 = [] as STTableColumnDetail[];
    const TableResultType = (item) => {
        dataColumn3.push({
            field: item.nResultType,
            headerName: item.sResultTypeName,
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "6px",
        })
    }
    TabelResultID.map((item) => {
        TableResultType(item)
    })
    dataColumn3.push({
        field: "nTotal",
        headerName: "Total",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15px",
    })
    dataColumn3.push({
        field: "nMoneyTotal",
        headerName: "Money(%)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "6px",
    }, {
        field: "nTimeTotal",
        headerName: "Time(%)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "6px",
    })

    const TableQtool = (item) => {
        dataColumn3.push({
            field: item.nProjectCountQtool,
            headerName: item.sQtoolName,
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "6px",

        })
    }
    TabelQtoolID.map((item) => {
        TableQtool(item)
    })
    const ResultTimeColumn = {
        field: "nTimeValue",
        headerName: "PIC Project Result of Time Value (Hrs)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "6px",
    } as STTableColumnDetail;
    const TotalLossColumn = {
        field: "",
        headerName: "Total Loss/Gain",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "6px",
    } as STTableColumnDetail;
    const TotalProjectColumn = {
        field: "",
        headerName: "จำนวนโครงการ",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "6px",
    } as STTableColumnDetail;
    dataColumn3.push({
        field: "nProjectCount",
        headerName: "Total",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15px",
    })

    let dataColumn = [] as STTableColumnDetail[];
    let dataColumn2 = [] as STTableColumnDetail[];
    let RegistrationColumn1 = [] as STTableColumnDetail[];
    let RegistrationColumn2 = [] as STTableColumnDetail[];
    let RegistrationColumn3 = [] as STTableColumnDetail[];

    NoColumn.rowspan = 2;
    DepartmentColumn.rowspan = 2;
    RegistrationColumn.colspan = 6;
    StatusColumn.rowspan = 2;

    const DataProjectResultType = (ProjectCount, item) => {
        return (
            <React.Fragment key={item.nResultTypeID}>
                {ProjectCount.map((m) =>
                    <>
                        {m.nProjectCount}
                    </>
                )}
            </React.Fragment >
        )
    }
    const TableDataResultType = (item) => {
        dataColumn.push({
            field: "",
            headerName: item.sResultTypeName,
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "6px",
            getAction: (p) => {
                let ProjectCount = p.lstDataResultType.filter(f => f.nResultTypeID == item.nResultTypeID);
                return [
                    DataProjectResultType(ProjectCount, item)
                ]
            }
        })
    }
    const DataProjectQtool = (ProjectCountQtool, item) => {
        return (
            <React.Fragment key={item.nQtoolD}>
                {ProjectCountQtool.map((m) =>
                    <>
                        {m.nProjectCountQtool}
                    </>
                )}
            </React.Fragment >
        )
    }
    const TableDataQtool = (item) => {
        dataColumn.push({
            field: "",
            headerName: item.sQtoolName,
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "5px",
            getAction: (p) => {
                let ProjectCountQtool = p.lstDataQtool.filter(f => f.nQtoolD == item.nQtoolD);
                return [
                    DataProjectQtool(ProjectCountQtool, item)
                ]
            }
        })
    }
    const TablePICResult = () => {
        PICResultColumn.colspan = nColspanResult + 1;
        ResultTimeColumn.rowspan = 2;
        TotalLossColumn.colspan = 2;
        TotalProjectColumn.colspan = nColspanQtool + 1;
        dataColumn = [
            NoColumn,
            DepartmentColumn,
            StatusColumn,
        ];
        TabelResultID.map((item) => {
            TableDataResultType(item)
        })
        dataColumn.push({
            field: "nTotal",
            headerName: "Total",
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "15px",
        })
        dataColumn.push(ResultTimeColumn)
        dataColumn.push({
            field: "nMoneyTotal",
            headerName: "Money(%)",
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "6px",
        }, {
            field: "nTimeTotal",
            headerName: "Time(%)",
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "6px",
        })
        TabelQtoolID.map((item) => {
            TableDataQtool(item)
        }),
            dataColumn.push({
                field: "nProjectCount",
                headerName: "Total",
                bodyAlign: "center",
                sortable: false,
                isSort: false,
                collapse: false,
                width: "15px",
            })

        dataColumn2 = [
            NoColumn,
            DepartmentColumn,
            StatusColumn,
            PICResultColumn,
            ResultTimeColumn,
            TotalLossColumn,
            TotalProjectColumn
        ];
    }
    if (PICResult) {
        TablePICResult()
    } else {
        RegistrationColumn1 = [
            NoColumn,
            DepartmentColumn,
            Project1Column,
            Project2Column,
            Project3Column,
            Project4Column,
            Project5Column,
            Project6Column,
        ];
        RegistrationColumn3 = [
            Project1Column,
            Project2Column,
            Project3Column,
            Project4Column,
            Project5Column,
            Project6Column,
        ];
        RegistrationColumn2 = [
            NoColumn,
            DepartmentColumn,
            RegistrationColumn,
        ];

    }

    const MergeDetailPICResul = () => {
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
    }

    const MergeDetailRegistration = () => {
        if (RegistrationColumn2.length > 0) {
            const dataMergeDetail2 = {
                column: RegistrationColumn2

            } as STTableColumn;
            const dataMergeDetail = {
                column: RegistrationColumn3

            } as STTableColumn;
            dataMerge.push(dataMergeDetail2);
            dataMerge.push(dataMergeDetail);
        }
        else {
            dataMerge = undefined;
        }
    }

    let dataMerge = [] as STTableColumn[];
    if (PICResult) {
        MergeDetailPICResul();
    } else {
        MergeDetailRegistration();
    }

    const onSetType = (e) => {
        setPICResult(e == EnumPICResult.nPICResult)
        form.setValue("nQToolID", arrQtoolID);
        form.setValue("nResultTypeID", arrResultTypeID);
        onGetDataTable()
    }

    const MultiSelectPICResult = (PICResult) => {
        if (PICResult) {
            return (
                <>
                    <Grid item xs={3.5}>
                        <MultiSelectItem
                            key={"nResultTypeID"}
                            label=" Q Tool"
                            name="nQToolID"
                            IsSkeleton={false}
                            required={false}
                            disabled={false}
                            disableMode={'input'}
                            options={arrQtool}
                            limitTag={1}
                        />
                    </Grid>
                    <Grid item xs={3.5}>
                        <MultiSelectItem
                            key={"nResultTypeID"}
                            label="Result Type"
                            name="nResultTypeID"
                            IsSkeleton={false}
                            required={false}
                            disabled={false}
                            disableMode={'input'}
                            options={arrResultType}
                            limitTag={1}
                        />
                    </Grid>
                </>
            )
        }

    }
    useEffect(() => {
        onGetInitialTable();
        onGetDataTable();
    }, []);

    return {
        form,
        dataColumn,
        RegistrationColumn1,
        dataRow,
        loadding,
        dataMerge,
        onGetInitialTable,
        onGetDataTable,
        setPICResult,
        arrQtoolID,
        arrResultTypeID,
        PICResult,
        arrQtool,
        arrResultType,
        handleExportExcel,
        TableResultType,
        TableQtool,
        TablePICResult,
        TableDataResultType,
        TableDataQtool,
        DataProjectResultType,
        DataProjectQtool,
        MergeDetailPICResul,
        MergeDetailRegistration,
        onSetType,
        MultiSelectPICResult
    }

}