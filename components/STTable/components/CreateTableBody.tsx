import { TableBody } from '@mui/material';
import CreateRow from './CreateRow';

export default function CreateTableBody(param, arrColumn, selectionModel, setSelectionModel) {
    return <TableBody>
        {
            param.rows ? param.rows.arrRows.map((row, index) => (
                <CreateRow key={row.sID} param={param} row={row} index={index} arrColumn={arrColumn} selectionModel={selectionModel} setSelectionModel={setSelectionModel}/>
            )) : null
        }
    </TableBody>
}