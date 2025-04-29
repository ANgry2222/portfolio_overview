import { useAppDispatch } from "@/app/hooks/ReduxHooks";
import styles from "./PortfolioHeader.module.scss";
import { openModal } from "@/app/store/slices/modalSlice";
import ColoredButton from "../ColoredButton/ColoredButton";
import Triangle from "../svg/Triangle";

export const PortfolioHeader = () => {
	const dispatch = useAppDispatch();
	return (
		<header className={styles.portfolio_header__container}>
			<div className={styles.header_logo}>
				Portf<span className={styles.span_placeholder}>o</span>
				<span className={styles.span_1}>
					<Triangle width={10} height={10} color={"#24cf24"} />
					<p className={styles.span_1_text}>o</p>
				</span>
				li
				<span className={styles.span_2}>
					<Triangle
						rotate={true}
						width={10}
						height={10}
						color={"#ff5757"}
					/>
					o
				</span>
				&nbsp;Overview
			</div>
			<ColoredButton
				text="Добавить"
				onClick={() => {
					dispatch(openModal());
				}}
			/>
		</header>
	);
};

export default PortfolioHeader;
