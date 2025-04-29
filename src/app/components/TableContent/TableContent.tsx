import { useAppSelector } from "@/app/hooks/ReduxHooks";
import Asset from "../Asset/Asset";
import styles from "./TableContent.module.scss";

export const TableContent = () => {
	const portfolio = useAppSelector((state) => state.portfolio.items);

	if (portfolio.length === 0) {
		return (
			<div className={styles.table_content__placeholder}>
				<p>Портфель не содержит активов</p>
				<p>нажмите кнопку &#34;Добавить&#34;</p>
				<p>чтобы начать заполнять портфель активами</p>
			</div>
		);
	} else {
		return (
			<div>
				{portfolio.map((item, index) => (
					<Asset key={index} {...item} />
				))}
			</div>
		);
	}
};

export default TableContent;
