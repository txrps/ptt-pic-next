import { Container, Drawer, Grid, Paper, Stack } from "@mui/material";
// import "./Content.css";
import { useContext } from "react";
import { styled, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import { ProviderLayout } from "@/app/layout";
import theme from "@/lib/theme";
import MenuBar from ".";
import '../layoutadmin/Menu.css';
import MenuLeft from ".";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import BreadcrumbsBar from "../Breadcrumbs";
interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}
const drawerWidth = 90;
const Content = (props) => {

    const {
        IsMenuOpen,
        Layout630
    } = useContext(ProviderLayout)

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        marginTop: "15px",
        width: drawerWidth,
        borderRadius: "0px 15px 15px 0px",
        background: "linear-gradient(343deg, #004484, #227dd1)",
        marginBottom: 0,
        // transform: "translateX(0px)",
        transition:
            "width 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms, background-color 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
        overflowX: "hidden",
        "&::-webkit-scrollbar": {
            width: 5,
        },
        "&::-webkit-scrollbar-track": {
            boxShadow: `inset 0 0 5px #c1c1c1`,
            borderRadius: 5,
        },
        "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1cc",
            borderRadius: 5,
        },
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Item elevation={1}>
                <MenuLeft />
            </Item>
            <Box component="main" sx={{ overflowX: 'auto', flexGrow: 1, p: 3, width: Layout630 && !IsMenuOpen ? '100%' : '80%' }}>
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
