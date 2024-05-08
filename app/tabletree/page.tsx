"use client";

import STTable, { initRows } from "@/components/STTable/STTable";
import { STTableColumnDetail } from "@/components/STTable/STTableProps";
import DynamicButton from "@/components/STTable/components/DynamicRow";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const page = () => {
  const data = [
    {
      name: "a",
      child: [
        {
          name: "b",
          child: [{ name: "c", child: null, expanded: false }],
          expanded: false,
        },
      ],
      expanded: false,
    },
  ];

  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });

  const [dataRow, setDataRow] = useState({
    ...initRows,
    arrRows : [
        {sID : "1",sName : "A", child : [
            {sID : "2", sName : "B" , child : [
                {sID : "3", sName : "C", child : null}
            ]}
        ]},
        {
            sID : "4", sName : "D" , child : null
        },
        {sID : "5",sName : "E", child : [
            {sID : "6", sName : "F" , child : [
                {sID : "7", sName : "G", child : null}
            ]},
            {sID : "8", sName : "H" , child : [
                {sID : "9", sName : "I", child : [{
                    sID : "10",sName : "J", child : null
                }]}
            ]}
        ]},
    ]
  });

  const CollapseColumn = {
    field: "el",
    headerName: "",
    bodyAlign: "center",
    sortable: false,
    isSort: false,
    collapse: true,
  } as STTableColumnDetail;
  const QuestionnaireColumn = {
    field: "sName",
    headerName: "name",
    bodyAlign: "left",
    sortable: false,
    isSort: false,
    collapse: false,
    width: "90%",
  } as STTableColumnDetail;

  let dataColumn = [] as STTableColumnDetail[];

  dataColumn = [
    CollapseColumn,
    QuestionnaireColumn,
  ];
  return (
      <FormProvider {...form}>
        <STTable
          width={"100%"}
          column={dataColumn}
          rows={dataRow}
          isLoading={false}
          onLoadData={() => {}}
          isMenu={true}
          isPage={true}
          isShowCheckBox={true}
          onDelete={(e) => {}}
          form={form}
        />
      </FormProvider>
  );
};

export default page;
