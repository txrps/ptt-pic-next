import { createSelector } from 'reselect';

const selectRaw = (state) => state.NavigateManageReducer;

const menuNavigate = createSelector(
    [selectRaw],
    (NavigateManageReducer) => NavigateManageReducer.memu,
);

const NavigateManagementSelector = {
    selectRaw,
    menuNavigate
}
export default NavigateManagementSelector;