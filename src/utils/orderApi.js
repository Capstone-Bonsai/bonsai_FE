import axios from "./axiosCustomize";

const putOrder = (orderId, orderStatus) => {
  console.log(orderId, orderStatus + 1);
  return axios.put(`/Order/${orderId}?orderStatus=${orderStatus + 1}`);
};

const deleteOrder = (orderId) => {
  return axios.put(`/Order/${orderId}`);
};

const getOrderStatus = () => {
  return axios.get(`/Order/OrderStatus`);
};

export { putOrder, getOrderStatus, deleteOrder };
