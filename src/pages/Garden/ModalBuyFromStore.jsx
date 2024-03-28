import React, { useState } from "react";
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { addBonsaiBuyFromStore } from "../../redux/slice/userGarden";
import { toast } from "react-toastify";
function ModalBuyFromStore(props) {
  const [selectBonsai, setSelectBonsai] = useState("");
  const handleBuyFromStore = async () => {
    try {
      await addBonsaiBuyFromStore(selectBonsai, props.selectedGardenId);
      toast.success("Thêm cây thành công");
    } catch (error) {
      toast.error("Thêm cây không thành công", error);
    }
  };
  return (
    <dialog id="my_modal_3" className="modal text-left">
      <div className="modal-box">
        <form method="dialog" onClick={() => setSelectBonsai("")}>
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Thêm cây của cửa hàng</h3>
        <div>{props.selectedGardenId}</div>
        {props.boughtBonsai?.map((bonsai) => (
          <div
            key={bonsai.id}
            className="flex justify-between border-b border-[#3a9943] items-center p-2 my-2"
          >
            <div className="flex gap-5">
              <div className="w-[100px] h-[100px]">
                <img
                  className="w-full h-full object-cover "
                  src={bonsai?.bonsaiImages[0].imageUrl}
                  alt=""
                />
              </div>
              <div>
                <div className="text-[#3a9943] text-xl font-bold">
                  {bonsai.name}
                </div>
                <div className="opacity-70">{bonsai?.description}</div>
              </div>
            </div>
            <div className="text-2xl">
              {selectBonsai === bonsai.id ? (
                <CheckCircleOutlined className="text-[#3e9943]" />
              ) : (
                <button onClick={() => setSelectBonsai(bonsai.id)}>
                  <PlusCircleOutlined />
                </button>
              )}
            </div>
          </div>
        ))}
        <div className="text-right">
          <form onSubmit={handleBuyFromStore} method="dialog">
            <button className="btn">Thêm cây</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ModalBuyFromStore;
