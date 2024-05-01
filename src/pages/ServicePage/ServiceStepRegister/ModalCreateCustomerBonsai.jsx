import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBonsaiBuyFromStore,
  addBonsaiIntoGarden,
  getGardenNoPagination,
  newGardenForBought,
} from "../../../redux/slice/userGarden";
import CompletedAddress from "../../OrderProduct/CompletedAddress";
import { allCategory } from "../../../redux/slice/categorySlice";
import { allStyle } from "../../../redux/slice/styleSlice";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import noImage from "../../../assets/unImage.png";
import { createBonsaiInService } from "../../../redux/slice/serviceOrderSlice";
import { toast } from "react-toastify";
import { bonsaiBought } from "../../../redux/slice/bonsaiSlice";
import Loading from "../../../components/Loading";
function ModalCreateCustomerBonsai(bonsaiProps) {
  const { customerBonsai, pageIndex, pageSize, setFetchApi, fetchApi } =
    bonsaiProps;
  const dispatch = useDispatch();
  const [newGarden, setNewGarden] = useState(true);
  const [newBonsai, setNewBonsai] = useState(true);
  const [loading, setLoading] = useState(false);
  console.log("newGarden:" + newGarden);
  console.log("newBonsai:" + newBonsai);
  useEffect(() => {
    dispatch(getGardenNoPagination());
    dispatch(allCategory());
    dispatch(allStyle());
    dispatch(bonsaiBought());
  }, []);
  const customerGardens = useSelector(
    (state) => state.garden?.gardenNoPagination?.items
  );
  const categories = useSelector(
    (state) => state?.category?.allCategoryDTO?.items
  );
  const bonsaiFromStore = useSelector(
    (state) => state.bonsai?.boughtBonsai?.items
  );
  const styles = useSelector((state) => state?.style?.allStyleDTO?.items);
  const [gardenId, setGardenId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [styleId, setStyleId] = useState("");
  const [boughtBonsaiId, setBoughtBonsaiId] = useState("");

  const [imgBonsai, setImgBonsai] = useState([]);
  const [file, setFile] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImageBonsai = [...imgBonsai];
    const updatedFiles = [...file];
    for (let i = 0; i < files.length; i++) {
      const newFile = files[i];
      const imageURL = URL.createObjectURL(newFile);
      console.log(imageURL);
      updatedImageBonsai.push({ file: newFile, imageURL });
      updatedFiles.push(newFile);
      setImgBonsai(updatedImageBonsai);
      setFile(updatedFiles);
    }
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    const updatedImageBonsai = [...imgBonsai];
    const removedImage = updatedImageBonsai.splice(index, 1)[0];
    URL.revokeObjectURL(removedImage.imageURL);
    const updatedFiles = [...file];
    updatedFiles.splice(index, 1);
    setImgBonsai(updatedImageBonsai);
    setFile(updatedFiles);
  };

  const handleUploadClick = () => {
    document.getElementById("upload-bonsai-in-service").click();
  };
  const [newAddress, setNewAddress] = useState("");
  const [newSquare, setNewSquare] = useState("");
  console.log(newSquare);
  const [bonsaiName, setBonsaiName] = useState("");
  const [description, setDescription] = useState("");
  const [yop, setYop] = useState("");
  const [trunkDemeter, setTrunkDemeter] = useState("");
  const [bonsaiHeight, setBonsaiHeight] = useState("");
  const [numTrunk, setNumTrunk] = useState("");
  //validate
  const [oldAdressError, setOldAddress] = useState("");
  const [oldBonsaiError, setOldBonsaiError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [styleError, setStyleError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [squareError, setSquareError] = useState("");
  const [bonsaiNameError, setBonsaiNameError] = useState("");
  const [desError, setDesError] = useState("");
  const [yopError, setYopError] = useState("");
  const [trunkDemError, setTrunkDemError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [numTrunkError, setNumTrunkError] = useState("");
  const [imageError, setImageError] = useState("");
  //onChange
  const handleGardenChange = (e) => {
    setGardenId(e.target.value);
    setAddressError("");
  };
  const handleBonsaiBoughtChange = (e) => {
    setBoughtBonsaiId(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setCategoryError("");
  };
  const handleStyleChange = (e) => {
    setStyleId(e.target.value);
    setStyleError("");
  };
  const handleSquareChange = (e) => {
    const squareValue = e.target.value;
    setNewSquare(squareValue);
    if (squareValue <= 0) {
      setSquareError("Diện tích phải lớn hơn 0");
      e.target.value = null;
    } else {
      setSquareError("");
    }
  };
  const handleNameChange = (e) => {
    const bonsaiName = e.target.value;
    setBonsaiName(bonsaiName);
    setBonsaiNameError("");
  };
  const handleDesChange = (e) => {
    const bonsaiDes = e.target.value;
    setDescription(bonsaiDes);
    setDesError("");
  };
  const handleYopChange = (e) => {
    const yop = e.target.value;
    setYop(yop);
    setYopError("");
  };
  const handleTrunkDemChange = (e) => {
    const trunkDem = e.target.value;
    setTrunkDemeter(trunkDem);
    if (trunkDem <= 0) {
      setTrunkDemError("Hoành cây phải lớn hơn 0");
      e.target.value = null;
    } else {
      setTrunkDemError("");
    }
  };
  const handleHeightChange = (e) => {
    const height = e.target.value;
    setBonsaiHeight(height);
    if (height <= 0) {
      setHeightError("Chiều cao phải lớn hơn 0");
      e.target.value = null;
    } else {
      setHeightError("");
    }
  };
  const handleNumTrunkChange = (e) => {
    const numTrunk = e.target.value;
    setNumTrunk(numTrunk);
    if (numTrunk < 0) {
      setNumTrunkError("Số thân phải lớn hơn 0");
      e.target.value = null;
    } else {
      setNumTrunkError("");
    }
  };
  const resetFormFields = () => {
    setNewGarden(false);
    setNewAddress("");
    setNewSquare("");
    setGardenId("");
    setCategoryId("");
    setStyleId("");
    setBonsaiName("");
    setDescription("");
    setYop("");
    setTrunkDemeter("");
    setBonsaiHeight("");
    setNumTrunk("");
    setCategoryError("");
    setStyleError("");
    setAddressError("");
    setSquareError("");
    setBonsaiNameError("");
    setDesError("");
    setYopError("");
    setTrunkDemError("");
    setHeightError("");
    setNumTrunkError("");
    setImgBonsai([]);
    setFile([]);
  };
  const [payloadNoNew, setPayloadNoNew] = useState();
  console.log(payloadNoNew);
  useEffect(() => {
    setPayloadNoNew({
      bonsaiId: boughtBonsaiId,
      customerGardenId: gardenId,
    });
  }, [boughtBonsaiId, gardenId]);
  const handleCreateBonsai = async () => {
    let isValid = true;
    if (categoryId == "" && !newBonsai) {
      setCategoryError("Vui lòng chọn loại cây!!");
      isValid = false;
    }
    if (styleId == "" && !newBonsai) {
      setStyleError("Vui lòng chọn hình dáng cây!!");
      isValid = false;
    }
    if (!newAddress.trim() && newGarden) {
      setAddressError("Vui lòng nhập địa chỉ!!");
      isValid = false;
    }
    if (gardenId == "" && !newGarden) {
      setOldAddress("Vui lòng chọn địa chỉ!!");
      isValid = false;
    }
    if (!newSquare.trim() && newGarden) {
      setSquareError("Vui lòng nhập kích thước vườn!!");
      isValid = false;
    }
    if (boughtBonsaiId == "" && newBonsai) {
      setOldBonsaiError("Vui lòng chọn cây!!");
      isValid = false;
    }
    if (!bonsaiName.trim() && !newBonsai) {
      setBonsaiNameError("Vui lòng nhập tên cây bonsai!!");
      isValid = false;
    }
    if (!description.trim() && !newBonsai) {
      setDesError("Vui lòng nhập mô tả cây bonsai!!");
      isValid = false;
    }
    if (!yop.trim() && !newBonsai) {
      setYopError("Vui lòng nhập năm trồng cây bonsai!!");
      isValid = false;
    }
    if (!trunkDemeter.trim() && !newBonsai) {
      setTrunkDemError("Vui lòng nhập hoành cây cây bonsai!!");
      isValid = false;
    }
    if (!bonsaiHeight.trim() && !newBonsai) {
      setHeightError("Vui lòng nhập chiều cao cây bonsai!!");
      isValid = false;
    }
    if (!numTrunk.trim() && !newBonsai) {
      setNumTrunkError("Vui lòng nhập số thân cây bonsai!!");
      isValid = false;
    }
    if (bonsaiHeight == 0 && !newBonsai) {
      setHeightError("Chiều cao phải lớn hơn 0!!");
      isValid = false;
    }
    if (file?.length <= 0 && !newBonsai) {
      setImageError("Vui lòng thêm ảnh!!");
      isValid = false;
    }
    // if (!isValid) {
    //   return;
    // }
    const formData = new FormData();
    setLoading(true);
    if (!newGarden && !newBonsai) {
      formData.append("CategoryId", categoryId);
      formData.append("StyleId", styleId);
      formData.append("Name", bonsaiName);
      formData.append("Description", description);
      formData.append("YearOfPlanting", yop);
      formData.append("TrunkDimenter", trunkDemeter);
      formData.append("Height", bonsaiHeight);
      formData.append("NumberOfTrunk", numTrunk);
      imgBonsai?.map((image) => {
        formData.append(`Image`, image.file);
      });
    } else if (newGarden && !newBonsai) {
      formData.append("Address", newAddress);
      formData.append("Square", newSquare);
      formData.append("CategoryId", categoryId);
      formData.append("StyleId", styleId);
      formData.append("Name", bonsaiName);
      formData.append("Description", description);
      formData.append("YearOfPlanting", yop);
      formData.append("TrunkDimenter", trunkDemeter);
      formData.append("Height", bonsaiHeight);
      formData.append("NumberOfTrunk", numTrunk);
      imgBonsai?.map((image) => {
        formData.append(`Image`, image.file);
      });
    } else if (newGarden && newBonsai) {
      formData.append("Address", newAddress);
      formData.append("Square", newSquare);
      formData.append("BonsaiId", boughtBonsaiId);
    }
    try {
      if (!newGarden && !newBonsai) {
        await addBonsaiIntoGarden(formData, gardenId);
      } else if (newGarden && !newBonsai) {
        const res = await createBonsaiInService(formData);
      } else if (!newGarden && newBonsai) {
        await addBonsaiBuyFromStore(payloadNoNew);
      } else if (newGarden && newBonsai) {
        await newGardenForBought(formData);
      }
      toast.success("Tạo cây thành công");
      resetFormFields();
      dispatch(bonsaiBought());
      dispatch(getGardenNoPagination());
      setFetchApi(!fetchApi);
      dispatch(customerBonsai({ pageIndex, pageSize }));
    } catch (error) {
      toast.error(error.response.data);
    } finally {
      document.getElementById("modal_create_bonsai_garden").close();
      setLoading(false);
    }
  };

  return (
    <dialog id="modal_create_bonsai_garden" className="modal">
      <div className="modal-box max-w-[700px]">
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <form method="dialog">
              <button className="btn outline-none btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Tạo bonsai của bạn</h3>
            <div className="flex items-center gap-2 my-2">
              <div>bạn đã có bonsai chưa? </div>
              <select
                value={newBonsai ? "yes" : "no"}
                onChange={(e) => setNewBonsai(e.target.value === "yes")}
                className="outline-none border"
              >
                <option selected value="yes">
                  Có
                </option>
                <option value="no">Chưa</option>
              </select>
            </div>
            <div role="tablist" className="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                style={{ width: "200px" }}
                className="tab"
                aria-label="Đã có vườn"
                onClick={() => setNewGarden(false)}
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <div className="overflow-y-auto h-[500px]">
                  <div className="">
                    <span className="font-bold"> Địa chỉ:</span>{" "}
                    <span className="text-red-500">*</span>
                    <select
                      onChange={handleGardenChange}
                      className={`border w-full p-3 rounded-[8px] outline-none ${
                        addressError != "" ? "border-[red]" : ""
                      }`}
                      name=""
                      id=""
                      defaultValue=""
                    >
                      <option
                        disabled
                        className="bg-gray-300 text-[#fff]"
                        value=""
                      >
                        Chọn vườn của bạn
                      </option>
                      {customerGardens?.map((garden) => (
                        <option
                          className=""
                          value={garden?.id}
                          key={garden?.id}
                        >
                          {garden?.address}
                        </option>
                      ))}
                    </select>
                    <>
                      {oldAdressError != "" ? (
                        <div className="text-[red] text-[14px]">
                          {oldAdressError}
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  </div>
                  <div className="">
                    {!newBonsai ? (
                      <div>
                        <div className="my-3">
                          <div className="font-bold">
                            Loại cây: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <select
                              name=""
                              id=""
                              onChange={handleCategoryChange}
                              defaultValue=""
                              className={`border w-full p-3 rounded-[8px] outline-none ${
                                categoryError != "" ? "border-[red]" : ""
                              }`}
                            >
                              <option
                                className="bg-gray-300 text-[#fff]"
                                value=""
                              >
                                Chọn loại cây
                              </option>
                              {categories?.map((category) => (
                                <option value={category?.id} key={category?.id}>
                                  {category?.name}
                                </option>
                              ))}
                            </select>
                            {categoryError && (
                              <div className="text-[red] text-[14px]">
                                {categoryError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Hình dáng cây:{" "}
                            <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <select
                              name=""
                              id=""
                              onChange={handleStyleChange}
                              defaultValue=""
                              className={`border ${
                                styleError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                            >
                              <option
                                className="bg-gray-300 text-[#fff]"
                                value=""
                              >
                                Chọn hình dáng cây
                              </option>
                              {styles?.map((style) => (
                                <option value={style?.id} key={style?.id}>
                                  {style?.name}
                                </option>
                              ))}
                            </select>
                            {styleError && (
                              <div className="text-[red] text-[14px]">
                                {styleError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Tên cây: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleNameChange}
                              className={`border ${
                                bonsaiNameError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="text"
                            />
                          </div>
                          {bonsaiNameError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {bonsaiNameError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Mô tả cây: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleDesChange}
                              className={`border ${
                                desError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="text"
                            />
                          </div>
                          {desError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {desError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Năm trồng: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleYopChange}
                              className={`border ${
                                yopError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="number"
                            />
                          </div>
                          {yopError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {yopError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Hoành cây: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleTrunkDemChange}
                              className={`border ${
                                trunkDemError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="number"
                            />
                          </div>
                          {trunkDemError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {trunkDemError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Chiều cao: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleHeightChange}
                              className={`border ${
                                heightError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="number"
                            />
                          </div>
                          {heightError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {heightError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Số thân: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleNumTrunkChange}
                              className={`border ${
                                numTrunkError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="number"
                            />
                          </div>
                          {numTrunkError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {numTrunkError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Hình ảnh <span className="text-red-500">*</span>
                          </div>
                          {imageError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {imageError}
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: "none" }}
                              id="upload-bonsai-in-service"
                            />
                          </div>
                          <div className="flex flex-wrap gap-5">
                            {imgBonsai.length > 0 ? (
                              imgBonsai?.map((imgBonsaiItem, index) => (
                                <div
                                  key={index}
                                  className="relative rounded-[10px] w-[220px] h-[220px]"
                                >
                                  <img
                                    src={imgBonsaiItem.imageURL}
                                    className="object-cover w-full h-full"
                                    alt=""
                                  />
                                  <button
                                    className="absolute top-0 right-2 text-[#f2f2f2] text-[30px] hover:text-[#3a9943]"
                                    onClick={() => handleRemoveImage(index)}
                                  >
                                    <CloseCircleOutlined />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <img
                                src={noImage}
                                className="object-cover w-[100px] h-[100px]"
                                alt="No Image"
                              />
                            )}
                          </div>{" "}
                        </div>
                        {imgBonsai.length < 4 ? (
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
                      <div>
                        <div className="font-bold">
                          Chọn cây: <span className="text-red-500">*</span>
                        </div>
                        <select
                          onChange={handleBonsaiBoughtChange}
                          className={`border w-full p-3 rounded-[8px] outline-none`}
                          name=""
                          id=""
                          defaultValue=""
                        >
                          <option
                            disabled
                            className="bg-gray-300 text-[#fff]"
                            value=""
                          >
                            Chọn cây của bạn
                          </option>
                          {bonsaiFromStore?.map((bonsai) => (
                            <option
                              className=""
                              value={bonsai?.id}
                              key={bonsai?.id}
                            >
                              {bonsai?.name}
                            </option>
                          ))}
                        </select>
                        {oldBonsaiError != "" ? (
                          <div className="text-[red] text-[14px]">
                            {oldBonsaiError}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <input
                type="radio"
                name="my_tabs_2"
                role="tab"
                defaultChecked
                style={{ width: "200px" }}
                className="tab"
                aria-label="Chưa có vườn"
                onClick={() => setNewGarden(true)}
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <div className="overflow-y-auto h-[500px]">
                  <div className="">
                    <div className="my-3">
                      <div>
                        <span className="font-bold"> Địa chỉ:</span>{" "}
                        <span className="text-red-500">*</span>{" "}
                      </div>
                      <div
                        className={`border p-2 rounded-[8px] ${
                          addressError != "" ? "border-[red]" : ""
                        }`}
                      >
                        <CompletedAddress setAddress={setNewAddress} />
                      </div>
                      {addressError != "" ? (
                        <div className="text-[red] text-[14px]">
                          {addressError}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="my-3">
                      <div className="">
                        <span className="font-bold"> Diện tích:</span>{" "}
                        <span className="text-red-500">*</span>{" "}
                      </div>
                      <div>
                        <input
                          min={1}
                          onChange={handleSquareChange}
                          className={`border w-full p-3 rounded-[8px] outline-none ${
                            squareError != "" ? "border-[red]" : ""
                          }`}
                          type="number"
                        />
                      </div>
                      {squareError != "" ? (
                        <div className="text-[red] text-[14px]">
                          {squareError}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="">
                    {!newBonsai ? (
                      <div>
                        <div className="my-3">
                          <div className="font-bold">
                            Loại cây: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <select
                              name=""
                              id=""
                              onChange={handleCategoryChange}
                              defaultValue=""
                              className={`border w-full p-3 rounded-[8px] outline-none ${
                                categoryError != "" ? "border-[red]" : ""
                              }`}
                            >
                              <option
                                className="bg-gray-300 text-[#fff]"
                                value=""
                              >
                                Chọn loại cây
                              </option>
                              {categories?.map((category) => (
                                <option value={category?.id} key={category?.id}>
                                  {category?.name}
                                </option>
                              ))}
                            </select>
                            {categoryError && (
                              <div className="text-[red] text-[14px]">
                                {categoryError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Hình dáng cây:{" "}
                            <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <select
                              name=""
                              id=""
                              onChange={handleStyleChange}
                              defaultValue=""
                              className={`border ${
                                styleError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                            >
                              <option
                                className="bg-gray-300 text-[#fff]"
                                value=""
                              >
                                Chọn hình dáng cây
                              </option>
                              {styles?.map((style) => (
                                <option value={style?.id} key={style?.id}>
                                  {style?.name}
                                </option>
                              ))}
                            </select>
                            {styleError && (
                              <div className="text-[red] text-[14px]">
                                {styleError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Tên cây: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleNameChange}
                              className={`border ${
                                bonsaiNameError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="text"
                            />
                          </div>
                          {bonsaiNameError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {bonsaiNameError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Mô tả cây: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleDesChange}
                              className={`border ${
                                desError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="text"
                            />
                          </div>
                          {desError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {desError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Năm trồng: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleYopChange}
                              className={`border ${
                                yopError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="number"
                            />
                          </div>
                          {yopError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {yopError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Hoành cây: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleTrunkDemChange}
                              className={`border ${
                                trunkDemError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="number"
                            />
                          </div>
                          {trunkDemError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {trunkDemError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Chiều cao: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleHeightChange}
                              className={`border ${
                                heightError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="number"
                            />
                          </div>
                          {heightError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {heightError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Số thân: <span className="text-red-500">*</span>
                          </div>
                          <div>
                            <input
                              onChange={handleNumTrunkChange}
                              className={`border ${
                                numTrunkError != "" ? "border-[red]" : ""
                              } w-full p-3 rounded-[8px] outline-none`}
                              type="number"
                            />
                          </div>
                          {numTrunkError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {numTrunkError}
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                        <div className="my-3">
                          <div className="font-bold">
                            Hình ảnh <span className="text-red-500">*</span>
                          </div>
                          {imageError != "" ? (
                            <div className="text-[red] text-[14px]">
                              {imageError}
                            </div>
                          ) : (
                            ""
                          )}
                          <div>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              style={{ display: "none" }}
                              id="upload-bonsai-in-service"
                            />
                          </div>
                          <div className="flex flex-wrap gap-5">
                            {imgBonsai.length > 0 ? (
                              imgBonsai?.map((imgBonsaiItem, index) => (
                                <div
                                  key={index}
                                  className="relative rounded-[10px] w-[220px] h-[220px]"
                                >
                                  <img
                                    src={imgBonsaiItem.imageURL}
                                    className="object-cover w-full h-full"
                                    alt=""
                                  />
                                  <button
                                    className="absolute top-0 right-2 text-[#f2f2f2] text-[30px] hover:text-[#3a9943]"
                                    onClick={() => handleRemoveImage(index)}
                                  >
                                    <CloseCircleOutlined />
                                  </button>
                                </div>
                              ))
                            ) : (
                              <img
                                src={noImage}
                                className="object-cover w-[100px] h-[100px]"
                                alt="No Image"
                              />
                            )}
                          </div>{" "}
                        </div>
                        {imgBonsai.length < 4 ? (
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
                      <div>
                        <div className="font-bold">
                          Chọn cây: <span className="text-red-500">*</span>
                        </div>
                        <select
                          onChange={handleBonsaiBoughtChange}
                          className={`border w-full p-3 rounded-[8px] outline-none`}
                          name=""
                          id=""
                          defaultValue=""
                        >
                          <option
                            disabled
                            className="bg-gray-300 text-[#fff]"
                            value=""
                          >
                            Chọn cây của bạn
                          </option>
                          {bonsaiFromStore?.map((bonsai) => (
                            <option
                              className=""
                              value={bonsai?.id}
                              key={bonsai?.id}
                            >
                              {bonsai?.name}
                            </option>
                          ))}
                        </select>
                        {oldBonsaiError != "" ? (
                          <div className="text-[red] text-[14px]">
                            {oldBonsaiError}
                          </div>
                        ) : (
                          ""
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCreateBonsai}
                className="btn ountline-none my-2"
              >
                Tạo cây
              </button>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

export default ModalCreateCustomerBonsai;
