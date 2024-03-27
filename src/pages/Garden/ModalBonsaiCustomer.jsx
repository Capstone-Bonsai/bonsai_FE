import React, { useState } from "react";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import { addBonsaiIntoGarden } from "../../redux/slice/userGarden";
import { toast } from "react-toastify";
function ModalBonsaiCustomer(props) {
  console.log(props.allStyleDTO);
  const [styleId, setStyleId] = useState();
  console.log(styleId);
  const [cateId, setCateId] = useState();
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
  };
  const [bonsaiName, setBonsaiName] = useState("");
  const [bonsaiDescription, setBonsaiDescription] = useState("");
  const [yop, setYop] = useState("");
  const [trunkDimeter, setTrunkDimenter] = useState("");
  const [height, setHeight] = useState("");
  const [numberOfTrunk, setNumberOfTrunk] = useState("");
  const handleAddBonsai = async () => {
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
      toast.success("Thêm vườn thành công thành Công");
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
      toast.error("Thêm vườn không thành công", error);
    }
  };
  return (
    <>
      <dialog id="my_modal_2" className="modal text-left">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Thêm cây của bạn</h3>
          <div>{props.selectedGardenId}</div>
          <div className="my-2">
            <span className="font-bold">Loại cây</span>{" "}
            <span className="text-red-500">*</span>
            <select
              className="w-full border outline-none py-2 px-2 mb-2 rounded-[10px]"
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
              className="w-full border outline-none py-2 px-2 mb-2 rounded-[10px]"
              onChange={handleStyleChange}
              defaultValue=""
            >
              <option disabled value="" className="opacity-30">
                Chọn dáng cây
              </option>
              {props.allStyleDTO.items.map((style) => (
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
              required
              onChange={(e) => setBonsaiName(e.target.value)}
              className="w-full border outline-none p-2 rounded-[10px]"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="my-2">
            <div className="font-bold">
              Mô tả chi tiết <span className="text-[red]">*</span>
            </div>
            <input
              required
              value={bonsaiDescription}
              onChange={(e) => setBonsaiDescription(e.target.value)}
              className="w-full border outline-none p-2 rounded-[10px]"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="my-2">
            <div className="font-bold">Năm tuổi</div>
            <input
              value={yop}
              onChange={(e) => setYop(e.target.value)}
              className="w-full border outline-none p-2 rounded-[10px]"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="my-2">
            <div className="font-bold">Kích thước thân <span className="text-[red]">*</span></div>
            <input
              required
              value={trunkDimeter}
              onChange={(e) => setTrunkDimenter(e.target.value)}
              className="w-full border outline-none p-2 rounded-[10px]"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="my-2">
            <div className="font-bold">Chiều cao</div>
            <input
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full border outline-none p-2 rounded-[10px]"
              type="text"
              name=""
              id=""
            />
          </div>
          <div className="my-2">
            <div className="font-bold">Số thân <span className="text-[red]">*</span></div>
            <input
              required
              value={numberOfTrunk}
              onChange={(e) => setNumberOfTrunk(e.target.value)}
              className="w-full border outline-none p-2 rounded-[10px]"
              type="text"
              name=""
              id=""
            />
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
          <div className="text-right">
            <form onSubmit={handleAddBonsai} method="dialog">
              <button className="btn">Thêm cây</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default ModalBonsaiCustomer;
