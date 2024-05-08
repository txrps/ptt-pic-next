
// "use client";

import "./Menu.css";
import { Collapse, Grid, Link, List, ListItemButton, ListItemIcon, ListItemText, Tooltip } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import React, { useContext, useEffect } from "react";
import MenuItems from "./MenuItem";
import { IMenuItem } from "./MenuProps";
import { ProviderLayout } from "@/app/layout";
import { IconComponents } from "../mui-elements/IconMui";

const MenuItemCollapse = (props: IMenuItem) => {
    const {
        IsMenuOpen,
        IsOverMouse,
        arrMenuOpen,
        handleClickMenuOpen,
    } = useContext(ProviderLayout);
    
    const [IsOpenCollape, setIsOpenCollape] = React.useState(false);
    const handleClick = () => {
        setIsOpenCollape(!IsOpenCollape);
    };

    const MenuSpace = () => {
        let nLevel = !IsMenuOpen && !IsOverMouse ? 1 : props.nLevel;
        return nLevel * 16 + "px";
    };

    useEffect(() => {
        if (!IsMenuOpen) {
            setIsOpenCollape(false)
        }
    }, [IsMenuOpen])


    useEffect(() => {
        if (IsOverMouse || IsMenuOpen) {
            let checkOpen = arrMenuOpen.indexOf(props.nMenuID);
            setIsOpenCollape(checkOpen !== -1)
        }
    }, [arrMenuOpen, IsOverMouse, props.nMenuID, IsMenuOpen])

    return (
        <React.Fragment key={props.nMenuID}>
            <Tooltip title={props.sMenuName} placement="right">
                <ListItemButton onClick={() => { handleClick(); handleClickMenuOpen(props.nMenuID) }} className={`nav-menu-item nav-menu-item-lv` + props.nLevel} sx={{ pl: MenuSpace() }}>
                    <ListItemIcon sx={{ ml: '1px',minWidth:"33px"  }}>
                        {IconComponents(props.sIcon)}
                    </ListItemIcon>
                    <ListItemText primary={props.sMenuName} primaryTypographyProps={{ style: { whiteSpace: "nowrap", overflow: 'hidden', textOverflow: 'ellipsis' } }} />
                    {IsOpenCollape ? <ExpandLess style={{ display: IsMenuOpen ? "" : "none" }} /> : <ExpandMore style={{ display: IsMenuOpen ? "" : "none" }} />}
                </ListItemButton>
            </Tooltip>
            <Collapse key={`nav-menu-item-collapse-` + props.nMenuID} in={IsOpenCollape} timeout="auto" className="nav-menu-item-collapse">
                <List component="div" disablePadding>
                    {props.lstChild.map((item, index) => {
                        return item.lstChild.length > 0 ?
                            (
                                <MenuItemCollapse key={item.nMenuID} {...item} />
                            ) :
                            (
                                <MenuItems key={item.nMenuID} {...item} />
                            )
                    })}
                </List>
            </Collapse>
        </React.Fragment >
    )
}
export default MenuItemCollapse;
