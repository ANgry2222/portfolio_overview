import styles from "./LoadingIndicator.module.scss";

export const LoadingIndicator = () => {
	return (
		<div className={styles.loading_indicator__wrapper}>
			<p className={styles.indicator_text}>Loading data...</p>
			<div className={styles.indicator_spinner}></div>
		</div>
	);
};

export default LoadingIndicator;
