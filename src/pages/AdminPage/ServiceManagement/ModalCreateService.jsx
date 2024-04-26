import React, { useState, useEffect, useRef } from "react";
import { Modal, Tabs } from "antd";

import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postService } from "../../../utils/serviceApi";
import { fetchAllService } from "../../../redux/slice/serviceSlice";
import FormGardenCare from "./CreateServiceForm/FormGardenCare";
import FormBonsaiCare from "./CreateServiceForm/FormBonsaiCare";
const ModalCreateService = (props) => {
  const { show, setShow } = props;
  const dispatch = useDispatch();
  const [tabKey, setTabKey] = useState("381e77b3-2cfa-4362-afae-fe588701616e");
  const [formGardenInstance, setFormGardenInstance] = useState();
  const [formData, setFormData] = useState({
    Name: undefined,
    Description: undefined,
    ServiceType: undefined,
    Image: undefined,
    ServiceBaseTaskId: undefined,
  });
  const [listImage, setListImage] = useState([]);
  const [listSelectedBaseTask, setListSelectedBaseTask] = useState([]);
  const handleClose = () => {
    setConfirmLoading(false);
    setFormData({});
    setListImage([]);
    setListSelectedBaseTask([]);
    setShow(false);
  };
  const [confirmLoading, setConfirmLoading] = useState(false);

  const createService = (service) => {
    try {
      console.log(service);
      postService(service)
        .then(() => {
          toast.success("Thêm dịch vụ thành công!");
          dispatch(
            fetchAllService({
              pageIndex: 0,
              pageSize: 10,
            })
          );
          handleClose();
        })
        .catch((err) => {
          console.log(err.response.data);
          toast.error(err.response.data);
        })
        .finally(() => {
          setConfirmLoading(false);
        });
    } catch (err) {
      console.log(err.response.data);
      toast.error(err.response.data);
    }
  };

  const onSubmit = () => {
    formData.Image = listImage[0] ? listImage[0].originFileObj : null;
    listSelectedBaseTask.length >= 1
      ? (formData.ServiceBaseTaskId = listSelectedBaseTask)
      : null;
    const postData = new FormData();
    postData.append("Name", formData.Name);
    postData.append("Description", formData.Description);
    postData.append("ServiceTypeId", formData.ServiceType);
    postData.append("Image", formData.Image);
    listSelectedBaseTask?.map((selectedBaseTask) =>
      postData.append("ServiceBaseTaskId", selectedBaseTask.id)
    );
    console.log(formData);
    formGardenInstance?.current
      ?.validateFields()
      .then(() => {
        setConfirmLoading(true);
        createService(postData);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };

  const onChangeTabs = (input) => {
    setTabKey(input);
  };

  const onFormDataChange = (input) => {
    setFormData(input);
  };
  const onImageChange = (input) => {
    setListImage(input);
  };
  const onBaseTaskChange = (input) => {
    setListSelectedBaseTask(input);
  };
  return (
    <>
      <Modal
        width={800}
        title="Thêm dịch vụ"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang tạo" : "Tạo mới"}
        cancelText="Hủy"
        confirmLoading={confirmLoading}
        onCancel={handleClose}
        maskClosable={false}
        destroyOnClose
      >
        <div className="mt-12">
          <Tabs
            defaultActiveKey="1"
            type="card"
            destroyInactiveTabPane
            onChange={onChangeTabs}
            items={[
              {
                key: "381e77b3-2cfa-4362-afae-fe588701616e",
                label: `Mẫu chăm sóc sân vườn`,
                children: (
                  <FormGardenCare
                    onFormInstanceReady={(instance) => {
                      setFormGardenInstance(instance);
                    }}
                    onFormDataChange={onFormDataChange}
                    onImageChange={onImageChange}
                    onBaseTaskChange={onBaseTaskChange}
                  />
                ),
              },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default ModalCreateService;
