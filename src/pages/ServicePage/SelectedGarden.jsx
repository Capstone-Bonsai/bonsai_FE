import React from "react";
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import unImage from "../../assets/unImage.png";
import { Link } from "react-router-dom";
function SelectedGarden(props) {
  console.log(props?.gardenNoPagin);
  return (
    <dialog id="my_modal_selectedGarden" className="modal">
      <div className="modal-box ">
        <form method="dialog">
          <button className="btn btn-sm btn-circle outline-none btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {props.userData ? (
          <>
            <h3 className="font-bold text-lg">Hello!</h3>
            {props.gardenNoPagin?.map((garden) => (
              <div
                key={garden.id}
                className="border-b flex justify-between py-3 items-center"
              >
                <div className="">
                  <img
                    className="w-[100px]"
                    src={
                      garden.customerGardenImages.length > 0
                        ? garden.customerGardenImages[0].image
                        : unImage
                    }
                    alt=""
                  />
                </div>
                <div className=" w-[70%]">
                  <div>
                    Địa chỉ: <span className="font-bold">{garden.address}</span>
                  </div>
                  <div>
                    Diện tích: {garden.square}m<sup>2</sup>
                  </div>
                </div>
                <div>
                  <div className="modal-action">
                    <form method="dialog">
                      {props.gardenSelected?.id != garden?.id ? (
                        <button
                          className="outline-none"
                          onClick={() => props.setGardenSelected(garden)}
                        >
                          <PlusCircleOutlined />
                        </button>
                      ) : (
                        <CheckCircleOutlined className="text-[#3a9943]" />
                      )}
                    </form>
                  </div>
                </div>
              </div>
            ))}{" "}
          </>
        ) : (
          <>
            <Link to="/login">Vui lòng đăng nhập</Link>
          </>
        )}
      </div>
    </dialog>
  );
}

export default SelectedGarden;
