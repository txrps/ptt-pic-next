import { BlockUIActions, BlockUIInitialState } from "./BlockUIAction";

export const BlockUIReducer = (state, { type, payload }) => {
    if (state === undefined) {
        return BlockUIInitialState;
    }
    switch (type) {
        case BlockUIActions.BlockUI:
            return {
                ...state,
                IsOpen: payload?.IsOpen ?? true,
            };
        case BlockUIActions.UnBlockUI:
            return {
                ...state,
                IsOpen: payload?.IsOpen ?? false,
            };
        default:
            return { ...state };
    }
};
