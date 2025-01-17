import { configureStore } from "@reduxjs/toolkit";
import habitReducer from "./habitSlice";
import nodeReducer from "./nodeSlice";

const store = configureStore({
  reducer: {
    nodes: nodeReducer,
    habit: habitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
