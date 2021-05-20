import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface State {
  projectModelOpen: boolean;
}

const initState: State = {
  projectModelOpen: false,
};

export const projectListSlice = createSlice({
  name: "projectListSlice",
  initialState: initState,
  reducers: {
    openProjectModel(state) {
      state.projectModelOpen = true;
    },
    closeProjectModel(state) {
      state.projectModelOpen = false;
    },
  },
});

export const projectListActions = projectListSlice.actions;

export const selectProjectModelOpen = (state: RootState) =>
  state.projectList.projectModelOpen;
