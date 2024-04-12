import React from "react";

function ModalComplain() {
  return (
    <dialog id="modal_complain" className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">
          Bạn cảm thấy không hài lòng với dịch vụ?
        </h3>
        <div>
          <div>Chi tiết:</div>
          <div>
            <input type="text" name="" id="" />
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ModalComplain;
