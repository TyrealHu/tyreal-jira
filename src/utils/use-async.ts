import { useState } from "react";

interface State<T> {
  error: null | Error;
  data: T | null;
  state: "idle" | "loading" | "success" | "error";
}

const defaultState: State<null> = {
  data: null,
  error: null,
  state: "idle",
};

export const useAsync = <T>(initState?: State<T>) => {
  const [state, setState] = useState({
    ...defaultState,
    ...initState,
  });

  const setData = (data: T) => {
    setState({
      data,
      error: null,
      state: "success",
    });
  };

  const setError = (error: Error) => {
    setState({
      error,
      data: null,
      state: "error",
    });
  };

  const run = (promise: Promise<T>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入promise对象");
    }
    setState({ ...state, state: "loading" });
    promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.state === "idle",
    isLoading: state.state === "loading",
    isSuccess: state.state === "success",
    isError: state.state === "error",
    run,
    setData,
    setError,
    ...state,
  };
};
