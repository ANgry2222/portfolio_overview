"use client";

import { useAppDispatch, useAppSelector } from "@/app/hooks/ReduxHooks";
import { KeyboardEvent, MouseEvent, useEffect, useRef } from "react";
import { closeModal } from "@/app/store/slices/modalSlice";
import { createPortal } from "react-dom";
import ModalForm from "../ModalForm/ModalForm";
import styles from "./Modal.module.scss";

export const Modal = () => {
	const modalState = useAppSelector((state) => state.modal.isOpen);
	const dispatch = useAppDispatch();
	const dialogRef = useRef<HTMLDialogElement | null>(null);

	useEffect(() => {
		if (modalState) {
			dialogRef.current?.showModal();
		} else {
			dialogRef.current?.close();
		}
	}, [modalState]);

	const closeModalByKeyPress = (event: KeyboardEvent) => {
		if (event.key === "Escape") {
			dispatch(closeModal());
		}
	};

	const closeModalByClick = () => {
		dispatch(closeModal());
	};

	const modalClickEvent = (event: MouseEvent) => {
		if (event.target as HTMLDivElement) {
			event.stopPropagation();
		}
	};

	return modalState
		? createPortal(
				<dialog
					ref={dialogRef}
					autoFocus
					onKeyDown={(event: KeyboardEvent) =>
						closeModalByKeyPress(event)
					}
					onClick={closeModalByClick}
					className={styles.open_dialog}
				>
					<div
						onClick={(event: MouseEvent) => modalClickEvent(event)}
						className={styles.modal_wrapper}
					>
						<ModalForm />
					</div>
				</dialog>,
				document.body
		  )
		: null;
};
