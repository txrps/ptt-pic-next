
import { useEffect, useMemo, useState } from "react";
import {
  Stack,
  Pagination,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";

import { BtnDelete } from "@/components/mui-elements/Button/ButtonAll";

// import { BtnPassReview } from "../../Button/ButtonAll";

export const ShowSubmitComp = ({ isShowSubmit, props, selectionModel }) => {
  return (
    <>
      {isShowSubmit ?
        <></>
        // <BtnPassReview
        //   id={"btnConfirm_" + props.sTableID}
        //   txt={props.txtSubmit}
        //   IsCircleWithOutText={false}
        //   onClick={() => props.onSubmit(selectionModel)}
        // />
        : null
      }
    </>
  )
}

export default function CustomPagination(param) {
  const { props, selectionModel } = param
  const [Page, setPage] = useState(0);
  const [RowTotalCount, setRowTotalCount] = useState(0);
  const [PageCount, setPageCount] = useState(0);
  const [MaxRow, setMaxRow] = useState(0);
  const [MinRow, setMinRow] = useState(0);
  const [LstPage, setLstPage] = useState([]);
  const [isShowSubmit, setIsShowSubmit] = useState(false);
  const [isShowDelete, setIsShowDelete] = useState(false);

  const handlePaginationChange = (value, props) => {
    let cloneData = { ...props.rows, nPageIndex: value };
    if (props.handleDataMode === "client") {
      cloneData.nPageIndex -= 1;
    } else {
      cloneData.arrRows = [];
    }
    props.onLoadData(cloneData);
  };
  const CalMinSize = (nPage, nPageSize) => {
    return nPage > 1 ? ((nPage - 1) * nPageSize) + 1 : 1;
  }
  const CalMaxRow = (rowTotalCount, maxRowSizePerPage) => {
    return rowTotalCount > maxRowSizePerPage ? maxRowSizePerPage : rowTotalCount;
  }
  const CalMinRow = (minRowSizePerPage, nMaxRow) => {
    return minRowSizePerPage > nMaxRow ? nMaxRow : minRowSizePerPage;
  }
  const handleJumpPageChange = (e, props) => {
    let cloneData = { ...props.rows, nPageIndex: e.target.value };
    props.onLoadData(cloneData);
  };
  const CalCulate = () => {
    const nPage = props.rows.nPageIndex + (props.handleDataMode === "client" ? 1 : 0);
    const maxRowSizePerPage = nPage * props.rows.nPageSize;
    const rowTotalCount = props.rows.nDataLength;
    const minRowSizePerPage = CalMinSize(nPage, props.rows.nPageSize);
    const pageCount = Math.ceil(rowTotalCount / props.rows.nPageSize);
    const nMaxRow = CalMaxRow(rowTotalCount, maxRowSizePerPage);
    const nMinRow = CalMinRow(minRowSizePerPage, nMaxRow);
    let lstPage = [];
    for (let i = 0; i < pageCount; i++) {
      lstPage.push(<MenuItem value={i}>{i + 1}</MenuItem>);
    }
    setPage(nPage);
    setRowTotalCount(rowTotalCount);
    setPageCount(pageCount);
    setMaxRow(nMaxRow);
    setMinRow(nMinRow);
    setLstPage(lstPage);
  }
  useMemo(() => {
    CalCulate()
  }, [props.isLoading]);

  useEffect(() => {
    setIsShowSubmit(props.onSubmit !== undefined && (selectionModel || []).length > 0);
    setIsShowDelete(props.onDelete !== undefined && (selectionModel || []).length > 0);

  }, [selectionModel]);

  return (
    <Stack
      direction="row"
      sx={{ px: 2, minWidth: "550px" }}
      alignItems="center"
      flex={1}
      spacing={1}
      pt={1}
    >
      {props.isShowCheckBox === true &&
        <Stack flex={1} direction={"row"} spacing={1} alignItems={"center"}>
          {isShowDelete ? (
            <BtnDelete
              id={"dl01_" + props.sTableID}
              txt="Delete"
              IsCircleWithOutText={true}
              onClick={() => props.onDelete(selectionModel)}
            />
          ) : (
            <ShowSubmitComp isShowSubmit={isShowSubmit} props={props} selectionModel={selectionModel} />
          )}

        </Stack>
      }
      {props.isPage === true &&
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography sx={{ whiteSpace: "nowrap" }}>{"Page :"}</Typography>
          <Select
            size="small"

            autoWidth
            sx={{
              height: 30,
              ".MuiOutlinedInput-notchedOutline > legend": {
                width: 0,
              },
            }}
            value={Page}
            onChange={(e) => {
              handleJumpPageChange(e, props);
            }}
            MenuProps={{ PaperProps: { sx: { maxHeight: 150 } } }}
          >
            {LstPage ? LstPage.map((item, index) => (
              <MenuItem key={item} value={index + 1}>
                {index + 1}
              </MenuItem>
            )) : null}
          </Select>
          <Typography sx={{ whiteSpace: "nowrap" }}>{`${MinRow} - ${MaxRow} of ${RowTotalCount}`}</Typography>
          <Pagination
            color="primary"
            sx={{
              ".MuiPagination-ul": {
                flexWrap: "nowrap",
              },
            }}
            count={PageCount}
            siblingCount={0}
            boundaryCount={1}
            page={Page}
            variant="outlined"
            shape="rounded"
            showFirstButton={true}
            showLastButton={true}
            size={"small"}
            onChange={(event, value) => {
              handlePaginationChange(value, props);
            }}
          />
          <Select
            label=""
            size="small"

            autoWidth
            sx={{
              height: 30,
              ".MuiOutlinedInput-notchedOutline > legend": {
                width: 0,
              },
            }}
            value={props.lstPageSize.indexOf(props.rows.nPageSize)}
            onChange={(e) => {
              let cloneData = {
                ...props.rows,
                nPageIndex: 0,
                nPageSize: props.lstPageSize[e.target.value],
              };
              props.onLoadData(cloneData);
            }}
          >
            {props.lstPageSize ? props.lstPageSize.map((item, index) => (
              <MenuItem key={item} value={index}>
                {item}
              </MenuItem>
            )) : null}
          </Select>
        </Stack>
      }
    </Stack>
  );
}