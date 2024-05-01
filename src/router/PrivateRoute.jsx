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
  RightOutlined,
  LeftOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import logo from "../assets/logoFinal.png";
import { Dropdown, Layout, Menu, Button, theme, Tooltip, Spin } from "antd";
import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import { connectWebSocket, disconnectWebSocket } from "../redux/thunk";
import { GardenSVG } from "../assets/garden-green-house-svgrepo-com";
import { profileUser } from "../redux/slice/authSlice";
import {
  setAvatarUrlRedux,
  setFullNameRedux,
} from "../redux/slice/avatarSlice";
import { notificationUser, seenNotfi } from "../redux/slice/userSlice";

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

  const allNotifications = useSelector((state) => state.user?.notification);

  const [fetchNoti, setFetchNoti] = useState(false);
  console.log(fetchNoti);

  const handleSeenNoti = async (notiId) => {
    try {
      dispatch(seenNotfi(notiId));
      document.getElementById("modal_noti").showModal();
      dispatch(notificationUser({ pageIndex: currentPage, pageSize: 5 }));
    } catch (error) {
      console.log(error);
    }
  };
  const notiDetail = useSelector((state) => state?.user?.notiDetail);
  console.log(notiDetail);
  useEffect(() => {
    dispatch(notificationUser({ pageIndex: currentPage, pageSize: 5 }));
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
    dispatch(notificationUser({ pageIndex: page, pageSize: 5 }));
  };

  const NavBarItems = [
    {
      key: "2",
      label: (
        <>
          <div className="dropdown dropdown-end dropdown-bottom">
            <button
              onClick={() => setFetchNoti(!fetchNoti)}
              className="bg-[#f2f2f2] hover:bg-gray-300 hover:text-[#fff] mx-3 relative rounded-full w-[30px] h-[30px] flex justify-center items-center"
            >
              <BellOutlined />
              <p className="absolute top-[-10px] right-[-5px] bg-[red] w-[20px] h-[20px] text-[14px] text-[#fff] rounded-full leading-none flex items-center justify-center">
                {allNotifications?.totalItemsCount}
              </p>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-[500px] h-[370px] text-[black]"
            >
              <div className="font-bold text-[20px] my-2 ">Thông báo</div>
              {allNotifications.loading === true ? (
                <div className="h-[272px] flex justify-center items-center">
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                </div>
              ) : (
                allNotifications?.items?.map((message, index) => (
                  <button
                    onClick={() => handleSeenNoti(message.id)}
                    key={message.index}
                    className={`p-2 border-b text-start hover:bg-gray-300 hover:rounded-[8px] ${
                      message?.isRead ? "" : "bg-[gray]"
                    }`}
                  >
                    <div>
                      {new Date(message?.creationDate).toLocaleDateString()}
                    </div>
                    <div>{message?.message}</div>
                  </button>
                ))
              )}

              <div class="flex justify-end items-center gap-4 h-[40px]">
                <Tooltip title={currentPage === 1 ? "" : "Trang trước"}>
                  <Button
                    type="text"
                    icon={<LeftOutlined style={{ fontSize: "12px" }} />}
                    onClick={() => {
                      handleOnChangeList(currentPage - 1);
                    }}
                  />
                </Tooltip>
                <div>Trang {currentPage}/{allNotifications?.totalItemsCount}</div>
                <Tooltip
                  title={
                    currentPage === allNotifications?.totalPagesCount - 1
                      ? ""
                      : "Trang sau"
                  }
                >
                  <Button
                    type="text"
                    icon={<RightOutlined style={{ fontSize: "12px" }} />}
                    onClick={() => {
                      handleOnChangeList(currentPage + 1);
                    }}
                  />
                </Tooltip>
              </div>
            </ul>
          </div>

          <dialog id="modal_noti" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">{notiDetail?.title}</h3>
              <div className="italic">
                {new Date(notiDetail?.creationDate).toLocaleDateString()}
              </div>
              <p className="py-4">{notiDetail?.message}</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </>
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
