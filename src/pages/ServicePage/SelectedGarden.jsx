import React from "react";
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
function SelectedGarden(props) {
  console.log(props?.gardenNoPagin);
  return (
    <dialog id="my_modal_selectedGarden" className="modal">
      <div className="modal-box ">
        <h3 className="font-bold text-lg">Hello!</h3>
        {props.gardenNoPagin?.map((garden) => (
          <div key={garden.id} className="border flex justify-between">
            <div className="">
              <img src="" alt="" />
            </div>
            <div className=" w-[70%]">
              <div>{garden.address}</div>
              <div>{garden.square}</div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button
                  className="outline-none"
                  onClick={() => props.setGardenSelected(garden)}
                >
                  <PlusCircleOutlined />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </dialog>
  );
}

export default SelectedGarden;
