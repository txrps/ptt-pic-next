"use client";

import { Grid } from '@mui/material';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import "./../../../.././styles/custominput.css";
import "./../../../.././styles/customtailwind.css";
import "./../../../.././styles/daypicker.css"
import STTable from '@/components/STTable/STTable';
import { useApproval } from './useApproval';

const Approval = () => {
    const {
        form,
        dataColumn,
        dataRow,
        loadding,
        dataMerge,
        onGetDataTable,
        isAdd,
        onDelete,
        RenderAdd
    } = useApproval();
    return (
        <>
            <FormProvider {...form}>
                <Grid container spacing={2}>
                  {RenderAdd(isAdd)}
                    <Grid item xs={12} style={{ marginTop: 6 }}>
                        <STTable
                            columnmerge={dataMerge}
                            width={"100%"}
                            column={dataColumn}
                            rows={dataRow}
                            isLoading={loadding}
                            onLoadData={onGetDataTable}
                            isMenu={true}
                            isShowCheckBox={true}
                            onDelete={onDelete}
                            form={form}
                        />
                    </Grid>
                </Grid>
            </FormProvider>
        </>
    )
};

export default Approval;


export const enum EnumType {
    nQtoolID = 3, //Qtool
    nCommander = 5,
    nDivisionDirector = 6,
    nDepartmentDirector = 7,
}

