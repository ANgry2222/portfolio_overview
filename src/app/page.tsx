"use client";

import { AssetsTable } from "./components/AssetsTable/AssetsTable";
import { PortfolioHeader } from "./components/PortfolioHeader/PortfolioHeader";
import { Modal } from "./components/Modal/Modal";
import { useEffect, useState } from "react";
import axios from "axios";
import { IShortAssetProps } from "./components/ShortAsset/ShortAsset";
import { ws as websocket } from "./utils/websocket";
import LoadingIndicator from "./components/LoadingIndicator/LoadingIndicator";
import styles from "./page.module.scss";
import CurrenciesContext from "./utils/context";

interface Response {
	symbol: string;
	lastPrice: string;
	priceChangePercent: string;
}

export default function Home() {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [data, setData] = useState<IShortAssetProps[]>([]);

	useEffect(() => {
		setInterval(() => {
			websocket();
		}, 5000);
	}, []);
	useEffect(() => {
		axios
			.get("https://data-api.binance.vision/api/v3/ticker/24hr")
			.then((response) => {
				const filteredResponse = response.data.filter(
					(item: Response) => item.symbol.endsWith("USDT")
				);
				const assetsData = filteredResponse.map((item: Response) => ({
					currencySymbol: item.symbol,
					currencyName: item.symbol.slice(0, -4),
					currencyPrice: `${parseFloat(item.lastPrice).toFixed(5)}`,
					currencyPriceChange: parseFloat(
						item.priceChangePercent
					).toFixed(2),
				}));
				setData(assetsData);
				setIsLoading(false);
			});
	}, []);

	if (isLoading)
		return (
			<div className={styles.loading_screen}>
				<LoadingIndicator />
			</div>
		);

	return (
		<>
			<CurrenciesContext.Provider value={data}>
				<Modal />
			</CurrenciesContext.Provider>
			<PortfolioHeader />
			<AssetsTable />
		</>
	);
}
