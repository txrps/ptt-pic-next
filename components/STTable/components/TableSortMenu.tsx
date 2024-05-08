
import { SecureStorage } from '@/lib';
import { TableSortLabel, MenuItem } from '@mui/material';

export default function TableSortMenu(param, item, handleClose: any, order: string, setSactive, setIsActive) {
  const onSortLoadData = (order) => {
    let sSort = order;
    item.order = sSort;
    item.orderactive = true;
    let cloneData = { ...param.rows };
    cloneData.sSortExpression = item.field;
    cloneData.sSortDirection = sSort;
    setIsActive(true);
    setSactive(sSort === "desc" ? "asc" : "desc")
    let sPathName = window.location.pathname;
    SecureStorage.Set(sPathName, JSON.stringify(cloneData));

    handleClose()
    param.onLoadData(cloneData);

  }
  return <MenuItem onClick={() => { onSortLoadData(order) }} autoFocus={false}>
    <TableSortLabel
      active={true}
      direction={order === 'asc' ? 'asc' : 'desc'}
      spellCheck={true}
    >
    </TableSortLabel>  {order === 'asc' ? ' Sort by ASC' : ' Sort by DESC'}

  </MenuItem>
}