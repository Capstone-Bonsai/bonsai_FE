import React, { useState } from "react";
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import { addBonsaiBuyFromStore } from "../../redux/slice/userGarden";
import { toast } from "react-toastify";
function ModalBuyFromStore(props) {
  const [selectBonsai, setSelectBonsai] = useState("");
  console.log(props.selectedGardenId);
  console.log(selectBonsai);
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
        <h3 className="font-bold text-lg">Hello!</h3>
        <div>{props.selectedGardenId}</div>
        {props.boughtBonsai?.map((bonsai) => (
          <div key={bonsai.id} className="flex justify-between">
            <div>
              <div>{bonsai.name}</div>
            </div>
            {selectBonsai === bonsai.id ? (
              <CheckCircleOutlined className="text-[#3e9943]" />
            ) : (
              <button onClick={() => setSelectBonsai(bonsai.id)}>
                <PlusCircleOutlined />
              </button>
            )}
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
