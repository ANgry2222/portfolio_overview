import { IAssetProps } from "../components/Asset/Asset";

export const CalculatePortfolioShares = () => {
	const storedData = localStorage.getItem("assets");
	let array: Array<IAssetProps> = storedData ? JSON.parse(storedData) : [];
	let totalPortfolioCost = 0;
	array.forEach(
		(item) => (totalPortfolioCost += item.currencyCount * item.actualPrice)
	);
	console.log("totalCost: ", totalPortfolioCost);
	array.forEach(
		(item) =>
			(item.portfolioShare =
				((item.currencyCount * item.actualPrice) / totalPortfolioCost) *
				100)
	);
	localStorage.setItem("assets", JSON.stringify(array));
};
