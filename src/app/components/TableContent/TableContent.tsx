import { useAppSelector } from "@/app/hooks/ReduxHooks";
import Asset from "../Asset/Asset";
import styles from "./TableContent.module.scss";

export const TableContent = () => {
	const portfolio = useAppSelector((state) => state.portfolio.items);

	if (portfolio.length === 0) {
		return (
			<div className={styles.table_content__placeholder}>
				<p>No assets are added</p>
				<p>use Add asset button</p>
				<p>to start filling your portfolio</p>
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
