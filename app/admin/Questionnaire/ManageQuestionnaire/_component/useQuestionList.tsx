import STTable, { initRows } from "@/components/STTable/STTable";
import { STFilterField, STTableColumnDetail } from "@/components/STTable/STTableProps";
import { BtnAdd, BtnEdit } from "@/components/mui-elements/Button/ButtonAll";
import { AxiosFn, FnDialog } from "@/lib/useAxios";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdWindow } from "react-icons/md";
import { EnumQuestionType } from "../page";

export const useQuestionList = () => {
    const DialogFn = FnDialog();
    const [isSkeleton, setIsSkeleton] = useState(true)
    const [isLoadding, setLoadding] = useState(false)
    const [dataRow, setDataRow] = useState({
        ...initRows,
    });
    const [openModalDialog, setOpenModalDialog] = useState(false);
    const [questionnaireID, setQuestionnaireID] = useState(0);
    const [nMode, setnMode] = useState(0);
    const [dataRowDialog, setDataRowDialog] = useState({
        ...initRows,
    });

    const form = useForm({
        shouldFocusError: true,
        mode: "all",

    });

    const onGetDataTable = () => {
        const param = {
            ...dataRow,
        }
        setLoadding(true);
        AxiosFn.Post("Questionnaire/GetDataTableTopic", param, (res) => {
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
        onGetDataTable();
    }, []);
    const fncAdd = () => {
        const html = <Link href={{
            pathname: "/admin/Questionnaire/ManageQuestionnaireForm",
        }}>
            <BtnAdd id="add" txt="" IsRadius={true} />
        </Link>
        return (html);
    }

    const fncEdit = (item) => {
        const html = <Link href={{
            pathname: "/admin/Questionnaire/ManageQuestionnaireForm",
            query: {
                sID: item.sID,
            }
        }}>
            <BtnEdit id="edit" txt="" IsRadius={true} />
        </Link>
        return (html);
    }
    const handleCloseModalDialog = () => {
        setOpenModalDialog(false);
    };

    const onOpenModal = (e, nMode) => {
        setOpenModalDialog(true);
        setnMode(nMode);
        onLoadData(e);
    };

    const onLoadData = (e) => {
        DialogFn.BlockUI();
        setLoadding(true);
        const param = {
            ...dataRowDialog,
            sID: e,
        }
        AxiosFn.Post("Questionnaire/GetTableDialogQuestion", param, (res) => {
            DialogFn.UnBlockUI();
            setLoadding(false);
            setDataRowDialog({
                ...dataRowDialog,
                arrRows: [...res.lstQuestion],
                nDataLength: res.ObjTable.nDataLength,
                nPageIndex: res.ObjTable.nPageIndex,
            });

        });
    }

    const onDelete = (val) => {
        const param = {
            lstID: val,
        };
        DialogFn.Submit("คุณต้องการลบข้อมูล ใช่หรือไม่", () => {
            DialogFn.BlockUI();
            AxiosFn.Post("Questionnaire/OnDelete", param, (result) => {
                DialogFn.UnBlockUI();
                DialogFn.Success("ลบสำเร็จ");
                onGetDataTable();
            })
        }
        );
    }

    const fncTableTopic = (item) => {
        return (
            <Grid container justifyContent={"center"} spacing={1}>
                <Grid item >
                    <Typography sx={{ fontSize: "15px" }}>{item.nTopicID}</Typography>
                </Grid>
                <Grid item >
                    <MdWindow
                        style={{
                            color: "#930012 !important",
                            cursor: "pointer",
                            fontSize: "20px",
                        }}
                        onClick={() => onOpenModal(item.sID, EnumQuestionType.nToppic)}
                    />
                </Grid>
            </Grid>
        )
    }
    const fncTableQuestionCount = (item) => {
        return (
            <Grid container justifyContent={"center"} spacing={1}>
                <Grid item >
                    <Typography sx={{ fontSize: "15px" }}>{item.nQuestionCount}</Typography>
                </Grid>
                <Grid item >
                    <MdWindow
                        style={{
                            color: "#930012 !important",
                            cursor: "pointer",
                            fontSize: "20px",
                        }}
                        onClick={() => onOpenModal(item.sID, EnumQuestionType.nQuestion)}
                    />
                </Grid>
            </Grid>
        )
    }

    const nOrderColumn = {
        field: "nOrder",
        headerName: "No",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "5%",

    } as STTableColumnDetail;

    const EditColumn = {
        renderHeader: () => {
            return (fncAdd());
        },
        field: "",
        headerName: "",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "1%",
        getAction: (item) => {
            return (fncEdit(item));
        },
    } as STTableColumnDetail;

    const QuestionNameColumn = {
        field: "sTopicName",
        headerName: "ชื่อแบบประเมิน",
        bodyAlign: "left",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "50%",
        flex: 1,
    } as STTableColumnDetail;

    const AssessmenttopicColumn = {
        field: "nTopicID",
        headerName: "หัวข้อประเมิน",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15%",
        flex: 1,
        getAction: (item) => {
            return (
                <>
                    {fncTableTopic(item)}
                </>
            );

        },

    } as STTableColumnDetail;

    const QuestionColumn = {
        field: "nQuestionCount",
        headerName: "คำถาม",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15%",
        flex: 1,
        getAction: (item) => {
            return (
                <>
                    {fncTableQuestionCount(item)}
                </>
            );

        },

    } as STTableColumnDetail;

    const StatusColumn = {
        field: "sStatus",
        headerName: "สถานะ",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15%",
        flex: 1,
    } as STTableColumnDetail;

    const dataColumn = [
        nOrderColumn,
        EditColumn,
        QuestionNameColumn,
        AssessmenttopicColumn,
        QuestionColumn,
        StatusColumn
    ] as STTableColumnDetail[];


    const NoColumn = {
        field: "nOrder",
        headerName: "No",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "5%",
    } as STTableColumnDetail;

    const TopicColumn = {
        field: "sTopicName",
        headerName: "หัวข้อประเมิน",
        bodyAlign: "left",
        sortable: false,
        isSort: false,
        collapse: false,
        width: nMode == EnumQuestionType.nToppic ? "90%" : "25%",
    } as STTableColumnDetail;

    const DialogQuestionColumn = {
        field: "sQuestion",
        headerName: "คำถาม",
        bodyAlign: "left",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "25%",
    } as STTableColumnDetail;

    const ChoiceTypeColumn = {
        field: "sQuestionTypeName",
        headerName: "Type",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15%",
    } as STTableColumnDetail;

    const RequireColumn = {
        field: "isRequire",
        headerName: "Require",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "7%",
        getAction: (item) => {
            let txt = "";
            if (item.isRequire) { txt = "True" }
            else { txt = "False" }
            const html = <Box>{txt}</Box>
            return (html)
        },
    } as STTableColumnDetail;

    const WeigthScoreColumn = {
        field: "nWeigth",
        headerName: "Weigth",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "7%",
    } as STTableColumnDetail;

    const MinScoreColumn = {
        field: "nMinScore",
        headerName: "Min",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "7%",
    } as STTableColumnDetail;

    const MaxScoreColumn = {
        field: "nMaxScore",
        headerName: "Max",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "7%",
    } as STTableColumnDetail;

    const DialogDataColumn = [
        NoColumn,
        TopicColumn,
        DialogQuestionColumn,
        ChoiceTypeColumn,
        RequireColumn,
        WeigthScoreColumn,
        MinScoreColumn,
        MaxScoreColumn
    ] as STTableColumnDetail[];

    const DialogDataTopicColumn = [
        NoColumn,
        TopicColumn,
    ] as STTableColumnDetail[];

    const DialogQuestion = () => {
        return (
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={openModalDialog}
                onClose={handleCloseModalDialog}
            >
                <DialogTitle sx={{ backgroundColor: "#0d66d9", color: "#fff" }}>หัวข้อประเมิน </DialogTitle>
                <DialogContent>
                    <Box sx={{ marginTop: "1rem" }}>
                        <STTable
                            width={"100%"}
                            column={nMode == EnumQuestionType.nToppic ? DialogDataTopicColumn : DialogDataColumn}
                            rows={dataRowDialog}
                            isLoading={isLoadding}
                            onLoadData={onLoadData}
                            isMenu={true}
                            isPage={true}
                            isShowCheckBox={false}
                            form={form}
                        />
                    </Box>
                    <Box noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}>
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModalDialog}>Close</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const filter: STFilterField[] = [
        { sTypeFilterMode: "input", sLabel: "ชื่อแบบประเมิน", sFieldName: "sTopicName" },
        { sTypeFilterMode: "select", sLabel: "สถานะ", sFieldName: "sStatus", optionSelect: [{ label: "Active", value: "1" }, { label: "Active", value: "0" }] }
    ];

    return {
        form,
        dataColumn,
        isSkeleton,
        dataRow,
        filter,
        isLoadding,
        onGetDataTable,
        questionnaireID,
        handleCloseModalDialog,
        openModalDialog,
        onDelete,
        DialogQuestion,
        fncTableTopic,
        fncTableQuestionCount,
    }
}
