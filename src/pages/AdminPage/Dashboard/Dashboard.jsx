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
  allLineDashboard,
} from "../../../redux/slice/dashboardSlice";
import ServiceOrderCircleGraphs from "./ServiceOrderCircleGraphs";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";
import Loading from "../../../components/Loading";
import LineChart from "./LineChart";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dashboardDatas = useSelector(
    (state) => state.dashboard.allDashboardDTO
  );
  const lineDashboardDatas = useSelector(
    (state) => state.dashboard.allLineDashboardDTO
  );
  const loading = useSelector((state) => state.dashboard.loading);
  useEffect(() => {
    dispatch(allDashboard());
  }, [dispatch]);

  useEffect(() => {
    dispatch(allLineDashboard());
  }, [dispatch]);
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-bold text-lg mb-6">Bảng điều khiển</div>
          <div className="w-[100%]">
            {dashboardDatas?.loading === true ? (
              <Loading loading={dashboardDatas?.loading} isRelative={true} />
            ) : (
              <>
                <div className="grid grid-cols-5 gap-6 mb-12">
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[red] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Số lượng người dùng mới
                        </div>
                        <div className="font-semibold text-lg">
                          {dashboardDatas?.newUser} Người
                        </div>
                      </div>
                      <div className="flex justify-end items-center">
                        <Tooltip title="Quản lý người dùng">
                          <Button
                            type="text"
                            icon={<MenuOutlined style={{ fontSize: "25px" }} />}
                            onClick={() => {
                              navigate("/admin/user");
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[orange] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Số lượng đơn hàng mới
                        </div>
                        <div className="font-semibold text-lg">
                          {dashboardDatas?.newOrder} Đơn hàng
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
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[blue] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Doanh thu đơn hàng
                        </div>
                        <div className="font-semibold text-lg">
                          {formatPrice(dashboardDatas?.totalOrderIncome)}
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
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[yellow] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Doanh thu đơn vụ hàng dịch vụ
                        </div>
                        <div className="font-semibold text-lg">
                          {formatPrice(dashboardDatas?.totalServiceIncome)}
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
                  <div className="bg-[#ffffff] drop-shadow-2xl p-6 border-[green] border-l-[10px] rounded-[5px]">
                    <div className="grid grid-cols-3 h-[100%]">
                      <div className="col-span-2">
                        <div className="font-semibold text-md pb-4 h-[70%]">
                          Đơn hàng dịch vụ đang diễn ra
                        </div>
                        <div className="font-semibold text-lg">
                          {dashboardDatas?.currentServiceOngoing} Đơn hàng
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
                <div className="grid grid-cols-4 gap-4a">
                  <div className="col-span-3 m-2 ">
                    <div className="bg-[#ffffff] drop-shadow-2xl rounded-md p-6 ">
                      <div className="font-bold text-xl">
                        Tổng doanh thu dịch vụ
                      </div>
                      <div>
                        <LineChart
                          height="600px"
                          color={["#115293", "#1976d2"]}
                          data={lineDashboardDatas?.data}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="m-2">
                    <div className="bg-[#ffffff] drop-shadow-2xl rounded-md p-6 mb-4">
                      <div className="font-bold text-xl">Đơn hàng bonsai</div>
                      <div>
                        <OrderCircleGraphs
                          height="450px"
                          color={[
                            "#115293",
                            "#1976d2",
                            "#4791db",
                            "#bfdaf2",
                            "#ddebf8",
                          ]}
                          data={dashboardDatas?.orderCircleGraphs}
                        />
                      </div>
                    </div>
                    <div className="bg-[#ffffff] drop-shadow-2xl rounded-md p-6 mt-4">
                      <div className="font-bold text-xl">Đơn hàng dịch vụ chăm sóc</div>
                      <div>
                        <ServiceOrderCircleGraphs
                          height="450px"
                          color={[
                            "#ddebf8",
                            "#bfdaf2",
                            "#4791db",
                            "#1976d2",
                            "#115293",
                          ]}
                          data={dashboardDatas?.serviceOrderCircleGraphs}
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
