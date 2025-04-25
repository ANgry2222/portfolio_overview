import styles from "./ColoredButton.module.scss";

interface IColoredButtonProps {
	text: string;
	onClick: () => void;
	color?: string;
}

export const ColoredButton = (props: IColoredButtonProps) => {
	return (
		<button
			className={styles.button}
			style={{ backgroundColor: props.color ?? "#ff5757" }}
			onClick={() => {
				props.onClick();
			}}
		>
			{props.text}
		</button>
	);
};

export default ColoredButton;
