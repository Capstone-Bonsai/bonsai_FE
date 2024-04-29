import React, { useState, useEffect, useRef } from "react";
import { Input, Modal, Form, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { putComplaint } from "../../../utils/complaintApi";
import { serviceOrderById } from "../../../redux/slice/serviceOrderSlice";
import { getComplaintStatusText } from "../../../components/status/complaintStatus";

const ModalUpdateComplaint = (props) => {
  const [form] = Form.useForm();
  const { show, setShow, complaint, serviceOrderId } = props;
  const complaintStatuses = [
    { key: 1, name: "Yêu cầu" },
    { key: 2, name: "Đang thực hiện" },
    { key: 3, name: "Đã hủy" },
    { key: 4, name: "Hoàn thành" },
    { key: 0, name: "Trạng thái không xác định" },
  ];

  const [selectingStatus, setSelectingStatus] = useState();
  const [formDisabled, setFormDisabled] = useState(false);

  const handleClose = () => {
    setFormData({
      //complaintStatus: "",
      cancelReason: "",
    });
    form.resetFields();
    setShow(false);
  };
  const [formData, setFormData] = useState({
    //complaintStatus: "",
    cancelReason: "",
  });
  const dispatch = useDispatch();
  const [confirmLoading, setConfirmLoading] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    if (complaint != undefined) {
      console.log(complaint);
      setFormData({
        complaintStatus: complaint?.complaintStatus,
        cancelReason: complaint?.cancelReason,
      });
    }
  }, [complaint]);

  useEffect(() => {
    if (show === true) {
      form.setFieldsValue(formData);
    }
  }, [form, formData]);

  const updateComplaint = (data) => {
    try {
      console.log({
        complaintStatus: selectingStatus,
        cancelReason: data,
      });
      putComplaint(complaint?.id, {
        complaintStatus: selectingStatus,
        cancelReason: data,
      })
        .then((data) => {
          toast.success("Cập nhật thành công!");
          dispatch(serviceOrderById(serviceOrderId));
          handleClose();
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.response.data);
        })
        .finally(() => {
          setConfirmLoading(false);
          setFormDisabled(false);
        });
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };
  const onSubmit = (i) => {
    formRef.current
      .validateFields()
      .then(() => {
        setFormDisabled(true);
        setConfirmLoading(true);
        updateComplaint(formData);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
        toast.error("Vui lòng kiểm tra lại thông tin đầu vào!");
      });
  };
  const handleFormChange = (changedValues, allValues) => {
    setFormData(allValues);
  };

  return (
    <>
      <Modal
        width={800}
        title="Cập nhật khiếu nại"
        open={show}
        onOk={onSubmit}
        okButtonProps={{ type: "default" }}
        okText={confirmLoading ? "Đang cập nhật" : "Cập nhật"}
        cancelText="Hủy"
        confirmLoading={confirmLoading}
        onCancel={handleClose}
        maskClosable={false}
      >
        <div className="mt-9">
          <Form
            form={form}
            ref={formRef}
            layout="horizontal"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={handleFormChange}
            initialValues={formData}
            disabled={formDisabled}
          >
            <Button onClick={() => setSelectingStatus(2)}>
              Xác nhận kiến nghị
            </Button>
            <Button onClick={() => setSelectingStatus(3)}>Hủy bỏ</Button>
            {/* <Form.Item
              label="Trạng thái khiếu nại"
              rules={[
                { required: true, message: "Trạng thái không được để trống!" },
              ]}
            >
              <Form.Item name="complaintStatus">
                <Select
                  value={complaint?.complaintStatus}
                  onChange={(value) => setSelectingStatus(value)}
                >
                  {complaintStatuses?.map((complaintStatus, index) => (
                    <Select.Option value={complaintStatus.key} key={index}>
                      {complaintStatus.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Form.Item> */}
            {selectingStatus ? (
              <>
                <Form.Item
                  label="Trạng thái khiếu nại"
                  rules={[
                    {
                      required: true,
                      message: "Trạng thái không được để trống!",
                    },
                  ]}
                >
                  <div> {getComplaintStatusText(selectingStatus)}</div>
                </Form.Item>
              </>
            ) : (
              <></>
            )}
            {selectingStatus == 3 ? (
              <>
                <Form.Item
                  label="Lý do"
                  name="cancelReason"
                  rules={[
                    { required: true, message: "Lý do không được để trống!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </>
            ) : (
              <></>
            )}
          </Form>
        </div>
      </Modal>
    </>
  );
};

export default ModalUpdateComplaint;
