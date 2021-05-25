import { createSlice } from "@reduxjs/toolkit";
import * as auth from "auth-provider";
import { AppDispatch, RootState } from "./index";
import { tFetch } from "../utils/http";
import { User } from "../types";

interface State {
  user: User | null;
}

export interface AuthForm {
  username: string;
  password: string;
}

const bootstrapUser = async () => {
  let user = null;
  let token = auth.getToken();
  if (token) {
    let data = await tFetch("me", { token });
    user = data.user;
  }
  return user;
};

const initState: State = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

export const selectUser = (state: RootState) => state.auth.user;

export const login = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.login(form).then((user) => dispatch(setUser(user)));

export const bootstrap = (dispatch: AppDispatch) =>
  bootstrapUser().then((user) => dispatch(setUser(user)));

export const register = (form: AuthForm) => (dispatch: AppDispatch) =>
  auth.register(form).then((user) => dispatch(setUser(user)));

export const logout = () => (dispatch: AppDispatch) =>
  auth.logout().then(() => dispatch(setUser(null)));
