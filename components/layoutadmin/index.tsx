// "use client";
import "./Menu.css";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProviderLayout } from "@/app/layout";
import MenuItemCollapse from "./MenuItemCollapse";
import MenuItems from "./MenuItem";
import { AxiosFn } from '@/lib/useAxios';
import { ApiNavigationType } from "@/enum/enumSystem";
import { Convert } from "@/lib";
import { ApiCommon } from "@/enum/api";
import { IMenuItem } from "./MenuProps";
// import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
// import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export default function MenuBar() {

    const {
        IsMenuOpen,
        setIsMenuOpen,
        IsOverMouse,
        setIsOverMouse,
        isMouseOver
    } = useContext(ProviderLayout);

    const [arrData, setMenu] = useState<IMenuItem[]>([]);

    useEffect(() => {
        AxiosFn.Get(ApiCommon.GetMenuAll, { nMenuType: Convert.StringToInt(ApiNavigationType.BackEnd) }, (res) => { setMenu([...res.lstMenu]); });
    }, []);

    const HandleOverMenu = () => {
        if (!IsMenuOpen && isMouseOver) {
            setIsMenuOpen(true)
            setIsOverMouse(true)
        }
    }

    const HandleLeaveMenu = () => {
        if (IsOverMouse && isMouseOver) {
            setIsMenuOpen(false)
            setIsOverMouse(false)
        }
    }

    // const {
    //     Layout630,
    // } = useContext(ProviderLayout);

    // const handleDrawerClose = () => {
    //     setIsMenuOpen(!IsMenuOpen);
    // }

    return (
        <List
            component="nav"
            className="nav-menu"
            // subheader={
            //     <ListItem className="nav-menu-burger" style={{ justifyContent: 'center', display: Layout630 ? "" : "none" }}>
            //         {IsMenuOpen ? <ListItemText primary={"Menu"} className="icon-menu" /> : null}
            //         <IconButton onClick={handleDrawerClose}>
            //             {IsMenuOpen ? <MenuOpenRoundedIcon className="icon-menu" /> : <MenuRoundedIcon className="icon-menu" />}
            //         </IconButton>
            //     </ListItem>
            // }   
        >
            <div
                onMouseOver={HandleOverMenu}
                onMouseLeave={HandleLeaveMenu}
            >
                {
                    arrData.map((item) => {
                        let sMenuID = "menu-" + item.nMenuID;
                        return (item.lstChild != null ?
                            <MenuItemCollapse sKey={sMenuID} {...item} />
                            :
                            <MenuItems sKey={sMenuID} key={sMenuID} {...item}></MenuItems>
                        )
                    })
                }
            </div>
        </List>
    );
}

