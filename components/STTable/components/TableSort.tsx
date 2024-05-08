import { useState, useEffect } from 'react';
import { TableSortLabel, Box } from '@mui/material';
import { SecureStorage } from '@/lib';

export const onSortLoadData = (isactive, order, param, item, setIsactive, setOrder) => {
  let sSort = isactive && order === 'asc' ? 'desc' : 'asc';
  let isActiveSort = !(isactive && order === 'desc');
  if (!param.isSortMulti && order === 'desc') {
    isActiveSort = true;
  }
  item.order = order;
  item.orderactive = true;
  setIsactive(isActiveSort);
  setOrder(sSort);
  let cloneData = { ...param.rows };
  cloneData.sSortExpression = item.field;
  cloneData.sSortDirection = sSort;
  let sPathName = window.location.pathname;
  SecureStorage.Set(sPathName, JSON.stringify(cloneData));
  param.onLoadData(cloneData);
}

export default function TableSort(param, item) {

  let sorder = item.order;
  let isactivetemp = false;
  if (param.rows) {
    if (param.rows.sSortExpression === item.field && param.rows.sSortDirection) {
      sorder = param.rows.sSortDirection;
      isactivetemp = true;
    }
  }
  const [isactive, setIsactive] = useState(isactivetemp);
  const [order, setOrder] = useState(sorder)
  useEffect(() => {
    let sorder = "asc";
    let isactivetemp = false;
    if (param.rows) {

      if (param.rows.sSortExpression === item.field && param.rows.sSortDirection) {

        sorder = param.rows.sSortDirection;
        isactivetemp = true;
      } else {

      }

      setIsactive(isactivetemp);
      setOrder(sorder);
    }
  }, [param.rows]);

  return <TableSortLabel
    active={isactive}
    direction={order === 'asc' ? 'asc' : 'desc'}
    onClick={() => {
      onSortLoadData(isactive, order, param, item, setIsactive, setOrder);
    }}
  >
    <Box component="span" >
      {item.headerName}
    </Box>
  </TableSortLabel>
}