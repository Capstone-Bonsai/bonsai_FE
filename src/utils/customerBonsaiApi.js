import axios from "./axiosCustomize";

const putCustomerBonsai = (bonsaiId, postData) => {
  console.log(postData, bonsaiId);
  return axios.put(`/CustomerBonsai/${bonsaiId}`, postData);
};

export { putCustomerBonsai };
