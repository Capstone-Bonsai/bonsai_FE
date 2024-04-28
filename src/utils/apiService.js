import axios from "./axiosCustomize";

const postCreateNewUser = (postData) => {
  console.log(postData);
  return axios.post(`/User`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putUser = (userId, postData) => {
  console.log(postData);
  return axios.put(`/User/Id?id=${userId}`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const lockoutUser = (userId) => {
  console.log(userId);
  return axios.put(`/User/Lockout?userId=${userId}`);
};

const getListRole = () => {
  return axios.get(`/User/ListRole`);
};
const getListDeliveryFee = () => {
  return axios.get(`/DeliveryFee`);
};
const putListDeliveryFee = (postData) => {
  console.log(postData);
  return axios.put(`/DeliveryFee`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

// const postLoginGoogle = (tokenId, provider) => {
//   return axios.post(`/api/Auth/Login/Google`, {
//     provider: provider,
//     tokenId: tokenId,
//   });
// };
export {
  postCreateNewUser,
  getListRole,
  getListDeliveryFee,
  putListDeliveryFee,
  lockoutUser,
  putUser,
};

//$filter=TotalPrice eq 16800 and contains(Title,'')
