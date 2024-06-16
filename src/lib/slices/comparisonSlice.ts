import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Phone } from "@/types";
import { set } from "react-hook-form";

interface ComparisonState {
  Phones: Phone[];
}

const initialState: ComparisonState = {
  Phones: []
};

const comparisonSlice = createSlice({
  name: "comparison",
  initialState,
  reducers: {
    addPhone(state, action: PayloadAction<Phone>) {
      if (state.Phones.length < 2) {
        state.Phones.push(action.payload);

        localStorage.setItem("Phones", JSON.stringify(state.Phones));
      }
    },
    removePhone(state, action: PayloadAction<number>) {
      state.Phones = state.Phones.filter((Phone) => Phone.id !== action.payload);

      localStorage.setItem("Phones", JSON.stringify(state.Phones));
    },
    togglePhone(state, action: PayloadAction<Phone>) {
      // check if it is already in the comparison
      const index = state.Phones.findIndex((Phone) => Phone.id === action.payload.id);

      if (index !== -1) {
        state.Phones = state.Phones.filter((Phone) => Phone.id !== action.payload.id);

        localStorage.setItem("Phones", JSON.stringify(state.Phones));
      }

      if (state.Phones.length < 2) {
        state.Phones.push(action.payload);

        localStorage.setItem("Phones", JSON.stringify(state.Phones));
      }
    },
    setComparison(state, action: PayloadAction<Phone[]>) {
      state.Phones = action.payload;
    }
  }
});

export const { addPhone, removePhone, togglePhone, setComparison } = comparisonSlice.actions;

export default comparisonSlice.reducer;
