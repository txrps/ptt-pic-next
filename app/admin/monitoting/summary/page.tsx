"use client";

import {  RadioListItem } from '@/components/input-element';
import { BtnExportExcel, BtnSearch } from '@/components/mui-elements/Button/ButtonAll';
import { Grid} from '@mui/material';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import "./../../../.././styles/custominput.css";
import "./../../../.././styles/customtailwind.css";
import "./../../../.././styles/daypicker.css"
import STTable from '@/components/STTable/STTable';
import DateRangPickerItem from '@/components/input-element/STDatePicker/DateRangPickerItem';
import { useSummary } from './useSummary';

const Summary = () => {

    const {
        form,
        dataColumn,
        RegistrationColumn1,
        dataRow,
        loadding,
        dataMerge,
        onGetDataTable,
        PICResult,
        handleExportExcel,
        onSetType,
        MultiSelectPICResult,
    } = useSummary();

    return (
        <FormProvider {...form}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <RadioListItem
                        label=""
                        name="nTypeID"
                        IsSkeleton={false}
                        required={true}
                        disabled={false}
                        disableMode={"input"}
                        options={[
                            { label: "PIC Registration", value: "1", disable: false },
                            { label: "PIC Result", value: "2", disable: false },
                        ]}
                        onChange={(e) => {
                            onSetType(e)
                        }}
                    />
                </Grid>
               
                <Grid item xs={5} >
                    <DateRangPickerItem
                        label="วันที่เริ่มต้น"
                        name="dStartDate"
                        label2="วันที่สิ้นสุด"
                        name2="dEndDate"
                        IsSkeleton={false}
                        required={false}
                        disabled={false}
                        disableMode={"input"}
                    />
                </Grid>
                {MultiSelectPICResult(PICResult)}
                <Grid container justifyContent={"center"} spacing={3} style={{ marginTop: 6 }}>
                    <Grid item container justifyContent={"end"} xs={6}>
                        <BtnSearch id="onSearch" IsSkeleton={false} txt={"Search"}
                            onClick={() => { onGetDataTable() }}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <BtnExportExcel id="onsave" IsSkeleton={false} txt={"Download Excel"}
                            onClick={() => { handleExportExcel() }}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} style={{ marginTop: 6 }}>
                    <STTable
                        columnmerge={dataMerge}
                      //  width={"100%"}
                        column={PICResult ? dataColumn : RegistrationColumn1}
                        rows={dataRow}
                        isLoading={loadding}
                        onLoadData={onGetDataTable}
                        isMenu={true}
                        isShowCheckBox={false}
                        onDelete={undefined}
                        form={form}
                    />
                </Grid>
            </Grid>
        </FormProvider>
    )
};

export default Summary;


export const enum EnumPICResult {
    nPICRegistration = 1,
    nPICResult = 2, //Qtool

}

