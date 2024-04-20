export const getOrderStatusText = (status) => {
  switch (status) {
    case "Waiting":
      return "Đang chờ";
    case "Paid":
      return "Đã thanh toán";
    case "Preparing":
      return "Đang thực hiện";
    case "Delivering":
      return "Đang giao";
    case "Failed":
      return "Thất bại";
    case "DeliveryFailed":
      return "Giao hàng thất bại";
    case "Delivered":
      return "Đã giao";
    default:
      return "Trạng thái không xác định";
  }
};