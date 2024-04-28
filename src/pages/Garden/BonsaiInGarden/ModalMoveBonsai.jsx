import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCustomerGarden,
  moveBonsai,
} from "../../../redux/slice/userGarden";
import { Pagination } from "antd";
import Loading from "../../../components/Loading";
import noImage from "../../../assets/unImage.png";
import { toast } from "react-toastify";
import { customerBonsai } from "../../../redux/slice/bonsaiSlice";
function ModalMoveBonsai(propsModalMove) {
  const { prevAddress, bonsaiId, gardenOfBonsaiId, setFetchData, fetchData } =
    propsModalMove;
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(3);
  const dispatch = useDispatch();
  const [prevGarden, setPrevGarden] = useState("");
  const [loading, setLoading] = useState(false);
  const [moveError, setMoveError] = useState("")
  useEffect(() => {
    setLoading(true);
    dispatch(fetchCustomerGarden({ pageIndex: pageIndex - 1, pageSize }))
      .then(() => {
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
        setLoading(false);
      });
  }, [pageIndex, pageSize]);
  const gardens = useSelector((state) => state.garden?.gardenDTO);

  const { totalItemsCount } = useSelector((state) => state.garden?.gardenDTO);
  const handlePageChange = (page) => {
    setPageIndex(page);
  };
  const handleMoveBonsai = async () => {
    if (prevGarden && prevGarden.id == gardenOfBonsaiId) {
      setMoveError("Cây bonsai đã thuộc vườn này!");
      return;
    }
    const payload = {
      customerBonsaiId: bonsaiId,
      customerGardenId: prevGarden?.id,
    };
    try {
      document.getElementById("modal_move_bonsai").close();
      const res = await moveBonsai(payload);
      toast.success("Chuyển cây thành công");
      // fetchDataAfterMove();
      setFetchData(!fetchData);
    } catch (error) {
      console.log(error);
      toast.error("Chuyển cây thất bại");
    }
  };
  return (
    <dialog id="modal_move_bonsai" className="modal">
      <div className="modal-box max-w-[800px]">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <h3 className="font-bold text-lg">Bạn muốn đổi vườn</h3>
        <div><span className="font-bold text-[20px]">Cây đang ở vườn:</span> {prevAddress}</div>
        <div><span className="font-bold text-[20px]">bạn muốn đổi qua vườn:</span> {prevGarden?.address}</div>
        {moveError && <div className="text-[red] text-[14px]">{moveError}</div>}
        {loading ? (
          <Loading loading={loading} isRelative={true} />
        ) : (
          <div className="h-[400px] overflow-y-auto">
            {gardens?.items?.map((garden) => (
              <div className="border rounded-[8px] my-2" key={garden?.id}>
                <button
                  onClick={() => {setPrevGarden(garden); setMoveError("")}}
                  className="flex p-2 w-full gap-3 border hover:border-[green]"
                >
                  {/* {garden?.customerGardenImages?.length > 0 ? (
                    garden?.customerGardenImages?.map((image) => ( */}
                  <div className="w-[200px] h-[100px]">
                    <img
                      className="w-full h-full "
                      src={
                        garden?.customerGardenImages?.length > 0
                          ? garden?.customerGardenImages[0]?.image
                          : noImage
                      }
                      alt=""
                    />
                  </div>
                  {/* )) */}
                  {/* ) : (
                    <div>
                      <img
                        className="w-[300px] h-[200px] "
                        src={noImage}
                        alt=""
                      />
                    </div>
                  )} */}
                  <div className="text-start w-[60%]">
                    <div>{garden?.address}</div>
                    <div>Diện tích: {garden?.square}</div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="text-end">
          <button
            onClick={() => handleMoveBonsai()}
            className="bg-[#3a9943] text-[#fff] border hover:border-[green] p-3 rounded-[8px]"
          >
            Xác nhận đổi vườn
          </button>
        </div>
        <Pagination
          current={pageIndex}
          pageSize={pageSize}
          total={totalItemsCount}
          onChange={handlePageChange}
          className="text-center mt-5"
        />
      </div>
    </dialog>
  );
}

export default ModalMoveBonsai;
