import React from "react";
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
import noImage from "../../assets/unImage.png";
import { Link } from "react-router-dom";
function SelectedBonsai(props) {
  console.log(props.bonsaiInGardenData);
  const listBonsai = props.bonsaiInGardenData?.items;
  console.log(listBonsai);
  return (
    <dialog id="my_modal_selectedBonsai" className="modal">
      <div className="modal-box ">
        {props.userData ? (
          <>
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Chọn bonsai của bạn</h3>
            {listBonsai?.length > 0 ? (
              listBonsai?.map((bonsai) => (
                <div
                  key={bonsai.bonsaiId}
                  className="flex justify-between items-center border-b"
                >
                  <div className="flex items-center gap-2 my-2">
                    <img
                      className="w-[50px] h-[50px] object-cover"
                      src={
                        bonsai.bonsai.bonsaiImages.length > 0
                          ? bonsai.bonsai.bonsaiImages[0].imageUrl
                          : noImage
                      }
                    />
                    <div>
                      <div className="text-[18px]">{bonsai.bonsai.name}</div>
                      <div className="text-[14px] opacity-70">
                        {bonsai.bonsai.description}
                      </div>
                    </div>
                  </div>
                  <form method="dialog">
                    {props.treeSelected?.id != bonsai?.id ? (
                      <button
                        className="outline-none"
                        onClick={() => props.setTreeSelected(bonsai)}
                      >
                        <PlusCircleOutlined />
                      </button>
                    ) : (
                      <CheckCircleOutlined className="text-[#3a9943]" />
                    )}
                  </form>
                </div>
              ))
            ) : (
              <Link to="/CustomerGarden" className="hover:text-[#3a9943]">Vui lòng thêm cây</Link>
            )}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </dialog>
  );
}

export default SelectedBonsai;
