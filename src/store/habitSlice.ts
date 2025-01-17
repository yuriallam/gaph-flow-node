import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodeState {
  id: string;
  selectedHabit: string;
}

const initialState: NodeState = {
  id: "",
  selectedHabit: "",
};

const habitSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setSelectedHabit: (
      state,
      action: PayloadAction<{ id: string; habit: string }>
    ) => {
      state.id = action.payload.id;
      state.selectedHabit = action.payload.habit;
    },
  },
});

export const { setSelectedHabit } = habitSlice.actions;
export default habitSlice.reducer;
