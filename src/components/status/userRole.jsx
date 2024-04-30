export const getUserRole = (role) => {
  switch (role) {
    case "Customer":
      return "Khách hàng";
    case "Gardener":
      return "Người làm vườn";
    case "Staff":
      return "Nhân viên";
    case "Manager":
      return "Quản trị viên";
    default:
      return "Trạng thái không xác định";
  }
};
