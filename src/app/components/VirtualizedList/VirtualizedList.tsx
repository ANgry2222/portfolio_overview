import { CurrenciesContext } from "@/app/utils/context";
import styles from "./VirtualizedList.module.scss";
import ShortAsset, { IShortAssetProps } from "../ShortAsset/ShortAsset";
import { useContext, useRef, useState, useMemo } from "react";
import EmptyListPlaceholder from "../EmptyListPlaceholder/EmptyListPlaceholder";

export const VirtualizedList = () => {
	const itemHeight = 40;
	const containerHeight = 200;
	const itemsTreshold = 4;
	const data = useContext(CurrenciesContext);
	const containerRef = useRef<HTMLDivElement>(null);
	const [filteredData, setFilteredData] = useState<IShortAssetProps[]>(data);
	const [isEmptyResponse, setIsEmptyResponse] = useState<boolean>(false);
	const [scrollTop, setScrollTop] = useState<number>(0);

	const [minIndex, maxIndex] = useMemo(() => {
		const minIndex = Math.max(
			0,
			Math.floor(scrollTop / itemHeight) - itemsTreshold
		);
		const maxIndex = Math.min(
			filteredData.length - 1,
			containerHeight / itemHeight +
				Math.ceil(scrollTop / itemHeight) +
				itemsTreshold
		);
		return [minIndex, maxIndex];
	}, [scrollTop, filteredData.length]);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		containerRef.current?.scrollTo(0, 0);
		const { value } = event.target;
		const searchText = value.toUpperCase();
		const searchData = data.filter((item) =>
			item.currencyName.includes(searchText)
		);

		if (searchData.length === 0) {
			setIsEmptyResponse(true);
		} else {
			setIsEmptyResponse(false);
		}

		if (searchText.length !== 0) {
			setFilteredData(searchData);
		} else {
			setFilteredData(data);
		}
	};

	const handleScroll = () => {
		if (containerRef.current) {
			setScrollTop(containerRef.current.scrollTop);
		}
	};

	return (
		<>
			<input
				className={styles.input_field}
				type="text"
				placeholder="Поиск валюты"
				onChange={handleSearchChange}></input>
			<div
				onScroll={handleScroll}
				className={styles.modal_form__currencies_list}
				ref={containerRef}>
				<div
					style={{
						height: `${filteredData.length * itemHeight}px`,
					}}>
					{isEmptyResponse ? (
						<EmptyListPlaceholder />
					) : (
						filteredData
							.slice(minIndex, maxIndex + 1)
							.map((item, index) => (
								<ShortAsset
									key={item.currencySymbol}
									{...item}
									topOffset={(minIndex + index) * itemHeight}
								/>
							))
					)}
				</div>
			</div>
		</>
	);
};

export default VirtualizedList;
