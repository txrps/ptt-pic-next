import { describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { renderWithProviders } from "../../utililities/test-utililities";
import Page from "@/app/admin/monitoting/summary/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useSummary } from "@/app/admin/monitoting/summary/useSummary";

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

describe("Page Summary", () => {
    it("Render Page", () => {
        renderWithProviders(<Page />);
        expect(<Page />).toBeDefined();
    });
});

describe("Function", () => {
    it("useSummary", () => {
        const objitem = { nResultType: 1, sResultTypeName: "1" };
        const objID = { sID: "1" }
        const objData = []
        const { result } = renderHook(() => useSummary(), { wrapper: Wrapper });
        act(() => {
            result.current.onGetDataTable();
            result.current.onGetInitialTable();
            result.current.handleExportExcel ();
            result.current.TableResultType(objitem);
            result.current.TableQtool(objitem);
            result.current.TablePICResult();
            result.current.TableDataResultType(objitem);
            result.current.TableDataQtool(objitem);
            result.current.DataProjectResultType(objData,objitem);
            result.current.DataProjectQtool(objData,objitem);
            result.current.MergeDetailPICResul();
            result.current.MergeDetailRegistration();
            result.current.onSetType(objID);
            result.current.MultiSelectPICResult(true);
          
        });
    });
});