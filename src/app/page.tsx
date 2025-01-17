"use client";
import store from "@/store/store";
import { Provider } from "react-redux";
import MainNodeFlow from "./graph/page";

export default function Home() {
  return (
    <Provider store={store}>
      <MainNodeFlow />
    </Provider>
  );
}
