import { describe, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import STTable from "@/components/STTable/STTable";

//#region Initial
const preloadedState = {
  counter: { open: true },
};
const store = configureStore({
  reducer: {},
  preloadedState,
});
const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
//#endregion Initial

const sampleRows = {
  arrRows: [
    { sID: 1, name: "John Doe", age: 30, isDisable: false },
    { sID: 2, name: "Jane Smith", age: 25, isDisable: true },
  ],
};

const sampleColumns = [
  {
    field: "name",
    headerName: "Name",
    bodyAlign: "left",
    sortable: true,
    collapse: false,
    isCheckBox: false,
    isSort: true,
    width: "150px",
  },
  {
    field: "age",
    headerName: "Age",
    bodyAlign: "center",
    sortable: true,
    collapse: false,
    isCheckBox: false,
    isSort: true,
    width: "100px",
  },
];

const sampleProps = {
  rows: sampleRows,
  sTableID: "sampleTable",
  isShowCheckBox: true,
  column: sampleColumns,
  isPage: true,
};

describe("Component STTable", () => {
  it("Prop STTable have Footer", () => {
    render(<STTable {...sampleProps}></STTable>);
  });
});
