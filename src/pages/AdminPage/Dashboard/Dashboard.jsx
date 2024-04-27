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
import { allDashboard } from "../../../redux/slice/dashboardSlice";
import ServiceOrderCircleGraphs from "./ServiceOrderCircleGraphs";
import { Button, Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../../components/formatPrice/FormatPrice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dashboardDatas = useSelector(
    (state) => state.dashboard.allDashboardDTO
  );

  const loading = useSelector((state) => state.dashboard.loading);
  useEffect(() => {
    dispatch(allDashboard());
  }, []);
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-bold text-lg mb-6">Bảng điều khiển</div>
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
                      icon={<MenuOutlined style={{ fontSize: "32px" }} />}
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
                      icon={<MenuOutlined style={{ fontSize: "32px" }} />}
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
                      icon={<MenuOutlined style={{ fontSize: "32px" }} />}
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
                      icon={<MenuOutlined style={{ fontSize: "32px" }} />}
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
                    Đơn hàng dịch đang diễn ra
                  </div>
                  <div className="font-semibold text-lg">
                    {dashboardDatas?.currentServiceOngoing} Đơn hàng
                  </div>
                </div>
                <div className="flex justify-end items-center">
                  <Tooltip title="Quản lý đơn hàng dịch vụ">
                    <Button
                      type="text"
                      icon={<MenuOutlined style={{ fontSize: "32px" }} />}
                      onClick={() => {
                        navigate("/admin/serviceOrder");
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-12">
            <div className="bg-[#ffffff] drop-shadow-2xl rounded-md p-6">
              <div className="font-bold text-xl pb-4">Đơn hàng chăm cây</div>
              <div>
                <OrderCircleGraphs
                  height="350px"
                  color={["#115293", "#1976d2", "#4791db", "#ddebf8"]}
                  data={dashboardDatas?.orderCircleGraphs}
                />
              </div>
            </div>
            <div className="bg-[#ffffff] drop-shadow-2xl rounded-md p-6">
              <div className="font-bold text-xl pb-4">Đơn hàng dịch vụ</div>
              <div>
                <ServiceOrderCircleGraphs
                  height="350px"
                  color={["#115293", "#1976d2", "#4791db", "#ddebf8"]}
                  data={dashboardDatas?.serviceOrderCircleGraphs}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <LineChart height="350px" />
      </div>

      <div>
        <ComparisonChart height="350px" />
      </div>

      <div>
        <AreaChart height="350px" />
      </div> */}
    </>
  );
}
