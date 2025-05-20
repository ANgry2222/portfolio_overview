import { useAppDispatch } from "@/app/hooks/ReduxHooks";
import styles from "./ShortAsset.module.scss";
import { setCurrentAsset } from "@/app/store/slices/currentAssetSlice";
import getColorByValue from "@/app/utils/getColorByValue";

export interface IShortAssetProps {
	currencySymbol: string;
	currencyName: string;
	currencyPrice: number;
	currencyPriceChange: number;
	topOffset: number;
}

export const ShortAsset = (props: IShortAssetProps) => {
	const dispatch = useAppDispatch();

	const hadleAssetClick = () => {
		dispatch(setCurrentAsset(props));
	};

	return (
		<div
			className={styles.short_asset__container}
			onClick={hadleAssetClick}
			style={{ top: `${props.topOffset}px` }}>
			<p className={styles.short_asset__name}>{props.currencyName}</p>
			<p className={styles.short_asset__price}>${props.currencyPrice}</p>
			<p
				className={styles.short_asset__price_change}
				style={{
					color: getColorByValue(props.currencyPriceChange),
				}}>
				{props.currencyPriceChange}%
			</p>
		</div>
	);
};

export default ShortAsset;
