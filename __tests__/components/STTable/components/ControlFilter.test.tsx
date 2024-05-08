import { describe, it } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import ControlFilter from "@/components/STTable/components/ControlFilter";

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

describe("Component STTable", () => {
  it("renders TableSort component properly", () => {
    // render(
    //   <ControlFilter item={{}} colums={[]} isLoading={true} sTableID="1" />
    // );
  });
});
