import React from "react";
import "./App.css";
import { useAuth } from "./utils/use-auth";
import { AuthenticatedApp } from "./authenticated-app";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageError, FullPageLoading } from "./components/lib";
import { bootstrap } from "./store/auth.slice";
import { useAsync } from "./utils/use-async";
import { useMount } from "./utils";
import { useDispatch } from "react-redux";
import { User } from "./screens/project-list/search-panel";

function App() {
  const { user } = useAuth();

  const dispatch: (...args: unknown[]) => Promise<User> = useDispatch();

  const { run, isLoading, isIdle, isError, error } = useAsync();

  useMount(() => {
    run(dispatch(bootstrap));
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  if (isError) {
    return <FullPageError error={error} />;
  }

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
