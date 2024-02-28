export const handleError = (error) => {
  if (typeof error === "string") {
    return [error];
  } else if (Array.isArray(error)) {
    return error;
  } else if (typeof error === "object" && error.message) {
    return [error.message];
  } else {
    return ["Đã xảy ra lỗi không xác định"];
  }
};
