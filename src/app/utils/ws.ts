import { io } from "socket.io-client";
import store from "../store/store";

const assetsList = store.getState().portfolio.items;
console.log("-----------");

let params1: string = "";
assetsList.forEach(
	(item) => (params1 += `${item.currencySymbol.toLowerCase()}@ticker/`)
);
params1 = params1.slice(0, -1);

const socket = io(
	`wss://stream.binance.com:9443/stream?streams=btcusdt@ticker`
);

export const sendRequest = () => {
	socket.emit(
		JSON.stringify({
			method: "SUBSCRIBE",
			params: [],
			id: 1,
		})
	);
};

socket.on("responseData", (data) => {
	console.log("Received response from server:", data);
});

sendRequest();
