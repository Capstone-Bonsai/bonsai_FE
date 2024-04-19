import axios from "./axiosCustomize";

const putService = (serviceId, service) => {
  console.log(serviceId, service);
  return axios.put(`/Service/${serviceId}`, service, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const postService = (service) => {
  console.log(service);
  return axios.post(`/Service`, service, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteService = (serviceId) => {
  try {
    console.log(serviceId);
    return axios.delete(`/Service/${serviceId}`);
  } catch (error) {
    console.log(error);
  }
};

export { putService, postService, deleteService };
