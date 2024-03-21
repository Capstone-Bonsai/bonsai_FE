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
  List,
  Tabs,
} from "antd";
const { Search, TextArea } = Input;

import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { postService, putService } from "../../../utils/serviceApi";
import { fetchAllService } from "../../../redux/slice/serviceSlice";
import FormBonsaiCare from "./UpdateServiceForm/FormBonsaiCare";
import FormGardenCare from "./UpdateServiceForm/FormGardenCare";
import "./TabsBar.css";
import { putBonsai } from "../../../utils/bonsaiApi";

const ModalUpdateService = (props) => {
  const { show, setShow, service } = props;
  const dispatch = useDispatch();
  const [formBonsaiInstance, setFormBonsaiInstance] = useState();
  const [formGardenInstance, setFormGardenInstance] = useState();
  const [formData, setFormData] = useState({});
  const [listImage, setListImage] = useState();
  const [listSelectedBaseTask, setListSelectedBaseTask] = useState([]);

  useEffect(() => {
    setListImage(service?.image);
    setListSelectedBaseTask(
      service?.serviceBaseTasks?.map(
        (serviceBaseTask) => serviceBaseTask.baseTask
      )
    );
  }, [service]);
  const handleClose = () => {
    setConfirmLoading(false);
    setFormData({});
    setListImage([]);
    setListSelectedBaseTask([]);
    setShow(false);
  };
  const [confirmLoading, setConfirmLoading] = useState(false);

  const updateService = (input) => {
    try {
      console.log(service);
      putService(service.id, input)
        .then((data) => {
          toast.success("Cập nhật dịch vụ thành công!");
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
    console.log(listSelectedBaseTask);
    console.log(listImage);
    formData.Image =
      listImage?.length !== 0
        ? listImage[0]?.originFileObj
          ? listImage[0].originFileObj
          : listImage
        : null;
    listSelectedBaseTask?.length >= 1
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
            updateService(postData);
          })
          .catch((errorInfo) => {
            toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
          })
      : formBonsaiInstance?.current
          ?.validateFields()
          .then(() => {
            setConfirmLoading(true);
            updateService(postData);
          })
          .catch((errorInfo) => {
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
        title="Thông tin dịch vụ"
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
            defaultActiveKey={service?.serviceType == "BonsaiCare" ? "2" : "1"}
            type="card"
            destroyInactiveTabPane
            tabBarStyle={{ display: "flex", justifyContent: "space-between" }}
            items={[
              {
                disabled: service?.serviceType == "BonsaiCare",
                key: "1",
                label: `Form Garden Care`,
                children: (
                  <FormGardenCare
                    onFormInstanceReady={(instance) => {
                      setFormGardenInstance(instance);
                    }}
                    onFormDataChange={onFormDataChange}
                    onImageChange={onImageChange}
                    service={service}
                    onBaseTaskChange={onBaseTaskChange}
                  />
                ),
              },
              {
                disabled: service?.serviceType == "GardenCare",
                key: "2",
                label: `Form Bonsai Care`,
                children: (
                  <FormBonsaiCare
                    onFormInstanceReady={(instance) => {
                      setFormBonsaiInstance(instance);
                    }}
                    onFormDataChange={onFormDataChange}
                    onImageChange={onImageChange}
                    service={service}
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

export default ModalUpdateService;
