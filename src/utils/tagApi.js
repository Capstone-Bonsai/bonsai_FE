import axios from "./axiosCustomize";

const getListTag = () => {
  return axios.get(`/Tag`);
};
export { getListTag };
