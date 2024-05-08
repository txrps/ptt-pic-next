import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { renderWithProviders } from "../../utililities/test-utililities";
import Page from "@/app/admin/setup/approval/page";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { useApproval } from "@/app/admin/setup/approval/useApproval";

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

describe("Page Approvalc", () => {
    it("Render Page", () => {
        renderWithProviders(<Page />);
        expect(<Page />).toBeDefined();
    });
});

describe("Functionc", () => {
    it("useApprovalc", () => {
        const objParam = { nApproveTypeID: 5};
        const objDivision = { nApproveTypeID: 6};
        const objDepartment = { nApproveTypeID: 7};
        const objitem = { sID: "1" }
        const objData = []
        const { result } = renderHook(() => useApproval(), { wrapper: Wrapper });
        act(() => {
            result.current.onGetDataTable();
            result.current.onGetInitialTable();
            result.current.onSubmit();
            result.current.onEdit(objitem, objData);
            result.current.onCancle();
            result.current.onDelete(objitem);
            result.current.RenderAdd(true);
            result.current.SelectQTool(3);
            result.current.TableCommander(objParam);
            result.current.TableDivisionDirector(objDivision);
            result.current.TableDepartment(objDepartment);
        
        });
    });
});
