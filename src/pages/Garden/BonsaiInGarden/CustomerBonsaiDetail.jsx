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
  const [formData, setFormData] = useState({
    CategoryId: "",
    StyleId: "",
    Name: "",
    Description: "",
    YearOfPlanting: 0,
    TrunkDimenter: 0,
    Height: 0,
    NumberOfTrunk: 0,
    Price: 0,
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
        Price: bonsaiDetailById?.bonsai?.price,
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
    const priceRegex = /^\d+(?:\.\d{1,2})?$/;

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

    if (!priceRegex.test(formData.Price)) {
      errors.Price = "Invalid Price (numbers only)"; // (Optional)
    }

    // Kiểm tra các field khác nếu cần (OldImage, Image)
    if (errors != {}) {
      console.log(errors != {});
      setValidateMessage(errors);
    }
    return errors;
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
    <div>
      <button className="m-3" onClick={() => setBonsaiDetail(false)}>
        <ArrowLeftOutlined />
      </button>
      {loading ? (
        <Loading loading={loading} isRelative={true} />
      ) : (
        <>
          <div className="">
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
            <div className="font-bold text-[20px]">
              <select
                value={formData.CategoryId}
                style={{ width: "80%" }}
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
            <div className="font-bold text-[20px]">
              <select
                value={formData.StyleId}
                style={{ width: "80%" }}
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
            <div className="font-bold text-[20px]">
              <input
                value={formData.Name}
                onChange={(e) =>
                  setFormData({ ...formData, Name: e.target.value })
                }
              />
            </div>
            <div className="font-bold text-[20px]">
              <textarea
                value={formData.Description}
                onChange={(e) =>
                  setFormData({ ...formData, Description: e.target.value })
                }
              />
            </div>
            <div className="font-bold text-[20px]">
              <input
                value={formData.YearOfPlanting}
                onChange={(e) =>
                  setFormData({ ...formData, YearOfPlanting: e.target.value })
                }
              />
            </div>
            <div className="font-bold text-[20px]">
              <input
                value={formData.TrunkDimenter}
                onChange={(e) =>
                  setFormData({ ...formData, TrunkDimenter: e.target.value })
                }
              />
            </div>
            <div className="font-bold text-[20px]">
              <input
                value={formData.Height}
                onChange={(e) =>
                  setFormData({ ...formData, Height: e.target.value })
                }
              />
            </div>
            <div className="font-bold text-[20px]">
              <input
                value={formData.NumberOfTrunk}
                onChange={(e) =>
                  setFormData({ ...formData, NumberOfTrunk: e.target.value })
                }
              />
            </div>
            <div className="font-bold text-[20px]">
              <input
                value={formData.Price}
                onChange={(e) =>
                  setFormData({ ...formData, Price: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <button className="outline-none" onClick={onSubmit}>
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
