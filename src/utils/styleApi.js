import axios from "./axiosCustomize";

const getListSytle = () => {
  return axios.get(`/Style`);
};
export { getListSytle };
