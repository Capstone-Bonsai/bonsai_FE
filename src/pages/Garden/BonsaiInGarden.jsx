import React from "react";
import Loading from "../../components/Loading";

function BonsaiInGarden(props) {
  const bonsaiDetail = props.bonsaiData;
  console.log(bonsaiDetail);
  return (
    <dialog id="bonsai_in_garden" className="modal text-left">
      <div className="modal-box">
        {props.loadingBonsai ? (
          <Loading loading={props.loadingBonsai} />
        ) : (
          <>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div>
              <div className="font-bold text-lg">{bonsaiDetail?.name}</div>
              <div>Mô tả: {bonsaiDetail?.description}</div>
              <div>Năm tuổi: {bonsaiDetail?.yearOfPlanting} năm</div>
              <div>{bonsaiDetail?.trunkDimenter}</div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

export default BonsaiInGarden;
