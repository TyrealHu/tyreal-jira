import { useCallback, useReducer, useState } from "react";
import { useMountedRef } from "./index";

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

const defaultConfig = {
  throwOnError: false,
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef();

  return useCallback(
    (...args: T[]) => (mountedRef.current ? dispatch(...args) : undefined),
    [dispatch, mountedRef]
  );
};

export const useAsync = <T>(
  initState?: State<T>,
  initConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initConfig };

  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    {
      ...defaultState,
      ...initState,
    }
  );

  const [retry, setRetry] = useState(() => () => {});

  const safeDispatch = useSafeDispatch(dispatch);

  const setData = useCallback(
    (data: T) =>
      safeDispatch({
        data,
        error: null,
        state: "success",
      }),
    [safeDispatch]
  );

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        data: null,
        state: "error",
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise对象");
      }
      safeDispatch({ state: "loading" });
      setRetry(() => () => {
        if (runConfig) {
          run(runConfig.retry(), runConfig);
        }
      });
      return promise
        .then((data) => {
          setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          if (config.throwOnError) {
            return Promise.reject(error);
          }
          return error;
        });
    },
    [config.throwOnError, setData, setError, safeDispatch]
  );

  return {
    isIdle: state.state === "idle",
    isLoading: state.state === "loading",
    isSuccess: state.state === "success",
    isError: state.state === "error",
    run,
    retry,
    setData,
    setError,
    ...state,
  };
};
