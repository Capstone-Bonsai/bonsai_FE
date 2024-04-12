import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FileDoneOutlined,
  SmileOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import logo from "../assets/logo_footer_final.png";
import { Dropdown, Layout, Menu, Button, theme } from "antd";
import { profileUser } from "../redux/slice/authSlice";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";

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
  const avatarUrl = useSelector((state) => state.avatar?.avatarUrlRedux);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleLogout = () => {
    cookies.remove("user");
    cookies.remove("userData");
  };

  const NavBarItems = [
    {
      key: "1",
      label: <UserOutlined />,
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
    getItem("Sản phẩm", "sub1", <VideoCameraOutlined />, [
      ...(userInfo?.role == "Manager"
        ? [getItem(<Link to={`/admin/product`}>Bonsai</Link>, "2")]
        : []),
      getItem(<Link to={`/admin/customerGarden`}>Sân vườn</Link>, "3"),
    ]),
    ...(userInfo?.role == "Manager"
      ? [
          getItem(
            <Link to={`/admin/user`}>Người dùng</Link>,
            "1",
            <UserOutlined />
          ),
          getItem(
            <Link to={`/admin/order`}>Đơn hàng</Link>,
            "4",
            <UploadOutlined />
          ),
          getItem("Dịch vụ", "sub2", <UploadOutlined />, [
            getItem(<Link to={`/admin/service`}>Dịch vụ</Link>, "5"),
            getItem(<Link to={`/admin/baseTask`}>Nhiệm vụ cơ bản</Link>, "6"),
          ]),
        ]
      : []),
    getItem("Hợp Đồng", "sub3", <FileDoneOutlined />, [
      getItem(
        <Link to={`/admin/serviceGardenChecking`}>
          <SnippetsOutlined /> Đơn đợi duyệt
        </Link>,
        "7"
      ),
      getItem(
        <Link to={`/admin/contract`}>
          <FileDoneOutlined /> Hợp đồng
        </Link>,
        "8"
      ),
    ]),
  ];

  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      profileUser()
        .then((data) => {
          console.log(data);
          cookies.set("userData", data);
          const newAvt = data?.avatarUrl;
          //dispatch(setAvatarUrlRedux(newAvt));
        })
        .catch((error) => {
          console.error("Error while fetching profile data:", error);
        });
    }
  }, [userInfo]);
  return (
    <>
      <ToastContainer />
      <Layout className="min-h-screen">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className="min-h-screen"
        >
          <div className="demo-logo-vertical my-6 flex justify-center">
            <img src={logo} width={150} />
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
