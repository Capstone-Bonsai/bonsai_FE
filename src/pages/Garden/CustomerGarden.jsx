import React, { useEffect, useState } from "react";
import MinHeight from "../../components/MinHeight";
import NavbarUser from "../Auth/NavbarUser";
import { useDispatch, useSelector } from "react-redux";
import {
  addCustomerGarden,
  fetchCustomerGarden,
} from "../../redux/slice/userGarden";
import Loading from "../../components/Loading";
import { UploadOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";

function CustomerGarden() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newSquare, setNewSquare] = useState("");
  const [imageGarden, setImageGarden] = useState();
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageGarden(file);
    // const imageURL = URL.createObjectURL(file);
  };
  const handleUploadClick = () => {
    document.getElementById("upload-input").click();
  };
  const gardens = useSelector((state) => state.garden.gardenDTO.items);

  const handleAddNewGarden = async () => {
    const formData = new FormData();
    formData.append("Address", newAddress);
    formData.append("Square", newSquare);
    formData.append("Image", imageGarden);
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
  return (
    <MinHeight>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="m-auto w-[70%] flex mt-10 justify-between bg-[#ffffff] mb-5">
          <NavbarUser />
          <div className=" border w-[75%]">
            <button
              className="bg-[#3a9943] text-[#ffffff] p-2 rounded-[5px]"
              onClick={() => document.getElementById("my_modal_1").showModal()}
            >
              Thêm vườn của bạn
            </button>
            <dialog id="my_modal_1" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Thêm vườn của bạn</h3>
                <div>
                  <div>Địa chỉ</div>
                  <input
                    className="border outline-none"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    type="text"
                    name=""
                    id=""
                  />
                </div>
                <div>
                  <div>Diện tích</div>
                  <input
                    value={newSquare}
                    onChange={(e) => setNewSquare(e.target.value)}
                    className="border outline-none"
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
                <button
                  onClick={handleUploadClick}
                  className="border p-1 rounded-lg my-5 outline-none"
                >
                  <UploadOutlined />
                  Tải hình ảnh
                </button>
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn">Đóng</button>
                  </form>
                  <button className="btn" onClick={handleAddNewGarden}>
                    Thêm hình ảnh
                  </button>
                </div>
              </div>
            </dialog>
            {gardens?.map((garden) => (
              <div key={garden.id} className=" flex p-4">
                <div>
                  {garden.customerGardenImages.map((imageGarden) => (
                    <img
                      key={imageGarden.id}
                      className="w-[300px] h-[300px]"
                      src={imageGarden.image}
                      alt=""
                    />
                  ))}
                </div>
                <div>
                  <div>Địa chỉ: {garden.address}</div>
                  <div>Diện tích: {garden.square} m²</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </MinHeight>
  );
}

export default CustomerGarden;
