export const getStatusDeliverySize = (status) => {
    switch (status) {
      case 1:
        return "Cỡ nhỏ";
      case 2:
        return "Cỡ vừa";
      case 3:
        return "Cỡ lớn";
      default:
        return "Trạng thái không xác định";
    }
  };