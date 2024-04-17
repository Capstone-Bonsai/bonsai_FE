import React from "react";
import CompletedAddress from "../OrderProduct/CompletedAddress";
function AddCustomerGarden(propsAddGarden) {
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
            <CompletedAddress
              className=""
              setAddress={propsAddGarden.setNewAddress}
            />
          </div>
        </div>
        <div>
          <div className="text-[#3a9943]">
            Diện tích/m<sup>2</sup>
          </div>
          <input
            value={propsAddGarden.newSquare}
            onChange={(e) => propsAddGarden.setNewSquare(e.target.value)}
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
            onChange={propsAddGarden.handleImageChange}
            style={{ display: "none" }}
            id="upload-input"
          />
        </div>
        <div className="flex flex-wrap gap-5">
          {propsAddGarden.imageGarden.length > 0 ? (
            propsAddGarden.imageGarden.map((image, index) => (
              <div key={index} className="relative p-10 border rounded-[10px]">
                <img
                  src={image.imageURL}
                  className="object-cover w-[130px] h-[130px]"
                  alt=""
                />
                <button
                  className="absolute top-0 right-2 text-[#f2f2f2] text-[30px]"
                  onClick={() => propsAddGarden.handleRemoveImage(index)}
                >
                  <propsAddGarden.CloseCircleOutlined />
                </button>
              </div>
            ))
          ) : (
            <img
              src={propsAddGarden.noImage}
              className="object-cover w-[100px] h-[100px]"
              alt="No Image"
            />
          )}
        </div>
        {propsAddGarden.imageGarden.length < 4 ? (
          <button
            onClick={() => propsAddGarden.handleUploadClick()}
            className="border p-1 rounded-lg my-5 outline-none"
          >
            <propsAddGarden.UploadOutlined />
            Thêm hình ảnh
          </button>
        ) : (
          "Bạn chỉ có thể thêm tối đa 4 ảnh"
        )}
        <div className="modal-action">
          <form method="dialog">
            <button
              className="btn"
              onClick={() => propsAddGarden.handleAddNewGarden()}
            >
              Thêm vườn
            </button>{" "}
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default AddCustomerGarden;
