import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  topic1?: string;
  topic2?: string;
}

const initialState: FormState = {
  topic1: "",
  topic2: "",
};
const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateTopic: (state, action: PayloadAction<FormState>) => {
      state.topic1 = action.payload?.topic1;
      state.topic2 = action.payload?.topic2;
    },
  },
});

export const { updateTopic } = formSlice.actions;

export default formSlice.reducer;
