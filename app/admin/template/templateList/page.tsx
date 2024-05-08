"use client";

import React, { useEffect, useState } from 'react';
import STTable, { initRows } from '@/components/STTable/STTable';
import { STTableColumnDetail, STTableRow } from '@/components/STTable/STTableProps';
import { useForm } from 'react-hook-form';
import { AxiosFn } from '@/lib/useAxios';
import Link from 'next/link';
import { BtnAdd, BtnDownload } from '@/components/mui-elements/Button/ButtonAll';

import { useTemplateDataManagement } from './_hook/useTemplateDataManagement';


const Template = ({ isFrontend = false }) => {

  const {
    form,
    dataRow,
    isLoadding,
    onGetData,
    onDelete,
    dataColumn,
  } = useTemplateDataManagement(isFrontend);



  return (
    <STTable
      width={"100%"}
      column={dataColumn}
      rows={dataRow}
      isLoading={isLoadding}
      onLoadData={onGetData}
      isMenu={true}

      isShowCheckBox={!isFrontend}

      onDelete={(e) => onDelete(e)}
      form={form}
    />
  )
}

export default Template