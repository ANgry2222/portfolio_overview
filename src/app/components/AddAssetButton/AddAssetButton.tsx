"use client";
import { useAppDispatch } from "@/app/hooks/ReduxHooks";
import styles from "./AddAssetButton.module.scss";
import { openModal } from "@/app/store/slices/modalSlice";

export const AddAssetButton = () => {
	const dispatch = useAppDispatch();
	const handleButtonClick = () => {
		dispatch(openModal());
	};

	return (
		<button className={styles.header_button} onClick={handleButtonClick}>
			Add asset
		</button>
	);
};

export default AddAssetButton;
