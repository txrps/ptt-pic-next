"use client";

import { CheckboxItem, InputNumberFormat, SelectItem, TextBoxItem } from "@/components";
import { initRows } from "@/components/STTable/STTable";
import { STTableColumnDetail } from "@/components/STTable/STTableProps";
import { BtnAdd, BtnCancel, BtnSave } from "@/components/mui-elements/Button/ButtonAll";
import { AxiosFn, FnDialog } from "@/lib/useAxios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ErrorIcon from '@mui/icons-material/Error';
import { Dialog, DialogContent, DialogTitle, Grid } from "@mui/material";
import { useSearchParams } from "next/navigation";
// import FroalaEditor from 'react-froala-wysiwyg';
// import "froala-editor/css/froala_style.min.css";
// import "froala-editor/css/froala_editor.pkgd.min.css";
// import "froala-editor/js/froala_editor.pkgd.min.js";
// import "froala-editor/js/plugins.pkgd.min.js";
// import 'froala-editor/js/languages/th';
import Link from "next/link";
import SwitchFormItem from "@/components/input-element/Switch";
import dynamic from "next/dynamic";
export const useQuestionForm = () => {
    const FroalaEditor: React.ComponentType<any> = dynamic(
        () => {
          return new Promise(resolve =>
            import("froala-editor/js/plugins.pkgd.min.js").then(e => {
              import("react-froala-wysiwyg").then(resolve);
            })
          );
        },
        {
          loading: () => null,
          ssr: false
        }
      );

    const searchParams = useSearchParams();
    const sID = searchParams.get("sID");
    const DialogFn = FnDialog();
    const [isSkeleton, setIsSkeleton] = useState(true)
    const [isLoadding, setLoadding] = useState(false)
    const [dataRow, setDataRow] = useState({
        ...initRows,
    });
    const [arrTopic, setArrTopic] = useState([])
    const [arrQuestionType, setarrQuestionType] = useState([])
    const [arrQtool, setArrQtool] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [sIDModal, setsIDModal] = useState("")
    const [sHint, setsHint] = useState(null);
    const form = useForm({
        shouldFocusError: true,
        mode: "all",

    });
    const onGetInitialTable = () => {
        AxiosFn.Get("Questionnaire/GetInitialTable", {}, (res) => {
            setArrTopic(res.arrTopic);
            setarrQuestionType(res.arrQuestionType);
            setArrQtool(res.arrQtool);
        })
    }

    //Add TableItem
    const onSumitTable = () => {
        let arrClone = dataRow;
        let arrNewItem = [];
        let arrID = arrClone.arrRows.length > 0 ? arrClone.arrRows.map((m) => m.sID) : [];
        let nID = (arrID.length > 0 ? Math.max(...arrID) : 0) + 1;
        arrNewItem.push(...arrClone.arrRows);

        //Add New Item 
        let arrIDOnItem = arrNewItem.map((m) => m.sID);
        let arrOrderOnItem = arrNewItem.map((m) => m.nOrder);
        let sID = arrNewItem.length > 0 ? Math.max(...arrIDOnItem) + 1 : nID;

        let objNewItem: QueationTable = {};
        objNewItem.sID = sID + "";
        objNewItem.nOrder = arrNewItem.length > 0 ? Math.max(...arrOrderOnItem) + 1 : nID;
        objNewItem.nQuestionCategoryID = sID;
        objNewItem.isActive = true;
        objNewItem.nQuestionID = 0;
        arrNewItem.push(objNewItem);
        arrClone.arrRows = [...arrNewItem];
        setDataRow({ ...arrClone });
    };

    const onSubmit = (e) => {
        let arrItem = [];
        dataRow.arrRows.forEach((item) => {
            let objtem: QueationTable = {};
            objtem.sID = item.sID;
            objtem.nOrder = item.nOrder;
            objtem.nQuestionCategoryID = item.nQuestionCategoryID;
            objtem.nQuestionnaireID = item.nQuestionCategoryID ? item.nQuestionCategoryID : 0;
            objtem.nTopicID = e[`nTopic_${item.sID}`] ? e[`nTopic_${item.sID}`] : item.nTopicID;
            objtem.sQuestion = e[`sQuestion_${item.sID}`] ? e[`sQuestion_${item.sID}`] : item.sQuestion_;
            objtem.nQuestionTypeID = e[`nType_${item.sID}`] ? e[`nType_${item.sID}`] : item.nQuestionTypeID;
            objtem.isRequire = e[`sRequire_${item.sID}`] == ("1" || true) ? true : false;
            objtem.nWeigth = e[`nWeigth_${item.sID}`] ? e[`nWeigth_${item.sID}`] : item.nWeigth;
            objtem.nMinScore = e[`nMinScore_${item.sID}`] ? e[`nMinScore_${item.sID}`] : item.nMinScore;
            objtem.nMaxScore = e[`nMaxScore_${item.sID}`] ? e[`nMaxScore_${item.sID}`] : item.nMaxScore;
            objtem.sHint = item.sHint;
            arrItem.push(objtem);
        })
        let param = {
            sID: sID != null ? sID : "",
            sQuestionName: form.getValues("sQuestionName"),
            isRequiredfield: form.getValues("sRequiredfield"),
            isActive: form.getValues("isActive"),
            nQtoolID: form.getValues("nQtoolID"),
            lstQuestion: arrItem,
        };
        DialogFn.Submit("คุณต้องการบันทึก ใช่หรือไม่", () => {
            DialogFn.BlockUI();
            AxiosFn.Post(`Questionnaire/onSave`, param, (result) => {
                DialogFn.UnBlockUI();
                DialogFn.Success("บันทึกสำเร็จ");
                // window.location.href = process.env.NEXT_PUBLIC_APP_URL + "admin/Questionnaire/ManageQuestionnaire";
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
    const GetEdit = () => {
        let param = {
            ...dataRow,
            sID: sID != null ? sID : "",
        };
        setLoadding(true);
        AxiosFn.Post(`Questionnaire/GetQuestionEdit`, param, (result) => {
            setLoadding(false);
            if (sID) {
                form.setValue("nQtoolID", result.nQtoolID+"");
                form.setValue("sQuestionName", result.sQuestionName);
                form.setValue("sRequiredfield", result.isRequiredfield);
                form.setValue("isActive", result.isActive);
                setDataRow({
                    ...dataRow,
                    arrRows: result.lstQuestion ?? [],
                    nDataLength: result.ObjTable?.nDataLength,
                    nPageIndex: result.ObjTable?.nPageIndex,
                });
                if (result.lstQuestion.length > 0) {
                    (result.lstQuestion).forEach(f => {
                        form.setValue(`nTopic_${f.sID}`, f.nTopicID);
                        form.setValue(`sQuestion_${f.sID}`, f.sQuestion);
                        form.setValue(`nType_${f.sID}`, f.nQuestionTypeID);
                        form.setValue(`sRequire_${f.sID}`, f.isRequire ? true : false);
                        form.setValue(`nWeigth_${f.sID}`, f.nWeigth);
                        form.setValue(`nMinScore_${f.sID}`, f.nMinScore);
                        form.setValue(`nMaxScore_${f.sID}`, f.nMaxScore);
                        form.setValue(`sHint${f.sID}`, f.sHint);
                        setsHint(f.sHint)
                    })
                }
            }
        }, (err) => {
            if (!err.response) {
                DialogFn.Warning(err.Message);
            }
        }
        );

    }

    useEffect(() => {
        onGetInitialTable();
        if (sID != "") {
            GetEdit();
        }
    }, []);


    //หาQuestionType
    const getQuestionType = (e, sID) => {
        let arrClone = dataRow;
        if (arrClone.arrRows.length > 0) {
            arrClone.arrRows.forEach((f) => {
                f.isActive = f.sID == sID ? e.isActive : f.isActive;
                f.nMinScore = f.sID == sID ? e.nMin : f.nMinScore;
                f.nMaxScore = f.sID == sID ? e.nMax : f.nMaxScore;
                if (f.sID == sID) {
                    form.setValue(`nMinScore_${f.sID}`, e.nMin);
                    form.setValue(`nMaxScore_${f.sID}`, e.nMax);
                }

            });
        }
        setDataRow({ ...arrClone });
    }

    const onOpenModal = (item, sHint) => {
        setIsOpen(true);
        setsIDModal(item);
        setsHint(sHint);
    };

    const handleModelChange = (event) => {
        setsHint(event)
        let arrClone = dataRow;
        if (arrClone.arrRows.length > 0) {
            arrClone.arrRows.forEach((f) => {
                f.sHint = f.sID == sIDModal ? event : f.sHint;
            });
        }
        setDataRow({ ...arrClone });
    }

    //ลบข้อมูลในตาราง
    const onDelete = (arrID) => {
        DialogFn.Submit(`คุณต้องการลบข้อมูล ใช่หรือไม่`, () => {
            let arrClone = dataRow;
            arrClone.arrRows = arrClone.arrRows.filter((f) => !arrID.includes(f.sID));
            // เรียง Order ใหม่
            if (arrClone.arrRows.length > 0) {
                let nOrder = 1;
                arrClone.arrRows.forEach((f) => {
                    f.nOrder = nOrder;
                    nOrder++;
                });
            }
            setDataRow({
                ...arrClone,
                nDataLength: arrClone.arrRows.length,
            });
            DialogFn.Success("ลบข้อมูลสำเร็จ");
        });
    };


    const SelectTopic = (item) => {
        return (
            <SelectItem
                key={`nTopic_${item.sID}`}
                label=""
                name={`nTopic_${item.sID}`}
                IsSkeleton={false}
                required={true}
                disabled={false}
                disableMode={'input'}
                options={arrTopic}
            />
        )
    }

    const TextBoxQuestion = (item) => {
        return (
            <TextBoxItem
                maxLength={100}
                label=""
                id={`sQuestion_${item.sID}`}
                name={`sQuestion_${item.sID}`}
                IsSkeleton={false}
                required={true}
                disabled={false}
                disableMode={"input"}
                IsCharacterCount
            />
        )
    }

    const SelectType = (item) => {
        return (
            <SelectItem
                key={`nType_${item.sID}`}
                label=""
                name={`nType_${item.sID}`}
                IsSkeleton={false}
                required={true}
                disabled={false}
                disableMode={'input'}
                options={arrQuestionType}
                onChange={(e) => {
                    getQuestionType(e ? e : null, item.sID)
                }}
            />
        )
    }
    const CheckboxRequire = (item) => {
        return (
            <CheckboxItem
                label=""
                name={`sRequire_${item.sID}`}
                IsSkeleton={false}
                required={false}
                disabled={false}
                options={[
                    {
                        label: null,
                        value: "1",
                        disable: false,
                    },
                ]}
            />
        )
    }

    const InputNumberWeigth = (item) => {
        return (
            <InputNumberFormat
                label=""
                name={`nWeigth_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                min={1}
                max={item.nMaxL1}
                valueType="number"
                required={true}
                disabled={false}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }
    const InputNumberMin = (item) => {
        return (
            <InputNumberFormat
                label=""
                name={`nMinScore_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                valueType="number"
                required={true}
                disabled={!item.isActive}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }

    const InputNumberMax = (item) => {
        return (
            <InputNumberFormat
                label=""
                name={`nMaxScore_${item.sID}`}
                IsAllowMinus={false}
                IsSkeleton={false}
                IsThousandSeparator={false}
                maxLength={10}
                valueType="number"
                required={true}
                disabled={!item.isActive}
                disableMode={'input'}
                maxDigits={1}
            />
        )
    }

    const IconHint = (item, sHint) => {
        return (
            <ErrorIcon onClick={() => onOpenModal(item, sHint)} style={{ fontSize: "30px", color: "#09a7e8", cursor: "pointer" }} />
        )
    }

    const handleCloseModalDialog = () => {
        setIsOpen(false);
        setsIDModal("");
    };
    const configs = (placeholderText) => {
        let ObjConfigs = {
            key: "0BA3jA11B5C7C4A4D3aIVLEABVAYFKc2Cb1MYGH1g1NYVMiG5G4E3C3A1C8A6D4A3B4==",
            attribution: false,
            heightMin: 200,
            heightMax: 2000,
            imageUploadURL: process.env.REACT_APP_API_URL + "api/UploadFile/UploadFileFroala",
            placeholderText: placeholderText,
            language: 'th',
            toolbarButtons: {
                moreText: {
                    buttons: ['bold', 'italic', 'underline', 'subscript', 'superscript', 'fontSize', 'textColor', 'clearFormatting']
                },
                moreParagraph: {
                    buttons: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
                    buttonsVisible: 4
                },
                moreRich: {
                    buttons: ['insertTable', 'insertImage', 'insertHR']
                },
                moreMisc: {
                    buttons: ['undo', 'redo', 'fullscreen'],
                    align: 'right',
                    buttonsVisible: 3
                }
            },
            quickInsertButtons: ['table', 'image', 'hr'],
            pasteAllowedStyleProps: ['color'],
            imageEditButtons: ['imageReplace', 'imageAlign', 'imageCaption', 'imageRemove'],
            charCounterCount: false,
        }
        return ObjConfigs;
    };


    const nOrderColumn = {
        field: "nOrder",
        headerName: "No",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "5%",
        renderHeader: () => {
            return <BtnAdd id="AddStage2" txt="Add" IsRadius={true} IsCircleWithOutText={true} onClick={form.handleSubmit(() => { onSumitTable() })} />;
        },
    } as STTableColumnDetail;

    const AssessmenttopicColumn = {
        field: "sAssessmenttopic",
        headerName: "หัวข้อประเมิน",
        bodyAlign: "left",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "15%",
        flex: 1,
        getAction: (item) => {
            return [
                SelectTopic(item)
            ]
        }
    } as STTableColumnDetail;

    const QuestionColumn = {
        field: "sQuestion",
        headerName: "Question",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "25%",
        flex: 1,
        getAction: (item) => {
            return [
                TextBoxQuestion(item)
            ]
        }
    } as STTableColumnDetail;

    const TypeColumn = {
        field: "sType",
        headerName: "  Type  ",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "12%",
        flex: 1,
        getAction: (item) => {
            return [
                SelectType(item)
            ]
        }
    } as STTableColumnDetail;

    const RequireColumn = {
        field: "sRequire",
        headerName: "Require",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "5%",
        flex: 1,
        getAction: (item) => {
            return [
                CheckboxRequire(item)
            ]
        }
    } as STTableColumnDetail;

    const Weigthcolumn = {
        field: "nWeigth",
        headerName: "Weigth",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        flex: 1,
        getAction: (item) => {
            return [
                InputNumberWeigth(item)
            ]
        }
    } as STTableColumnDetail;

    const Mincolumn = {
        field: "nMinScore",
        headerName: "Min",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        flex: 1,
        getAction: (item) => {
            return [
                InputNumberMin(item)
            ]
        }

    } as STTableColumnDetail;

    const Maxcolumn = {
        field: "nMaxScore",
        headerName: "Max",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "10%",
        flex: 1,
        getAction: (item) => {
            return [
                InputNumberMax(item)
            ]
        }
    } as STTableColumnDetail;

    const Hintcolumn = {
        field: "sHint",
        headerName: "Hint",
        bodyAlign: "center",
        sortable: false,
        isSort: false,
        collapse: false,
        width: "5%",
        flex: 1,
        getAction: (item) => {
            return [
                IconHint(item.sID, item.sHint)
            ]
        }

    } as STTableColumnDetail;

    const dataColumn = [
        nOrderColumn,
        AssessmenttopicColumn,
        QuestionColumn,
        TypeColumn,
        RequireColumn,
        Weigthcolumn,
        Mincolumn,
        Maxcolumn,
        Hintcolumn,
    ] as STTableColumnDetail[];


    const DialogHint = () => {
        return (
            <Dialog
                fullWidth={true}
                maxWidth={"lg"}
                open={isOpen}
                onClose={handleCloseModalDialog}
            >
                <DialogTitle sx={{ backgroundColor: "#0d66d9", color: "#fff" }}>Hint</DialogTitle>
                <DialogContent>
                    <Grid container justifyContent={"center"} style={{ marginTop: 15 }}>
                        <Grid item xs={12}>
                            <FroalaEditor
                                tag='textarea'
                                config={configs("")}
                                key={'sHint'}
                                model={sHint}
                                onModelChange={handleModelChange}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <Grid container justifyContent={"center"} spacing={3} style={{ marginBottom: 10 }}>
                    <Grid item container justifyContent={"end"} xs={6}>
                        <BtnCancel id="onBack" IsSkeleton={false} txt={"Cancel"}
                            onClick={handleCloseModalDialog}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <BtnSave id="onsave" IsSkeleton={false}
                            onClick={handleCloseModalDialog}
                        />
                    </Grid>
                </Grid>
            </Dialog>
        )
    }
    const fncAddQuestion = () => {
        return (
            <>
                <Grid item xs={10}>
                    <TextBoxItem
                        maxLength={100}
                        label="Question Name"
                        id={"sQuestionName"}
                        name={"sQuestionName"}
                        IsSkeleton={false}
                        required={true}
                        disabled={false}
                        disableMode={"input"}
                        IsCharacterCount
                    />
                </Grid>
                <Grid item xs={2}>
                    <CheckboxItem
                        label=""
                        name="sRequiredfield"
                        IsSkeleton={false}
                        required={false}
                        disabled={false}
                        options={[
                            {
                                label: "Required field",
                                value: "1",
                                disable: false,
                            },
                        ]}
                    />
                </Grid>
                <Grid item xs={10}>
                    <SelectItem
                        label="Quality tools"
                        id={"nQtoolID"}
                        name={"nQtoolID"}
                        IsSkeleton={false}
                        required={true}
                        disabled={false}
                        disableMode={'input'}
                        options={arrQtool}
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
            </>
        )
    }

    return {
        form,
        dataColumn,
        isSkeleton,
        dataRow,
        isLoadding,
        GetEdit,
        onSubmit,
        arrQtool,
        DialogHint,
        fncAddQuestion,
        onDelete,
        onGetInitialTable,
        onSumitTable  
    }
}

export interface QueationTable {
    sID?: string;
    nQuestionCategoryID?: number;
    nQuestionnaireID?: number;
    nTopicID?: number;
    nOrder?: number;
    nTopicName?: number;
    sQuestion?: string;
    nQuestionTypeID?: number;
    isRequire?: boolean;
    nWeigth?: number;
    nMinScore?: number;
    nMaxScore?: number;
    sHint?: string;
    isActive?: boolean;
    nQuestionID?: number;
}