import React, { useState, useEffect } from "react";
import Loading from "../../../components/Loading";
import { getListDeliveryFee } from "../../../utils/apiService";
import { Button, Tooltip } from "antd";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  EditOutlined,
} from "@ant-design/icons";
import ModalUpdateDeliveryFee from "./ModalUpdateDeliveryFee";

function DeliveryFeeManage() {
  const [listDeliveryFee, setList] = useState({});
  const [listAll, setListAll] = useState({});
  const [loading, setLoading] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [column, setColumn] = useState(4);
  useEffect(() => {
    fetchDeliveryFee();
  }, []);
  const fetchDeliveryFee = (current) => {
    setLoading(true);
    getListDeliveryFee()
      .then((data) => {
        setList(data.data.rows.slice(1));
        setListAll(data.data.rows);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const showUpdateModal = () => {
    setOpenUpdateModal(true);
  };
  const handleCancelUpdate = () => {
    setOpenUpdateModal(false);
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold text-lg mb-6">
            Bảng giá về chi phí vận chuyển Bonsai
          </div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="px-6 pt-6">
              <button
                className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                onClick={showUpdateModal}
              >
                <PlusCircleOutlined /> Chỉnh sửa Bảng giá
              </button>
            </div>

            {loading ? (
              <>
                <Loading loading={loading} isRelative={true} />
              </>
            ) : (
              <div className="shadow-lg rounded-lg  my-10">
                <table className="w-full table-fixed  mb-12 ">
                  <thead>
                    <tr className="bg-gray-100">
                      {listAll && listDeliveryFee.length > 0 ? (
                        listAll[0]?.items?.map((temp, index) => (
                          <th
                            className="w-1/4 py-4 px-6 text-left  font-bold"
                            key={index}
                          >
                            {temp}
                          </th>
                        ))
                      ) : (
                        <></>
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {listDeliveryFee &&
                      listDeliveryFee?.length > 0 &&
                      listDeliveryFee?.map((item, index) => {
                        return (
                          <tr key={index}>
                            {item?.items?.map((temp, index) => (
                              <td
                                className="py-4 px-6 border-b border-gray-200"
                                key={index}
                              >
                                {temp}
                              </td>
                            ))}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      <ModalUpdateDeliveryFee
        show={openUpdateModal}
        setShow={handleCancelUpdate}
        fetchDeliveryFee={fetchDeliveryFee}
      />
    </>
  );
}

export default DeliveryFeeManage;
