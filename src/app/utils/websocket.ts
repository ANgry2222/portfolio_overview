import store from "../store/store";
import { updateAsset } from "../store/slices/portfolioSlice";

export interface IStreamData {
	symbol: string;
	priceChangePercent: number;
	lastPrice: number;
}

export function ws() {
	const assetsList = store.getState().portfolio.items;

	let params: string = "";
	assetsList.forEach(
		(item) => (params += `${item.currencySymbol.toLowerCase()}@ticker/`)
	);
	params = params.slice(0, -1);

	const socket = new WebSocket(
		`wss://data-stream.binance.vision/stream?streams=`
	);

	socket.onopen = () => {
		if (socket.readyState === WebSocket.OPEN) {
			socket.send(
				JSON.stringify({
					method: "SUBSCRIBE",
					params: [...params.split("/")],
					id: 1,
				})
			);
		}
	};

	socket.onclose = (event) => {
		console.log("WebSocket закрыт:", event.code);
	};

	socket.onmessage = (event) => {
		const rawData = JSON.parse(event.data);
		if (rawData.result !== null) {
			socket.close();
			if (rawData.data) {
				const extractedData: IStreamData = {
					symbol: rawData.data.s,
					priceChangePercent: parseFloat(rawData.data.P),
					lastPrice: parseFloat(rawData.data.c),
				};
				store.dispatch(updateAsset(extractedData));
			}
		} else {
			console.log("Соединение установлено");
		}
	};

	socket.onerror = (error) => {
		console.error("Ошибка:", error);
	};
}
