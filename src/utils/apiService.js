import axios from "./axiosCustomize";

const postCreateNewUser = (postData) => {
  console.log(postData);
  return axios.post(`/User`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const getListRole = () => {
  return axios.get(`/User/ListRole`);
};
const getListDeliveryFee = () => {
  return axios.get(`/DeliveryFee`);
};

// const postLoginGoogle = (tokenId, provider) => {
//   return axios.post(`/api/Auth/Login/Google`, {
//     provider: provider,
//     tokenId: tokenId,
//   });
// };
export { postCreateNewUser, getListRole, getListDeliveryFee };

//$filter=TotalPrice eq 16800 and contains(Title,'')
