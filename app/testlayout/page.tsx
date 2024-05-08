"use client";

import { Grid, useMediaQuery } from '@mui/material';
import React from 'react';

const MyComponent1 = () => {
  const LayoutWebPC = useMediaQuery('(min-width:1400px)');
  return (
    <div className={LayoutWebPC ? "div-Back" : "div-Back-ipad"}>
      testttttttttttttttttttttttt
    </div>
  )
};

export default MyComponent1;