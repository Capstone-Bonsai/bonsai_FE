import axios from "axios";
import NProgress from "nprogress";
import Cookies from "universal-cookie";

const instance = axios.create({
  baseURL: "https://capstoneb.azurewebsites.net/api/",
});
const cookies = new Cookies();

instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    const user = cookies.get("user");

    const token = user?.token;
    config.headers["Authorization"] = `Bearer ${token}`;
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
