import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Icon, {
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
} from "@ant-design/icons";
import logo from "../assets/logoFinal.png";
import { Dropdown, Layout, Menu, Button, theme } from "antd";
import { profileUser } from "../redux/slice/authSlice";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { GardenSVG } from "../assets/garden-green-house-svgrepo-com";

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
  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  const navigate = useNavigate();
  const avatarUrl = useSelector((state) => state.avatar?.avatarUrlRedux);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [logoutAdmin, setLogoutAdmin] = useState(false);
  const handleLogout = () => {
    cookies.remove("user", { path: "/" });
    cookies.remove("user", { path: "/admin" });
  };
  const NavBarItems = [
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
    ...(userInfo?.role == "Staff"
      ? [
          getItem(
            <Link to={`/admin/customerGarden`}>Sân vườn</Link>,
            "3",
            <Icon component={GardenSVG} />
          ),
        ]
      : []),
    ...(userInfo?.role == "Manager"
      ? [
          getItem(
            <Link to={`/dashboard`}>Dashboard</Link>,
            "dashboard",
            <AreaChartOutlined />
          ),
          getItem(
            <Link to={`/admin/user`}>Người dùng</Link>,
            "user",
            <UserOutlined />
          ),
          getItem(
            <Link to={`/admin/bonsai`}>Bonsai</Link>,
            "bonsai",
            <UserOutlined />
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
        ]
      : []),
    getItem(
      <Link to={`/admin/order`}>Đơn hàng</Link>,
      "order",
      <TruckOutlined />
    ),
    getItem(
      <Link to={`/admin/serviceOrder`}>Đơn hàng dịch vụ</Link>,
      "serviceOrder",
      <FileDoneOutlined />
    ),
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
