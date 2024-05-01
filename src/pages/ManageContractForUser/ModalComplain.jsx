import React, { useEffect, useState } from "react";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import { addComplaint } from "../../redux/slice/contractSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading";
function ModalComplain(props) {
  const { contractId, contractDetailById, setApiContractLoading } = props;
  const [imageComplain, setImageComplain] = useState([]);
  const [textComplaint, setTextComplaint] = useState("");
  const [errorTextComplaint, setErrorTextComplaint] = useState("");
  const [errorImageComplaint, setErrorImageComplaint] = useState("");
  console.log(textComplaint);
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
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
    setErrorImageComplaint("");
    setImageComplain(updatedImageCompain);
    setFile(updatedFiles);
    e.target.value = null;
  };
  const handleUploadClick = () => {
    document.getElementById("upload-input").click();
  };
  const handleRemoveImage = (index) => {
    const updatedImageCompain = [...imageComplain];
    updatedImageCompain.splice(index, 1);
    setImageComplain(updatedImageCompain);
  };
  const closeModal = () => {
    const modal = document.getElementById("modal_complain");
    if (modal) {
      modal.close();
    }
  };
  const handleReport = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (!textComplaint.trim()) {
      setErrorTextComplaint("Vui lòng nhập chi tiết!!");
      isValid = false;
    }
    if (imageComplain?.length == 0) {
      setErrorImageComplaint("Vui lòng thêm hình ảnh!!");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("ServiceOrderId", contractId);
    formData.append("Detail", textComplaint);
    imageComplain?.map((image) => {
      formData.append(`ListImage`, image.file);
    });
    addComplaint(formData)
      .then(() => {
        toast.success("Đã khiếu nại thành công");
        setApiContractLoading(true);
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setLoading(false);
        closeModal();
      });
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
        {loading ? (
          <Loading loading={loading} />
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div>Chi tiết:</div>
              <div className="w-[80%]">
                <input
                  value={textComplaint}
                  onChange={(e) => {
                    setTextComplaint(e.target.value), setErrorTextComplaint("");
                  }}
                  className={`border p-2 rounded-[5px] w-full outline-none ${
                    errorTextComplaint != "" ? "border-[red]" : ""
                  }`}
                  type="text"
                  name=""
                  id=""
                />
                {errorTextComplaint != "" ? (
                  <div className="text-[red] font-[14px]">
                    {errorTextComplaint}
                  </div>
                ) : (
                  ""
                )}
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
              <div className={`flex flex-wrap gap-5 `}>
                {imageComplain?.length > 0 ? (
                  imageComplain?.map((image, index) => (
                    <div
                      key={index}
                      className={`relative border w-[220px] h-[220px] ${
                        errorImageComplaint != "" ? "border-[red]" : ""
                      }`}
                    >
                      <img
                        src={image.imageURL}
                        className={`object-cover w-full h-full ${
                          errorImageComplaint != "" ? "border-[red]" : ""
                        }`}
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
                    className={`object-cover border w-[100px] h-[100px] ${
                      errorImageComplaint != "" ? "border-[red]" : ""
                    }`}
                    alt="No Image"
                  />
                )}
              </div>
              {imageComplain?.length < 4 ? (
                <button
                  onClick={() => handleUploadClick()}
                  className={`border p-1 rounded-lg my-5 outline-none ${
                    errorImageComplaint != "" ? "border-[red] " : ""
                  }`}
                >
                  <UploadOutlined />
                  Thêm hình ảnh
                </button>
              ) : (
                "Bạn chỉ có thể thêm tối đa 4 ảnh"
              )}
              {errorImageComplaint != "" ? (
                <div className="text-[14px] text-[red]">
                  {errorImageComplaint}
                </div>
              ) : (
                ""
              )}
            </div>
          </>
        )}
        <form onSubmit={handleReport} method="dialog">
          <div className="flex justify-end">
            <button
              type="submit"
              // onClick={() => handleReport()}
              className="btn"
            >
              Đăng
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

export default ModalComplain;
