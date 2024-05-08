"use client";

import { BtnSave } from '@/components/mui-elements/Button/ButtonAll';
import { Grid } from '@mui/material';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import STTable from '@/components/STTable/STTable';
import { useTarget } from './useTarget';

const Target = () => {

    const {
        form,
        onSubmit,
        dataColumn,
        dataRow,
        loadding,
        dataMerge,
        onGetDataTable
    } = useTarget();
    return (
        <>
            <FormProvider {...form}>
                <Grid item xs={12} style={{ marginTop: 3 }}>
                    <STTable
                        columnmerge={dataMerge}
                        width={"100%"}
                        column={dataColumn}
                        rows={dataRow}
                        isLoading={loadding}
                        onLoadData={onGetDataTable}
                        isMenu={true}
                        isShowCheckBox={false}
                        onDelete={undefined}
                        form={form}
                    />
                </Grid>
                <Grid item container justifyContent={"center"}>
                    <BtnSave id="onsave" IsSkeleton={false} onClick={form.handleSubmit(
                        (e) => onSubmit(e),
                        (err) => console.log("err", err)
                    )} />
                </Grid>
            </FormProvider>
        </>
    )
};

export default Target;



