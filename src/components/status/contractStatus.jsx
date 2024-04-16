export const getStatusText = (status) => {
  switch (status) {
    case 1:
      return "Đang chờ";
    case 2:
      return "Đã thanh toán";
    case 3:
      return "Đang thực hiện nhiệm vụ";
    case 4:
      return "Thất bại";
    case 5:
      return "Đã hủy";
    case 6:
      return "Hoàn thành nhiệm vụ";
    case 7:
      return "Hoàn thành hợp đồng";
    case 8:
      return "Khiếu nại";
    case 9:
      return "Đang xử lý khiếu nại";
    case 10:
      return "Đã xử lý khiếu nại";
    case 11:
      return "Hoàn thành xử lý khiếu nại";
    default:
      return "Trạng thái không xác định";
  }
};
