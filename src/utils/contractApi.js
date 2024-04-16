import axios from "./axiosCustomize";

const postContractImages = (contractId, postData) => {
  console.log(postData, contractId);
  return axios.post(`/Contract/Image/${contractId}`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putContractStatus = (contractId) => {
  console.log(contractId);
  return axios.put(`/Contract/${contractId}?contractStatus=7`);
};

export { postContractImages, putContractStatus };
