import React, { useState, useEffect, useRef } from "react";
import { Tag, Modal, Table, Transfer } from "antd";

import { useDispatch, useSelector } from "react-redux";
import { allBaseTask } from "../../../redux/slice/baseTaskSlice";
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
  const { show, setShow, onSubmitForm, serviceBaseTask } = props;
  const handleClose = () => {
    setConfirmLoading(false);
    setShow(false);
  };
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const listBaseTask = useSelector((state) => state.baseTask?.allBaseTaskDTO);

  useEffect(() => {
    dispatch(allBaseTask());
    console.log(listBaseTask);
  }, []);

  const [listSelectedBaseTask, setListSelectedBaseTask] =
    useState(serviceBaseTask);
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
    onSubmitForm(
      listBaseTask.filter((baseTask) =>
        listSelectedBaseTask?.includes(baseTask.id)
      )
    );
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
            titles={["Chọn công việc", "Công việc"]}
            showSearch
            dataSource={listBaseTask}
            targetKeys={listSelectedBaseTask}
            onChange={handleChange}
            leftColumns={leftTableColumns}
            rightColumns={rightTableColumns}
            rowKey={(item) => item.id}
            filterOption={(inputValue, item) =>
              item.name.indexOf(inputValue) !== -1
            }
            operations={["left", "right"]}
            operationStyle={{ color: "black"}}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalSelectBaseTask;
