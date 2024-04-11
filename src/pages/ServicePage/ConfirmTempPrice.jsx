import React from "react";
import Loading from "../../components/Loading";
import { formatPrice } from "../../components/formatPrice/FormatPrice";

function ConfirmTempPrice(props) {
  console.log(props.serviceTempPrice);
  const serviceConfirmDetail = props.serviceTempPrice;
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
            <h3 className="font-bold text-lg">Xác nhận đăng ký</h3>
            <div className="flex gap-2">
              Thời gian làm:
              <div>
                {new Date(serviceConfirmDetail.startDate).toLocaleDateString()}
              </div>
              -
              <div>
                {new Date(serviceConfirmDetail.endDate).toLocaleDateString()}
              </div>
            </div>
            <div>
              Số lượng người làm vườn: {serviceConfirmDetail.temporaryGardener}{" "}
              người
            </div>
            <div className="flex flex justify-end">
              <div className="w-[50%] border p-2">
                <div className="border-b">
                  <div>
                    Giá: {formatPrice(serviceConfirmDetail?.temporaryPrice)}
                  </div>
                  <div>
                    Phụ phí:{" "}
                    {formatPrice(serviceConfirmDetail?.temporarySurchargePrice)}
                  </div>
                </div>
                <div>
                  Tổng:{" "}
                  <span className="text-[#3a9943]">
                    {formatPrice(serviceConfirmDetail?.temporaryTotalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
        <div className="text-right flex justify-end gap-2 mt-2">
          <form
            onSubmit={() => props.cancelService(props.serviceTempPrice?.id)}
            method="dialog"
          >
            <button className="btn">Hủy bỏ</button>
          </form>
          <form
            onSubmit={() => props.acceptService(props.serviceTempPrice?.id)}
            method="dialog"
          >
            <button className="btn">Chấp nhận</button>
          </form>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmTempPrice;
