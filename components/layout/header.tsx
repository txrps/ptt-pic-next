"use client"

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import imgLogo from '@/public/assets/images/logo/Logo.png'

import { Avatar, Divider, Drawer, Grid, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from '@mui/material';
import '../layout/layout.css';
import { BallotOutlined, ContentCopyOutlined, FileCopyOutlined } from '@mui/icons-material';
import Image from 'next/image'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useState } from 'react';
import BoxTextSize from './BoxTextSize';
import { AxiosFn } from '@/lib/useAxios';
import { Convert, GetUserAccout, IAvatar, StmImageLoader } from '@/lib';
import { ApiCommon } from '@/enum/api';
import { ApiNavigationType } from '@/enum/enumSystem';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
}));

export default function Header(props) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    
    const handleDrawerOpen = () => setOpen(true);
    const handleDrawerClose = () => setOpen(false);

    const LayoutWebPC = useMediaQuery('(min-width:1500px)');
    const LayoutWeb = useMediaQuery('(min-width:1180px)');
    const LayoutPhone = useMediaQuery('(min-width:760px)');
    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })<AppBarProps>(({ theme, open }) => ({
        height: LayoutWebPC ? '10.5vh' : "",
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    }));

    const [arrData, setMenu] = useState([]);
    const [sFullName, setsFullName] = useState("Admin Admin");
    const [sPathImgEmp, setsPathImgEmp] = useState("/static/images/avatar/2.jpg");

    useEffect(() => {
        handleGetMenuAll();
    }, []);

    const handleGetMenuAll = () => {
        let objUser: IAvatar = GetUserAccout();        
        let sFullName_ = objUser?.sFullNameTH ?? null;
        if (sFullName_ !== null && sFullName_ !== "") setsFullName(sFullName_);
        let sPathImgEmp_ = objUser?.sPathImgEmp ?? null;
        if (sPathImgEmp_ !== null && sPathImgEmp_ !== "") setsPathImgEmp(sPathImgEmp_);

        AxiosFn.Get(ApiCommon.GetMenuAll, { nMenuType: Convert.StringToInt(ApiNavigationType.FrontEndTop) }, (res) => { setMenu(res.lstMenu);});
    };

    return (
        <>
            <CssBaseline />
            <AppBar className={"div-backgournd-header"} position="fixed" open={open} >
                <Toolbar style={{padding:"0px"}}>
                    <Grid container justifyContent={"flex-start"} alignItems={"center"} >
                        <Grid item xs={12} style={{ marginTop: "7px" }} >
                            <Grid container justifyContent={"flex-end"}>
                                <BoxTextSize isFrontEnd={false} />
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider style={{ color: "#e0e6ec", backgroundColor: "#e0e6ec" }} />
                        </Grid>
                        <Grid item xs={12} >
                            <Grid container alignItems={"center"} spacing={2}>
                                <Grid item xs={LayoutWeb ? 3 : 5}>
                                    <Link href="/">
                                        <Image
                                            loader={StmImageLoader}
                                            src={imgLogo}
                                            alt={''}
                                            width={100}
                                            height={100}
                                            className={LayoutWeb ? "img-logo" : LayoutPhone ? "img-logo-phone" : "img-logo-ipad"}
                                        />
                                    </Link>
                                </Grid>
                                {LayoutWeb ? (
                                    <Grid item xs={9} className='appBar-grid' >
                                        <Grid container justifyContent={"flex-end"}>
                                            <Grid item xs={12} container spacing={5} justifyContent="flex-end">
                                                {arrData.map((m, index) => {
                                                    return (
                                                        <Grid item key={m.nMenuID} style={{ paddingTop: "55px" }}>
                                                            <Link
                                                                key={m.sMenuLink}
                                                                href={m.sMenuLink}
                                                                style={{ textDecoration: 'none' }}
                                                            >
                                                                <div key={m.nMenuID} >
                                                                    <Grid container wrap="nowrap" spacing={1}>
                                                                        <Grid item >
                                                                            {m.nMenuID == 1 &&
                                                                                <ContentCopyOutlined style={{ fontSize: '1.3em', color: "#4f4f4f" }} />
                                                                            }
                                                                            {m.nMenuID == 2 &&
                                                                                <BallotOutlined style={{ fontSize: '1.3em', color: "#4f4f4f" }} />
                                                                            }
                                                                            {m.nMenuID == 3 &&
                                                                                <FileCopyOutlined style={{ fontSize: '1.3em', color: "#4f4f4f" }} />
                                                                            }
                                                                        </Grid>
                                                                        <Grid item xs>
                                                                            <Typography
                                                                                style={{
                                                                                    cursor: 'pointer',
                                                                                    fontSize: '0.9rem',
                                                                                    fontWeight: 600,
                                                                                    marginBottom: '25px',
                                                                                    color: "#4f4f4f",
                                                                                }}
                                                                            >
                                                                                {m.sMenuName}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Grid>
                                                                </div>
                                                            </Link>
                                                        </Grid>
                                                    )
                                                })}

                                                <Grid item style={{ paddingTop: "30px" }}>
                                                    <Box
                                                        className='style-crad'
                                                    >
                                                        <Grid container wrap="nowrap" spacing={1}>
                                                            <Grid item >
                                                                <Avatar style={{ width: "30px", height: "30px" }} src={sPathImgEmp} />
                                                            </Grid>
                                                            <Grid item xs>  <Typography
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    fontSize: '0.9rem',
                                                                    fontWeight: 500,
                                                                    marginTop: "5px",
                                                                    color: "#4f4f4f"
                                                                }}
                                                                gutterBottom
                                                            >
                                                                {sFullName}
                                                            </Typography>
                                                            </Grid>
                                                            <Grid item >
                                                                {/* <LogoutOutlined style={{ fontSize: '1.3em', color: "#ff3535", marginTop: "5px" }} /> */}
                                                            </Grid>
                                                        </Grid>
                                                    </Box>
                                                </Grid>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid item xs={LayoutWeb ? 10 : 7} style={{ paddingTop: "5px" }} className='appBar-grid'>
                                        <Grid container spacing={2} justifyContent={"flex-end"}>
                                            {LayoutPhone &&
                                                <Grid item >
                                                    <Grid container wrap="nowrap" spacing={1}>
                                                        <Grid item >
                                                            <Avatar style={{ width: "30px", height: "30px", marginTop: "10px" }} src={sPathImgEmp} />
                                                        </Grid>
                                                        <Grid item xs>  <Typography
                                                            style={{
                                                                cursor: 'pointer',
                                                                fontSize: '1rem',
                                                                fontWeight: 500,
                                                                marginTop: "15px",
                                                                color: "#4f4f4f"
                                                            }}
                                                            gutterBottom
                                                        >
                                                            {sFullName}
                                                        </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            }
                                            <Grid item >
                                                {/* <IconButton
                                                    color="inherit"
                                                    aria-label="open drawer"
                                                    edge="end"
                                                    onClick={handleDrawerOpen}
                                                    sx={{ ...(open && { display: 'none' }) }}
                                                >
                                                    <MenuIcon style={{ color: "#4f4f4f", fontSize: '2rem', marginTop: "5px" }} />
                                                </IconButton> */}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>

            <Drawer
                variant="persistent"
                anchor="right"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />

                {arrData.map((text) => (
                    <ListItem disablePadding key={text.nMenuID} >
                        <Link
                            key={text.nMenuID}
                            href={text.sMenuLink}
                            style={{ textDecoration: 'none' }}
                        >
                            <ListItemButton
                                className={`nav-menu-itemH nav-menu-itemH-lv1`}
                                sx={{ pl: 5, minWidth: '40px' }}
                            >
                                <ListItemIcon sx={{ ml: '2px' }} style={{ minWidth: "40px" }}>
                                    {text.nMenuID == 1 &&
                                        <ContentCopyOutlined />
                                    }
                                    {text.nMenuID == 2 &&
                                        <BallotOutlined />
                                    }
                                    {text.nMenuID == 3 &&
                                        <FileCopyOutlined />
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text.sMenuName} primaryTypographyProps={{ style: { whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis' } }} />
                            </ListItemButton>
                        </Link>
                    </ListItem>
                ))}

                <Grid item>
                    {/* <Tooltip title={"ออกจากระบบ"} placement="right">
                        <List disablePadding>
                            <ListItem disablePadding>
                                <ListItemButton
                                    className={`nav-menu-itemH nav-menu-itemH-lv1`}
                                    sx={{ pl: "16px", minWidth: '40px' }}
                                //   onClick={handleLogout}
                                >
                                    <ListItemIcon sx={{ ml: '2px' }} style={{ minWidth: "40px" }}>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary={"ออกจากระบบ"} primaryTypographyProps={{ style: { whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis', color: "#4f4f4f" } }} />
                                </ListItemButton>
                            </ListItem>
                        </List>
                    </Tooltip> */}
                </Grid>
            </Drawer>
        </>
    );

}