import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NodeState {
  usernames: Record<string, string>;
  habits: Record<string, string>;
}

const initialState: NodeState = {
  usernames: {},
  habits: {},
};

const nodeSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setUsername: (
      state,
      action: PayloadAction<{ id: string; username: string }>
    ) => {
      state.usernames[action.payload.id] = action.payload.username;
    },
    setHabit: (state, action: PayloadAction<{ id: string; habit: string }>) => {
      state.habits[action.payload.id] = action.payload.habit;
    },
  },
});

export const { setUsername, setHabit } = nodeSlice.actions;
export default nodeSlice.reducer;
