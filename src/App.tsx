import React from "react";
import "./App.css";
import { ProjectList } from "screens/project-list";
import { LoginScreen } from "./screens/login";

function App() {
  return (
    <div className="App">
      {/*<ProjectList />*/}
      <LoginScreen />
    </div>
  );
}

export default App;
