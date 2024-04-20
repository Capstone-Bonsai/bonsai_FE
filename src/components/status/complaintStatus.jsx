export const getComplaintStatusText = (status) => {
  switch (status) {
    case 1:
      return "Yêu cầu";
    case 2:
      return "Đang xử lý";
    case 3:
      return "Đã hủy";
    case 4:
      return "Đã hoàn thành";
    default:
      return "Trạng thái không xác định";
  }
};
