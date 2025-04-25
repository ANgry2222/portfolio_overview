import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DataLoadState {
	isLoading: boolean;
}

const initialState = {
	isLoading: true,
};

export const DataLoadSlice = createSlice({
	name: "dataLoadSlice",
	initialState,
	reducers: {
		setDataLoaded: (state) => {
			state.isLoading = true;
		},
	},
});

export const { setDataLoaded } = DataLoadSlice.actions;
export const selectDataLoadStatus = (state: RootState) =>
	state.isLoading.isLoading;
export default DataLoadSlice.reducer;
