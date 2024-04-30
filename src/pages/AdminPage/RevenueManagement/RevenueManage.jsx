import { useDispatch, useSelector } from "react-redux";
import {
  PlusCircleOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  allDashboard,
  allDashboardForStaff,
  allLineDashboard,
  allRevenue,
} from "../../../redux/slice/dashboardSlice";
import { Button, Tabs, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import Loading from "../../../components/Loading";
import OrderRevenue from "./OrderRevenue";
import ServiceOrderRevenue from "./ServiceOrderRevenue";
import { exportPdfFile } from "../../../utils/apiService";

export default function RevenueManage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const revenueDatas = useSelector(
    (state) => state.dashboard.allRevenueDTO.data
  );

  const loading = useSelector((state) => state.dashboard.allRevenueDTO.loading);
  useEffect(() => {
    dispatch(allRevenue());
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(exportPdfFile());
  // }, [dispatch]);

  const downloadFile = async () => {
    exportPdfFile()
      .then((data) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data.data);
        link.download = "Doanh thu.xlsx";
        link.click();
        URL.revokeObjectURL(link.href);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-bold text-lg mb-6">Quản lý doanh thu</div>
          <div className="w-[100%]">
            {revenueDatas?.loading === true ? (
              <Loading loading={revenueDatas?.loading} isRelative={true} />
            ) : (
              <>
                <div className="grid grid-cols-5 gap-6 mb-12">
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[orange] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Doanh thu đơn hàng bonsai
                        </div>
                        <div className="font-semibold text-lg">
                          {formatPrice(revenueDatas?.totalOrderIncome)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[green] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Doanh thu đơn hàng dịch vụ
                        </div>
                        <div className="font-semibold text-lg">
                          {formatPrice(revenueDatas?.totalServiceIncome)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button onClick={() => downloadFile()}>Tải doanh thu</Button>
                <div className="flex justify-center">
                  <div className="w-[100%]">
                    <Tabs
                      defaultActiveKey="1"
                      type="card"
                      items={[
                        {
                          key: "1",
                          label: `Doanh thu đơn hàng bonsai`,
                          children: <OrderRevenue />,
                        },
                        {
                          key: "2",
                          label: `Doanh thu đơn hàng dịch vụ`,
                          children: <ServiceOrderRevenue />,
                        },
                      ]}
                    />
                  </div>
                </div>
                {/* <div className="grid grid-cols-4 gap-4a">
                  <div className="col-span-3 m-2 ">
                    <div className="bg-[#ffffff] drop-shadow-2xl rounded-md p-6 ">
                      <div className="font-bold text-xl">
                        Tổng doanh thu dịch vụ
                      </div>
                      <div>
                        <LineChart
                          height="600px"
                          color={["#115293", "#1976d2"]}
                          data={linedashboardForStaffDatas?.data}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="bg-[#ffffff] drop-shadow-2xl rounded-md p-6 mb-4">
                      <div className="font-bold text-xl">Đơn hàng bonsai</div>
                      <div>
                        <OrderCircleGraphs
                          height="300px"
                          color={[
                            "#115293",
                            "#1976d2",
                            "#4791db",
                            "#bfdaf2",
                            "#ddebf8",
                          ]}
                          data={dashboardForStaffDatas?.orderCircleGraphs}
                        />
                      </div>
                    </div>
                    <div className="bg-[#ffffff] drop-shadow-2xl rounded-md p-6 mt-4">
                      <div className="font-bold text-xl">Đơn hàng dịch vụ chăm sóc</div>
                      <div>
                        <ServiceOrderCircleGraphs
                          height="300px"
                          color={[
                            "#ddebf8",
                            "#bfdaf2",
                            "#4791db",
                            "#1976d2",
                            "#115293",
                          ]}
                          data={dashboardForStaffDatas?.serviceOrderCircleGraphs}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div>
        <LineChart height="350px" />
      </div>

      <div>
        <ComparisonChart height="350px" />
      </div>

      <div>
        <AreaChart height="350px" />
      </div> */
}
