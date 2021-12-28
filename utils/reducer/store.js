import { configureStore } from "@reduxjs/toolkit";
import showHideSidebarReducer from "./showHideSidebarSlice";

export const store = configureStore({
  reducer: {
    sidebarSlice: showHideSidebarReducer,
  },
});
