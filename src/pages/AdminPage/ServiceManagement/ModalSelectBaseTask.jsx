import React, { useState, useEffect, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Tag,
  Input,
  Modal,
  Form,
  InputNumber,
  Select,
  Upload,
  Table,
  Space,
  Transfer,
} from "antd";
const { Search, TextArea } = Input;

import { useDispatch, useSelector } from "react-redux";
import {
  allBaseTask,
  allBaseTaskPagination,
} from "../../../redux/slice/baseTaskSlice";
import Loading from "../../../components/Loading";
import difference from "lodash/difference";

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
  <Transfer {...restProps}>
    {({
      direction,
      filteredItems,
      onItemSelectAll,
      onItemSelect,
      selectedKeys: listSelectedKeys,
    }) => {
      const columns = direction === "left" ? leftColumns : rightColumns;

      const rowSelection = {
        onSelectAll(selected, selectedRows) {
          const treeSelectedKeys = selectedRows.map(({ key }) => key);
          console.log(treeSelectedKeys);
          const diffKeys = selected
            ? difference(treeSelectedKeys, listSelectedKeys)
            : difference(listSelectedKeys, treeSelectedKeys);
          onItemSelectAll(diffKeys, selected);
        },
        onSelect({ key }, selected) {
          onItemSelect(key, selected);
        },
        selectedRowKeys: listSelectedKeys,
      };

      return (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredItems}
          size="small"
          style={{ pointerEvents: undefined }}
          onRow={({ key }) => ({
            onClick: () => {
              onItemSelect(key, !listSelectedKeys.includes(key));
            },
          })}
        />
      );
    }}
  </Transfer>
);

const ModalSelectBaseTask = (props) => {
  const { show, setShow, onSubmitForm } = props;
  const handleClose = () => {
    setConfirmLoading(false);
    setShow(false);
  };
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const loading = useSelector((state) => state.baseTask?.loading);
  const listBaseTask = useSelector((state) => state.baseTask?.allBaseTaskDTO);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const paging = useSelector((state) => state.baseTask?.pagination);

  useEffect(() => {
    dispatch(allBaseTask());
    console.log(listBaseTask);
  }, []);

  const [listSelectedBaseTask, setListSelectedBaseTask] = useState([]);
  const formRef = useRef(null);
  const handleChange = (newTargetKeys, direction, moveKeys) => {
    console.log(newTargetKeys, direction, moveKeys);
    setListSelectedBaseTask(newTargetKeys);
  };

  const leftTableColumns = [
    {
      title: "Tên task",
      dataIndex: "name",
    },
    {
      title: "Chi tiết",
      dataIndex: "detail",
    },
  ];

  const rightTableColumns = [
    {
      dataIndex: "name",
      title: "Tên task",
    },
  ];

  const onSubmit = (i) => {
    onSubmitForm(listSelectedBaseTask);
    handleClose();
  };

  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <>
      <Modal
        width={1000}
        title="Thêm task"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang tạo" : "Tạo mới"}
        cancelText="Hủy"
        confirmLoading={confirmLoading}
        onCancel={handleClose}
      >
        <div className="mt-12">
          <TableTransfer
            titles={["Chọn task", "Task"]}
            showSearch
            dataSource={listBaseTask}
            targetKeys={listSelectedBaseTask}
            onChange={handleChange}
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
            rowKey={(item) => item}
            filterOption={(inputValue, item) =>
              item.name.indexOf(inputValue) !== -1
            }
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalSelectBaseTask;
