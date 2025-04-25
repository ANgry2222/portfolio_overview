import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IShortAssetProps } from "@/app/components/ShortAsset/ShortAsset";

export interface CurrentAssetSlice {
	currentAsset: IShortAssetProps | null;
}

const initialState: CurrentAssetSlice = {
	currentAsset: null,
};

export const CurrentAssetSlice = createSlice({
	name: "currentAssetSlice",
	initialState,
	reducers: {
		setCurrentAsset: (state, action: PayloadAction<IShortAssetProps>) => {
			state.currentAsset = action.payload;
		},
		clearCurrentAsset: (state) => {
			state.currentAsset = null;
		},
	},
});

export const { setCurrentAsset, clearCurrentAsset } = CurrentAssetSlice.actions;
export const selectCurrentAsset = (state: RootState) =>
	state.currentAsset.currentAsset;
export default CurrentAssetSlice.reducer;
