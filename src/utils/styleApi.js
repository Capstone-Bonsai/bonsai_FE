import axios from "./axiosCustomize";

const getListSytle = () => {
  return axios.get(`/Style`);
};
const postStyle = (name) => {
  console.log(name);
  return axios.post(`/Style`, name);
};

const putStyle = (styleId, postData) => {
  console.log(postData, styleId);
  return axios.put(`/Style/${styleId}`, postData);
};

const deleteStyle = (styleId) => {
  try {
    console.log(styleId);
    return axios.delete(`/Style/${styleId}`);
  } catch (error) {
    console.log(error);
  }
};
export { getListSytle, postStyle, putStyle, deleteStyle };
