import { createSelector } from 'reselect';
const selectRaw = (state) => state.BlockUIReducer;

const HandleClose = createSelector(
    [selectRaw],
    (BlockUIReducer) => BlockUIReducer.HandleClose,
);

const IsOpen = createSelector(
    [selectRaw],
    (BlockUIReducer) => BlockUIReducer.IsOpen,
);

const BlockUISelectors = {
    selectRaw,
    IsOpen,
    HandleClose
}
export default BlockUISelectors;