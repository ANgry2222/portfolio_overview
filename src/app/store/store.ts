import { combineReducers, configureStore, Reducer } from "@reduxjs/toolkit";
import modalReducer from "./slices/modalSlice";
import dataLoadReducer from "./slices/dataLoadSlice";
import currentAssetReducer from "./slices/currentAssetSlice";
import portfolioReducer, {
	portfolioInitialState,
} from "./slices/portfolioSlice";

const loadState = () => {
	try {
		const serializedState = localStorage.getItem("portfolio");
		if (serializedState === null) {
			return portfolioInitialState;
		}
		return JSON.parse(serializedState);
	} catch (err) {
		("");
	}
};

const rootReducer = combineReducers({
	modal: modalReducer,
	isLoading: dataLoadReducer,
	currentAsset: currentAssetReducer,
	portfolio: portfolioReducer,
});

const store = configureStore({
	reducer: rootReducer,
	preloadedState: {
		portfolio: loadState(),
	},
});

store.subscribe(() => {
	const state = store.getState();
	localStorage.setItem("portfolio", JSON.stringify(state.portfolio));
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
