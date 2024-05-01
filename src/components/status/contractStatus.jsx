export const getStatusText = (status) => {
  switch (status) {
    case 1:
      return "Đang chờ xử lí";
    case 2:
      return "Đang chờ thanh toán";
    case 3:
      return "Đã thanh toán";
    case 4:
      return "Đang thực hiện nhiệm vụ";
    case 5:
      return "Thất bại";
    case 6:
      return "Đã hủy";
    case 7:
      return "Hoàn thành nhiệm vụ";
    case 8:
      return "Hoàn thành hợp đồng";
    case 9:
      return "Đã khiếu nại";
    case 10:
      return "Đang xử lý khiếu nại";
    case 11:
      return "Hoàn thành xử lý khiếu nại";
    case 12:
      return "Từ chối khiếu nại";
    default:
      return "Trạng thái không xác định";
  }
};

export const getStatusColor = (status) => {
  switch (status) {
    case 1:
      return "blue";
    case 2:
      return "blue";
    case 3:
      return "green";
    case 4:
      return "yellow";
    case 5:
      return "red";
    case 6:
      return "red";
    case 7:
      return "green";
    case 8:
      return "green";
    case 9:
      return "yellow";
    case 10:
      return "yellow";
    case 11:
      return "green";
    case 12:
      return "red";
  }
};
