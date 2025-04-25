export interface ITriangleProps {
	color: string;
	width: number;
	height: number;
	rotate?: boolean;
}

export const Triangle = (props: ITriangleProps) => {
	return (
		<svg
			style={{ transform: props.rotate ? "rotate(180deg)" : "none" }}
			width={props.width}
			height={props.height}
			viewBox={`0 0 5 5`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M1.63397 0.5C2.01888 -0.166667 2.98113 -0.166667 3.36603 0.5L4.66506 2.75C5.04996 3.41667 4.56884 4.25 3.79904 4.25H1.20096C0.431161 4.25 -0.0499637 3.41667 0.334936 2.75L1.63397 0.5Z"
				fill={props.color}
			/>
		</svg>
	);
};

export default Triangle;
