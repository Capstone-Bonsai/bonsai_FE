import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  customerGardenDetail,
  updateCustomerGarden,
} from "../../redux/slice/userGarden";
import CompletedAddress from "../OrderProduct/CompletedAddress";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
function GardenDetail(propsDetail) {
  const { setGardenDetail, selectedGardenId } = propsDetail;
  const [updateAddress, setUpdateAddress] = useState("");
  const [updateSquare, setUpdateSquare] = useState("");
  const [file, setFile] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  console.log(file);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(customerGardenDetail(selectedGardenId));
  }, [selectedGardenId]);
  const handleUploadClick = () => {
    document.getElementById("upload-garden-image").click();
  };
  const gardenDetail = useSelector((state) => state.garden.gardenById);
  const [listImage, setListImage] = useState([]);
  console.log(listImage);
  const fetchListImage = () => {
    const image = gardenDetail?.customerGardenImages?.map((gardenImage) => ({
      url: gardenImage.image,
    }));
    setListImage(image);
  };

  useEffect(() => {
    fetchListImage();
    setFile([]);
    // const oldImages = listImage?.filter((image) =>
    //   image.url.startsWith("https")
    // );
    // setOldImages(oldImages);
  }, [gardenDetail]);

  // const updateOldImages = (imageList) => {
  //   const oldImages = imageList.filter((image) =>
  //     image.url.startsWith("https")
  //   );
  //   setOldImages(oldImages);
  // };
  const handleAddImage = (e) => {
    const files = e.target.files;
    const updatedListImage = [...listImage];
    const updatedFile = [...file];
    for (let i = 0; i < files.length; i++) {
      const newFile = files[i];
      const imageURL = URL.createObjectURL(newFile);
      updatedListImage.push({ url: imageURL });
      updatedFile.push(newFile);
    }
    setListImage(updatedListImage);
    setFile(updatedFile);
    // updateOldImages(updatedListImage);
    e.target.value = null;
  };

  const handleRemoveImage = (index) => {
    const updatedList = [...listImage];
    updatedList.splice(index, 1);
    setListImage(updatedList);

    const updatedFile = [...file];
    updatedFile.splice(index, 1);
    setFile(updatedFile);
    // updateOldImages(updatedList);
  };
  const handleUpdateGarden = async () => {
    const formData = new FormData();
    formData.append("Address", updateAddress);
    formData.append("Square", updateSquare);
    file?.map((imageFile) => {
      formData.append(`Image`, imageFile);
    });
    listImage
      .filter((image) => image.url.startsWith("https"))
      .map((image) => {
        formData.append(`OldImage`, image.url);
      });
    try {
      await updateCustomerGarden(formData, selectedGardenId);
      toast.success("Thành Công");
    } catch (error) {
      console.log(error);
      toast.error("Thất bại");
    }
  };
  return (
    <div>
      <button onClick={() => setGardenDetail(false)}>
        <ArrowLeftOutlined />
      </button>
      <div>{gardenDetail?.address}</div>
      <CompletedAddress setAddress={setUpdateAddress} />
      <div>
        <div>Diện tích:</div>
        <input
          value={updateSquare}
          onChange={(e) => setUpdateSquare(e.target.value)}
          type="number"
          name=""
          id=""
        />
      </div>
      {listImage?.length > 0
        ? listImage?.map((image, index) => (
            <div
              key={index}
              className="relative p-10 border rounded-[10px] w-[220px]"
            >
              <img
                src={image.url}
                className="object-cover w-[130px] h-[130px]"
                alt={`Image ${index}`}
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-2 text-[#f2f2f2] text-[30px]"
              >
                <CloseCircleOutlined />
              </button>
            </div>
          ))
        : ""}
      <div>
        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleAddImage}
          id="upload-garden-image"
        />
      </div>
      <button
        onClick={handleUploadClick}
        className="border p-1 rounded-lg my-5 outline-none"
      >
        <UploadOutlined />
        Thêm hình ảnh
      </button>
      <button
        onClick={handleUpdateGarden}
        className="bg-[#3A994A] p-3 text-[#fff] rounded-[8px]"
      >
        Cập nhật vườn
      </button>
    </div>
  );
}

export default GardenDetail;
