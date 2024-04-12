import axios from "./axiosCustomize";

const postContractImages = (contractId, postData) => {
  console.log(postData, contractId);
  return axios.post(`/Contract/Image/${contractId}`, postData);
};

export { postContractImages };
