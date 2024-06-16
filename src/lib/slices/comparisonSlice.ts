import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Phone } from "@/types";
import { set } from "react-hook-form";

interface ComparisonState {
  phones: Phone[];
}

const initialState: ComparisonState = {
  phones: []
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addPhone(state, action: PayloadAction<Phone>) {
      if (state.phones.length < 2) {
        state.phones.push(action.payload);

        localStorage.setItem("phones", JSON.stringify(state.phones));
      }
    },
    removePhone(state, action: PayloadAction<number>) {
      state.phones = state.phones.filter((Phone) => Phone.id !== action.payload);

      localStorage.setItem("phones", JSON.stringify(state.phones));
    },
    togglePhone(state, action: PayloadAction<Phone>) {
      // check if it is already in the comparison
      const index = state.phones.findIndex((Phone) => Phone.id === action.payload.id);

      if (index !== -1) {
        state.phones = state.phones.filter((Phone) => Phone.id !== action.payload.id);

        localStorage.setItem("phones", JSON.stringify(state.phones));
      }

      if (state.phones.length < 2) {
        state.phones.push(action.payload);

        localStorage.setItem("phones", JSON.stringify(state.phones));
      }
    },
    setComparison(state, action: PayloadAction<Phone[]>) {
      state.phones = action.payload;
    }
  }
});

export const { addPhone, removePhone, togglePhone, setComparison } = comparisonSlice.actions;

export default comparisonSlice.reducer;
