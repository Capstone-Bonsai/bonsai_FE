import React, { useEffect, useState } from "react";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import { addComplaint } from "../../redux/slice/contractSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
function ModalComplain(props) {
  const { contractId, contractDetailById, setApiContractLoading } = props;
  const [imageComplain, setImageComplain] = useState([]);
  const [textComplaint, setTextComplaint] = useState("");
  console.log(textComplaint);
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const files = e.target.files;
    const updatedImageCompain = [...imageComplain];
    const updatedFiles = [...file];
    for (let i = 0; i < files.length; i++) {
      const newFile = files[i];
      const imageURL = URL.createObjectURL(newFile);
      updatedImageCompain.push({ file: newFile, imageURL });
      updatedFiles.push(newFile);
    }

    setImageComplain(updatedImageCompain);
    setFile(updatedFiles);
  };
  const handleUploadClick = () => {
    document.getElementById("upload-input").click();
  };
  const handleRemoveImage = (index) => {
    const updatedImageCompain = [...imageComplain];
    updatedImageCompain.splice(index, 1);
    setImageComplain(updatedImageCompain);
  };
  const handleReport = async () => {
    const formData = new FormData();
    formData.append("ContractId", contractId);
    formData.append("Detail", textComplaint);
    imageComplain.map((image) => {
      formData.append(`ListImage`, image.file);
    });
    try {
      await addComplaint(formData);
      setApiContractLoading(true);
      toast.success("Đã khiếu nại thành công");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <dialog id="modal_complain" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn outline-none btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          Bạn cảm thấy không hài lòng với dịch vụ?
        </h3>
        <div className="flex items-center gap-2">
          <div>Chi tiết:</div>
          <div className="w-[80%]">
            <input
              value={textComplaint}
              onChange={(e) => setTextComplaint(e.target.value)}
              className="border p-2 rounded-[5px] w-full"
              type="text"
              name=""
              id=""
            />
          </div>
        </div>
        <div className="mt-5">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="upload-input"
          />
          <div className="flex flex-wrap gap-5">
            {imageComplain?.length > 0 ? (
              imageComplain.map((image, index) => (
                <div
                  key={index}
                  className="relative p-10 border rounded-[10px]"
                >
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
          {imageComplain?.length < 4 ? (
            <button
              onClick={() => handleUploadClick()}
              className="border p-1 rounded-lg my-5 outline-none"
            >
              <UploadOutlined />
              Thêm hình ảnh
            </button>
          ) : (
            "Bạn chỉ có thể thêm tối đa 4 ảnh"
          )}
        </div>
        <form method="dialog">
          <div className="flex justify-end">
            <button onClick={() => handleReport()} className="btn">
              Đăng
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default ModalComplain;
