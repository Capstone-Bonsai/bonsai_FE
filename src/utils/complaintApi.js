import axios from "./axiosCustomize";

const putComplaint = (complaintId, postData) => {
  console.log(postData);
  return axios.put(`/Complaint`, {
    complaintId: complaintId,
    complaintStatus: postData?.complaintStatus,
    cancelReason: postData?.cancelReason,
  });
};

export { putComplaint };
