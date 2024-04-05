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
  const [formBonsaiInstance, setFormBonsaiInstance] = useState();
  const [formGardenInstance, setFormGardenInstance] = useState();
  const [formData, setFormData] = useState({
    Name: undefined,
    Description: undefined,
    StandardPrice: undefined,
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
              pageSize: 5,
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
    formData.StandardPrice
      ? postData.append("StandardPrice", formData.StandardPrice)
      : null;
    postData.append("ServiceType", formData.ServiceType);
    postData.append("Image", formData.Image);
    listSelectedBaseTask?.map((selectedBaseTask) =>
      postData.append("ServiceBaseTaskId", selectedBaseTask.id)
    );
    console.log(formData);
    formData.ServiceType == 2
      ? formGardenInstance?.current
          ?.validateFields()
          .then(() => {
            setConfirmLoading(true);
            createService(postData);
          })
          .catch((errorInfo) => {
            console.log(errorInfo);
            toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
          })
      : formBonsaiInstance?.current
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
            items={[
              {
                key: "1",
                label: `Form Garden Care`,
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
              {
                key: "2",
                label: `Form Bonsai Care`,
                children: (
                  <FormBonsaiCare
                    onFormInstanceReady={(instance) => {
                      setFormBonsaiInstance(instance);
                    }}
                    onFormDataChange={onFormDataChange}
                    onImageChange={onImageChange}
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
