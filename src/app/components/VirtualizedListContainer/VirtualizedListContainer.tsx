import { CurrenciesContext } from "@/app/page";
import { JSX, useContext, useEffect, useRef, useState } from "react";
import ShortAsset, { IShortAssetProps } from "../ShortAsset/ShortAsset";
import styles from "./VirtualizedListContainer.module.scss";
import EmptyListPlaceholder from "../EmptyListPlaceholder/EmptyListPlaceholder";

export const VirtualizedListContainer = () => {
	const buffer = 20;
	const data = useContext(CurrenciesContext);
	const [filteredData, setFilteredData] = useState<IShortAssetProps[]>([]);
	const [renderedItems, setRenderedItems] = useState<number>(0);
	const [components, setComponents] = useState<JSX.Element[]>([]);
	const containerRef = useRef<HTMLDivElement>(null);

	const addComponents = (length: number) => {
		let createdComponents: JSX.Element[] = [];
		filteredData
			.slice(components.length, length)
			.map((item) =>
				createdComponents.push(
					<ShortAsset key={item.currencySymbol} {...item} />
				)
			);
		setComponents((prev) => [...prev, ...createdComponents]);
	};

	useEffect(() => {
		addComponents(renderedItems);
	}, [renderedItems]);

	useEffect(() => {
		setFilteredData(data);
		setRenderedItems(20);
	}, []);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		containerRef.current?.scrollTo(0, 0);
		setComponents([]);
		const { value } = event.target;
		const searchText = value.toUpperCase();
		let searchData = data.filter((item) =>
			item.currencyName.includes(searchText)
		);

		if (searchData.length === 0) {
			setComponents([<EmptyListPlaceholder />]);
		}

		if (searchText.length !== 0) {
			setFilteredData(searchData);
			setRenderedItems(searchData.length);
		} else {
			setFilteredData(data);
			setRenderedItems(buffer);
		}
	};

	const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
		const target = event.target as HTMLDivElement;
		const scrollTop = target.scrollTop;
		const startIndex = Math.floor(scrollTop / 40);
		if (startIndex > components.length - 5) {
			setRenderedItems(renderedItems + 20);
		}
	};

	return (
		<>
			<input
				className={styles.input_field}
				type="text"
				onChange={handleSearchChange}
			></input>
			<div
				onScroll={handleScroll}
				className={styles.modal_form__currencies_list}
				ref={containerRef}
			>
				<div
					style={{
						height: `${filteredData.length * 40}px`,
					}}
				>
					{components}
				</div>
			</div>
		</>
	);
};
