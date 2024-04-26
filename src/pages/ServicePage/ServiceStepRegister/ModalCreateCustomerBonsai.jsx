import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGardenNoPagination } from "../../../redux/slice/userGarden";
import CompletedAddress from "../../OrderProduct/CompletedAddress";
import { allCategory } from "../../../redux/slice/categorySlice";
import { allStyle } from "../../../redux/slice/styleSlice";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import noImage from "../../../assets/unImage.png";
function ModalCreateCustomerBonsai() {
  const dispatch = useDispatch();
  const [newGarden, setNewGarden] = useState(false);
  useEffect(() => {
    dispatch(getGardenNoPagination());
    dispatch(allCategory());
    dispatch(allStyle());
  }, []);
  const customerGardens = useSelector(
    (state) => state.garden?.gardenNoPagination?.items
  );
  const categories = useSelector(
    (state) => state?.category?.allCategoryDTO?.items
  );
  const styles = useSelector((state) => state?.style?.allStyleDTO?.items);
  const [gardenId, setGardenId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [styleId, setStyleId] = useState("");

  const [imgBonsai, setImgBonsai] = useState([]);
  console.log(imgBonsai);
  const [file, setFile] = useState([]);
  console.log(file);
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
  const [bonsaiName, setBonsaiName] = useState("");
  const [description, setDescription] = useState("");
  const [yop, setYop] = useState("");
  const [trunkDemeter, setTrunkDemeter] = useState("");
  const [bonsaiHeight, setBonsaiHeight] = useState("");
  const [numTrunk, setNumTrunk] = useState("");
  //validate
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
  const handleGardenChange = (e) => {
    setGardenId(e.target.value);
    setAddressError("");
  };
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
    setCategoryError("");
  };
  const handleStyleChange = (e) => {
    setStyleId(e.target.value);
    setStyleError("");
  };
  const handleCreateBonsai = () => {
    let isValid = true;
    if (categoryId == "") {
      setCategoryError("Vui lòng chọn loại cây!!");
      isValid = false;
    }
    if (styleId == "") {
      setStyleError("Vui lòng chọn hình dáng cây!!");
    }
    if (!newAddress.trim()) {
      setAddressError("Vui lòng nhập địa chỉ!!");
      isValid = false;
    }
    if (!newSquare.trim()) {
      setSquareError("Vui lòng nhập kích thước vườn!!");
    }
    if (!bonsaiName.trim()) {
      setBonsaiNameError("Vui lòng nhập tên cây bonsai!!");
      isValid = false;
    }
    if (!description.trim()) {
      setDesError("Vui lòng nhập mô tả cây bonsai!!");
      isValid = false;
    }
    if (!yop.trim()) {
      setYopError("Vui lòng nhập năm trồng cây bonsai!!");
      isValid = false;
    }
    if (!trunkDemeter.trim()) {
      setTrunkDemError("Vui lòng nhập kích thước thân cây bonsai!!");
      isValid = false;
    }
    if (!bonsaiHeight.trim()) {
      setHeightError("Vui lòng nhập chiều cao cây bonsai!!");
      isValid = false;
    }
    if (!numTrunk.trim()) {
      setNumTrunkError("Vui lòng nhập số thân cây bonsai!!");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    const formData = new FormData();
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
    imgBonsai.map((image) => {
      formData.append(`Image`, image.file);
    });
  };

  return (
    <dialog id="modal_create_bonsai_garden" className="modal">
      <div className="modal-box max-w-[700px]">
        <form method="dialog">
          <button className="btn outline-none btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Tạo bonsai của bạn</h3>
        {newGarden ? (
          <div>
            <button
              onClick={() => setNewGarden(false)}
              className="border my-2 p-2 bg-[#3a9943] outline-none rounded-[8px] hover:border-[green] text-[#fff]"
            >
              Đã có vườn
            </button>
          </div>
        ) : (
          <div>
            <button
              className="border my-2 p-2 bg-[#3a9943] outline-none rounded-[8px] hover:border-[green] text-[#fff]"
              onClick={() => setNewGarden(true)}
            >
              Tạo mới vườn
            </button>
          </div>
        )}
        <div className="overflow-y-auto h-[500px]">
          {newGarden ? (
            <div>
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
                  <CompletedAddress setNewAddress={setNewAddress} />
                </div>
                {addressError != "" ? (
                  <div className="text-[red] text-[14px]">{addressError}</div>
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
                    className={`border w-full p-3 rounded-[8px] outline-none ${
                      squareError != "" ? "border-[red]" : ""
                    }`}
                    type="text"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="">
              <span className="font-bold"> Địa chỉ:</span>{" "}
              <span className="text-red-500">*</span>
              <select
                onChange={handleGardenChange}
                className={`border w-full p-3 rounded-[8px] outline-none ${
                  gardenId == "" ? "border-[red]" : ""
                }`}
                name=""
                id=""
                defaultValue=""
              >
                <option disabled className="bg-gray-300 text-[#fff]" value="">
                  Chọn vườn của bạn
                </option>
                {customerGardens?.map((garden) => (
                  <option className="" value={garden?.id} key={garden?.id}>
                    {garden?.address}
                  </option>
                ))}
              </select>
              {addressError != "" ? (
                <div className="text-[red] text-[14px]">{addressError}</div>
              ) : (
                ""
              )}
            </div>
          )}
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
                  <option className="bg-gray-300 text-[#fff]" value="">
                    Chọn loại cây
                  </option>
                  {categories?.map((category) => (
                    <option value={category?.id} key={category?.id}>
                      {category?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="my-3">
              <div className="font-bold">
                Hình dáng cây: <span className="text-red-500">*</span>
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
                  <option className="bg-gray-300 text-[#fff]" value="">
                    Chọn hình dáng cây
                  </option>
                  {styles?.map((style) => (
                    <option value={style?.id} key={style?.id}>
                      {style?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="my-3">
              <div className="font-bold">
                Tên cây: <span className="text-red-500">*</span>
              </div>
              <div>
                <input
                  onChange={() => setBonsaiNameError("")}
                  className={`border ${
                    bonsaiNameError != "" ? "border-[red]" : ""
                  } w-full p-3 rounded-[8px] outline-none`}
                  type="text"
                />
              </div>
              {bonsaiNameError != "" ? (
                <div className="text-[red] text-[14px]">{bonsaiNameError}</div>
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
                  onChange={() => setDesError("")}
                  className={`border ${
                    desError != "" ? "border-[red]" : ""
                  } w-full p-3 rounded-[8px] outline-none`}
                  type="text"
                />
              </div>
              {desError != "" ? (
                <div className="text-[red] text-[14px]">{desError}</div>
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
                  onChange={() => setYopError("")}
                  className={`border ${
                    yopError != "" ? "border-[red]" : ""
                  } w-full p-3 rounded-[8px] outline-none`}
                  type="text"
                />
              </div>
              {yopError != "" ? (
                <div className="text-[red] text-[14px]">{yopError}</div>
              ) : (
                ""
              )}
            </div>
            <div className="my-3">
              <div className="font-bold">
                Kích thước thân: <span className="text-red-500">*</span>
              </div>
              <div>
                <input
                  onChange={() => setTrunkDemError("")}
                  className={`border ${
                    trunkDemError != "" ? "border-[red]" : ""
                  } w-full p-3 rounded-[8px] outline-none`}
                  type="text"
                />
              </div>
              {trunkDemError != "" ? (
                <div className="text-[red] text-[14px]">{trunkDemError}</div>
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
                  onChange={() => setHeightError("")}
                  className={`border ${
                    heightError != "" ? "border-[red]" : ""
                  } w-full p-3 rounded-[8px] outline-none`}
                  type="text"
                />
              </div>
              {heightError != "" ? (
                <div className="text-[red] text-[14px]">{heightError}</div>
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
                  onChange={() => setNumTrunkError("")}
                  className={`border ${
                    numTrunkError != "" ? "border-[red]" : ""
                  } w-full p-3 rounded-[8px] outline-none`}
                  type="text"
                />
              </div>
              {numTrunkError != "" ? (
                <div className="text-[red] text-[14px]">{numTrunkError}</div>
              ) : (
                ""
              )}
            </div>
            <div className="my-3">
              <div className="font-bold">Hình ảnh</div>
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
                  imgBonsai.map((imgBonsaiItem, index) => (
                    <div
                      key={index}
                      className="relative p-10 border rounded-[10px]"
                    >
                      <img
                        src={imgBonsaiItem.imageURL}
                        className="object-cover w-[130px] h-[130px]"
                        alt=""
                      />
                      <button
                        className="absolute top-0 right-2 text-[#f2f2f2] text-[30px]"
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
        </div>
        <div className="modal-action">
          <button
            onClick={() => handleCreateBonsai()}
            className="btn ountline-none"
          >
            Tạo cây
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ModalCreateCustomerBonsai;
