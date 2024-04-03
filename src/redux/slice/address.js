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
    return res.data;
  } catch (err) {
    const errMessage = err.response;
    console.log(errMessage);
    throw (err, errMessage);
  }
};

export const getDistrict = async ({ provinceId }) => {
  try {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=${provinceId}`,
      {
        headers: {
          token: "42a5d752-eb2e-11ee-b1d4-92b443b7a897",
        },
      }
    );
    return res.data;
  } catch (err) {
    const errMessage = err.response;
    console.log(errMessage);
    throw (err, errMessage);
  }
};

export const getWard = async ({ districtId }) => {
  try {
    const res = await axios.get(
      `https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=${districtId}`,
      {
        headers: {
          token: "42a5d752-eb2e-11ee-b1d4-92b443b7a897",
        },
      }
    );
    return res.data;
  } catch (err) {
    const errMessage = err.response;
    console.log(errMessage);
    throw (err, errMessage);
  }
};
