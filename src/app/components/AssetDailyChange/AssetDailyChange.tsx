import Triangle from "../svg/Triangle";
import styles from "./AssetDailyChange.module.scss";

export const AssetDailyChange = ({ dailyChange }: { dailyChange: number }) => {
	if (Number(dailyChange) === 0) {
		return (
			<div className={styles.asset_container__daily_change}>
				<p
					className={styles.daily_change_text}
					style={{ color: "#ababab" }}
				>
					{dailyChange}%
				</p>
			</div>
		);
	}

	return (
		<div className={styles.asset_container__daily_change}>
			<p
				className={styles.daily_change_text}
				style={{
					color: dailyChange > 0 ? "#24cf24" : "#ff5757",
				}}
			>
				{dailyChange}%
			</p>
			<Triangle
				width={10}
				height={10}
				color={dailyChange > 0 ? "#24cf24" : "#ff5757"}
				rotate={dailyChange > 0 ? false : true}
			/>
		</div>
	);
};

export default AssetDailyChange;
