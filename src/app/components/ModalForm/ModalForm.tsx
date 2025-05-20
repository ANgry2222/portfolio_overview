import styles from "./ModalForm.module.scss";
import { FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks/ReduxHooks";
import { clearCurrentAsset } from "@/app/store/slices/currentAssetSlice";
import { closeModal } from "@/app/store/slices/modalSlice";
import { addAsset } from "@/app/store/slices/portfolioSlice";
import { IAssetProps } from "../Asset/Asset";
import ColoredButton from "../ColoredButton/ColoredButton";
import VirtualizedList from "../VirtualizedList/VirtualizedList";

export const ModalForm = () => {
	const dispatch = useAppDispatch();
	const [currencyAmount, setCurrencyAmount] = useState<number>(0);
	const currentAsset = useAppSelector(
		(state) => state.currentAsset.currentAsset
	);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (currentAsset) {
			const ass: IAssetProps = {
				currencySymbol: currentAsset?.currencySymbol,
				currencyName: currentAsset?.currencyName,
				currencyCount: currencyAmount,
				actualPrice: currentAsset?.currencyPrice,
				dailyChange: currentAsset?.currencyPriceChange,
				portfolioShare: 0,
			};
			dispatch(addAsset(ass));
		}

		dispatch(clearCurrentAsset());
		dispatch(closeModal());
	};

	const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		setCurrencyAmount(parseFloat(value));
	};

	return (
		<div className={styles.modal_form__container}>
			<form onSubmit={(event) => handleSubmit(event)}>
				<VirtualizedList />
				{currentAsset ? (
					<div>
						<div className={styles.current_asset__container}>
							<p className={styles.asset_name}>
								{currentAsset.currencyName}
							</p>
							<p className={styles.asset_price}>
								{currentAsset.currencyPrice}
							</p>
						</div>
						<input
							onChange={handleAmountChange}
							className={styles.input_field}
							type="number"
							step={0.00001}
							min={0.00001}
							max={9999}
							required
						/>
						<div className={styles.modal_form__buttons_div}>
							<ColoredButton
								color="#29e729"
								text="Добавить"
								onClick={() => {}}
							/>
							<ColoredButton
								onClick={() => {
									dispatch(clearCurrentAsset());
								}}
								text="Отмена"
							/>
						</div>
					</div>
				) : null}
			</form>
		</div>
	);
};

export default ModalForm;
