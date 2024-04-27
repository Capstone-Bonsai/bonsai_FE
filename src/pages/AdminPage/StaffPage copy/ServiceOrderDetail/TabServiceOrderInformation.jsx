import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  EyeOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  Space,
  Table,
  Input,
  Modal,
  Select,
  Tooltip,
  Button,
  Tag,
  Divider,
} from "antd";
const { Search, TextArea } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBonsaiPagination } from "../../../../redux/slice/bonsaiSlice";
import Loading from "../../../../components/Loading";
import { allCategory } from "../../../../redux/slice/categorySlice";
import { allStyle } from "../../../../redux/slice/styleSlice";
import { deleteBonsai } from "../../../../utils/bonsaiApi";
import { getStatusText } from "../../../../components/status/contractStatus";

function TabServiceOrderInformation({ serviceOrderDetail }) {
  const dispatch = useDispatch();

  return (
    <>
      {serviceOrderDetail?.loading === true ? (
        <Loading loading={serviceOrderDetail?.loading} />
      ) : (
        <div className="p-6 ">
          <div className="flex justify-center w-[100%]">
            <div className="p-4 mb-6 w-[100%]">
              <div className="font-medium text-lg">- Thông tin khách hàng:</div>
              <div className="grid grid-cols-2 w-[100%] p-6">
                <div>
                  <div className="font-medium grid grid-cols-2">
                    <div>Tên khách hàng:</div>{" "}
                    <div>{serviceOrderDetail?.customerName}</div>
                  </div>
                  <div className="font-medium grid grid-cols-2">
                    <div>Số điện thoại:</div>
                    <div>{serviceOrderDetail?.customerPhoneNumber}</div>
                  </div>
                  <div className="font-medium grid grid-cols-2">
                    <div>Trạng thái:</div>{" "}
                    <div
                      className={`${
                        serviceOrderDetail?.serviceOrderStatus == 1 ||
                        serviceOrderDetail?.serviceOrderStatus == 4 ||
                        serviceOrderDetail?.serviceOrderStatus == 5
                          ? "text-[red]"
                          : "text-[#3a9943]"
                      }`}
                    >
                      {getStatusText(serviceOrderDetail?.serviceOrderStatus)}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-medium grid grid-cols-2">
                    <div>Tổng chi phí:</div>
                    <div>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "VND",
                      }).format(serviceOrderDetail?.totalPrice)}
                    </div>
                  </div>
                  <div className="font-medium grid grid-cols-2">
                    <div>Ngày bắt đầu:</div>
                    <div>
                      {new Date(
                        serviceOrderDetail?.startDate
                      ).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="font-medium grid grid-cols-2">
                    <div>Ngày hết hạn:</div>
                    <div>
                      {new Date(
                        serviceOrderDetail?.endDate
                      ).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
              <Divider type="vertical" />
              <div className="font-medium text-lg">- Thông tin dịch vụ:</div>
              <div className=" w-[100%] py-6 px-12">
                <div className="font-medium grid grid-cols-3 m-4">
                  <div>Loại dịch vụ:</div>
                  <div className="col-span-2">
                    <Tag
                      color={
                        serviceOrderDetail?.service?.serviceType?.typeEnum === 2
                          ? "green"
                          : "blue"
                      }
                    >
                      {serviceOrderDetail?.service?.serviceType?.typeName}
                    </Tag>
                  </div>
                </div>
                <div className="font-medium grid grid-cols-3 m-4">
                  <div>Mô tả:</div>
                  <div className="col-span-2">
                    {serviceOrderDetail?.service?.serviceType?.description}
                  </div>
                </div>
              </div>
              <div className="font-medium text-lg">- Thông tin sân vườn/bonsai:</div>
              <div className=" w-[100%] py-6 px-12">
                {serviceOrderDetail?.service?.serviceType?.typeEnum === 2 ? (
                  <>
                    <div className="font-medium grid grid-cols-3 m-4">
                      <div>Địa chỉ sân vườn:</div>
                      <div className="col-span-2">
                        {serviceOrderDetail?.customerGarden?.address}
                      </div>
                    </div>
                    <div className="font-medium grid grid-cols-3 m-4">
                      <div>Khoảng cách</div>
                      <div className="col-span-2">
                        {(serviceOrderDetail?.distance / 1000).toLocaleString(
                          undefined,
                          {
                            maximumFractionDigits: 2,
                          }
                        )}{" "}
                        km
                      </div>
                    </div>
                    <div className="font-medium grid grid-cols-3 m-4">
                      <div>Diện tích sân vườn:</div>
                      <div className="col-span-2">
                        {serviceOrderDetail?.customerGarden?.square} m
                        <sup>2</sup>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="font-medium grid grid-cols-3 m-4">
                    <div>Bonsai của khách hàng:</div>
                    <div>
                      <Tag
                        color={
                          serviceOrderDetail?.service?.serviceType?.typeEnum ===
                          2
                            ? "red"
                            : "blue"
                        }
                      >
                        {serviceOrderDetail?.service?.serviceType?.typeName}
                      </Tag>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TabServiceOrderInformation;
