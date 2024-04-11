import React from "react";
import { PlusCircleOutlined, CheckCircleOutlined } from "@ant-design/icons";
function SelectedBonsai(props) {
  console.log(props.bonsaiInGardenData);
  const listBonsai = props.bonsaiInGardenData?.items;
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
            <h3 className="font-bold text-lg">Hello!</h3>
            {listBonsai?.map((bonsai) => (
              <div key={bonsai.bonsaiId}>
                <div>{bonsai.bonsai.name}</div>
                <div className="modal-action">
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
              </div>
            ))}
          </>
        ) : (
          <div></div>
        )}
      </div>
    </dialog>
  );
}

export default SelectedBonsai;
