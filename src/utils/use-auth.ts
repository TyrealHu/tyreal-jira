import * as auth from "../store/auth.slice";
import { AuthForm, selectUser } from "../store/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { User } from "../types";

export const useAuth = () => {
  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();
  const login = useCallback((form: AuthForm) => dispatch(auth.login(form)), [
    dispatch,
  ]);
  const register = useCallback(
    (form: AuthForm) => dispatch(auth.register(form)),
    [dispatch]
  );
  const logout = useCallback(() => dispatch(auth.logout()), [dispatch]);
  const user = useSelector(selectUser);
  return {
    user,
    login,
    register,
    logout,
  };
};
