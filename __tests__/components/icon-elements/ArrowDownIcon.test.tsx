import { describe, expect, it } from "vitest";
import { renderWithProviders } from "../../utililities/test-utililities";
import { configureStore } from "@reduxjs/toolkit";
import ArrowDownHeadIcon from "@/components/icon-elements/ArrowDownHeadIcon";
import ArrowDownIcon from "@/components/icon-elements/ArrowDownIcon";
import ArrowDownRightIcon from "@/components/icon-elements/ArrowDownRightIcon";
import ArrowLeftHeadIcon from "@/components/icon-elements/ArrowLeftHeadIcon";
import ArrowRightHeadIcon from "@/components/icon-elements/ArrowRightHeadIcon";
import ArrowRightIcon from "@/components/icon-elements/ArrowRightIcon";
import ArrowUpHeadIcon from "@/components/icon-elements/ArrowUpHeadIcon";
import ArrowUpIcon from "@/components/icon-elements/ArrowUpIcon";
import ArrowUpRightIcon from "@/components/icon-elements/ArrowUpRightIcon";
import CalendarIcon from "@/components/icon-elements/CalendarIcon";
import ChevronLeftFill from "@/components/icon-elements/ChevronLeftFill";
import ChevronRightFill from "@/components/icon-elements/ChevronRightFill";
import DoubleArrowLeftHeadIcon from "@/components/icon-elements/DoubleArrowLeftHeadIcon";
import DoubleArrowRightHeadIcon from "@/components/icon-elements/DoubleArrowRightHeadIcon";
import ExclamationFilledIcon from "@/components/icon-elements/ExclamationFilledIcon";
import EyeIcon from "@/components/icon-elements/EyeIcon";
import EyeOffIcon from "@/components/icon-elements/EyeOffIcon";
import LoadingSpinner from "@/components/icon-elements/LoadingSpinner";
import MinusIcon from "@/components/icon-elements/MinusIcon";
import PlusIcon from "@/components/icon-elements/PlusIcon";
import SearchIcon from "@/components/icon-elements/SearchIcon";
import XCircleIcon from "@/components/icon-elements/XCircleIcon";
import XIcon from "@/components/icon-elements/XIcon";

//#region Initial
const preloadedState = {
  counter: { open: true },
};
const store = configureStore({
  reducer: {},
  preloadedState,
});
//#endregion Initial

describe("Icon", () => {
  it("Render Page", () => {
    renderWithProviders(<ArrowDownHeadIcon />);
    expect(<ArrowDownHeadIcon />).toBeDefined();

    renderWithProviders(<ArrowDownIcon />);
    expect(<ArrowDownIcon />).toBeDefined();

    renderWithProviders(<ArrowDownRightIcon />);
    expect(<ArrowDownRightIcon />).toBeDefined();

    renderWithProviders(<ArrowLeftHeadIcon />);
    expect(<ArrowLeftHeadIcon />).toBeDefined();

    renderWithProviders(<ArrowRightHeadIcon />);
    expect(<ArrowRightHeadIcon />).toBeDefined();

    renderWithProviders(<ArrowRightIcon />);
    expect(<ArrowRightIcon />).toBeDefined();

    renderWithProviders(<ArrowUpHeadIcon />);
    expect(<ArrowUpHeadIcon />).toBeDefined();

    renderWithProviders(<ArrowUpIcon />);
    expect(<ArrowUpIcon />).toBeDefined();

    renderWithProviders(<ArrowUpRightIcon />);
    expect(<ArrowUpRightIcon />).toBeDefined();

    renderWithProviders(<CalendarIcon />);
    expect(<CalendarIcon />).toBeDefined();

    renderWithProviders(<ChevronLeftFill />);
    expect(<ChevronLeftFill />).toBeDefined();

    renderWithProviders(<ChevronRightFill />);
    expect(<ChevronRightFill />).toBeDefined();

    renderWithProviders(<DoubleArrowLeftHeadIcon />);
    expect(<DoubleArrowLeftHeadIcon />).toBeDefined();

    renderWithProviders(<DoubleArrowRightHeadIcon />);
    expect(<DoubleArrowRightHeadIcon />).toBeDefined();

    renderWithProviders(<ExclamationFilledIcon />);
    expect(<ExclamationFilledIcon />).toBeDefined();

    renderWithProviders(<EyeIcon />);
    expect(<EyeIcon />).toBeDefined();

    renderWithProviders(<EyeOffIcon />);
    expect(<EyeOffIcon />).toBeDefined();

    renderWithProviders(<LoadingSpinner />);
    expect(<LoadingSpinner />).toBeDefined();

    renderWithProviders(<MinusIcon />);
    expect(<MinusIcon />).toBeDefined();

    renderWithProviders(<PlusIcon />);
    expect(<PlusIcon />).toBeDefined();

    renderWithProviders(<SearchIcon />);
    expect(<SearchIcon />).toBeDefined();

    renderWithProviders(<XCircleIcon />);
    expect(<XCircleIcon />).toBeDefined();

    renderWithProviders(<XIcon />);
    expect(<XIcon />).toBeDefined();
  });
});
