import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Icon, {
  DollarOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileDoneOutlined,
  SmileOutlined,
  SnippetsOutlined,
  ProductOutlined,
  AreaChartOutlined,
  CustomerServiceOutlined,
  TruckOutlined,
  InboxOutlined,
  BellOutlined,
} from "@ant-design/icons";
import logo from "../assets/logoFinal.png";
import { Dropdown, Layout, Menu, Button, theme } from "antd";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { connectWebSocket, disconnectWebSocket } from "../redux/thunk";
import { GardenSVG } from "../assets/garden-green-house-svgrepo-com";
import { profileUser } from "../redux/slice/authSlice";
import {
  setAvatarUrlRedux,
  setFullNameRedux,
} from "../redux/slice/avatarSlice";
import { allNotification } from "../redux/slice/notificationSlice";

const { Header, Sider, Content } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    label,
    key,
    icon,
    children,
    type,
  };
}

function PrivateRoute() {
  const dispatch = useDispatch();
  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  const navigate = useNavigate();
  const avatarUrl = useSelector((state) => state.avatar?.avatarUrlRedux);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [logoutAdmin, setLogoutAdmin] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);

  const allNotifications = useSelector(
    (state) => state.notification?.allNotificationDTO
  );

  console.log(allNotifications);
  useEffect(() => {
    dispatch(allNotification({ pageIndex: currentPage, pageSize: 5 }));
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      profileUser()
        .then((data) => {
          cookies.set("userData", data);
          const newAvt = data?.avatarUrl;
          dispatch(setAvatarUrlRedux(newAvt));
          dispatch(setFullNameRedux(data?.fullname));
        })
        .catch((error) => {
          console.error("Error while fetching profile data:", error);
        });
    }
  }, [userInfo, dispatch]);

  const handleLogout = () => {
    cookies.remove("user", { path: "/" });
    cookies.remove("user", { path: "/admin" });
    cookies.remove("userData", { path: "/" });
    cookies.remove("userData", { path: "/admin" });
    dispatch(disconnectWebSocket());
  };

  const handleOnChangeList = (page) => {
    setCurrentPage(page);
    dispatch(allNotification({ pageIndex: page, pageSize: 5 }));
  };

  const NavBarItems = [
    {
      key: "2",
      label: (
        <div className="dropdown dropdown-end dropdown-bottom">
          <button className=" hover:text-[#2596be] rounded-full w-[50px] h-[50px] flex justify-center items-center">
            <BellOutlined />
          </button>
          <div
            tabIndex={0}
            class="dropdown-content z-[1] bg-[#fff] w-[500px] h-[300px] text-[black] shadow"
          >
            <div className="h-[100%]">
              <div class=" w-[100%] font-bold border-[black] border-b-[2px] h-[30px]">
                Thông báo
              </div>
              <div class="h-[100%]">
                {allNotifications?.items?.map((message, index) => (
                  <p className="" key={index}>
                    {message.message}
                  </p>
                ))}
              </div>
              <div class="flex gap-6">
                <button
                  class=""
                  type="button"
                  disabled={currentPage === 1 ? true : false}
                  onClick={() => handleOnChangeList(currentPage - 1)}
                >
                  {"<"}
                </button>
                <button
                  class=""
                  disabled={
                    currentPage === allNotifications?.totalPagesCount - 1
                      ? true
                      : false
                  }
                  onClick={() => handleOnChangeList(currentPage + 1)}
                >
                  {">"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "1",
      label: (
        <div className="font-medium">
          {userInfo.fullName} <UserOutlined />
        </div>
      ),
      children: userInfo
        ? [
            getItem(
              <Link to="/admin/profile" className="text-black">
                Quản lý hồ sơ
              </Link>,
              "2",
              "",
              [],
              "group"
            ),
            getItem(
              <Link to="/login" className="text-black" onClick={handleLogout}>
                Đăng xuất
              </Link>,
              "1",
              "",
              [],
              "group"
            ),
          ]
        : [
            getItem(
              <Link to="/login" className="text-black">
                Đăng nhập
              </Link>,
              "1",
              "",
              [],
              "group"
            ),
          ],
    },
  ];
  const SideBarItems = [
    getItem(
      <Link to={`/admin/dashboard`}>Bảng điều khiển</Link>,
      "dashboard",
      <AreaChartOutlined />
    ),
    ...(userInfo?.role == "Staff"
      ? [
          getItem(
            <Link to={`/admin/customerGarden`}>Sân vườn</Link>,
            "3",
            <Icon component={GardenSVG} />
          ),
          getItem(
            <Link to={`/admin/order`}>Đơn hàng bonsai</Link>,
            "order",
            <TruckOutlined />
          ),
          getItem(
            <Link to={`/admin/serviceOrder`}>Đơn hàng dịch vụ</Link>,
            "serviceOrder",
            <FileDoneOutlined />
          ),
        ]
      : []),
    ...(userInfo?.role == "Manager"
      ? [
          getItem(
            <Link to={`/admin/revenue`}>Doanh thu</Link>,
            "revenue",
            <DollarOutlined />
          ),
          getItem(
            <Link to={`/admin/user`}>Người dùng</Link>,
            "user",
            <UserOutlined />
          ),
          getItem(
            <Link to={`/admin/bonsai`}>Bonsai</Link>,
            "bonsai",
            <InboxOutlined />
          ),
          getItem("Dịch vụ", "sub2", <CustomerServiceOutlined />, [
            getItem(<Link to={`/admin/service`}>Dịch vụ</Link>, "service"),
            getItem(
              <Link to={`/admin/baseTask`}>Nhiệm vụ cơ bản</Link>,
              "baseTask"
            ),
            getItem(
              <Link to={`/admin/serviceType`}>Loại dịch vụ</Link>,
              "serviceType"
            ),
          ]),
          getItem(
            <Link to={`/admin/deliveryFee`}>Bảng giá vận chuyển</Link>,
            "deliveryFee",
            <AreaChartOutlined />
          ),
        ]
      : []),
  ];
  return (
    <>
      <Layout className="min-h-screen">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="min-h-screen"
        >
          <div className="demo-logo-vertical my-6 flex justify-center">
            <img src={logo} width={70} />
          </div>
          <Menu
            className="text-base"
            theme="dark"
            mode="inline"
            items={SideBarItems}
          />
        </Sider>
        <Layout>
          <Header
            className="flex items-center"
            style={{
              padding: 0,
              background: colorBgContainer,
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <Menu
              className="flex items-center justify-end text-center"
              mode="horizontal"
              defaultSelectedKeys={["3"]}
              style={{ flex: 1 }}
              items={NavBarItems}
            ></Menu>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: "100vh",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default PrivateRoute;
