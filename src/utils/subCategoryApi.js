import axios from "./axiosCustomize";

const getListSubCategory = () => {
  return axios.get(`/SubCategory`);
};
export { getListSubCategory };
