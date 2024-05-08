"use client";

import { STTableColumnDetail } from "@/components/STTable/STTableProps";
import { Show } from "@/components/common/Show";
import { BtnAdd, BtnEdit } from "@/components/mui-elements/Button/ButtonAll";
import { ApiAdditionalQuestions } from "@/enum/api";
import { RequiredChoice, SelectionOptions } from "@/enum/enum";
import { useHandleService } from "@/lib/useHandleService";
import Link from "next/link";
import { useEffect, useReducer, useState } from "react";
import { useForm } from "react-hook-form";

export const useAdQuestionList = () => {
  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const DataColumn: STTableColumnDetail[] = [
    {
      renderHeader: () => (
        <Link href="/admin/AdditionalQuestions/Form">
          <BtnAdd id={"btnADd"} onClick={() => {}} IsCircleWithOutText/>
        </Link>
      ),
      field: "elAction",
      headerName: "Action",
      bodyAlign: "center",
      sortable: false,
      collapse: false,
      isSort: false,
      width: "5%",
      getAction: (item) => {
        return [
          <Show key={item.sID}>
            <Show.When isTrue={true}>
              <BtnEdit
                id={"btnEdit_" + item.sID}
                key={"btnEdit_" + item.sID}
                onClick={() => {}}
              />
            </Show.When>

            <Show.Else>
              <></>
            </Show.Else>
          </Show>,
        ];
      },
    } as STTableColumnDetail,
    {
      field: "nNo",
      headerName: "No.",
      bodyAlign: "center",
      sortable: false,
      collapse: false,
      width: "10%",
    } as STTableColumnDetail,
    {
      field: "sQuestion",
      headerName: "หัวข้อคำถาม",
      bodyAlign: "left",
      sortable: false,
      collapse: false,
      width: "25%",
    } as STTableColumnDetail,
    {
      field: "sDetailQuestion",
      headerName: "รายละเอียดคำถาม",
      bodyAlign: "left",
      sortable: false,
      collapse: false,
      width: "25%",
    } as STTableColumnDetail,
    {
      field: "sStartDate",
      headerName: "วันที่เริ่มต้น",
      bodyAlign: "left",
      sortable: false,
      collapse: false,
      width: "15%",
    } as STTableColumnDetail,
    {
      field: "sEndDate",
      headerName: "วันที่สิ้นสุด",
      bodyAlign: "left",
      sortable: false,
      collapse: false,
      width: "15%",
    } as STTableColumnDetail,
  ];

  return { form, DataColumn };
};

const initialOption = {
  optionOrder: [],
  optionQtool: [],
  optionOrganization: [],
};

const initialState = {
  isSkeleton: true,
};

export const optionsChoice = [
  {
    label: SelectionOptions.SINGLE_OPTION.label,
    value: SelectionOptions.SINGLE_OPTION.value,
  },
  {
    label: SelectionOptions.MULTIPLE_OPTIONS.label,
    value: SelectionOptions.MULTIPLE_OPTIONS.value,
  },
  {
    label: SelectionOptions.OPEN_TEXT.label,
    value: SelectionOptions.OPEN_TEXT.value,
  },
];

export const TimelineDescription = {
  THAI_DESCRIPTION: "หมายเหตุ เพื่อความครบถ้วนของข้อมูลในแต่ละปี ควรกำหนดวันที่เริ่มต้น - สิ้นสุดปีที่ใช้งานของคำถาม ไม่เกิน Target Date ตามที่ตั้งค่าไว้ในเมนู Timeline",
};

export const optionsRequired = [
  {
    label: RequiredChoice.Required_Field.label,
    value: RequiredChoice.Required_Field.value,
  },
];

export const optionsNote = [
  {
    label: RequiredChoice.Note_Field.label,
    value: RequiredChoice.Note_Field.value,
  },
];


export const useAdQuestionForm = () => {
  const { Get } = useHandleService();
  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const [choices, setChoices] = useState([
    {
      nID: null,
      sChoice: "",
      sNote: "",
      IsNote: false,
      IsRequired: false,
    },
  ]);

  const reducer = (state, action) => {
    return { ...state, ...action };
  };
  const [state, updateState] = useReducer(reducer, initialState);
  const [option, updateOption] = useReducer(reducer, initialOption);

  const GetInitialOption = async () => {
    await Get(ApiAdditionalQuestions.GetInitialOption, {}, (result) => {
      const objResult = result.objResult;
      if (objResult) {
        updateOption({
          optionOrder: objResult.options,
          optionQtool: objResult.optionQtool,
          optionOrganization: objResult.optionOrganization,
        });
      }
    });
  };

  useEffect(() => {
    GetInitialOption();
  }, []);

  useEffect(() => {
    const triggerAllFetches = async () => {
      await Promise.all([GetInitialOption()]);
      updateState({
        isSkeleton: false,
      });
    };
    triggerAllFetches();
  }, []);

  return { form, option, state, choices, setChoices };
};
