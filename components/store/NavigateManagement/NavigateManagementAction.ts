//#region Interface
export interface INavigateManageState {
	menu: INavigateManageItem[]
}

export interface INavigateManageItem {
	menu: string
}

export const NavigateManageInitialState: INavigateManageState = {
	menu: []
}

export const NavigateManageActions = {
	BlockUI: `BLOCK_UI`
}
//#endregion

export const NavigateManageActionCreators = {
	BlockUI: () => (dispatch) => {
		dispatch({
			type: NavigateManageActions.BlockUI,
			payload: {
				menu: [],
			},
		});
	}
}