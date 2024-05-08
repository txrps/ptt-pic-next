import { initRows } from "@/components/STTable/STTable"; import { DatePickerItem } from '@/components/input-element/STDatePicker';
import { AxiosFn, FnDialog } from "@/lib/useAxios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useTimeline = () => {
    const currentYear = new Date().getFullYear();
    const DialogFn = FnDialog();
    const [IsSkeleton, setIsSkeleton] = useState(true)
    const [dataRow, setDataRow] = useState({
        ...initRows,
    });
    const [loadding, setLoadding] = useState(false)
    const [isLogkey, setLogkey] = useState(false)

    const form = useForm({
        shouldFocusError: true,
        mode: "all",
        defaultValues: {
            dYear: currentYear
        } as any,
    });
    const onGetTargetDate = () => {
        onGetData();
        const param = {
            nYear: form.getValues("dYear"),
        }
        AxiosFn.Get("Timeline/GetDataTargetDate", param, (res) => {
            setIsSkeleton(false)
            form.setValue("dTargetDate", moment(res.nTargetDate).format("MM/DD"));
        })
    }

    const onGetData = () => {
        const param = {
            nYear: form.getValues("dYear"),
        }
        setLoadding(true);
        AxiosFn.Get("Timeline/GetDataTable", param, (res) => {
            setLoadding(false);
            setDataRow({
                ...dataRow,
                arrRows: res.lstData,
            })

            res.lstData.forEach((val) => {
                if (val.nStartDate) {
                    form.setValue(`nStartDate_${val.sID}`, moment(val.nStartDate).format("MM/DD/YYYY"));
                    form.setValue(`nEndDate_${val.sID}`, moment(val.nEndDate).format("MM/DD/YYYY"));
                } else {
                    form.setValue(`nStartDate_${val.sID}`, null);
                    form.setValue(`nEndDate_${val.sID}`, null);
                }
            });
        })
    }

    useEffect(() => {
        onGetTargetDate();
    }, []);

    const onSubmit = (e) => {
        let lstDataEvent = []
        let lstData = []
        lstData = dataRow.arrRows;
        lstData.forEach((item) => {
            DataEvent(lstDataEvent, item, e)
        })

        let param = {
            nYear: form.getValues("dYear"),
            nTargetDate: new Date(form.getValues("dTargetDate")).valueOf(),
            lstData: lstDataEvent,
        };

        DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
            DialogFn.BlockUI();
            AxiosFn.Post(`Timeline/onSave`, param, (result) => {
                DialogFn.Success(`บันทึกสำเร็จ`);
                DialogFn.UnBlockUI();
            }, (err) => {
                DialogFn.UnBlockUI();
                if (!err.response) {
                    DialogFn.Warning(err.sMessage);
                }
            });
        });
    };
    const DataEvent = (lstDataEvent, item, e) => {

        lstDataEvent.push({
            sID: item.sID,
            nNo: item.nNo,
            sEvent: item.sEvent,
            nID: item.nID,
            nStartDate: e[`nStartDate_${item.sID}`] ? moment(e[`nStartDate_${item.sID}`]).valueOf() : item.nStartDate,
            nEndDate: e[`nEndDate_${item.sID}`] ? moment(e[`nEndDate_${item.sID}`]).valueOf() : item.nEndDate,
            nTimelineDateID: item.nTimelineDateID
        })
    }
    const StartDate = (item) => {
        return (
            <DatePickerItem
                key={`nStartDate_${item.sID}`}
                label=""
                name={`nStartDate_${item.sID}`}
                IsSkeleton={false}
                required={true}
                disabled={isLogkey}
                localeDate="en"
            />
        )
    }
    const EndDate = (item) => {
        return (
            <DatePickerItem
                key={`nEndDate_${item.sID}`}
                label=""
                name={`nEndDate_${item.sID}`}
                IsSkeleton={false}
                required={true}
                disabled={isLogkey}
                localeDate="en"
            />
        )
    }

    const dataColumn: any = [
        {
            field: "nNo",
            headerName: "No",
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "5%",
        },
        {
            field: "sEvent",
            headerName: "Event/Activity",
            bodyAlign: "center",
            sortable: false,
            isSort: false,
            collapse: false,
            width: "30%",
        },
        {
            field: "nStartDate",
            headerName: "Start Date",
            bodyAlign: "center",
            sortable: false,
            collapse: false,
            isSort: false,
            width: "20%",
            getAction: (item) => {
                return [
                    StartDate(item)

                ]
            }
        },
        {
            field: "nEndDate",
            headerName: "End Date",
            headerAlign: "center",
            bodyAlign: "center",
            bodyVerticalAlign: "top",
            sortable: false,
            collapse: false,
            isSort: false,
            width: "20%",
            getAction: (item) => {
                return [
                    EndDate(item)

                ]
            }
        }
    ];
    return {
        form,
        onGetTargetDate,
        onGetData,
        onSubmit,
        dataColumn,
        IsSkeleton,
        isLogkey,
        dataRow,
        loadding,
        setLogkey,
        StartDate,
        EndDate,
        DataEvent
    };
}
