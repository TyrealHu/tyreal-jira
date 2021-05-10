import * as qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

interface TFetchConfig extends RequestInit {
  data?: object;
  token?: string;
}

export const tFetch = (
  endpoint: string,
  { data, token, headers, ...otherConfig }: TFetchConfig = {}
) => {
  const config = {
    method: otherConfig.method ? otherConfig.method : "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-type": data ? "application/json" : "",
      ...headers,
    },
    ...otherConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    if (data) {
      endpoint = `${endpoint}?${qs.stringify(data)}`;
    }
  } else {
    config.body = JSON.stringify(data ? data : {});
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useTFetch = () => {
  const { user } = useAuth();
  return (...[endpoint, config]: Parameters<typeof tFetch>) =>
    tFetch(endpoint, { ...config, token: user?.token });
};
