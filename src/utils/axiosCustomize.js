import axios from "axios";
import NProgress from "nprogress";

const instance = axios.create({
  baseURL: "https://capstoneb.azurewebsites.net/api/",
});

instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    // const token = store?.getState()?.account?.user?.token;
    // config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function (error) {
    NProgress.done();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    return response;
  },
  function (error) {
    NProgress.done();
    return Promise.reject(error);
  }
);
export default instance;

// headers: {
//   'Content-Type': 'application/json',
//   'Authorization': 'Bearer ' + token,
// },
