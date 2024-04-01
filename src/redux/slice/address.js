import axios from "axios";

export const getProvince = async () => {
  try {
    const res = await axios.get(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
      {
        headers: {
          token: "42a5d752-eb2e-11ee-b1d4-92b443b7a897",
        },
      }
    );
    console.log(res.data);
    return res.data;
  } catch (err) {
    const errMessage = err.response;
    console.log(errMessage);
    throw (err, errMessage);
  }
};
