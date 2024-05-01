import React, { useState, useEffect } from "react";
import { Button, Table, Tooltip } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../components/Loading";
import { fetchCustomerGardensManagers } from "../../../redux/slice/userGarden";
import { fetchCustomerBonsaisByGardenId } from "../../../redux/slice/customerBonsaiSlice";
import { useGetCustomerBonsais } from "./hook/hook";

function CustomerGardenManage() {
  const dispatch = useDispatch();
  const loadingGarden = useSelector((state) => state.garden.loading);
  const { loading, customerBonsais } = useGetCustomerBonsais();

  const allCustomerGarden = useSelector(
    (state) => state.garden?.gardenManagerDTO?.items
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const paging = useSelector((state) => state.garden?.pagination);

  const [expended, setExpended] = useState();

  useEffect(() => {
    dispatch(
      fetchCustomerGardensManagers({
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      })
    );
  }, [dispatch]);

  const handleTableChange = (pagination) => {
    const index = Number(pagination.current) - 1;
    dispatch(
      fetchCustomerGardensManagers({
        pageIndex: index,
        pageSize: pageSize,
      })
    );
  };

  const expend = (i) => {
    dispatch(fetchCustomerBonsaisByGardenId(i));
    if (expended === i) setExpended(undefined);
    else setExpended(i);
  };

  const expandedRowRender = () => {
    const columns = [
      {
        title: "Bonsai",
        key: "bonsai",
        render: (record) => <div>{record.bonsai?.name}</div>,
      },
      {
        title: "Mã số",
        key: "code",
        render: (record) => <div>{record.bonsai?.code}</div>,
      },
      {
        title: "Năm trồng",
        key: "yearOfPlanting",
        render: (record) => <div>Năm {record.bonsai?.yearOfPlanting}</div>,
      },
      {
        title: "Hoành cây",
        key: "trunkDimenter",
        render: (record) => <div>{record.bonsai?.trunkDimenter}</div>,
      },
      {
        title: "Chiều cao ",
        key: "height",
        render: (record) => <div>{record.bonsai?.height} m</div>,
      },
      {
        title: "Số thân",
        key: "numberOfTrunk",
        render: (record) => <div>{record.bonsai?.numberOfTrunk}</div>,
      },
      {
        title: "Ngày tạo",
        key: "creationDate",
        render: (_, record) => (
          <>
            <p>{new Date(record.creationDate).toLocaleDateString()}</p>
          </>
        ),
      },
      {
        title: "Hinh ảnh",
        dataIndex: "image",
        key: "image",
        render: (_, record) => (
          <>
            <div className="h-[200px] w-[200px]">
              <img
                src={record.bonsai?.bonsaiImages[0]?.imageUrl}
                style={{ width: "200px", height: "200px" }}
              />
            </div>
          </>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        rowKey="id"
        dataSource={customerBonsais}
        pagination={false}
        loading={{
          indicator: <Loading loading={loading} />,
          spinning: loading,
        }}
      />
    );
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.email}</p>
        </>
      ),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "fullname",
      key: "fullname",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.fullname}</p>
        </>
      ),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.phoneNumber}</p>
        </>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hinh ảnh",
      dataIndex: "image",
      key: "image",
      render: (_, record) => (
        <>
          <div className="h-[150px] w-[150px]">
            <img
              src={record.customerGardenImages[0]?.image}
              style={{ width: "150px", height: "150px" }}
            />
          </div>
        </>
      ),
    },
    {
      title: "Xem chi tiết",
      key: "customerBonsai",
      render: (_, record) => {
        return (
          <div className="w-full flex justify-center items-center">
            <Tooltip title={record.id === expended ? "Đóng" : "Thêm chi tiết"}>
              <Button
                type="text"
                icon={<EyeOutlined style={{ color: "orange" }} />}
                onClick={() => expend(record.id)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold text-lg mb-6">
            Sân vườn của khách hàng
          </div>
          <div className="bg-[#ffffff] drop-shadow-2xl">
            <div className="mb-12">
              <Table
                className="w-[100%]"
                dataSource={allCustomerGarden}
                columns={columns}
                scroll={{ x: true }}
                pagination={paging}
                onChange={handleTableChange}
                rowKey={(record) => record.id}
                loading={{
                  indicator: <Loading loading={loadingGarden} />,
                  spinning: loadingGarden,
                }}
                expandable={{
                  expandedRowRender,
                  expandedRowKeys: [expended],
                  expandIcon: () => <></>,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerGardenManage;
