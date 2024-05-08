import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { renderWithProviders } from "../../utililities/test-utililities";
import Page from "@/app/admin/setup/target/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useTarget } from "@/app/admin/setup/target/useTarget";

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

describe("Page Target", () => {
    it("Render Page", () => {
        renderWithProviders(<Page />);
        expect(<Page />).toBeDefined();
    });
});

describe("Function", () => {
    it("useTarget", () => {
        const objParam = { nTypeID_1: "1", nMinL1_1: "1" };
        const objitem = { sID: "1" }
        const objData = []
        const { result } = renderHook(() => useTarget(), { wrapper: Wrapper });
        act(() => {
            result.current.onGetDataTable();
            result.current.onGetInitialTable();
            result.current.onSubmit(objParam);
            result.current.DataTable(objitem);
            result.current.DataTableSave(objData, objitem, objParam);
            result.current.SelectItemType(objitem);
            result.current.NumberMinL1(objitem);
            result.current.NumberMinL2(objitem);
            result.current.NumberMinL3(objitem);
            result.current.NumberMinL4(objitem);
            result.current.NumberMinL5(objitem);
            result.current.NumberMaxL1(objitem);
            result.current.NumberMaxL2(objitem);
            result.current.NumberMaxL3(objitem);
            result.current.NumberMaxL4(objitem);
            result.current.NumberMaxL5(objitem);
            result.current.SwitchActive(objitem);
          
        });
    });
});
