import axios from "./axiosCustomize";

const postServieOrderImages = (serviceOrderId, postData) => {
  console.log(postData, serviceOrderId);
  return axios.post(`/ServiceOrder/Image/${serviceOrderId}`, postData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const putServieOrderPrice = (serviceOrderId, postData) => {
  console.log(postData, serviceOrderId);
  return axios.put(`/ServiceOrder/Update/${serviceOrderId}`, {
    startDate: postData?.dateTimePicker[0].format("YYYY-MM-DD"),
    endDate: postData?.dateTimePicker[1].format("YYYY-MM-DD"),
    totalPrice: postData?.totalPrice,
  });
};

const putServiceOrderStatus = (serviceOrderId) => {
  console.log(serviceOrderId);
  return axios.put(`/ServiceOrder/${serviceOrderId}?serviceOrderStatus=8`);
};

export { postServieOrderImages, putServiceOrderStatus, putServieOrderPrice };
