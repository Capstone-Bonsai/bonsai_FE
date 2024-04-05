import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { PlusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
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
  Tabs,
} from "antd";
const { Search, TextArea } = Input;

import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBonsaiPagination } from "../../../redux/slice/bonsaiSlice";
import ModalCreateProduct from "./BonsaiManagement/ModalCreateProduct";
import { Link } from "react-router-dom";
import ModalUpdateProduct from "./BonsaiManagement/ModalUpdateProduct";
import Loading from "../../../components/Loading";
import { allCategory } from "../../../redux/slice/categorySlice";
import { allStyle } from "../../../redux/slice/styleSlice";
import { deleteBonsai } from "../../../utils/bonsaiApi";
import StyleManage from "./StyleManagement/StyleManage";
import ProductManage from "./BonsaiManagement/ProductManage";
import "./TabsBar.css";
import CategoryManage from "./CategoryManagement/CategoryManage";

function ProductLayout() {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
          <div className="font-semibold mb-6">Sản phẩm</div>
          <Tabs
            defaultActiveKey="1"
            type="card"
            destroyInactiveTabPane
            items={[
              {
                key: "1",
                label: `Bonsai`,
                children: <ProductManage />,
              },
              {
                key: "2",
                label: `Kiểu mẫu`,
                children: <StyleManage />,
              },
              {
                key: "3",
                label: `Loại cây`,
                children: <CategoryManage />,
              },
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default ProductLayout;
