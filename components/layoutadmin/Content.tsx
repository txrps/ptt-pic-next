import { Container, Paper, Stack } from "@mui/material";
import { useContext } from "react";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { ProviderLayout } from "@/app/layout";
import theme from "@/lib/theme";
import MenuBar from ".";
import '../layoutadmin/Menu.css';
import BreadcrumbsBar from "../Breadcrumbs";

const drawerWidth = 240;
const Content = (props) => {
    const {
        IsMenuOpen,
        Layout630
    } = useContext(ProviderLayout)

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Paper
                elevation={0}
                sx={{
                    display: Layout630 ? "" : "none",
                    width: IsMenuOpen ? drawerWidth : `calc(${theme.spacing(7)} + 1px)`,
                    marginTop: '1%',
                    marginLeft: '1px',
                    flexShrink: 0,
                    borderRight: '0 !important',
                    whiteSpace: 'nowrap',
                    boxSizing: 'border-box',
                    borderRadius: "15px 15px 15px 15px",
                    backgroundColor: 'transparent !important',
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                }}>
                <MenuBar />
            </Paper>

            <Box component="main" sx={{ overflowX: 'auto', flexGrow: 1, pl: 3, pr: 3, pt: 2, pb: 3, marginTop: '0.1%', width: Layout630 && !IsMenuOpen ? '100%' : '80%' }}>
                <Container maxWidth={false} className="div-backgournd-content-detail">
                    <Stack spacing={2}>
                        <Paper style={{ boxShadow: "unset" }} >
                            <BreadcrumbsBar />
                        </Paper>
                        <Paper className="div-backgournd-content-children">
                            {props.children}
                        </Paper>
                    </Stack>
                </Container>
            </Box>
        </Box>
    )
}
export default Content;
