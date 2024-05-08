"use client";

import React, { useMemo, useState } from "react";
import { IBreadcrumb, IBreadcrumbItem } from "./BreadcrumbsBar";
import { usePathname } from "next/navigation";
import { AxiosFn } from "@/lib/useAxios";
import { useSelector } from "react-redux";
import NavigateManagementSelector from "../store/NavigateManagement/NavigateManagementSelector";
import { ApiCommon } from "@/enum/api";

export const useBreadcrumbs = (props: IBreadcrumb) => {
  const { Item, isFrontEnd, isFrontEndProject } = props;

  const [arrBreadcrumbs, setArrBreadcrumbs] = useState<IBreadcrumbItem[]>([]);
  const pathname = usePathname();

  const menuNavigate = useSelector(NavigateManagementSelector.menuNavigate);

  useMemo(() => {
    if (Item) {
      setArrBreadcrumbs([...Item]);
    } else {
      let sRoute = pathname;
      AxiosFn.Get(ApiCommon.GetBreadcrumbs, { sRoute: sRoute }, (d) => { handleUpdate(d); });
    }
  }, [pathname, menuNavigate]);

  const handleUpdate = (d) => {
    let result: IBreadcrumbItem[] = [];
    result = d.objResult.lstBreadcrumbs;
    let arrResult = [...result];
    setArrBreadcrumbs(arrResult);
  };

  return {
    Item,
    isFrontEnd,
    isFrontEndProject,
    arrBreadcrumbs,
    handleUpdate,
  };
};
