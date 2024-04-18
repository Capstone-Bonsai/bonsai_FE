import React, { useState } from "react";
import CompletedAddress from "../OrderProduct/CompletedAddress";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import { addCustomerGarden } from "../../redux/slice/userGarden";
import { toast } from "react-toastify";

function AddCustomerGarden() {
  const [imageGarden, setImageGarden] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [newSquare, setNewSquare] = useState("");

  const handleUploadClick = () => {
    document.getElementById("upload-input").click();
  };
  const [file, setFile] = useState([]);
  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImageGarden = [...imageGarden];
    const updatedFiles = [...file];
    for (let i = 0; i < files.length; i++) {
      const newFile = files[i];
      const imageURL = URL.createObjectURL(newFile);
      updatedImageGarden.push({ file: newFile, imageURL });
      updatedFiles.push(newFile);
    }

    setImageGarden(updatedImageGarden);
    setFile(updatedFiles);
  };
  const handleRemoveImage = (index) => {
    const updatedImageGarden = [...imageGarden];
    updatedImageGarden.splice(index, 1);
    setImageGarden(updatedImageGarden);
  };

  const handleAddNewGarden = async () => {
    const formData = new FormData();
    formData.append("Address", newAddress);
    formData.append("Square", newSquare);
    imageGarden.map((image) => {
      formData.append(`Image`, image.file);
    });
    // setLoading(true);
    try {
      await addCustomerGarden(formData);
      // setGardenLoading(!gardenLoading);
      // setLoading(false);
      toast.success("Thêm vườn thành công thành Công");
    } catch (error) {
      toast.error("Thêm vườn không thành công", error);
    }
  };
  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Thêm vườn của bạn</h3>
        <div>
          <div className="text-[#3a9943]">Địa chỉ</div>
          <div className="w-full">
            <CompletedAddress className="" setAddress={setNewAddress} />
          </div>
        </div>
        <div>
          <div className="text-[#3a9943]">
            Diện tích/m<sup>2</sup>
          </div>
          <input
            value={newSquare}
            onChange={(e) => setNewSquare(e.target.value)}
            className="border outline-none w-full px-2 h-[40px] my-2 mb-5"
            type="number"
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
            id="upload-input"
          />
        </div>
        <div className="flex flex-wrap gap-5">
          {imageGarden?.length > 0 ? (
            imageGarden?.map((image, index) => (
              <div key={index} className="relative p-10 border rounded-[10px]">
                <img
                  src={image.imageURL}
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
        {imageGarden?.length < 4 ? (
          <div className="text-center">
            <button
              onClick={() => handleUploadClick()}
              className="border p-1 rounded-lg my-5 outline-none"
            >
              <UploadOutlined />
              Thêm hình ảnh
            </button>
          </div>
        ) : (
          "Bạn chỉ có thể thêm tối đa 4 ảnh"
        )}
        <div className="modal-action">
          <form method="dialog">
            <button className="btn" onClick={() => handleAddNewGarden()}>
              Thêm vườn
            </button>{" "}
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default AddCustomerGarden;
