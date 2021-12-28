import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: false,
};

export const showHideSidebarSlice = createSlice({
  name: "showHideSidebar",
  initialState,
  reducers: {
    show: (state) => {
      state.showSidebar = true;
    },
    hide: (state) => {
      state.showSidebar = false;
    },
    update: (state, action) => {
      state.showSidebar = action.payload;
    },
  },
});

export const { show, hide, update } = showHideSidebarSlice.actions;

export default showHideSidebarSlice.reducer;
