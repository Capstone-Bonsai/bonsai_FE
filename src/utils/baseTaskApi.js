import axios from "./axiosCustomize";

const postBaseTask = (postData) => {
  console.log(postData);
  return axios.post(`/BaseTask`, postData);
};

const putBaseTask = (baseTaskId, postData) => {
  console.log(postData, baseTaskId);
  return axios.put(`/BaseTask/${baseTaskId}`, postData);
};

const deleteBaseTask = (baseTaskId) => {
  try {
    console.log(baseTaskId);
    return axios.delete(`/BaseTask/${baseTaskId}`);
  } catch (error) {
    console.log(error);
  }
};

export { postBaseTask, putBaseTask, deleteBaseTask };
