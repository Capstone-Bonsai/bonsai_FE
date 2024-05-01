import React, { useRef, useState } from "react";
import CompletedAddress from "../OrderProduct/CompletedAddress";
import { CloseCircleOutlined, UploadOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import {
  addCustomerGarden,
  fetchCustomerGarden,
} from "../../redux/slice/userGarden";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";

function AddCustomerGarden(props) {
  const [imageGarden, setImageGarden] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [newSquare, setNewSquare] = useState("");
  const [errorAddress, setErrorAddress] = useState("");
  const [errorSquare, setErrorSquare] = useState("");
  const [newLoading, setNewLoading] = useState(false);
  const { setGardenLoading, gardenLoading, loading, setLoading } = props;
  console.log(gardenLoading);
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

    e.target.value = null;
  };
  const handleRemoveImage = (index) => {
    const updatedImageGarden = [...imageGarden];
    updatedImageGarden.splice(index, 1);
    setImageGarden(updatedImageGarden);
  };
  const resetFieldGarden = () => {
    setNewAddress("");
    setNewSquare("");
    setImageGarden([]);
  };
  const handleAddNewGarden = async (e) => {
    e.preventDefault();
    let isValid = true;
    if (!newAddress.trim()) {
      setErrorAddress("Vui lòng nhập địa chỉ");
      isValid = false;
    }
    if (!newSquare.trim()) {
      setErrorSquare("Vui lòng nhập diện tích");
      isValid = false;
    } else if (parseFloat(newSquare) <= 0) {
      setErrorSquare("Diện tích phải lớn hơn 0");
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    const formData = new FormData();
    formData.append("Address", newAddress);
    formData.append("Square", newSquare);
    imageGarden?.map((image) => {
      formData.append(`Image`, image.file);
    });
    setNewLoading(true);
    if (setLoading) {
      setLoading(true);
    }
    addCustomerGarden(formData)
      .then(() => {
        setGardenLoading(!gardenLoading);
        toast.success("Thêm vườn thành công");
        resetFieldGarden();
        dispatch(fetchCustomerGarden({ pageIndex: 0, pageSize: 5 }));
      })
      .catch((error) => {
        toast.error(error?.response?.data);
      })
      .finally(() => {
        if (setLoading) {
          setLoading(true);
        }
        setNewLoading(false);
        document.getElementById("my_modal_1").close();
      });
  };

  return (
    <dialog id="my_modal_1" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {newLoading ? (
          <Loading loading={newLoading} isRelative={true} />
        ) : (
          <>
            <h3 className="font-bold text-lg">Thêm vườn của bạn</h3>
            <div className="my-3">
              <div className="text-[#3a9943]">Địa chỉ</div>
              <div
                className={`w-full border ${
                  errorAddress != "" ? "border-[red]" : ""
                } `}
              >
                <input
                  type="hidden"
                  onChange={() => setErrorAddress("")}
                  name=""
                  id=""
                />
                <CompletedAddress className="" setAddress={setNewAddress} />
              </div>
              {errorAddress != "" ? (
                <div className="text-[#ff4d4f] text-[14px]">{errorAddress}</div>
              ) : (
                ""
              )}
            </div>
            <div className="my-2">
              <div className="text-[#3a9943]">
                Diện tích/m<sup>2</sup>
              </div>
              <input
                value={newSquare}
                onChange={(e) => {
                  setNewSquare(e.target.value), setErrorSquare("");
                  setErrorAddress("");
                }}
                className={`border outline-none w-full px-2 h-[40px] ${
                  errorSquare != "" ? "border-[#ff4d4f]" : ""
                }`}
                type="number"
                name=""
                id=""
              />
              {errorSquare != "" ? (
                <div className="text-[#ff4d4f] text-[14px]">{errorSquare}</div>
              ) : (
                ""
              )}
            </div>
            <div className="my-2  ">
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
                  <div
                    key={index}
                    className="relative rounded-[10px] w-[220px] h-[220px]"
                  >
                    <img
                      src={image.imageURL}
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

            <button onClick={handleAddNewGarden} type="submit" className="btn">
              Thêm vườn
            </button>
          </>
        )}
      </div>
    </dialog>
  );
}

export default AddCustomerGarden;
