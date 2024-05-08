"use client";

import { Breadcrumbs, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react'
import { IconComponents } from '..';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import "./Breadcrumbs.css"


interface IBreadcrumb {
    Item?: IBreadcrumbItem[];
}

interface IBreadcrumbItem {
    nMenuID: number;
    sMenuName?: string;
    sRoute?: string;
    nLevel?: number;
    sIcon?: string;
}

const BreadcrumbsMui = (props: IBreadcrumb) => {
    const { Item} = props;

    const pathname = usePathname();
    const router = useRouter();

    console.log("pathname: ", pathname, "router: ", router);

    const arrBreadcrums = useMemo<IBreadcrumbItem[]>(() => {
        let arrItem = [] as IBreadcrumbItem[]
        if (Item) {
            arrItem = [...Item];
        }
        else {
            // send api get 
        }
        return arrItem;
    }, [window.location.pathname]);

    return (
        <div className={'div-breadcrumbs'} >
            <Stack justifyContent={"left"} alignItems={"center"} direction={"row"}>
                <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ color: 'while' }}>
                    {
                        arrBreadcrums.map((item, index) => {
                            let sKey = "Breadcrumbs_" + item.nMenuID;
                            let sMenuName = item.sMenuName;
                            let sRoute = item.sRoute ?? "#";

                            let IsLastItem = index === (arrBreadcrums.length - 1);
                            return (
                                sRoute !== "#" && !IsLastItem ?
                                    <Link key={sKey} href={sRoute}>
                                        {IconComponents(item.sIcon)} {sMenuName}
                                    </Link>
                                    :
                                    <Typography key={sKey} >{IconComponents(item.sIcon)} {sMenuName}</Typography>
                            )
                        })
                    }
                </Breadcrumbs>
            </Stack>
        </div>
    )
}

export default BreadcrumbsMui