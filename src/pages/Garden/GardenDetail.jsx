import React, { useEffect, useState } from "react";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  customerGardenDetail,
  updateCustomerGarden,
} from "../../redux/slice/userGarden";
import CompletedAddress from "../OrderProduct/CompletedAddress";
import { UploadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
function GardenDetail(propsDetail) {
  const { setGardenDetail, selectedGardenId } = propsDetail;
  const [updateAddress, setUpdateAddress] = useState("");
  const [changeAdress, setChangeAddress] = useState(false);
  const [file, setFile] = useState([]);
  const [updateSquare, setUpdateSquare] = useState("");

  const [loading, setLoading] = useState(false);
  console.log(file);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    dispatch(customerGardenDetail(selectedGardenId))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, [selectedGardenId]);
  const gardenDetail = useSelector((state) => state.garden.gardenById);
  useEffect(() => {
    setUpdateAddress(gardenDetail?.address);
    setUpdateSquare(gardenDetail?.square);
  }, [gardenDetail]);
  const handleUploadClick = () => {
    document.getElementById("upload-garden-image").click();
  };
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
    setLoading(true);
    const formData = new FormData();
    formData.append("Address", updateAddress);
    formData.append("Square", updateSquare);
    file?.map((imageFile) => {
      formData.append(`Image`, imageFile);
    });
    listImage
      ?.filter((image) => image.url.startsWith("https"))
      ?.map((image) => {
        formData.append(`OldImage`, image.url);
      });
    try {
      await updateCustomerGarden(formData, selectedGardenId);
      toast.success("Thành Công");
    } catch (error) {
      console.log(error);
      toast.error("Thất bại");
    } finally {
      setLoading(false); 
    }
  };
  return (
    <div>
      <button
        className="text-[20px] ml-5 w-[30px] h-[30px] rounded-full hover:bg-[#3a9943] hover:text-[#fff] flex items-center justify-center"
        onClick={() => setGardenDetail(false)}
      >
        <ArrowLeftOutlined />
      </button>
      {loading ? (
        <Loading loading={loading} isRelative={true} />
      ) : (
        <div className="w-[75%] m-auto">
          <div className="text-[28px] font=bold flex justify-center">
            Chi tiết vườn của bạn
          </div>
          <div className="flex items-center gap-3">
            <div>
              <span className="font-bold"> Địa chỉ:</span> {updateAddress}
            </div>
            <button
              onClick={() => setChangeAddress(!changeAdress)}
              className="bg-[#3a9943] text-[#fff] border hover:border-[green] p-3 rounded-[8px]"
            >
              <EditOutlined />
            </button>
          </div>
          {changeAdress ? (
            <div className="flex gap-3 items-center">
              <div>Chuyển địa chỉ: </div>
              <div className="border w-[250px]">
                <CompletedAddress setAddress={setUpdateAddress} />
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="flex my-2 items-center gap-2">
            <div className="font-bold">
              Diện tích(m<sup>2</sup>):
            </div>
            <div>
              <input
                className="border outline-none p-2 rounded-[8px]"
                value={updateSquare}
                onChange={(e) => setUpdateSquare(e.target.value)}
                type="number"
                name=""
                id=""
              />
            </div>
          </div>
          <div className="font-bold">Ảnh vuờn: </div>
          <div className="flex gap-5 flex-wrap py-3">
            {listImage?.length > 0
              ? listImage?.map((image, index) => (
                  <div
                    key={index}
                    className="relative rounded-[10px] w-[220px] h-[220px]"
                  >
                    <img
                      src={image.url}
                      className="object-cover w-full h-full"
                      alt={`Image ${index}`}
                    />
                    <button
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-2 text-[#f2f2f2] text-[30px] hover:text-[#3a9943]"
                    >
                      <CloseCircleOutlined />
                    </button>
                  </div>
                ))
              : ""}
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleAddImage}
              id="upload-garden-image"
            />
          </div>
          <div className="flex items-center gap-[50px]">
            {listImage?.length < 4 ? (
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
            <button
              onClick={handleUpdateGarden}
              className="bg-[#3A994A] p-3 border hover:border-[green] text-[#fff] rounded-[8px]"
            >
              Cập nhật vườn
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GardenDetail;
