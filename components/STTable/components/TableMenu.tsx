import { useState, useEffect, useMemo, Fragment } from "react";
import { STTableProp, STTableColumnDetail, STTableRow } from "../STTableProps";
import { FormProvider, useForm } from "react-hook-form";
import moment from "moment";
import TableSortMenu from "./TableSortMenu";
import {
  Stack,
  IconButton,
  Divider,
  Menu,
  MenuItem,
  Grid,
} from "@mui/material";

import { BtnClear, BtnSearch } from "@/components/mui-elements/Button/ButtonAll";
import ControlFilter from "../components/ControlFilter";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { SecureStorage } from "@/lib";

export default function TableMenu(
  param: STTableProp,
  item: STTableColumnDetail
) {
  const form = useForm({
    shouldUnregister: false,
    shouldFocusError: true,
    mode: "all",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [sactive, setSactive] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [isFilter, setisFilter] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };
  // const [sortshow, setSortshow] = useState(
  //   param.rows ? param.rows.sSortExpression !== ""? param.rows.sSortDirection : "desc": item.order === "asc" ? "desc" : "asc"
  // );
  useEffect(() => {
    let sorder = "asc";
    let isactivetemp = false;
    if (param.rows) {

      if (param.rows.sSortExpression === item.field && param.rows.sSortDirection) {
        sorder = param.rows.sSortDirection === "desc" ? "asc" : "desc";
        isactivetemp = true;
      } else {

      }

      setIsActive(isactivetemp);
      setSactive(sorder);
    }
  }, [param.rows]);
  let objFilter = param.filterField.find((f) => f.sFieldName === item.field);
  let sFieldName = item.field;
  let sIDFilter = `filter_${param.sTableID}_${item.field}`;
  if (objFilter) {
    sFieldName = objFilter.fieldSearch ? objFilter.fieldSearch : item.field;
    sIDFilter = `filter_${param.sTableID}_${sFieldName}`;
  }

  const handleSetValueDateRange = (item, form, sIDFilter) => {
    if (param.rows[sFieldName]) {
      form.setValue(sIDFilter, [
        param.rows[sFieldName][0] ? moment(param.rows[sFieldName][0]) : null,
        param.rows[sFieldName][1] ? moment(param.rows[sFieldName][1]) : null,
      ]);
    }
  };

  const handleSetValueDate = (item, form, sIDFilter) => {
    form.setValue(
      sIDFilter,
      param.rows[sFieldName] ? moment(param.rows[sFieldName]) : null
    );
  };
  const addFilterDateRange = (e, sIDFilter, cloneData, item) => {
    const data = e[sIDFilter];
    const typeData = typeof data;
    if (
      data &&
      data.length > 0 &&
      (data[0] || data[1]) &&
      typeData.toString() !== "undefined"
    ) {
      cloneData[sFieldName] = [
        data[0] ? moment(data[0]).format("YYYY-MM-DD[T]00:00:00[.000Z]") : null,
        data[1] ? moment(data[1]).format("YYYY-MM-DD[T]00:00:00[.000Z]") : null,
      ];
    }
    return cloneData;
  };

  const addFilterDate = (e, sIDFilter, cloneData, item) => {
    const data = e[sIDFilter];
    const typeData = typeof data;
    if (data && typeData.toString() !== "undefined") {
      cloneData[sFieldName] = moment(data).format(
        "YYYY-MM-DD[T]00:00:00[.000Z]"
      );
    }
    return cloneData;
  };

  const addFilterInput = (e, sIDFilter, cloneData, item) => {
    const data = form.getValues(sIDFilter);
    const typeData = typeof data;
    if (
      data &&
      typeData.toString() !== "undefined" &&
      data.toString().length > 0
    ) {
      cloneData[sFieldName] = data;
    }
    return cloneData;
  };

  const addFilterSelect = (e, sIDFilter, cloneData, item) => {
    const data = form.getValues(sIDFilter);
    cloneData[sFieldName] = data;
    return cloneData;
  };
  const _setValue = () => {
    let objFilter = param.filterField.find((f) => f.sFieldName === item.field);

    if (objFilter) {

      let sFieldName = objFilter.fieldSearch
        ? objFilter.fieldSearch
        : objFilter.sFieldName;
      let sIDFilter = `filter_${param.sTableID}_${sFieldName}`;
      if (param.rows[sFieldName]) {
        setisFilter(true);
      }

      switch (objFilter.sTypeFilterMode) {
        case "input": {
          form.setValue(sIDFilter, param.rows[sFieldName]);
          break;
        }
        case "select": {
          form.setValue(sIDFilter, param.rows[sFieldName]);
          break;
        }
        case "multiselect": {
          form.setValue(sIDFilter, param.rows[sFieldName]);
          break;
        }
        case "checkbox": {
          form.setValue(sIDFilter, param.rows[sFieldName]);
          break;
        }
        case "daterange": {
          handleSetValueDateRange(objFilter, form, sIDFilter);
          break;
        }
        case "date": {
          handleSetValueDate(objFilter, form, sIDFilter);
          break;
        }
      }
    }
  };

  useMemo(() => {
    setisFilter(false);
    _setValue();
  }, [open]);
  const onSearch = (e: STTableRow) => {
    let cloneData = { ...e };
    if (param.filterField) {
      let objFilter = param.filterField.find(
        (f) => f.sFieldName === item.field
      );
      if (objFilter) {
        switch (objFilter.sTypeFilterMode) {
          case "input": {
            cloneData = addFilterInput(e, sIDFilter, cloneData, objFilter);
            break;
          }
          case "select": {
            addFilterSelect(e, sIDFilter, cloneData, objFilter);
            break;
          }
          case "multiselect": {
            addFilterSelect(e, sIDFilter, cloneData, objFilter);
            break;
          }
          case "checkbox": {
            addFilterSelect(e, sIDFilter, cloneData, objFilter);
            break;
          }
          case "daterange": {
            cloneData = addFilterDateRange(e, sIDFilter, cloneData, objFilter);
            break;
          }
          case "date": {
            cloneData = addFilterDate(e, sIDFilter, cloneData, objFilter);
            break;
          }
        }
      }
    }
    handleClose();
    let sPathName = window.location.pathname;
    SecureStorage.Set(sPathName, JSON.stringify(cloneData));
    param.onLoadData(cloneData);
  };
  const onClear = (e: STTableRow) => {
    if (param.filterField) {
      let cloneData = { ...e };
      param.filterField.forEach((item) => {
        let sFieldNameParam = item.fieldSearch
          ? item.fieldSearch
          : item.sFieldName;
        let sIDFilter = `filter_${param.sTableID}_${sFieldNameParam}`;
        form.setValue(sIDFilter, undefined);
        cloneData[sFieldNameParam] = null;
      });
      handleClose();
      onSearch(cloneData);
    }
  };

  if (param.rows) {
    if (param.rows.sSortExpression === item.field && param.rows.sSortDirection) {
      let sorder = param.rows.sSortDirection === "asc" ? "desc" : "asc";
      // setIsActive(true);
      // setSactive(sorder);
    }
  }
  return (
    <Fragment>
      <IconButton
        aria-label="more"
        id={"menu-table-" + item.field}
        aria-controls={open ? "menu-table-" + item.field : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={{ color: (isFilter ? "rgba(0, 0, 0, 0.87)" : "white") }} />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "menu-table-" + item.field,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        autoFocus={false}
        disableAutoFocusItem={true}
        disableEnforceFocus
        disableRestoreFocus
      >
        {isActive ? (
          <Grid>
            {TableSortMenu(param, item, handleClose, sactive, setSactive, setIsActive)}
            <MenuItem
              onClick={() => {
                let cloneData = { ...param.rows };
                cloneData.sSortExpression = "";
                cloneData.sSortDirection = "";
                setIsActive(false);
                let sPathName = window.location.pathname;
                SecureStorage.Set(sPathName, JSON.stringify(cloneData));
                handleClose()
                param.onLoadData(cloneData);
              }}
            >
              Clear Sort
            </MenuItem>
          </Grid>
        ) : (
          <Grid>
            {TableSortMenu(param, item, handleClose, "asc", setSactive, setIsActive)}
            {TableSortMenu(param, item, handleClose, "desc", setSactive, setIsActive)}
          </Grid>
        )}
        {param.modeFilter === 3 && objFilter && (
          <Fragment>
            <Divider />
            <Stack px={0.5} py={2}>
              <FormProvider {...form}>
                <Stack spacing={2}>
                  {ControlFilter(
                    objFilter,
                    param.column,
                    param.isLoading,
                    param.sTableID
                  )}
                  <Divider />
                  <Stack
                    spacing={1}
                    direction={"row"}
                    justifyContent={"space-between"}
                  >
                    <BtnClear
                      id="btnClear"
                      IsRadius={false}
                      onClick={() => {
                        onClear(param.rows);
                      }}
                    />
                    <BtnSearch
                      id="btnSearch"
                      IsRadius={false}
                      onClick={() => {
                        onSearch(param.rows);
                      }}
                    />
                  </Stack>
                </Stack>
              </FormProvider>
            </Stack>
          </Fragment>
        )}
      </Menu>
    </Fragment>
  );
}
