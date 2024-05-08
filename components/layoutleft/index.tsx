// "use client";
import "./Menu.css";
import { Grid, List, Tooltip, } from "@mui/material";

import { IconComponents } from "../mui-elements/IconMui";
import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import parse from 'html-react-parser';
import { AxiosFn } from '@/lib/useAxios';
import { ApiNavigationType } from "@/enum/enumSystem";
import { Convert } from "@/lib";
import { ApiCommon } from "@/enum/api";
import Link from 'next/link';

export const ParseHtml = (val: string) => {
    return val ? parse(val) : null;
};

export default function MenuLeft() {
    const [arrData, setMenu] = useState([]);

    useEffect(() => {
        AxiosFn.Get(ApiCommon.GetMenuAll, { nMenuType: Convert.StringToInt(ApiNavigationType.FrontEndLeft) }, (res) => {setMenu(res.lstMenu);})
    }, []);

    const pathname = usePathname();
    const MenuActive = useCallback((sRoute) => {
        let sRouteCurrent = pathname;
        let sRouteMenu = ("/" + (sRoute ?? "")).toLowerCase();
        return sRouteCurrent === sRouteMenu ? "active" : ""
    }, []);

    return (
        <>
            {arrData.map((item) => {
                return (
                    <Tooltip key={item.nMenuID} title={ParseHtml(item.sMenuName)} placement="right">
                        <Link
                            href={item.sMenuLink}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className={`nav-menu-itemH-lv` + " " + MenuActive(item.sMenuLink)}>
                                <Grid container justifyContent={"center"} justifyItems={"center"} item xs={12} >
                                {/* <Icons sx={{ color: "#fff",mr: 0.5 }}>{item.sIcon}</Icons> */}
                                    {IconComponents(item.sIcon)}
                                </Grid>
                                <Grid container item justifyContent={"center"} justifyItems={"center"} xs={12} style={{ marginTop: 2 }}>
                                    <div className="text-menu">
                                        {ParseHtml(item.sMenuName)}
                                    </div>
                                </Grid>
                            </div>
                        </Link>
                    </Tooltip>
                )})
            }
        </>
    );
}

