import React, { useState } from "react";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import { addBonsaiIntoGarden } from "../../redux/slice/userGarden";
import { toast } from "react-toastify";
function ModalBonsaiCustomer(props) {
  const [styleId, setStyleId] = useState();
  const [cateId, setCateId] = useState();
  const [imgBonsai, setImgBonsai] = useState([]);
  const [file, setFile] = useState([]);

  //error
  const [cateError, setCateError] = useState("");
  const [styleError, setStyleError] = useState("");
  const [bonsaiNameError, setBonsaiNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [yearOfPlantingError, setYearOfPlantingError] = useState("");
  const [trunkDimenterError, setTrunkDimenterError] = useState("");
  const [numberOfTrunkError, setNumberOfTrunkError] = useState("");
  const [heightError, setHeightError] = useState("");

  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImageBonsai = [...imgBonsai];
    const updatedFiles = [...file];
    for (let i = 0; i < files.length; i++) {
      const newFile = files[i];
      const imageURL = URL.createObjectURL(newFile);
      updatedImageBonsai.push({ file: newFile, imageURL });
      updatedFiles.push(newFile);
    }

    setImgBonsai(updatedImageBonsai);
    setFile(updatedFiles);
  };
  const handleRemoveImage = (index) => {
    const updatedImageBonsai = [...imgBonsai];
    updatedImageBonsai.splice(index, 1);
    setImgBonsai(updatedImageBonsai);
  };
  const handleUploadClick = () => {
    document.getElementById("upload-input-bonsai").click();
  };
  const handleStyleChange = (event) => {
    setStyleId(event.target.value);
  };
  const handleCategoryChange = (event) => {
    setCateId(event.target.value);
    setCateError("");
  };
  const [bonsaiName, setBonsaiName] = useState("");
  const [bonsaiDescription, setBonsaiDescription] = useState("");
  const [yop, setYop] = useState("");
  const [trunkDimeter, setTrunkDimenter] = useState("");
  const [height, setHeight] = useState("");
  const [numberOfTrunk, setNumberOfTrunk] = useState("");

  const handleAddBonsai = async () => {
    let isValid = true;
    if (!cateId) {
      setCateError("Vui lòng chọn loại cây");
      isValid = false;
    }
    if (!styleError) {
      setCateError("Vui lòng chọn hình dáng cây");
      isValid = false;
    }
    if (!bonsaiName.trim()) {
      setBonsaiNameError("Vui lòng nhập tên cây");
      isValid = false;
    }
    if (!bonsaiDescription.trim()) {
      setDescriptionError("Vui lòng nhập mô tả");
      isValid = false;
    }
    if (!yop.trim()) {
      setYearOfPlantingError("Vui lòng nằm trồng");
      isValid = false;
    }
    if (!trunkDimeter.trim()) {
      setTrunkDimenterError("Vui lòng nhập kích thước thân");
      isValid = false;
    }
    if (!height.trim()) {
      setHeightError("Vui lòng nhập chiều cao");
      isValid = false;
    }
    if (!numberOfTrunk.trim()) {
      setNumberOfTrunkError("Vui lòng nhập số thân");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    const formData = new FormData();
    formData.append("CategoryId", cateId);
    formData.append("StyleId", styleId);
    formData.append("Name", bonsaiName);
    formData.append("Description", bonsaiDescription);
    formData.append("YearOfPlanting", yop);
    formData.append("TrunkDimenter", trunkDimeter);
    formData.append("NumberOfTrunk", numberOfTrunk);
    formData.append("Height", height);
    imgBonsai.map((image) => {
      formData.append(`Image`, image.file);
    });
    try {
      await addBonsaiIntoGarden(formData, props.selectedGardenId);
      props.setGardenLoading(!props.gardenLoading);
      toast.success("Thêm bonsai thành công");
      setStyleId("");
      setCateId("");
      setImgBonsai([]);
      setFile([]);
      setBonsaiName("");
      setBonsaiDescription("");
      setYop("");
      setTrunkDimenter("");
      setHeight("");
      setNumberOfTrunk("");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <dialog id="my_modal_2" className="modal text-left">
        <div className="modal-box max-w-[700px]">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 outline-none">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Thêm cây của bạn</h3>
          <div className="h-[500px] px-[50px] overflow-y-scroll">
            <div className="my-2">
              <span className="font-bold">Loại cây</span>{" "}
              <span className="text-red-500">*</span>
              <select
                className={`w-full border ${
                  cateError != "" ? "border-[red]" : ""
                } outline-none py-2 px-2 mb-2 rounded-[10px]`}
                onChange={handleCategoryChange}
                defaultValue=""
              >
                <option disabled value="">
                  Chọn loại cây
                </option>
                {props.allCategoryDTO?.items?.map((cate) => (
                  <option value={cate.id} key={cate.id}>
                    {cate.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2">
              <span className="font-bold">Dáng cây </span>
              <span className="text-red-500">*</span>
              <select
                className={`w-full border ${
                  styleError != "" ? "border-[red]" : ""
                } outline-none py-2 px-2 mb-2 rounded-[10px]`}
                onChange={handleStyleChange}
                defaultValue=""
              >
                <option disabled value="" className="opacity-30">
                  Chọn dáng cây
                </option>
                {props.allStyleDTO.items?.map((style) => (
                  <option value={style.id} key={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="my-2">
              <div className="font-bold">
                Tên cây <span className="text-[red]">*</span>
              </div>
              <input
                value={bonsaiName}
                onChange={(e) => {
                  const { value } = e.target;
                  if (value.length > 50) {
                    setBonsaiNameError("Tên cây không được dài hơn 50 ký tự");
                  } else {
                    setBonsaiName(value);
                    setBonsaiNameError("");
                  }
                }}
                className={`w-full border ${
                  bonsaiNameError != "" ? "border-[red]" : ""
                } outline-none p-2 rounded-[10px]`}
                type="text"
                name=""
                id=""
              />
              {bonsaiNameError != "" ? (
                <div className="text-[#ff4d4f] text-[14px]">
                  {bonsaiNameError}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="my-2">
              <div className="font-bold">
                Mô tả chi tiết <span className="text-[red]">*</span>
              </div>
              <input
                value={bonsaiDescription}
                onChange={(e) => {
                  setBonsaiDescription(e.target.value), setDescriptionError("");
                }}
                className={`w-full border ${
                  descriptionError != "" ? "border-[red]" : ""
                } outline-none p-2 rounded-[10px]`}
                type="text"
                name=""
                id=""
              />
              {descriptionError != "" ? (
                <div className="text-[#ff4d4f] text-[14px]">
                  {descriptionError}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="my-2">
              <div className="font-bold">
                Năm trồng <span className="text-red-500">*</span>
              </div>
              <input
                value={yop}
                onChange={(e) => setYop(e.target.value)}
                className={`w-full border ${
                  yearOfPlantingError != "" ? "border-[red]" : ""
                } outline-none p-2 rounded-[10px]`}
                type="number"
                min={0}
                name=""
                id=""
              />
              {yearOfPlantingError != "" ? (
                <div className="text-[#ff4d4f] text-[14px]">
                  {yearOfPlantingError}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="my-2">
              <div className="font-bold">
                Kích thước thân <span className="text-[red]">*</span>
              </div>
              <input
                required
                value={trunkDimeter}
                onChange={(e) => setTrunkDimenter(e.target.value)}
                className={`w-full border ${
                  trunkDimenterError != "" ? "border-[red]" : ""
                } outline-none p-2 rounded-[10px]`}
                type="number"
                min={0}
                name=""
                id=""
              />
              {trunkDimenterError != "" ? (
                <div className="text-[#ff4d4f] text-[14px]">
                  {trunkDimenterError}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="my-2">
              <div className="font-bold">
                Chiều cao <span className="text-red-500">*</span>
              </div>
              <input
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className={`w-full border ${
                  heightError != "" ? "border-[red]" : ""
                } outline-none p-2 rounded-[10px]`}
                type="number"
                min={0}
                name=""
                id=""
              />
              {heightError != "" ? (
                <div className="text-[#ff4d4f] text-[14px]">{heightError}</div>
              ) : (
                ""
              )}
            </div>
            <div className="my-2">
              <div className="font-bold">
                Số thân <span className="text-[red]">*</span>
              </div>
              <input
                required
                value={numberOfTrunk}
                onChange={(e) => setNumberOfTrunk(e.target.value)}
                className={`w-full border ${
                  numberOfTrunkError != "" ? "border-[red]" : ""
                } outline-none p-2 rounded-[10px]`}
                type="number"
                min={0}
                name=""
                id=""
              />
              {numberOfTrunkError != "" ? (
                <div className="text-[#ff4d4f] text-[14px]">
                  {numberOfTrunkError}
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
                id="upload-input-bonsai"
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
          <div className="text-right">
            {/* <form onSubmit={handleAddBonsai} method="dialog"> */}
            <button onClick={handleAddBonsai} className="btn">
              Thêm cây
            </button>
            {/* </form> */}
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ModalBonsaiCustomer;
