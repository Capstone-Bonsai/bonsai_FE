import React, { useState, useEffect } from "react";
import {
  LockOutlined,
  UnlockOutlined,
  PlusCircleOutlined,
  PlusOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
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
import { fetchAllUsers } from "../../../redux/userSlice";
import ModalCreateUser from "./ModalCreateUser";
const UserManage = () => {
  const dispatch = useDispatch();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUnlock, setOpenUnlock] = useState(false);
  const [openLock, setOpenLock] = useState(false);

  const [confirmLoadingDelete, setConfirmLoadingDelete] = useState(false);

  const allUsers = useSelector((state) => state.user?.listUser);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const paging = useSelector((state) => state.user?.pagination);

  useEffect(() => {
    const index = currentPage - 1;
    dispatch(fetchAllUsers({ pageIndex: currentPage - 1, pageSize: pageSize }));
  }, []);

  const showCreateModal = () => {
    setOpenCreateModal(true);
  };

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpenCreateModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const showModalLock = () => {
    setOpenLock(true);
  };
  const showModalUnlock = () => {
    setOpenUnlock(true);
  };

  // const handleDelete = () => {
  //   setConfirmLoadingDelete(true);
  //   setTimeout(() => {
  //     setOpenDelete(false);
  //     setConfirmLoadingDelete(false);
  //   }, 2000);
  // };

  const handleCancelCreate = () => {
    setOpenCreateModal(false);
  };
  const handleCancelLock = () => {
    console.log("Clicked cancel button");
    setOpenLock(false);
  };
  const handleCancelUnLock = () => {
    console.log("Clicked cancel button");
    setOpenUnlock(false);
  };
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
      title: "Vai trò",
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
          {record.isLockout == false ? (
            <Tooltip title="Khóa">
              <Button
                type="text"
                icon={<LockOutlined style={{ color: "red" }} />}
                onClick={setOpenLock}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Mở khóa">
              <Button
                type="text"
                icon={<UnlockOutlined style={{ color: "green" }} />}
                onClick={setOpenUnlock}
              />
            </Tooltip>
          )}

          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined style={{ color: "orange" }} />}
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
          <div className="font-semibold mb-6">Quản lý người dùng</div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="flex justify-between p-6">
              <div>
                <button
                  className="hover:bg-[#ffffff] hover:text-[#3A994A] bg-[#3A994A] text-[#ffffff] rounded-md py-2 px-2"
                  onClick={showCreateModal}
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
        <ModalCreateUser show={openCreateModal} setShow={handleCancelCreate} />
        <Modal
          title="Khóa tài khoản người dùng"
          open={openLock}
          //onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelLock}
        >
          <div>Bạn có muốn khóa tài khoản người dùng này không?</div>
        </Modal>
        <Modal
          title="Mỏ khóa tài khoản người dùng"
          open={openUnlock}
          //onOk={handleDelete}
          okButtonProps={{ type: "default" }}
          confirmLoading={confirmLoadingDelete}
          onCancel={handleCancelUnLock}
        >
          <div>Bạn có muốn mở khóa tài khoản người dùng này không?</div>
        </Modal>
      </div>
    </>
  );
};

export default UserManage;
