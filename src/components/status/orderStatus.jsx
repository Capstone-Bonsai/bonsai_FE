export const getOrderStatusText = (status) => {
  switch (status) {
    case "Waiting":
      return "Đang chờ";
    case "Paid":
      return "Đã thanh toán";
    case "Preparing":
      return "Đang chuẩn bị";
    case "Delivering":
      return "Đang giao hàng";
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

export const getOrderStatusNumber = (status) => {
  switch (status) {
    case 1:
      return "Đang chờ";
    case 2:
      return "Đã thanh toán";
    case 3:
      return "Đang chuẩn bị";
    case 4:
      return "Đang giao hàng";
    case 6:
      return "Thất bại";
    case 7:
      return "Giao hàng thất bại";
    case 5:
      return "Đã giao";
    default:
      return "Trạng thái không xác định";
  }
};
