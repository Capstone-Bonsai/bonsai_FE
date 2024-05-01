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
import { allCategory } from "../../../redux/slice/categorySlice";
import { allStyle } from "../../../redux/slice/styleSlice";
import { putCustomerBonsai } from "../../../utils/customerBonsaiApi";
import { toast } from "react-toastify";
function CustomerBonsaiDetail(propsBonsaiDetail) {
  const { setBonsaiDetail, bonsaiId } = propsBonsaiDetail;
  console.log(bonsaiId);
  const [loading, setFetchBonsaiDetail] = useState(false);
  const dispatch = useDispatch();
  const [fetchData, setFetchData] = useState(false);
  const [file, setFile] = useState([]);
  const [listImage, setListImage] = useState([]);
  console.log(listImage);

  const [formData, setFormData] = useState({
    CategoryId: "",
    StyleId: "",
    Name: "",
    Description: "",
    YearOfPlanting: 0,
    TrunkDimenter: 0,
    Height: 0,
    NumberOfTrunk: 0,
    DeliverySize: 0,
    OldImage: [],
    Image: [],
  });

  //validate
  const [errorMess, setErrorMess] = useState("");
  const [nameError, setNameError] = useState("");
  const [desError, setDesError] = useState("");
  const [yopError, setYopError] = useState("");
  const [trunkDemError, setTrunkDemError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [numTrunkError, setNumTrunkError] = useState("");

  const [validateMessage, setValidateMessage] = useState({});
  console.log(formData);
  console.log(validateMessage);

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

  useEffect(() => {
    dispatch(allCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(allStyle());
  }, [dispatch]);

  const bonsaiDetailById = useSelector(
    (state) => state?.garden?.bonsaiInGarden
  );
  const fetchListImage = () => {
    const image = bonsaiDetailById?.bonsai?.bonsaiImages?.map(
      (bonsaiImage) => ({
        url: bonsaiImage.imageUrl,
      })
    );
    setListImage(image);
  };
  useEffect(() => {
    fetchListImage();
    setFile([]);
  }, [bonsaiDetailById]);
  const allCategories = useSelector(
    (state) => state.category?.allCategoryDTO?.items
  );
  const allStyles = useSelector((state) => state.style?.allStyleDTO?.items);
  const prevAddress = bonsaiDetailById?.customerGarden?.address;
  const gardenOfBonsaiId = bonsaiDetailById?.customerGardenId;
  console.log(bonsaiDetailById);
  useEffect(() => {
    if (bonsaiDetailById != undefined) {
      console.log(bonsaiDetailById);
      setFormData({
        CategoryId: bonsaiDetailById?.bonsai?.categoryId,
        StyleId: bonsaiDetailById?.bonsai?.styleId,
        Name: bonsaiDetailById?.bonsai?.name,
        Description: bonsaiDetailById?.bonsai?.description,
        YearOfPlanting: bonsaiDetailById?.bonsai?.yearOfPlanting,
        TrunkDimenter: bonsaiDetailById?.bonsai?.trunkDimenter,
        Height: bonsaiDetailById?.bonsai?.height,
        NumberOfTrunk: bonsaiDetailById?.bonsai?.numberOfTrunk,
        DeliverySize: bonsaiDetailById?.bonsai?.deliverySize,
      });
    }
  }, [bonsaiDetailById]);

  const handleAddImage = (e) => {
    const files = e.target.files;
    const updatedListImage = [...listImage];
    const updatedFile = [...file];
    for (let i = 0; i < files.length; i++) {
      const newFile = files[i];
      const imageURL = URL.createObjectURL(newFile);
      updatedListImage.push({ url: imageURL });
      updatedFile.push(newFile);
    }
    setListImage(updatedListImage);
    setFile(updatedFile);
    // updateOldImages(updatedListImage);
    e.target.value = null;
  };
  const handleUploadClick = () => {
    document.getElementById("upload-bonsai-detail-image").click();
  };
  const handleRemoveImage = (index) => {
    const updatedList = [...listImage];
    updatedList.splice(index, 1);
    setListImage(updatedList);

    const updatedFile = [...file];
    updatedFile.splice(index, 1);
    setFile(updatedFile);
    // updateOldImages(updatedList);
  };
  const updateBonsai = (data) => {
    try {
      console.log(data);
      putCustomerBonsai(bonsaiId, data)
        .then((data) => {
          toast.success("Cập nhật thành công!");
          dispatch(getBonsaiInGarden(bonsaiId));
        })
        .catch((err) => {
          console.error(err);
          toast.error(err.response.data);
        })
        .finally(() => {
          setFetchBonsaiDetail(false);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const onSubmit = () => {
    let isValid = true;
    if (!formData.Name.trim()) {
      setNameError("Tên không được bỏ trống!!");
      isValid = false;
    }
    if (!formData.Description) {
      setDesError("Mô tả không được bỏ trống!!");
      isValid = false;
    }
    if (formData.Description?.length > 2000) {
      setDesError("Mô tả phải ít hơn 2000!!");
      isValid = false;
    }
    if (!formData.YearOfPlanting) {
      setYopError("Năm trồng không được bỏ trống!!");
      isValid = false;
    }
    if (!formData.TrunkDimenter) {
      setTrunkDemError("Hoành cây không được bỏ trống!!");
      isValid = false;
    }
    if (!formData.Height) {
      setHeightError("Chiều cao không được bỏ trống!!");
      isValid = false;
    }
    if (formData.Height == 0) {
      setHeightError("Chiều cao phải lớn hơn 0!!");
      isValid = false;
    }
    if (!formData.NumberOfTrunk) {
      setNumTrunkError("Số thân không được bỏ trống!!");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    formData.Image = listImage?.map((image) => image);
    const postData = new FormData();
    postData.append("CategoryId", formData.CategoryId);
    postData.append("StyleId", formData.StyleId);
    postData.append("Name", formData.Name);
    postData.append("Description", formData.Description);
    postData.append("YearOfPlanting", formData.YearOfPlanting);
    postData.append("TrunkDimenter", formData.TrunkDimenter);
    postData.append("Height", formData.Height);
    postData.append("NumberOfTrunk", formData.NumberOfTrunk);
    listImage
      ?.filter((image) => image.url.startsWith("https"))
      ?.map((image) => {
        postData.append(`OldImage`, image.url);
      });
    file?.map((imageFile) => {
      postData.append(`Image`, imageFile);
    });
    console.log(formData);
    setFetchBonsaiDetail(true);
    updateBonsai(postData)
      .then(() => {
        setFetchBonsaiDetail(false);
      })
      .catch((error) => {
        // Handle error
        console.error("Error updating bonsai:", error);
      })
      .finally(() => {
        setFetchBonsaiDetail(false);
      });
  };
  const handleChangeYop = (e) => {
    const yop = e.target.value;
    if (yop > 0) {
      setFormData({ ...formData, YearOfPlanting: yop });
      setYopError("");
    } else {
      setYopError("Giá trị phải lớn hơn 0");
      e.target.value = null;
      setFormData({ ...formData, YearOfPlanting: e.target.value });
    }
  };
  const handleChangeTrunkDem = (e) => {
    const trunkDem = e.target.value;
    if (trunkDem > 0) {
      setFormData({ ...formData, TrunkDimenter: trunkDem });
      setTrunkDemError("");
    } else {
      setTrunkDemError("Giá trị phải lớn hơn 0");
      e.target.value = null;
      setFormData({ ...formData, TrunkDimenter: e.target.value });
    }
  };
  const handleChangeHeight = (e) => {
    const height = e.target.value;
    if (height >= 0) {
      setFormData({ ...formData, Height: height });
      setHeightError("");
    } else {
      setHeightError("Giá trị phải lớn hơn 0");
      e.target.value = null;
      setFormData({ ...formData, Height: e.target.value });
    }
  };
  const handleChangeNumTrunk = (e) => {
    const numTrunk = e.target.value;
    if (numTrunk > 0) {
      setFormData({ ...formData, NumberOfTrunk: numTrunk });
      setNumTrunkError("");
    } else {
      setNumTrunkError("Giá trị phải lớn hơn 0");
      e.target.value = null;
      setFormData({ ...formData, NumberOfTrunk: e.target.value });
    }
  };
  const propsModalMove = {
    bonsaiId,
    prevAddress,
    gardenOfBonsaiId,
    setFetchBonsaiDetail,
    setFetchData,
    fetchData,
  };

  return (
    <div className="mt-3">
      <button
        className="text-[20px] ml-5 w-[30px] h-[30px] rounded-full hover:bg-[#3a9943] hover:text-[#fff] flex items-center justify-center"
        onClick={() => setBonsaiDetail(false)}
      >
        <ArrowLeftOutlined />
      </button>
      {loading ? (
        <Loading loading={loading} isRelative={true} />
      ) : (
        <>
          <div className="w-[95%] m-auto">
            {/* <div>
              <div className="font-bold text-[20px]">
                {bonsaiDetailById?.bonsai?.name}
              </div>
              <div>
                Code: <input value={bonsaiDetailById?.bonsai?.code} />
              </div>
              <div>Năm trồng: {bonsaiDetailById?.bonsai?.yearOfPlanting}</div>
              <div>
                 Hoành cây: {bonsaiDetailById?.bonsai?.trunkDimenter}
              </div>
              <div>Chiều cao: {bonsaiDetailById?.bonsai?.height}</div>
              <div>Số thân: {bonsaiDetailById?.bonsai?.numberOfTrunk}</div>
            </div> */}
            <div className="font-bold text-[20px] flex items-center my-2">
              <div className="font-normal">Tên: </div>
              <input
                className="border p-2 outline-none rounded-[8px]"
                value={formData.Name}
                onChange={(e) => {
                  setFormData({ ...formData, Name: e.target.value }),
                    setNameError("");
                }}
              />
            </div>
            {nameError && (
              <div className="text-[red] text-[14px]">{nameError}</div>
            )}
            <div className="flex items-center gap-2">
              <div>Địa chỉ: </div>
              <div className="w-[70%]">
                {bonsaiDetailById?.customerGarden?.address}
              </div>
              <div>
                <button
                  className="outline-none bg-[#3a9943] text-[#fff] p-2 rounded-[8px]"
                  onClick={() =>
                    document.getElementById("modal_move_bonsai").showModal()
                  }
                >
                  Đổi vườn
                </button>
                <ModalMoveBonsai {...propsModalMove} />
              </div>
            </div>
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-start">Loại cây:</div>
              <select
                className="border outline-none p-3 rounded-[8px]"
                value={formData.CategoryId}
                style={{ width: "50%" }}
                onChange={(e) =>
                  setFormData({ ...formData, CategoryId: e.target.value })
                }
              >
                {allCategories?.map((category, index) => (
                  <option value={category.id} key={index}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-start">Dáng cây:</div>
              <select
                className="border outline-none p-3 rounded-[8px]"
                value={formData.StyleId}
                style={{ width: "50%" }}
                onChange={(e) =>
                  setFormData({ ...formData, StyleId: e.target.value })
                }
              >
                {allStyles?.map((style, index) => (
                  <option value={style.id} key={index}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-[16px]">
              <div>Mô tả: </div>
              <textarea
                className="w-full h-[150px] border outline-none p-2"
                value={formData.Description}
                onChange={(e) => {
                  setFormData({ ...formData, Description: e.target.value }),
                    setDesError("");
                }}
              />
            </div>
            {desError && (
              <div className="text-[red] text-[14px]">{desError}</div>
            )}
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-start">Năm trồng: </div>
              <input
                type="number"
                className="w-[40%] border outline-none p-2 rounded-[8px]"
                value={formData.YearOfPlanting}
                onChange={handleChangeYop}
              />
            </div>
            {yopError && (
              <div className="text-[red] text-[14px]">{yopError}</div>
            )}
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-start">Hoành cây(cm): </div>
              <input
                type="number"
                className="w-[40%] border outline-none p-2 rounded-[8px]"
                value={formData.TrunkDimenter}
                onChange={handleChangeTrunkDem}
              />
            </div>
            {trunkDemError && (
              <div className="text-[red] text-[14px]">{trunkDemError}</div>
            )}
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-start">Chiều cao(m): </div>
              <input
                type="number"
                className="w-[40%] border outline-none p-2 rounded-[8px]"
                value={formData.Height}
                onChange={handleChangeHeight}
              />
            </div>
            {heightError && (
              <div className="text-[red] text-[14px]">{heightError}</div>
            )}
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-start">Số thân: </div>
              <input
                className="w-[40%] border outline-none p-2 rounded-[8px]"
                value={formData.NumberOfTrunk}
                onChange={handleChangeNumTrunk}
              />
            </div>
            {numTrunkError && (
              <div className="text-[red] text-[14px]">{numTrunkError}</div>
            )}
            <div className="">
              {listImage?.length >= 0 ? (
                <div className="">
                  <div className="flex gap-5 flex-wrap py-3">
                    {listImage?.map((image, index) => (
                      <div
                        className="relative rounded-[10px] w-[220px] h-[220px]"
                        key={index}
                      >
                        <img
                          className="object-cover w-full h-full"
                          src={image?.url}
                          alt=""
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-0 right-2 text-[#f2f2f2] text-[30px] hover:text-[#3a9943]"
                        >
                          <CloseCircleOutlined />
                        </button>
                      </div>
                    ))}
                  </div>
                  {formData?.DeliverySize == null ? (
                    <>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={handleAddImage}
                          id="upload-bonsai-detail-image"
                        />
                      </div>
                      {listImage?.length < 4 ? (
                        <button
                          onClick={handleUploadClick}
                          className="border p-1 rounded-lg my-5 outline-none"
                        >
                          <UploadOutlined />
                          Thêm hình ảnh
                        </button>
                      ) : (
                        "Bạn chỉ có thể thêm tối đa 4 ảnh"
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {formData?.DeliverySize == null ? (
            <div className="m-2 flex justify-end">
              <button
                className="outline-none bg-[#3a9943] text-[#fff] border hover:border-[green] p-2 rounded-[8px]"
                onClick={onSubmit}
              >
                Cập nhật
              </button>
            </div>
          ) : (
            ""
          )}
        </>
      )}
    </div>
  );
}

export default CustomerBonsaiDetail;
