import styles from "./AssetsTableHeader.module.scss";

export const AssetsTableHeader = () => {
	return (
		<div className={styles.assets_table__header_container}>
			<p className={styles.header_container__currency_name}>Валюта</p>
			<p className={styles.header_container__currency_count}>
				Количество
			</p>
			<p className={styles.header_container__actual_price}>
				Рыночная цена
			</p>
			<p className={styles.header_container__total_cost}>
				Общая стоимость
			</p>
			<p className={styles.header_container__daily_change}>
				Изм. за 24 часа
			</p>
			<p className={styles.header_container__portfolio_share}>
				Доля в портфеле
			</p>
		</div>
	);
};
