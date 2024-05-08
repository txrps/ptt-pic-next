"use client";

import React, { useCallback, useContext } from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { IMenuItem } from "./MenuProps";
import { ProviderLayout } from "@/app/layout";
import { IconComponents } from "../mui-elements/IconMui";
import { usePathname, } from 'next/navigation';
import Link from "next/link";
import "./Menu.css";

const MenuItems = (props: IMenuItem) => {
    const pathname = usePathname();

    const {
        IsMenuOpen,
        IsOverMouse,
        handleClickMenuOpen
    } = useContext(ProviderLayout);

    const MenuSpace = () => {
        let nLevel = !IsMenuOpen && !IsOverMouse ? 1 : props.nLevel;
        return nLevel * 16 + "px";
    };

    const MenuActive = useCallback(() => {
        let sRouteCurrent = pathname;
        let sRouteMenu = props.sMenuLink;
        let arrRoute = props.arrRoute ?? [];
        return sRouteCurrent === sRouteMenu || arrRoute.includes(sRouteCurrent) ? "active" : "";
    }, [window.location.pathname, pathname]);

    return (
        <React.Fragment key={props.nMenuID}>
            <Tooltip title={props.sMenuName} placement="right">
                <Link 
                    key={props.nMenuID} 
                    href={props.sMenuLink} 
                    replace={true}
                    scroll={false} 
                    passHref 
                    legacyBehavior
                >
                    <ListItem disablePadding>
                        <ListItemButton
                            key={props.nMenuID}                            
                            className={`nav-menu-item nav-menu-item-lv` + props.nLevel + " " + MenuActive()}
                            sx={{ pl: MenuSpace() }}
                            onClick={() => {                            
                                handleClickMenuOpen(props.nMenuID);  
                            }}
                        >
                            <ListItemIcon sx={{ ml: '1px', minWidth: "33px" }}>
                                {IconComponents(props.sIcon)}
                            </ListItemIcon>
                            <ListItemText primary={props.sMenuName} primaryTypographyProps={{ style: { whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis' } }} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </Tooltip>
        </React.Fragment>
    )
}
export default MenuItems;
