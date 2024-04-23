import axios from "./axiosCustomize";

const putOrder = (orderId, orderStatus) => {
  console.log(orderId, orderStatus + 1);
  return axios.put(`/Order/${orderId}?orderStatus=${orderStatus + 1}`);
};

const addGardenerToOrder = (orderId, gardenerId) => {
  console.log(orderId, gardenerId);
  return axios.put(`/Order/AddGardener/${orderId}?gardenerId=${gardenerId}`);
};

const deleteOrder = (orderId) => {
  return axios.delete(`/Order/${orderId}`);
};

const getOrderStatus = () => {
  return axios.get(`/Order/OrderStatus`);
};

export { putOrder, getOrderStatus, deleteOrder, addGardenerToOrder };
