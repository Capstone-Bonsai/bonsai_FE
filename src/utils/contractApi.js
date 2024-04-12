import axios from "./axiosCustomize";

const postContractImages = (contractId, postData) => {
  console.log(postData, contractId);
  return axios.post(`/Contract/Image/${contractId}`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { postContractImages };
