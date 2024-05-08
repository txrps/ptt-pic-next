import { TableHead, TableRow } from '@mui/material';
import TableColumn from './TableColumn';
import { STTableColumnDetail } from '../STTableProps';

export default function CreateTableHeader(param, arrColumn, selectHead, setSelectHead) {
    const columnMerge = param.columnmerge ? param.columnmerge : null;
    const elCheckBox = {
        field: "elCheckbox_" + param.sTableID,
        headerName: "",
        bodyAlign: "center",
        sortable: true,
        collapse: false,
        isCheckBox: true,
        isSort: false,
        rowspan: 2,
        width: "40px",
    } as STTableColumnDetail;

    return <TableHead>
        {
            columnMerge ?
                columnMerge.map((item, index) => {
                    // item.column.map((row, index) => {
                    const lstItem = item.column;                    
                    if (param.isShowCheckBox && index === 0) {
                        const lstCheckBox = lstItem.find(f => f.isCheckBox)
                        if (lstCheckBox) lstItem.shift();
                        lstItem.unshift(elCheckBox)
                    }
                    return (
                        <TableRow key={param.sTableID + "_" + item.field}>
                            {item.column.map((row, index) => {
                                return (TableColumn(param, selectHead, setSelectHead, row, index));                
                            })}
                        </TableRow>
                    )
                    // })
                })
                :
                <TableRow>
                    {arrColumn.map((row, index) => {
                        return (TableColumn(param, selectHead, setSelectHead, row, index));
                    })}
                </TableRow>
        }
    </TableHead>

}