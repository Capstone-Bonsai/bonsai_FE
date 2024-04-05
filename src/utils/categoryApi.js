import axios from "./axiosCustomize";

const getListCategory = () => {
  return axios.get(`/Category`);
};

const postCategory = (name) => {
  console.log(name);
  return axios.post(`/Category`, name);
};

const putCategory = (categoryId, postData) => {
  console.log(postData, categoryId);
  return axios.put(`/Category/${categoryId}`, postData);
};

const deleteCategory = (categoryId) => {
  try {
    console.log(categoryId);
    return axios.delete(`/Category/${categoryId}`);
  } catch (error) {
    console.log(error);
  }
};

export { getListCategory, postCategory, putCategory, deleteCategory };
