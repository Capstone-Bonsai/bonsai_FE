import { useDispatch, useSelector } from "react-redux";
import {
  PlusCircleOutlined,
  EditOutlined,
  EyeOutlined,
  DeleteOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import OrderCircleGraphs from "./OrderCircleGraphs";
import { useEffect } from "react";
import {
  allDashboard,
  allDashboardForStaff,
  allLineDashboard,
} from "../../../redux/slice/dashboardSlice";
import ServiceOrderCircleGraphs from "./ServiceOrderCircleGraphs";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import Loading from "../../../components/Loading";
import LineChart from "./LineChart";

export default function DashboardStaff() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dashboardForStaffDatas = useSelector(
    (state) => state.dashboard.allDashboardForStaffDTO.data
  );
  const loading = useSelector((state) => state.dashboard.allDashboardForStaffDTO.loading);
  useEffect(() => {
    dispatch(allDashboardForStaff());
  }, [dispatch]);

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-bold text-lg mb-6">Bảng điều khiển</div>
          <div className="w-[100%]">
            {dashboardForStaffDatas?.loading === true ? (
              <Loading loading={dashboardForStaffDatas?.loading} isRelative={true} />
            ) : (
              <>
                <div className="grid grid-cols-5 gap-6 mb-12">
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[orange] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Số lượng đơn hàng mới
                        </div>
                        <div className="font-semibold text-lg">
                          {dashboardForStaffDatas?.newOrder} Đơn hàng
                        </div>
                      </div>
                      <div className="flex justify-end items-center">
                        <Tooltip title="Quản lý đơn hàng">
                          <Button
                            type="text"
                            icon={<MenuOutlined style={{ fontSize: "25px" }} />}
                            onClick={() => {
                              navigate("/admin/order");
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[green] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Đơn hàng dịch vụ đang diễn ra
                        </div>
                        <div className="font-semibold text-lg">
                          {dashboardForStaffDatas ?.currentServiceOngoing} Đơn hàng
                        </div>
                      </div>
                      <div className="flex justify-end items-center">
                        <Tooltip title="Quản lý đơn hàng dịch vụ">
                          <Button
                            type="text"
                            icon={<MenuOutlined style={{ fontSize: "25px" }} />}
                            onClick={() => {
                              navigate("/admin/serviceOrder");
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
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
