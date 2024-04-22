import { useDispatch, useSelector } from "react-redux";
import OrderCircleGraphs from "./OrderCircleGraphs";
import { useEffect } from "react";
import { allDashboard } from "../../../redux/slice/dashboardSlice";
import ServiceOrderCircleGraphs from "./ServiceOrderCircleGraphs";

export default function Dashboard() {
  const dispatch = useDispatch();
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
          <div className="font-bold text-xl mb-6">Dashboard</div>
          <div className="bg-[#ffffff] drop-shadow-2xl"></div>
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
