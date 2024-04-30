import axios from "./axiosCustomize";

const postBonsai = (postData) => {
  console.log(postData);
  return axios.post(`/Bonsai`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putBonsai = (bonsaiId, postData) => {
  console.log(postData, bonsaiId);
  return axios.put(`/Bonsai/${bonsaiId}`, postData);
};

const deleteBonsai = (bonsaiId) => {
  try {
    console.log(bonsaiId);
    return axios.delete(`/Bonsai/${bonsaiId}`);
  } catch (error) {
    console.log(error);
  }
};

const disableBonsai = (bonsaiId) => {
  try {
    console.log(bonsaiId);
    return axios.put(`/Bonsai/Disable?bonsaiId=${bonsaiId}`);
  } catch (error) {
    console.log(error);
  }
};

export { deleteBonsai, putBonsai, postBonsai, disableBonsai };
