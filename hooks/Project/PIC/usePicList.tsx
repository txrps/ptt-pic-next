"use client";

import { useState, useEffect, useRef, useMemo } from 'react'
import {  useForm } from "react-hook-form";
import { STTableColumnDetail, STTableRow, STFilterField, STTableColumn } from '@/components/STTable/STTableProps';
import STTable, { initRows } from '@/components/STTable/STTable';
import {  SecureStorage} from "@/lib";
import { IOptionsSelect } from "@/lib/inputTypes";
import { BtnAdd, BtnEdit } from "@/components/mui-elements/Button/ButtonAll";
import { ApiPicForm } from '@/enum/api';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import { useHandleService } from '@/lib/useHandleService';

export const usePicList = (Mode) => {
    const form = useForm({
        shouldFocusError: true,
        // shouldUnregister: false,
        mode: "all",
        defaultValues: {} as any
    });
    let arrrow = {
        ...initRows,
        sSortExpression: "dUpdate"
    };
    let sPathName = usePathname();
    const { Get, Post } = useHandleService();
    const sStore = SecureStorage.Get(sPathName);

    if (sStore !== "" && sStore !== undefined) {
        const objRowTemp = JSON.parse(sStore);
        if (objRowTemp != null) {
            arrrow = objRowTemp;
            arrrow.arrRows = [];
        }

    }
    const [datarow, setDataRow] = useState(arrrow);

    const [arrAchievement, setArrAchievement] = useState([] as IOptionsSelect[]);
    const [arrStatus, setArrStatus] = useState([] as IOptionsSelect[]);
    const [arrCategoryType, setArrCategoryType] = useState([] as IOptionsSelect[]);
    const [arrLossGain, setArrLossGain] = useState([] as IOptionsSelect[]);
    const [arrQtool, setArrQtool] = useState([] as IOptionsSelect[]);
    const [arrDepartment, setArrDepartment] = useState([] as IOptionsSelect[]);
    const [arrDivision, setArrDivision] = useState([] as IOptionsSelect[]);
    const [ApproveDate, setApproveDate] = useState("");
    const [RegisterDate, setRegisterDate] = useState("");
    const [Kpi, setKpi] = useState("");
    const [Year, setYear] = useState("");
    const [isAdd, setIsAdd] = useState(false);

    const [loadding, setLoadding] = useState(false);

 //#region Column

 const goToEdit =(sID)=>{
return [ <Link key={`btnLink_${sID}`}  href={{
    pathname: `/pic/register?sID=${sID}`,
  }}>
    <BtnEdit key={`btnEdit_${sID}`}  id={`btnEdit_${sID}`} txt="" IsCircleWithOutText />
  </Link>]
 }
 
const ActionColumn = {
    renderHeader: () => (
        isAdd ?   <Link href="/pic/register">
          <BtnAdd id={"btnAddRegister"} onClick={() => {}} IsCircleWithOutText IsHidden={!isAdd}/>
        </Link> : null
      ),
    field: "elAction",
    headerName: "Action",
    bodyAlign: "center",
    sortable: false,
    collapse: false,
    isSort: false,
    width: "45px",
    classHead: "th-left-sticky",
    classBody: "td-left-sticky",
    getAction: (item) => {
        return goToEdit(item.sID);
    }
} as STTableColumnDetail;
const YearColumn = {
    field: "nYear",
    headerName: "Year",
    bodyAlign: "center",
    sortable: true,
    collapse: false,
    width: "150px",
} as STTableColumnDetail;
const DepartmentColumn = {
    field: "sDepartment",
    headerName: "Department",
    bodyAlign: "center",
    sortable: true,
    collapse: false,
    width: "150px",
} as STTableColumnDetail;
const DivisionColumn = {
    field: "sDivision",
    headerName: "Division",
    bodyAlign: "center",
    sortable: true,
    collapse: false,
    width: "300px",
} as STTableColumnDetail;
const CategoryColumn = {
    field: "sCategory",
    headerName: "Category",
    bodyAlign: "center",
    sortable: true,
    collapse: false,
    width: "200px",
    colspan: 2
} as STTableColumnDetail;
const LossGainColumn = {
    field: "sLossGain",
    headerName: "Loss/Gain",
    bodyAlign: "center",
    sortable: true,
    collapse: false,
    width: "200px",
} as STTableColumnDetail;
const QtoolColumn = {
    field: "sQtool",
    headerName: "Qtool",
    bodyAlign: "left",
    sortable: true,
    collapse: false,
    width: "200px",
} as STTableColumnDetail;
const TargetColumn = {
    field: "sTarget",
    headerName: "Target",
    bodyAlign: "right",
    sortable: true,
    collapse: false,
    width: "120px",
} as STTableColumnDetail;
const ResultColumn = {
    field: "sResult",
    headerName: "Result",
    bodyAlign: "right",
    sortable: true,
    collapse: false,
    width: "120px",
} as STTableColumnDetail;
const UnitColumn = {
    field: "sUnit",
    headerName: "Unit",
    bodyAlign: "left",
    sortable: true,
    collapse: false,
    width: "200px",
} as STTableColumnDetail;
const AchievementColumn = {
    field: "sAchievement",
    headerName: "Achievement",
    bodyAlign: "left",
    sortable: true,
    collapse: false,
    width: "150px",
} as STTableColumnDetail;
const UpdateColumn = {
    field: "sUpdate",
    headerName: "Update by",
    bodyAlign: "left",
    sortable: true,
    collapse: false,
    width: "150px",
} as STTableColumnDetail;
const StatusColumn = {
    field: "sStatus",
    headerName: "Status",
    bodyAlign: "center",
    sortable: true,
    collapse: false,
    width: "150px",
} as STTableColumnDetail;
let dataColumn = [ActionColumn,YearColumn,DepartmentColumn,DivisionColumn,CategoryColumn,LossGainColumn,QtoolColumn,TargetColumn,ResultColumn,UnitColumn,AchievementColumn,UpdateColumn,StatusColumn];


//#endregion

const filter: STFilterField[] = [
    { sTypeFilterMode: "Year", sLabel: "Year", sFieldName: "nYear", fieldSearch: "sYearParam" },
    { sTypeFilterMode: "checkbox", sLabel: "Department", sFieldName: "sDepartment", fieldSearch: "arrDepartment" ,  optionSelect: arrDepartment},
    { sTypeFilterMode: "checkbox", sLabel: "Division", sFieldName: "sDivision", fieldSearch: "arrDivision" ,  optionSelect: arrDivision},
    { sTypeFilterMode: "input", sLabel: "PIC Project", sFieldName: "sPICProject", fieldSearch: "sPICProjectParam" },
    { sTypeFilterMode: "checkbox", sLabel: "Category", sFieldName: "sCategory", fieldSearch: "arrCategory",  optionSelect: arrCategoryType},
    { sTypeFilterMode: "checkbox", sLabel: "Loss/Gain", sFieldName: "sLossGain", fieldSearch: "arrLossGain",  optionSelect: arrLossGain},
    { sTypeFilterMode: "checkbox", sLabel: "Q Tool", sFieldName: "sQtool", fieldSearch: "arrQtool",  optionSelect: arrQtool},
    { sTypeFilterMode: "number", sLabel: "Target", sFieldName: "sTarget", fieldSearch: "nTargetParam" },
    { sTypeFilterMode: "number", sLabel: "Result", sFieldName: "sResult", fieldSearch: "sResultParam" },
    { sTypeFilterMode: "input", sLabel: "Unit", sFieldName: "sUnit", fieldSearch: "sUnitParam" },
    { sTypeFilterMode: "checkbox", sLabel: "Achievement", sFieldName: "sAchievement", fieldSearch: "arrAchievement",  optionSelect: arrAchievement},
    { sTypeFilterMode: "input", sLabel: "Update by", sFieldName: "sUpdate", fieldSearch: "sUpdateParam" },
    { sTypeFilterMode: "checkbox", sLabel: "Status", sFieldName: "sStatus", fieldSearch: "arrStatus" ,  optionSelect: arrStatus},
];
const getInitialTable = (sYear) => {
    const obj = {
        sYear : sYear
    }

    Get(ApiPicForm.GetInitialTable, obj, (result) => {
        console.log("result",result);
        setArrAchievement(result.arrAchievement);
        setArrStatus(result.arrStatus);
        setArrCategoryType(result.arrCategoryType);
        setArrLossGain(result.arrLossGain);
        setArrQtool(result.arrQtool);
        setArrDepartment(result.arrDepartment);
        setApproveDate(result.sApproveDate);
        setRegisterDate(result.sRegisterDate);
        setKpi(result.sKpi);
        setYear(result.nYear);
        setIsAdd(result.isAdd);
        getTable()
    });
}
const getTable = (p?: STTableRow) => {
    // DialogFn.BlockUI();
    setLoadding(true);
    const objParam = p || datarow;
    const obj = {
        ...objParam,
        nMode: Mode
    }
    Post(ApiPicForm.GetTable, obj, (result) => {
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

useEffect(() => {
    getInitialTable("")
}, []);

    return {form,datarow,setDataRow,loadding,dataColumn,filter,getTable,ApproveDate,RegisterDate,Kpi,Year,isAdd}
}