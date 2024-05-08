"use client";

import React, { useEffect, useRef, useState } from "react";
import { Box, Button, FormControlLabel, FormGroup, Grid, Tooltip, useMediaQuery } from '@mui/material';
import STTable, { initRows } from '@/components/STTable/STTable';

import { useManualDataManagement } from './_hook/useManualDataManagement';

const Manual = () => {

  const {
    form,
    dataRow,
    isLoadding,
    onGetData,
    isSkeleton,
    dataColumn
  } = useManualDataManagement();


  return (
    <STTable
      width={"100%"}
      column={dataColumn}
      rows={dataRow}
      isLoading={isLoadding}
      onLoadData={onGetData}
      isMenu={true}
      // filterField={filter}
      isShowCheckBox={false}
      form={form}
    />
  )
}

export default Manual
