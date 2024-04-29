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

  const validateForm = () => {
    const errors = {};

    const categoryIdRegex = /^\d+$/;
    const styleIdRegex = /^\d+$/;
    const nameRegex = /^[\p{L}\p{N}_\- ]{1,100}$/;
    const descriptionRegex = /^[\p{L}\p{N}_\- ]{1,100}$/;
    const yearOfPlantingRegex = /^\d+$/;
    const heightRegex = /^\d+$/;
    const trunkDiameterRegex = /^\d+$/;
    const numberOfTrunkRegex = /^\d+$/;

    if (!categoryIdRegex.test(formData.CategoryId)) {
      errors.CategoryId = "Vui lòng chọn loại cây!";
    }

    if (!styleIdRegex.test(formData.StyleId)) {
      errors.StyleId = "Vui lòng chọn phân loại!";
    }

    if (!nameRegex.test(formData.Name)) {
      errors.Name = "Invalid Name (letters, numbers, spaces, - or _)";
    }

    if (!descriptionRegex.test(formData.Description)) {
      errors.Description = "Invalid Description (various characters allowed)";
    }

    if (!yearOfPlantingRegex.test(formData.YearOfPlanting)) {
      errors.YearOfPlanting = "Invalid Year of Planting (numbers only)";
    }

    if (!heightRegex.test(formData.Height)) {
      errors.Height = "Invalid Height (positive number, max 2 decimals)";
    }

    if (!trunkDiameterRegex.test(formData.TrunkDiameter)) {
      errors.TrunkDiameter =
        "Invalid Trunk Diameter (positive number, max 2 decimals)";
    }

    if (!numberOfTrunkRegex.test(formData.NumberOfTrunk)) {
      errors.NumberOfTrunk =
        "Invalid NumberOfTrunk (positive number, max 2 decimals)";
    }

    // Kiểm tra các field khác nếu cần (OldImage, Image)
    if (errors != {}) {
      console.log(errors != {});
      setValidateMessage(errors);
    }
    return errors;
  };
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
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Đã xảy ra sự cố!");
        })
        .finally(() => {
          setConfirmLoading(false);
          setFormDisabled(false);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const onSubmit = (i) => {
    // formData.Image = listImage?.map((image) => image);
    // const postData = new FormData();
    // postData.append("CategoryId", formData.CategoryId);
    // postData.append("StyleId", formData.StyleId);
    // postData.append("Name", formData.Name);
    // postData.append("Description", formData.Description);
    // postData.append("YearOfPlanting", formData.YearOfPlanting);
    // postData.append("TrunkDimenter", formData.TrunkDimenter);
    // postData.append("Height", formData.Height);
    // postData.append("NumberOfTrunk", formData.NumberOfTrunk);
    // postData.append("Price", formData.Price);
    // formData.Image?.map((image) =>
    //   image.originFileObj
    //     ? postData.append("Image", image.originFileObj)
    //     : postData.append("OldImage", image.url)
    // );
    // console.log(formData);

    if (validateForm != {}) {
      console.log(true);
      updateBonsai(postData);
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
          <div className="w-[75%] m-auto">
            {/* <div>
              <div className="font-bold text-[20px]">
                {bonsaiDetailById?.bonsai?.name}
              </div>
              <div>
                Code: <input value={bonsaiDetailById?.bonsai?.code} />
              </div>
              <div>Năm trồng: {bonsaiDetailById?.bonsai?.yearOfPlanting}</div>
              <div>
                Kích thước thân: {bonsaiDetailById?.bonsai?.trunkDimenter}
              </div>
              <div>Chiều cao: {bonsaiDetailById?.bonsai?.height}</div>
              <div>Số thân: {bonsaiDetailById?.bonsai?.numberOfTrunk}</div>
            </div> */}
            <div className="font-bold text-[20px] flex justify-center my-2">
              <input
                className="border p-2 outline-none rounded-[8px]"
                value={formData.Name}
                onChange={(e) =>
                  setFormData({ ...formData, Name: e.target.value })
                }
              />
            </div>
            <div className="text-[16px] flex items-center gap-3 my-2">
              <div className="w-[10%] text-end">Loại cây:</div>
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
            <div className="text-[16px] flex gap-3 items-center my-2">
              <div className="w-[10%] text-end">Dáng cây:</div>
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
                onChange={(e) =>
                  setFormData({ ...formData, Description: e.target.value })
                }
              />
            </div>

            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-end">Năm trồng: </div>
              <input
                className="w-[40%] border outline-none p-2 rounded-[8px]"
                value={formData.YearOfPlanting}
                onChange={(e) =>
                  setFormData({ ...formData, YearOfPlanting: e.target.value })
                }
              />
            </div>
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-end">Hoành cây: </div>
              <input
                className="w-[40%] border outline-none p-2 rounded-[8px]"
                value={formData.TrunkDimenter}
                onChange={(e) =>
                  setFormData({ ...formData, TrunkDimenter: e.target.value })
                }
              />
            </div>
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-end">Chiều cao: </div>
              <input
                className="w-[40%] border outline-none p-2 rounded-[8px]"
                value={formData.Height}
                onChange={(e) =>
                  setFormData({ ...formData, Height: e.target.value })
                }
              />
            </div>
            <div className="text-[16px] flex items-center my-2">
              <div className="w-[20%] text-end">Số thân: </div>
              <input
                className="w-[40%] border outline-none p-2 rounded-[8px]"
                value={formData.NumberOfTrunk}
                onChange={(e) =>
                  setFormData({ ...formData, NumberOfTrunk: e.target.value })
                }
              />
            </div>
            <div className="">
              {listImage?.length > 0 ? (
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
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <button
              className="outline-none bg-[#3a9943] text-[#fff] border hover:border-[green] p-2 rounded-[8px]"
              onClick={onSubmit}
            >
              Cập nhật
            </button>
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
