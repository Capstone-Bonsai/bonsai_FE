import React from "react";
import Loading from "../../components/Loading";
import noImage from '../../assets/unImage.png'
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
            <div className="flex gap-2">
              <div>
                <img
                className="w-[100px] h-[100px] object-cover"
                  src={
                    bonsaiDetail?.bonsaiImages?.length > 0
                      ? bonsaiDetail?.bonsaiImages[0].imageUrl
                      : noImage
                  }
                  alt=""
                />{" "}
              </div>
              <div>
                <div className="font-bold text-lg">{bonsaiDetail?.name}</div>
                <div>Code: {bonsaiDetail?.code}</div>
                <div>Năm trồng: {bonsaiDetail?.yearOfPlanting}</div>
                <div>Hoành cây: {bonsaiDetail?.trunkDimenter}cm</div>
                <div>Chiều cao: {bonsaiDetail?.height}m</div>
                <div>Số thân:  {bonsaiDetail?.numberOfTrunk}</div>
              </div>
            </div>
          </>
        )}
      </div>
    </dialog>
  );
}

export default BonsaiInGarden;
