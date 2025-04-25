import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ModalState {
	isOpen: boolean;
}

const initialState = {
	isOpen: false,
};

export const ModalSlice = createSlice({
	name: "modalSlice",
	initialState,
	reducers: {
		closeModal: (state) => {
			state.isOpen = false;
		},
		openModal: (state) => {
			state.isOpen = true;
		},
	},
});

export const { closeModal, openModal } = ModalSlice.actions;
export const selectModalStatus = (state: RootState) => state.modal.isOpen;
export default ModalSlice.reducer;
