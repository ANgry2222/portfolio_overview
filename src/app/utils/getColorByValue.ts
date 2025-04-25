export const getColorByValue = (value: number) => {
	const translatedValue = Number(value);
	if (translatedValue > 0) {
		return "#24cf24";
	} else if (translatedValue === 0) {
		return "#ababab";
	} else {
		return "#ff5757";
	}
};

export default getColorByValue;
