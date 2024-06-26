import axios from "./axiosCustomize";

const postProduct = (postData) => {
  console.log(postData);
  return axios.post(`/Product`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putProduct = (productId, postData) => {
  console.log(postData, productId);
  return axios.put(`/Product/${productId}`, postData);
};

const deleteProduct = (productId) => {
  try {
    console.log(productId);
    return axios.delete(`/Product/${productId}`);
  } catch (error) {
    console.log(error);
  }
};

export { deleteProduct, postProduct, putProduct };
