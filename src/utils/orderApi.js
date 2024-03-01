import axios from "./axiosCustomize";

const putOrder = (orderId, orderStatus) => {
  console.log(orderId, orderStatus);
  return axios.put(`/Order/${orderId}?orderStatus=${orderStatus}`);
};

const getOrderStatus = () => {
  return axios.get(`/Order/OrderStatus`);
};

export { putOrder, getOrderStatus };
