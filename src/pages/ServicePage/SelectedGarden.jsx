import React from "react";

function SelectedGarden() {
  return (
    <dialog id="my_modal_selectedGarden" className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Hello!</h3>
        <p className="py-4">Press ESC key or click the button below to close</p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn">Thêm vườn</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default SelectedGarden;
