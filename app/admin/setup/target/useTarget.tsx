import { SelectItem, InputNumberFormat } from "@/components";
import { initRows } from "@/components/STTable/STTable";
import { STTableColumnDetail, STTableColumn } from "@/components/STTable/STTableProps";
import SwitchFormItem from "@/components/input-element/Switch";
import { AxiosFn, FnDialog } from "@/lib/useAxios";
import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const useTarget = () => {
    const form = useForm({
        shouldFocusError: true,
        mode: "all"
    });

    const DialogFn = FnDialog();
    const [dataRow, setDataRow] = useState({
        ...initRows,
    });
    const [loadding, setLoadding] = useState(false)
    const [arrType, setArrType] = useState([])

    const onGetInitialTable = () => {
        AxiosFn.Get("Target/GetInitialTable", {}, (res) => {
            setArrType(res.arrType);
        })
    }

    const onGetDataTable = () => {
        const param = {
            ...dataRow,
        }
        setLoadding(true);
        AxiosFn.Post("Target/GetDataTable", param, (res) => {
            setLoadding(false);
            setDataRow({
                ...dataRow,
                arrRows: res.lstData,
                nDataLength: res.ObjTable?.nDataLength,
                nPageIndex: res.ObjTable?.nPageIndex,
            })

            res.lstData.forEach((f) => {
                DataTable(f)
            })
        })
    }
    const DataTable = (f) => {
        form.setValue(`nTypeID_${f.sID}`, f.nTypeID);
        form.setValue(`nMinL1_${f.sID}`, f.nMinL1);
        form.setValue(`nMaxL1_${f.sID}`, f.nMaxL1);
        form.setValue(`nMinL2_${f.sID}`, f.nMinL2);
        form.setValue(`nMaxL2_${f.sID}`, f.nMaxL2);
        form.setValue(`nMinL3_${f.sID}`, f.nMinL3);
        form.setValue(`nMaxL3_${f.sID}`, f.nMaxL3);
        form.setValue(`nMinL4_${f.sID}`, f.nMinL4);
        form.setValue(`nMaxL4_${f.sID}`, f.nMaxL4);
        form.setValue(`nMinL5_${f.sID}`, f.nMinL5);
        form.setValue(`nMaxL5_${f.sID}`, f.nMaxL5);
        form.setValue(`isActive_${f.sID}`, f.isActive);
    }

    useEffect(() => {
        onGetInitialTable();
        onGetDataTable();
    }, []);

    const onSubmit = (e) => {
        let lstDataTable = []
        let lstData = []
        lstData = dataRow.arrRows;
        lstData.forEach((item) => {
            DataTableSave(lstDataTable, item, e)
        })

        let param = {
            lstData: lstDataTable,
        };

        DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
            DialogFn.BlockUI();
            AxiosFn.Post(`Target/onSave`, param, (result) => {
                DialogFn.UnBlockUI();
                DialogFn.Success(`บันทึกสำเร็จ`);
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

    const DataTableSave = (lstDataTable, item, e) => {
        lstDataTable.push({
            sID: item.sID,
            nNo: item.nNo,
            nID: item.nID,
            nYear: item.nYear,
            nTypeID: form.getValues(`nTypeID_${item.sID}`) ? form.getValues(`nTypeID_${item.sID}`) : item.nTypeID,
            nMinL1: form.getValues(`nMinL1_${item.sID}`) ? form.getValues(`nMinL1_${item.sID}`) : item.nMinL1,
            nMaxL1: form.getValues(`nMaxL1_${item.sID}`) ? form.getValues(`nMaxL1_${item.sID}`) : item.nMaxL1,
            nMinL2: form.getValues(`nMinL2_${item.sID}`) ? form.getValues(`nMinL2_${item.sID}`) : item.nMinL2,
            nMaxL2: form.getValues(`nMaxL2_${item.sID}`) ? form.getValues(`nMaxL2_${item.sID}`) : item.nMaxL2,
            nMinL3: form.getValues(`nMinL3_${item.sID}`) ? form.getValues(`nMinL3_${item.sID}`) : item.nMinL3,
            nMaxL3: form.getValues(`nMaxL3_${item.sID}`) ? form.getValues(`nMaxL3_${item.sID}`) : item.nMaxL3,
            nMinL4: form.getValues(`nMinL4_${item.sID}`) ? form.getValues(`nMinL4_${item.sID}`) : item.nMinL4,
            nMaxL4: form.getValues(`nMaxL4_${item.sID}`) ? form.getValues(`nMaxL4_${item.sID}`) : item.nMaxL4,
            nMinL5: form.getValues(`nMinL5_${item.sID}`) ? form.getValues(`nMinL5_${item.sID}`) : item.nMinL5,
            nMaxL5: form.getValues(`nMaxL5_${item.sID}`) ? form.getValues(`nMaxL5_${item.sID}`) : item.nMaxL5,
            isActive: e[`isActive_${item.sID}`],
        })
    }

    const SelectItemType = (item) => {
        return (
            <SelectItem
                key={`nTypeID_${item.sID}`}
                label=""
                name={`nTypeID_${item.sID}`}
                IsSkeleton={false}
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                options={arrType}
            />
        )
    }
    const NumberMinL1 = (item) => {
        return (
            <InputNumberFormat
                label="Min"
                name={`nMinL1_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={1}
                max={item.nMaxL1}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }

    const NumberMaxL1 = (item) => {
        return (
            <InputNumberFormat
                label="Max"
                name={`nMaxL1_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={item.nMinL1}
                max={100}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }
    const NumberMinL2 = (item) => {
        return (
            <InputNumberFormat
                label="Min"
                name={`nMinL2_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={1}
                max={item.nMaxL2}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }
    const NumberMaxL2 = (item) => {
        return (
            <InputNumberFormat
                label="Max"
                name={`nMaxL2_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={item.nMinL2}
                max={100}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }

    const NumberMinL3 = (item) => {
        return (
            <InputNumberFormat
                label="Min"
                name={`nMinL3_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={1}
                max={item.nMaxL3}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }
    const NumberMaxL3 = (item) => {
        return (
            <InputNumberFormat
                label="Max"
                name={`nMaxL3_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={item.nMinL3}
                max={100}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }

    const NumberMinL4 = (item) => {
        return (
            <InputNumberFormat
                label="Min"
                name={`nMinL4_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={1}
                max={item.nMaxL4}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }
    const NumberMaxL4 = (item) => {
        return (
            <InputNumberFormat
                label="Max"
                name={`nMaxL4_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={item.nMinL4}
                max={100}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }

    const NumberMinL5 = (item) => {
        return (
            <InputNumberFormat
                label="Min"
                name={`nMinL5_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={1}
                max={item.nMaxL5}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }
    const NumberMaxL5 = (item) => {
        return (
            <InputNumberFormat
                label="Max"
                name={`nMaxL5_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={item.nMinL5}
                max={100}
                valueType="number"
                required={true}
                disabled={item.isShow}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }
    const SwitchActive = (item) => {
        return (
            <SwitchFormItem
                key={`isActive_${item.sID}`}
                id={`isActive_${item.sID}`}
                name={`isActive_${item.sID}`}
                label={""}
                disabled={item.isShow}
                required={true}
            />
        )
    }

    const NoColumn = {
        field: "nNo",
        headerName: "No",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "1%",
    } as STTableColumnDetail;

    const TargetYearColumn = {
        field: "nYear",
        headerName: "Target Year",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "5%",
    } as STTableColumnDetail;

    const TypeColumn = {
        field: "nTypeID",
        headerName: "Type",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15%",
        getAction: (item) => {
            return [
                SelectItemType(item)
            ]
        }
    } as STTableColumnDetail;

    const LevelColumn = {
        field: "",
        headerName: "Level",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "300px",
        classHead: "th-right-sticky",
        classBody: "td-right-sticky",
    } as STTableColumnDetail;

    const Level1Column = {
        field: "nMinL1",
        headerName: "L1(%)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        getAction: (item) => {
            return [
                <>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={6}>
                            {NumberMinL1(item)}
                        </Grid>
                        <Grid item xs={6}>
                            {NumberMaxL1(item)}
                        </Grid>
                    </Grid>
                </>
            ]
        }
    } as STTableColumnDetail;

    const Level2Column = {
        field: "nLevel2",
        headerName: "L2(%)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        getAction: (item) => {
            return [
                <>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={6}>
                            {NumberMinL2(item)}
                        </Grid>
                        <Grid item xs={6}>
                            {NumberMaxL2(item)}
                        </Grid>
                    </Grid>
                </>
            ]
        }
    } as STTableColumnDetail;

    const Level3Column = {
        field: "nLevel3",
        headerName: "L3(%)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        getAction: (item) => {
            return [
                <>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={6}>
                            {NumberMinL3(item)}
                        </Grid>
                        <Grid item xs={6}>
                            {NumberMaxL3(item)}
                        </Grid>
                    </Grid>
                </>
            ]
        }
    } as STTableColumnDetail;
    const Level4Column = {
        field: "nLevel4",
        headerName: "L4(%)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        getAction: (item) => {
            return [
                <>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={6}>
                            {NumberMinL4(item)}
                        </Grid>
                        <Grid item xs={6}>
                            {NumberMaxL4(item)}
                        </Grid>
                    </Grid>
                </>
            ]
        }
    } as STTableColumnDetail;

    const Level5Column = {
        field: "nLevel5",
        headerName: "L5(%)",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        getAction: (item) => {
            return [
                <>
                    <Grid item container xs={12} spacing={1}>
                        <Grid item xs={6}>
                            {NumberMinL5(item)}
                        </Grid>
                        <Grid item xs={6}>
                            {NumberMaxL5(item)}
                        </Grid>
                    </Grid>
                </>
            ]
        }
    } as STTableColumnDetail;
    const StatusColumn = {
        field: "",
        headerName: "แสดงสถานะหน่วยงานในหน้า PIC List",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "3%",
        getAction: (item) => {
            return [
                SwitchActive(item)
            ]

        }

    } as STTableColumnDetail;

    let dataColumn = [] as STTableColumnDetail[];
    let dataColumn2 = [] as STTableColumnDetail[];
    let dataColumn3 = [] as STTableColumnDetail[];

    ///อันนี้เอาไว้รวมหัวทั้งหมด
    NoColumn.rowspan = 2;
    TargetYearColumn.rowspan = 2;
    TypeColumn.rowspan = 2;
    StatusColumn.rowspan = 2;
    LevelColumn.colspan = 5;
    dataColumn = [
        NoColumn,
        TargetYearColumn,
        TypeColumn,
        Level1Column,
        Level2Column,
        Level3Column,
        Level4Column,
        Level5Column,
        StatusColumn,
    ];

    dataColumn3 = [
        Level1Column,
        Level2Column,
        Level3Column,
        Level4Column,
        Level5Column,
    ];
    dataColumn2 = [
        NoColumn,
        TargetYearColumn,
        TypeColumn,
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

    return {
        form,
        onSubmit,
        dataColumn,
        dataRow,
        loadding,
        dataMerge,
        onGetDataTable,
        setArrType,
        onGetInitialTable,
        DataTable,
        DataTableSave,
        SelectItemType,
        NumberMinL1,
        NumberMinL2,
        NumberMinL3,
        NumberMinL4,
        NumberMinL5,
        NumberMaxL1,
        NumberMaxL2,
        NumberMaxL3,
        NumberMaxL4,
        NumberMaxL5,
        SwitchActive,
    };
}