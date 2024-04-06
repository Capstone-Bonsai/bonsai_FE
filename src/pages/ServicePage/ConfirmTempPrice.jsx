import React from "react";
import Loading from "../../components/Loading";

function ConfirmTempPrice(props) {
  console.log(props.serviceTempPrice);
  return (
    <dialog id="confirm_temp_price" className="modal">
      <div className="modal-box ">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        {props.loadingTempPrice ? (
          <Loading loading={props.loadingTempPrice} />
        ) : (
          <>
            <h3 className="font-bold text-lg">Hello!</h3>
            <div>{props.serviceTempPrice?.id}</div>
          </>
        )}
        <div className="text-right">
          <form onSubmit={() => props.cancelService(props.serviceTempPrice?.id)} method="dialog">
            <button className="btn">Hủy bỏ</button>
          </form>
          <form onSubmit={() => props.acceptService(props.serviceTempPrice?.id)} method="dialog">
            <button className="btn">Chấp nhận</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmTempPrice;
