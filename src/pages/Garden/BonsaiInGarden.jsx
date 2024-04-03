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
            <h3 className="font-bold text-lg">{props.bonsaiInGarden}</h3>
            <div>
              <div>{bonsaiDetail?.name}</div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

export default BonsaiInGarden;
