import axios from "./axiosCustomize";

const postCareStep = (postData) => {
  console.log(postData);
  return axios.post(`/CareStep`, postData);
};

const putCareStep = (careStepId, postData) => {
  console.log(postData, careStepId);
  return axios.put(`/CareStep/${careStepId}`, postData);
};

const deleteCareStep = (careStepId) => {
  try {
    console.log(careStepId);
    return axios.delete(`/CareStep/${careStepId}`);
  } catch (error) {
    console.log(error);
  }
};

export { postCareStep, putCareStep, deleteCareStep };
