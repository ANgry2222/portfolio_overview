import getColorByValue from "@/app/utils/getColorByValue";
import styles from "./Asset.module.scss";
import { useAppDispatch } from "@/app/hooks/ReduxHooks";
import { deleteAsset } from "@/app/store/slices/portfolioSlice";
import Triangle from "../svg/Triangle";
import AssetDailyChange from "../AssetDailyChange/AssetDailyChange";

export interface IAssetProps {
	currencySymbol: string;
	currencyName: string;
	currencyCount: number;
	actualPrice: number;
	dailyChange: number;
	portfolioShare: number;
}

export const Asset = (props: IAssetProps) => {
	const totalCost = props.currencyCount * props.actualPrice;
	const dispatch = useAppDispatch();
	const handleItemClick = () => {
		dispatch(deleteAsset(props.currencySymbol));
	};

	return (
		<div className={styles.asset_container} onClick={handleItemClick}>
			<p className={styles.asset_container__currency_name}>
				{props.currencyName}
			</p>
			<p className={styles.asset_container__currency_count}>
				{props.currencyCount.toFixed(5)}
			</p>
			<p className={styles.asset_container__actual_price}>
				${Number(props.actualPrice).toFixed(2).replace(".", ",")}
			</p>
			<p className={styles.asset_container__total_cost}>
				${totalCost.toFixed(2).replace(".", ",")}
			</p>
			<AssetDailyChange dailyChange={props.dailyChange} />
			<p className={styles.asset_container__portfolio_share}>
				{`${props.portfolioShare.toFixed(2)}%`}
			</p>
		</div>
	);
};

export default Asset;
