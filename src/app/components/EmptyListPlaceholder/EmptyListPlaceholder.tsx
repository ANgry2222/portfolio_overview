import styles from "./EmptyListPlaceholder.module.scss";

export const EmptyListPlaceholder = () => {
	return (
		<div className={styles.placeholder_div}>
			<p className={styles.placeholder_text}>No currencies found</p>
		</div>
	);
};

export default EmptyListPlaceholder;
