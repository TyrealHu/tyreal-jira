import { useState } from "react";
import { LoginScreen } from "./login";
import { RegisterScreen } from "./register";

export const UnauthenticatedApp = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      {isLogin ? <LoginScreen /> : <RegisterScreen />}
      <button onClick={() => setIsLogin(!isLogin)}>
        {`切换${isLogin ? "注册" : "登录"}`}
      </button>
    </div>
  );
};
