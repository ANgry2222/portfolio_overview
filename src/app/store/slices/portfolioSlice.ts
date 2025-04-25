import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IAssetProps } from "@/app/components/Asset/Asset";
import { IStreamData } from "@/app/utils/websocket";

export interface PortfolioSlice {
	items: Array<IAssetProps>;
}

export const portfolioInitialState: PortfolioSlice = {
	items: [],
};

export const PortfolioSlice = createSlice({
	name: "portfolio",
	initialState: portfolioInitialState,
	reducers: {
		addAsset: (state, action: PayloadAction<IAssetProps>) => {
			const duplicateIndex = state.items.findIndex(
				(item) => item.currencySymbol === action.payload.currencySymbol
			);
			if (duplicateIndex !== -1) {
				state.items[duplicateIndex].currencyCount +=
					action.payload.currencyCount;
			} else {
				state.items.push(action.payload);
			}
			CalculatePortfolioShares(state.items);
		},
		updateAsset: (state, action: PayloadAction<IStreamData>) => {
			const currentIndex = state.items.findIndex(
				(item) => item.currencySymbol === action.payload.symbol
			);
			state.items[currentIndex].actualPrice = action.payload.lastPrice;
			state.items[currentIndex].dailyChange =
				action.payload.priceChangePercent;
			CalculatePortfolioShares(state.items);
		},
		deleteAsset: (state, action: PayloadAction<string>) => {
			const currentIndex = state.items.findIndex(
				(item) => item.currencySymbol === action.payload
			);
			if (currentIndex !== -1) {
				state.items.splice(currentIndex, 1);
				CalculatePortfolioShares(state.items);
			}
		},
	},
});

const CalculatePortfolioShares = (items: Array<IAssetProps>) => {
	let totalPortfolioCost = 0;
	items.forEach(
		(item) => (totalPortfolioCost += item.currencyCount * item.actualPrice)
	);

	items.forEach(
		(item) =>
			(item.portfolioShare =
				((item.currencyCount * item.actualPrice) / totalPortfolioCost) *
				100)
	);
};

export const { addAsset, updateAsset, deleteAsset } = PortfolioSlice.actions;
export const selectItems = (state: RootState) => state.portfolio.items;
export default PortfolioSlice.reducer;
