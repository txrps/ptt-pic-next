import { describe, expect, it, vi } from "vitest";
import { act, render, renderHook } from "@testing-library/react";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import { renderWithProviders } from "@/__tests__/utililities/test-utililities";
import Page from "@/app/admin/Questionnaire/QuestionnaireList/page";
import { useQuestionnairManagement } from "@/app/admin/Questionnaire/QuestionnaireList/_hook/useQuestionnairManagement";
import ChangeOrder from "@/app/admin/Questionnaire/_component/ChangeOrder";


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


describe("Page QuestionnairManagement", () => {
  it("Render Page", () => {
    renderWithProviders(<Page />);
    expect(<Page />).toBeDefined();
  });
});


describe("Function", () => {
  it("useQuestionnairManagement", () => {

    const dataRow = {
      nPageIndex: 1,
      nPageSize: 10,
      arrRows: [],
      nDataLength: 10,
      sSortExpression: "",
      sSortDirection: "",
    }

    const array = []

    const { result } = renderHook(() => useQuestionnairManagement(), { wrapper: Wrapper });
    act(() => {
      result.current.onGetData(dataRow);
      result.current.fncAdd();
      result.current.fncEdit(array);
      result.current.onDelete([1]);
      result.current.onChangeOrder(1, 5);
      result.current.handleCloseModalDialog();
      ////result.current.fncChangeOrder(array);
    });

  });
});

describe("ChangeOrder Component", () => {

  it("ChangeOrder Render", () => {
    render(
      <ChangeOrder item={{ sID: "1", nOrder: 1, lstOrder: [{ value: "1", label: "1" }] }} />
    )

  });
});
