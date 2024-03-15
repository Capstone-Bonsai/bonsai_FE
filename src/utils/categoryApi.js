import axios from "./axiosCustomize";

const getListCategory = () => {
  return axios.get(`/Category`);
};
export { getListCategory };
