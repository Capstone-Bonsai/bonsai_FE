import React, { useState, useEffect } from "react";
import {
  PlusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import {
  Tooltip,
  Space,
  Tag,
  Table,
  Input,
  Modal,
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  InputNumber,
  Radio,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
const { Search } = Input;

import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/userSlice";

// const normFile = (e) => {
//   if (Array.isArray(e)) {
//     return e;
//   }
//   return e?.fileList;
// };
function UserManage() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);

  const allUsers = useSelector((state) => state.user?.listUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const paging = useSelector((state) => state.user?.pagination);

  useEffect(() => {
    const index = currentPage - 1;
    dispatch(fetchAllUsers({ pageIndex: currentPage - 1, pageSize: pageSize }));
  }, []);
  // const showModal = () => {
  //   setOpen(true);
  // };

  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpen(false);
  //     setConfirmLoading(false);
  //   }, 2000);
  // };

  // const showModalDelete = () => {
  //   setOpenDelete(true);
  // };

  // const handleDelete = () => {
  //   setConfirmLoadingDelete(true);
  //   setTimeout(() => {
  //     setOpenDelete(false);
  //     setConfirmLoadingDelete(false);
  //   }, 2000);
  // };

  // const handleCancel = () => {
  //   console.log("Clicked cancel button");
  //   setOpen(false);
  // };

  // const handleCancelDelete = () => {
  //   console.log("Clicked cancel button");
  //   setOpenDelete(false);
  // };
  const getColor = (role) => {
    switch (role) {
      case "Manager":
        return "geekblue";
      case "Gardener":
        return "geekblue";
      case "Staff":
        return "geekblue";
      case "Customer":
        return "purple";
      default:
        return "defaultColor";
    }
  };
  const handleTableChange = (pagination) => {
    console.log(pagination);
    const index = Number(pagination.current) - 1;
    dispatch(
      fetchAllUsers({
        pageIndex: index,
        pageSize: pageSize,
      })
    );
  };

  const columns = [
    {
      title: "Ảnh đại diện",
      dataIndex: "avatarUrl",
      key: "avatarUrl",
      render: (_, record) => (
        <>
          <div className="flex items-center justify-center">
            <div className="h-12 w-12 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src={
                  record.avatarUrl || record.avatarUrl == "(null)"
                    ? record.avatarUrl
                    : "https://static.vecteezy.com/system/resources/previews/009/292/244/original/default-avatar-icon-of-social-media-user-vector.jpg"
                }
                alt="Avatar"
              />
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Họ tên",
      dataIndex: "fullname",
      key: "fullname",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (_, record) => (
        <>
          <Tag color={getColor(record.role)}>{record.role}</Tag>
        </>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "isLockout",
      key: "isLockout",
      render: (_, record) => (
        <>
          <Tag color={record.isLockout == false ? "green" : "red"}>
            {record.isLockout == false ? "Hoạt động" : "Đã bị khóa"}
          </Tag>
        </>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "hanhdong",
      key: "hanhdong",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Xóa">
            <Button
              type="text"
              icon={<DeleteOutlined style={{ color: "red" }} />}
              //onClick={showModalDelete}
            />
          </Tooltip>
          <Tooltip title="Xem thông tin">
            <Button
              type="text"
              icon={<EyeOutlined style={{ color: "blue" }} />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  return (
    <>
      <div className="flex justify-center mt-12">
        <div className="w-[70%]">
          <div className="font-semibold mb-6">Sản phẩm</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  // onClick={showModal}
                >
                  <PlusCircleOutlined /> Thêm người dùng
                </button>
              </div>
              <div className="pr-0">
                <Search
                  placeholder="Địa chỉ email"
                  onSearch={onSearch}
                  className="w-[300px]"
                  allowClear
                />
              </div>
            </div>
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allUsers.items}
                columns={columns}
                scroll={{ x: true }}
                pagination={paging}
                onChange={handleTableChange}
                rowKey="id"
              />
            </div>
          </div>
        </div>
        {/* <Modal
          title="Thêm sản phẩm"
          open={open}
          onOk={handleOk}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div className="">
            <Form
              layout="horizontal"
              labelCol={{ span: 5 }}
              wrapperCol={{ span: 10 }}
            >
              <Form.Item label="Trạng thái">
                <Radio.Group>
                  <Radio value="apple"> Apple </Radio>
                  <Radio value="pear"> Pear </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Tên sản phẩm">
                <Input />
              </Form.Item>
              <Form.Item label="Kho sẵn">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Giá tiền">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Chiều cao">
                <InputNumber />
              </Form.Item>
              <Form.Item label="Đơn vị">
                <InputNumber />
              </Form.Item>
              <Form.Item
                label="Upload ảnh"
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload action="/upload.do" listType="picture-card">
                  <button
                    style={{ border: 0, background: "none" }}
                    type="button"
                  >
                    <PlusOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </button>
                </Upload>
              </Form.Item>
            </Form>
          </div>
        </Modal> */}
        {/* <Modal
          title="Xóa sản phẩm"
          open={openDelete}
          onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelDelete}
        >
          <div>Bạn có muốn xóa sản phẩm này không?</div>
        </Modal> */}
      </div>
    </>
  );
}

export default UserManage;
