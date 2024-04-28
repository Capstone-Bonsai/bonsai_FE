import React, { useEffect, useState } from "react";
import {
  UploadOutlined,
  CloseCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getBonsaiInGarden } from "../../../redux/slice/userGarden";
import { Carousel } from "antd";
import noImage from "../../../assets/unImage.png";
import ModalMoveBonsai from "./ModalMoveBonsai";
import Loading from "../../../components/Loading";
function CustomerBonsaiDetail(propsBonsaiDetail) {
  const { setBonsaiDetail, bonsaiId } = propsBonsaiDetail;
  console.log(bonsaiId);
  const [loading, setFetchBonsaiDetail] = useState(false);
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState(false);
  const fetchDataAfterMove = () => {
    console.log("Fetching data after moving bonsai...");
    dispatch(getBonsaiInGarden(bonsaiId));
  };
  useEffect(() => {
    setFetchBonsaiDetail(true);
    dispatch(getBonsaiInGarden(bonsaiId))
      .then(() => {
        setFetchBonsaiDetail(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setFetchBonsaiDetail(false);
      });
  }, [bonsaiId, fetchData]);

  const bonsaiDetailById = useSelector(
    (state) => state?.garden?.bonsaiInGarden
  );
  const prevAddress = bonsaiDetailById?.customerGarden?.address;
  const gardenOfBonsaiId = bonsaiDetailById?.customerGarden;
  const propsModalMove = {
    bonsaiId,
    prevAddress,
    gardenOfBonsaiId,
    setFetchBonsaiDetail,
    fetchDataAfterMove,
    setFetchData,
    fetchData
  };

  return (
    <div>
      <button className="m-3" onClick={() => setBonsaiDetail(false)}>
        <ArrowLeftOutlined />
      </button>
      {loading ? (
        <Loading loading={loading} isRelative={true} />
      ) : (
        <>
          <div className="flex gap-5 w-[75%] m-auto">
            <div className="">
              {bonsaiDetailById?.bonsai?.bonsaiImages?.length > 0 ? (
                <div className="">
                  <Carousel autoplay className="">
                    {bonsaiDetailById?.bonsai?.bonsaiImages?.map((image) => (
                      <div className="w-[300px] h-[300px]" key={image?.id}>
                        <img
                          width="100%"
                          height="100%"
                          className="object-cover"
                          src={image?.imageUrl}
                          alt=""
                        />
                      </div>
                    ))}
                  </Carousel>
                </div>
              ) : (
                <div className="w-[300px] h-[300px]">
                  <img src={noImage} alt="" />
                </div>
              )}
            </div>
            <div>
              <div className="font-bold text-[20px]">
                {bonsaiDetailById?.bonsai?.name}
              </div>
              <div>Code: {bonsaiDetailById?.bonsai?.code}</div>
              <div>Năm trồng: {bonsaiDetailById?.bonsai?.yearOfPlanting}</div>
              <div>
                Kích thước thân: {bonsaiDetailById?.bonsai?.trunkDimenter}
              </div>
              <div>Chiều cao: {bonsaiDetailById?.bonsai?.height}</div>
              <div>Số thân: {bonsaiDetailById?.bonsai?.numberOfTrunk}</div>
            </div>
          </div>
          <div>
            <button
              className="outline-none"
              onClick={() =>
                document.getElementById("modal_move_bonsai").showModal()
              }
            >
              Đổi vườn
            </button>
            <ModalMoveBonsai {...propsModalMove} />
          </div>
        </>
      )}
    </div>
  );
}

export default CustomerBonsaiDetail;
