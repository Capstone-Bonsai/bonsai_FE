import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  SmileOutlined
} from "@ant-design/icons";
import { Dropdown, Layout, Menu, Button, theme } from "antd";

const { Header, Sider, Content } = Layout;
function PrivateRoute() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const NavBarItems = [
    {
      key: "1",
      label:(<UserOutlined />),
      children: [
        {
          type: 'group',
          label: 'Item 1',
        },
        {
          type: 'group',
          label: 'Item 2',
        },
      ],
    },
  ];
  const SideBarItems = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: (
        <Link to={`/admin/user`}>
          Người dùng
        </Link>
      ),
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: (
        <Link to={`/admin/product`}>
          Sản phẩm
        </Link>
      ),
    },
    {
      key: "3",
      icon: <UploadOutlined />,
      label: "nav 3",
    },
  ];
  return (
    <>
      <ToastContainer />
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="demo-logo-vertical" />
          <Menu
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
            >
            </Menu>
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
