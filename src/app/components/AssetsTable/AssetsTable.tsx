import { AssetsTableHeader } from "../AssetsTableHeader/AssetsTableHeader";
import styles from "./AssetsTable.module.scss";
import TableContent from "../TableContent/TableContent";

export const AssetsTable = () => {
	return (
		<div className={styles.assets_table__container}>
			<AssetsTableHeader />
			<TableContent />
		</div>
	);
};
