import React, { useState, useEffect } from "react";
import { Table } from "antd";
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
  console.log(allCustomerGarden);
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
    console.log(pagination);
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
        title: "Giá tiền",
        key: "price",
        render: (record) => (
          <>
            <p>
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "VND",
              }).format(record.bonsai?.price)}
            </p>
          </>
        ),
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
    ];
    return (
      <Table
        columns={columns}
        rowKey="id"
        dataSource={customerBonsais}
        pagination
        loading={{
          indicator: <Loading loading={loading} />,
          spinning: loading,
        }}
      />
    );
  };

  const columns = [
    {
      title: "Khách hàng",
      dataIndex: "customer",
      key: "customer",
      render: (_, record) => (
        <>
          <p>{record.customer?.applicationUser?.email}</p>
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
          <div>
            <img
              src={record.customerGardenImages[0]?.image}
              width={200}
              height={200}
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
          <a onClick={() => expend(record.id)}>
            {record.id === expended ? "Đóng" : "Thêm chi tiết"}
          </a>
        );
      },
    },
  ];

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Sân vườn của khách hàng</div>
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
