"use client"
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Header from '@/components/layout/header';
import Content from '@/components/layout/content';
import Footer from '@/components/layout/footer';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    width: "100%",
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

export default function adminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
const [arrMenu, setarrMenu] = React.useState([])
    return (
        <React.Fragment>
            <Header  arrMenu={arrMenu}/>
            <Main open={open}>
                <Content children={children} />
            </Main>
            <Footer />
        </React.Fragment>
    );

}