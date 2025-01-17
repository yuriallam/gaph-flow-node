import { configureStore } from "@reduxjs/toolkit";
import nodeReducer from "./nodeSlice";

const store = configureStore({
  reducer: {
    nodes: nodeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
