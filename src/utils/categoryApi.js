import axios from "./axiosCustomize";

const getListCategory = () => {
  return axios.get(`/Category`);
};

const postCategory = (name) => {
  console.log(name);
  return axios.post(`/Category`, name);
};

export { getListCategory, postCategory };
