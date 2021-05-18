import { useCallback, useState } from "react";
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

export const useAsync = <T>(
  initState?: State<T>,
  initConfig?: typeof defaultConfig
) => {
  const config = { ...defaultConfig, ...initConfig };

  const [state, setState] = useState({
    ...defaultState,
    ...initState,
  });

  const [retry, setRetry] = useState(() => () => {});

  const mountedRef = useMountedRef();

  const setData = useCallback(
    (data: T) =>
      setState({
        data,
        error: null,
        state: "success",
      }),
    []
  );

  const setError = useCallback(
    (error: Error) =>
      setState({
        error,
        data: null,
        state: "error",
      }),
    []
  );

  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入promise对象");
      }
      setState((prevState) => ({ ...prevState, state: "loading" }));
      setRetry(() => () => {
        if (runConfig) {
          run(runConfig.retry(), runConfig);
        }
      });
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
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
    [config.throwOnError, mountedRef, setData, setError]
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
