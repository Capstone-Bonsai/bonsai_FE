import axios from "./axiosCustomize";

const putServiceType = (serviceTypeId, serviceType) => {
  console.log(serviceTypeId, serviceType);
  return axios.put(`/ServiceType/${serviceTypeId}`, serviceType, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { putServiceType };
