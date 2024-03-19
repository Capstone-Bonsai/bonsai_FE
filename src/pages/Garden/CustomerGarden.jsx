import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import NavbarUser from "../Auth/NavbarUser";
import { Carousel } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerGarden,
  fetchCustomerGarden,
} from "../../redux/slice/userGarden";
import Loading from "../../components/Loading";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { CloseCircleOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import address from "../../assets/address.jpg";
import square from "../../assets/square.png";
function CustomerGarden() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newSquare, setNewSquare] = useState("");
  const [imageGarden, setImageGarden] = useState([]);
  useEffect(() => {
    if (!gardens) {
      setLoading(true);
      dispatch(fetchCustomerGarden())
        .then(() => {
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching order data:", error);
          setLoading(false);
        });
    }
  }, []);
  const [file, setFile] = useState([]);
  console.log(file);
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
  const handleUploadClick = () => {
    document.getElementById("upload-input").click();
  };
  const gardens = useSelector((state) => state.garden.gardenDTO.items);

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
      fetchCustomerGarden();
      setLoading(false);
      toast.success("Thêm vườn thành công thành Công");
    } catch (error) {
      toast.error("Update không thành công", error);
    }
  };
  const handleRemoveImage = (index) => {
    const updatedImageGarden = [...imageGarden];
    updatedImageGarden.splice(index, 1);
    setImageGarden(updatedImageGarden);
  };
  return (
    <>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <MinHeight>
          <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
            <NavbarUser />
            <div className=" border text-center w-[75%] pt-5">
              <button
                className="bg-[#f2f2f2] text-black p-5 rounded-[5px] hover:bg-[#3A994A] hover:text-[#fff]"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Thêm vườn của bạn
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Thêm vườn của bạn</h3>
                  <div>
                    <div className="text-[#3a9943]">Địa chỉ</div>
                    <input
                      className="border outline-none w-[90%] h-[40px] my-2 px-2"
                      value={newAddress}
                      placeholder="Địa chỉ"
                      onChange={(e) => setNewAddress(e.target.value)}
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div>
                    <div className="text-[#3a9943]">Diện tích</div>
                    <input
                      value={newSquare}
                      onChange={(e) => setNewSquare(e.target.value)}
                      className="border outline-none w-[90%] h-[40px] my-2 mb-5"
                      type="text"
                      name=""
                      id=""
                    />
                  </div>
                  <div>
                    {" "}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                      id="upload-input"
                    />
                  </div>
                  <div className="flex flex-wrap gap-5">
                    {imageGarden.length > 0 ? (
                      imageGarden.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image.imageURL}
                            className="object-cover w-[100px] h-[100px]"
                            alt=""
                          />
                          <button
                            className="absolute top-0 right-0 text-[#fff]"
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
                  {imageGarden.length < 4 ? (
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
                  <div className="modal-action">
                    <form method="dialog">
                      <button className="btn">Đóng</button>
                    </form>
                    <button className="btn" onClick={handleAddNewGarden}>
                      Đăng Vườn
                    </button>
                  </div>
                </div>
              </dialog>
              {gardens?.map((garden) => (
                <div key={garden.id} className="flex p-4 gap-10">
                  <div className=" h-[250px] w-[45%]">
                    <Carousel autoplay>
                      {garden.customerGardenImages.length > 0 ? (
                        <Carousel autoplay>
                          {garden.customerGardenImages.map((imageGarden) => (
                            <div key={imageGarden.id}>
                              <img
                                src={imageGarden.image}
                                alt=""
                                style={{
                                  width: "100%",
                                  height: "250px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                          ))}
                        </Carousel>
                      ) : (
                        <img
                          src={noImage}
                          className=" bg-[red] w-[400px] h-[250px] object-cover border"
                          style={{ backgroundPosition: "bottom" }}
                          alt="No Image"
                        />
                      )}
                    </Carousel>
                  </div>
                  <div className="border-b w-full border-[#3a9943]">
                    <div className="text-[22px] font-[500] flex items-center">
                      <img src={address} className="w-[50px]" alt="" />
                      {garden.address}
                    </div>
                    <div className="flex items-center">
                      <img src={square} className="w-[50px]" alt="" />
                      <span className="font-[400] opacity-50">Diện tích:</span>
                      {garden.square} m²
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MinHeight>
      )}
    </>
  );
}

export default CustomerGarden;
