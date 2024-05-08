
import React,{useState} from "react";

import { Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup } from "@mui/material";
import { BtnAdd } from "@/components/mui-elements/Button/ButtonAll";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Detail from "./Components/Detail";
import History from "./Components/History";

export function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3,width: '100%' }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
export default function PicForm() {


    const [Value,setValue] = useState(0);
    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={Value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Form" {...a11yProps(0)} />
                        <Tab label="History" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={Value} index={0}>
                    <Detail/>
                </CustomTabPanel>
                <CustomTabPanel value={Value} index={1}>
                   <History/>
                </CustomTabPanel>
            </Box>
    )
};
