import React, { useState } from "react";
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
} from "@ant-design/icons";
import logo from "../assets/logo_footer_final.png";
import { Dropdown, Layout, Menu, Button, theme } from "antd";

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
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const NavBarItems = [
    {
      key: "1",
      label: <UserOutlined />,
      children: [
        {
          type: "group",
          label: "Item 1",
        },
        {
          type: "group",
          label: "Item 2",
        },
      ],
    },
  ];
  const SideBarItems = [
    getItem(<Link to={`/admin/user`}>Người dùng</Link>, "1", <UserOutlined />),
    getItem("Sản phẩm", "sub1", <VideoCameraOutlined />, [
      getItem(<Link to={`/admin/product`}>Bonsai</Link>, "2"),
      getItem(<Link to={`/admin/customerGarden`}>Sân vườn</Link>, "3"),
    ]),
    getItem(<Link to={`/admin/order`}>Đơn hàng</Link>, "4", <UploadOutlined />),
    getItem("Dịch vụ", "sub2", <UploadOutlined />, [
      getItem(<Link to={`/admin/service`}>Dịch vụ</Link>, "5"),
      getItem(<Link to={`/admin/baseTask`}>Base Task</Link>, "6"),
    ]),
    getItem(
      <Link to={`/admin/contract`}>Hợp đồng</Link>,
      "7",
      <FileDoneOutlined />
    ),
 
  ];
  return (
    <>
      <ToastContainer />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
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
              minHeight: 280,
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
