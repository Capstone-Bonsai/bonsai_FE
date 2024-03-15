import axios from "./axiosCustomize";

const getListSytle = () => {
  return axios.get(`/Style`);
};
const postStyle = (name) => {
  console.log(name);
  return axios.post(`/Style`, name);
};
export { getListSytle, postStyle };
