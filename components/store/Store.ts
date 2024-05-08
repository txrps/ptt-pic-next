import { thunk } from 'redux-thunk';
import {applyMiddleware, combineReducers, legacy_createStore as createStore} from 'redux'
import { NavigateManageReducer } from './NavigateManagement/NavigateManagementReducer';
import { BlockUIReducer } from './BlockUI/BlockUIReducer';
import { DialogReducer } from './DialogAlert/DialogAlertReducer';

const rootReducer = combineReducers({
    NavigateManageReducer,
    BlockUIReducer,
    DialogReducer
  });
  

const store = createStore(
  rootReducer, 
  {},
  applyMiddleware(thunk));

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;