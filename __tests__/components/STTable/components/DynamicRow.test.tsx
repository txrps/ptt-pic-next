import React from "react";
import DynamicRows, {
  useDynamicRows,
} from "@/components/STTable/components/DynamicRow";
import { describe, expect, it, vi } from "vitest";
import { renderWithProviders } from "@/__tests__/utililities/test-utililities";
import { Provider } from "react-redux";
import { renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";

const preloadedState = {
  counter: { open: true },
};
const store = configureStore({
  reducer: {},
  preloadedState,
});

const mockSTTableProp = {
  rows: {
    arrRows: [
      { sID: "1", child: [{ sID: "1.1" }] },
      { sID: "2", child: [{ sID: "2.1" }] },
    ],
  },
};

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe("useDynamicRows", () => {
  it("should toggle expansion of table data", () => {
    const { result } = renderHook(
      () => useDynamicRows(mockSTTableProp, 1, [], [], vi.fn()),
      { wrapper: Wrapper }
    );
    expect(
      result.current.renderRows(mockSTTableProp.rows.arrRows)
    ).toHaveLength(2);

    // Test toggling expansion
    result.current.toggleExpansion("1");
    const modifiedRows = result.current.renderRows(
      mockSTTableProp.rows.arrRows
    );
    expect(modifiedRows).toHaveLength(2);

    const rows = [
      { sID: '1', name: 'Button 1' },
      { sID: '2', name: 'Button 2' },
      { sID: '3', name: 'Button 3' }
    ];
    const res = result.current.findRowByID(rows, '2');
    expect(res).toEqual({ sID: '2', name: 'Button 2' });

    const rows2 = [
      { sID: '1', name: 'Button 1' },
      {
        sID: '2',
        name: 'Button 2',
        child: [
          { sID: '4', name: 'Button 4' },
          { sID: '5', name: 'Button 5' }
        ]
      },
      { sID: '3', name: 'Button 3' }
    ];
    const res2 = result.current.findRowByID(rows2, '5');
    expect(res2).toEqual({ sID: '5', name: 'Button 5' });

    const rows3 = [
      { sID: '1', name: 'Button 1' },
      { sID: '2', name: 'Button 2' },
      { sID: '3', name: 'Button 3' }
    ];
    const res3 = result.current.findRowByID(rows3, '6');
    expect(res3).toBeUndefined();
  });
});

describe("DynamicRows", () => {
  it("should render dynamic rows correctly", () => {
    renderWithProviders(
      <DynamicRows
        param={mockSTTableProp}
        row={{ sID: "1", child: [{ sID: "1.1" }] }}
        index={0}
        arrColumn={[]}
        selectionModel={null}
        setSelectionModel={null}
      />
    );
    expect(
      <DynamicRows
        param={mockSTTableProp}
        row={{ sID: "1",expanded : true, child: [{ sID: "1.1" }] }}
        index={0}
        arrColumn={[]}
        selectionModel={null}
        setSelectionModel={null}
      />
    ).toBeDefined();
  });
});
