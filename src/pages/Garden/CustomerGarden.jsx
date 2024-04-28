import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import NavbarUser from "../Auth/NavbarUser";
import { Carousel, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerGarden,
  fetchCustomerGarden,
  getBonsaiInGarden,
} from "../../redux/slice/userGarden";
import Loading from "../../components/Loading";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { CloseCircleOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import address from "../../assets/address.jpg";
import square from "../../assets/square.png";
import { allStyle } from "../../redux/slice/styleSlice";
import { allCategory } from "../../redux/slice/categorySlice";
import ModalBonsaiCustomer from "./ModalBonsaiCustomer";
import ModalBuyFromStore from "./ModalBuyFromStore";
import { bonsaiBought } from "../../redux/slice/bonsaiSlice";
import BonsaiInGarden from "./BonsaiInGarden";
import AddCustomerGarden from "./AddCustomerGarden";
import noGardener from "../../assets/noGardener.png";
import GardenDetail from "./GardenDetail";

function CustomerGarden() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const [gardenLoading, setGardenLoading] = useState(false);
  const boughtBonsai = useSelector((state) => state.bonsai.boughtBonsai?.items);
  const gardens = useSelector((state) => state.garden.gardenDTO?.items);

  useEffect(() => {
    dispatch(allCategory());
    dispatch(allStyle());
    dispatch(bonsaiBought());
    const payload = {
      pageIndex: pageIndex - 1,
      pageSize,
    };

    setLoading(true);
    dispatch(fetchCustomerGarden(payload))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, [pageIndex, gardenLoading]);
  const [file, setFile] = useState([]);
  // const handleImageChange = (e) => {
  //   const files = e.target.files;
  //   const updatedImageGarden = [...imageGarden];
  //   const updatedFiles = [...file];
  //   for (let i = 0; i < files.length; i++) {
  //     const newFile = files[i];
  //     const imageURL = URL.createObjectURL(newFile);
  //     updatedImageGarden.push({ file: newFile, imageURL });
  //     updatedFiles.push(newFile);
  //   }

  //   setImageGarden(updatedImageGarden);
  //   setFile(updatedFiles);
  // };
  // const handleUploadClick = () => {
  //   document.getElementById("upload-input").click();
  // };

  // const handleAddNewGarden = async () => {
  //   const formData = new FormData();
  //   formData.append("Address", newAddress);
  //   formData.append("Square", newSquare);
  //   imageGarden.map((image) => {
  //     formData.append(`Image`, image.file);
  //   });
  //   // setLoading(true);
  //   try {
  //     await addCustomerGarden(formData);
  //     setGardenLoading(!gardenLoading);
  //     setLoading(false);
  //     toast.success("Thêm vườn thành công thành Công");
  //   } catch (error) {
  //     toast.error("Thêm vườn không thành công", error);
  //   }
  // };
  // const handleRemoveImage = (index) => {
  //   const updatedImageGarden = [...imageGarden];
  //   updatedImageGarden.splice(index, 1);
  //   setImageGarden(updatedImageGarden);
  // };
  const handlePageChange = (page) => {
    setPageIndex(page);
  };
  const [resetGarden, setResetGarden] = useState(false);
  const [gardenDetail, setGardenDetail] = useState(false);
  const [selectedGardenId, setSelectedGardenId] = useState("");
  const { allStyleDTO } = useSelector((state) => state.style);
  const { allCategoryDTO } = useSelector((state) => state.category);
  const [bonsaiInGarden, setBonsaiInGarden] = useState("");
  const bonsaiData = useSelector(
    (state) => state.garden.bonsaiInGarden?.bonsai
  );
  const [loadingBonsai, setLoadingBonsai] = useState(false);

  const props = {
    gardens,
    allStyleDTO,
    allCategoryDTO,
    selectedGardenId,
    boughtBonsai,
    dispatch,
    bonsaiInGarden,
    bonsaiData,
    loadingBonsai,
    setGardenLoading,
    setResetGarden,
    gardenLoading,
  };

  const { totalItemsCount } = useSelector((state) => state.garden.gardenDTO);
  const handleBonsaiInGarden = (bonsaiInGardenId) => {
    try {
      setLoadingBonsai(true);
      dispatch(getBonsaiInGarden(bonsaiInGardenId)).then(() => {
        setLoadingBonsai(false);
      });
    } catch (error) {
      console.log("data error" + error);
    }
  };
  const propsDetail = {
    setGardenDetail,
    selectedGardenId,
  };
  return (
    <MinHeight>
      <>
        <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
          <NavbarUser />
          <div className=" border w-[75%] pt-5">
            {!gardenDetail ? (
              <>
                {loading ? (
                  <Loading loading={loading} isRelative={true} />
                ) : (
                  <>
                    <button
                      className="bg-[#f2f2f2] mx-5 text-black p-5 rounded-[5px] hover:bg-[#3A994A] hover:text-[#fff]"
                      onClick={() =>
                        document.getElementById("my_modal_1").showModal()
                      }
                    >
                      + Thêm vườn của bạn
                    </button>
                    {!gardens ? (
                      <div className="">
                        <img
                          className="w-[30%] m-auto my-5"
                          src={noGardener}
                          alt=""
                        />
                      </div>
                    ) : (
                      ""
                    )}
                    <AddCustomerGarden
                      setGardenLoading={setGardenLoading}
                      gardenLoading={gardenLoading}
                      setLoading={setLoading}
                      loading={loading}
                    />
                    {gardens?.map((garden) => (
                      <div key={garden.id} className="flex p-4 gap-10">
                        <div className=" h-[250px] w-[45%]">
                          <Carousel autoplay>
                            {garden.customerGardenImages.length > 0 ? (
                              <Carousel autoplay>
                                {garden.customerGardenImages.map(
                                  (imageGarden) => (
                                    <div key={imageGarden.id}>
                                      <img
                                        src={imageGarden.image}
                                        alt=""
                                        style={{
                                          width: "100%",
                                          height: "250px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                  )
                                )}
                              </Carousel>
                            ) : (
                              <img
                                src={noImage}
                                className="w-[400px] h-[250px] object-cover border"
                                style={{ backgroundPosition: "bottom" }}
                                alt="No Image"
                              />
                            )}
                          </Carousel>
                        </div>
                        <div className="border-b w-full border-[#3a9943]">
                          <div className="text-[22px] font-[500] flex items-center">
                            <img src={address} className="w-[50px]" alt="" />
                            {garden.address}
                          </div>
                          <div className="flex items-center">
                            <img src={square} className="w-[50px]" alt="" />
                            <span className="font-[400] opacity-50">
                              Diện tích:
                            </span>
                            {garden.square.toLocaleString("en")} m²
                          </div>
                          <div className="flex">
                            <div className="pr-2">Bonsai: </div>
                            <div className="text-start">
                              {garden.customerBonsais.length > 0 ? (
                                garden.customerBonsais.map(
                                  (cusBonsai, index) => (
                                    <div className="" key={cusBonsai.id}>
                                      <button
                                        className="pr-2 hover:text-[#3a9943] outline-none"
                                        onClick={() => {
                                          setBonsaiInGarden(cusBonsai.id);
                                          handleBonsaiInGarden(cusBonsai.id);
                                          document
                                            .getElementById("bonsai_in_garden")
                                            .showModal();
                                        }}
                                      >
                                        - {cusBonsai.bonsai.name}
                                      </button>
                                    </div>
                                  )
                                )
                              ) : (
                                <span className="opacity-70">
                                  Không có cây trong vườn
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-end">
                            <div className="dropdown">
                              <div
                                tabIndex={0}
                                role="button"
                                className="btn m-1"
                              >
                                Thêm cây vào vườn
                              </div>
                              <ul
                                tabIndex={0}
                                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                              >
                                <li>
                                  <button
                                    onClick={() => {
                                      setSelectedGardenId(garden.id);
                                      document
                                        .getElementById("my_modal_3")
                                        .showModal();
                                    }}
                                  >
                                    Cây của cửa hàng
                                  </button>
                                </li>
                                <li>
                                  <button
                                    onClick={() => {
                                      setSelectedGardenId(garden.id);
                                      document
                                        .getElementById("my_modal_2")
                                        .showModal();
                                    }}
                                  >
                                    Cây cá nhân
                                  </button>
                                </li>
                              </ul>
                            </div>
                            <BonsaiInGarden {...props} />
                            <ModalBuyFromStore {...props} />
                            <ModalBonsaiCustomer {...props} />
                          </div>
                          <div className="text-end ">
                            <button
                              onClick={() => {
                                setGardenDetail(true),
                                  setSelectedGardenId(garden.id);
                              }}
                              className="text-[14px] hover:text-[#3a9943]"
                            >
                              Xem chi tiết
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            ) : (
              <GardenDetail {...propsDetail} />
            )}
          </div>
        </div>
        {gardens && !gardenDetail ? (
          <Pagination
            current={pageIndex}
            pageSize={pageSize}
            total={totalItemsCount}
            onChange={handlePageChange}
            className="text-center mt-5"
          />
        ) : (
          ""
        )}
      </>
    </MinHeight>
  );
}

export default CustomerGarden;
