import React, { useState, useEffect } from "react";
import { Tabs } from "antd";

import StyleManage from "./StyleManagement/StyleManage";
import ProductManage from "./BonsaiManagement/ProductManage";
import "./TabsBar.css";
import CategoryManage from "./CategoryManagement/CategoryManage";

function BonsaiLayout() {
  return (
    <>
      <div className="flex justify-center">
        <div className="w-[100%]">
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

export default BonsaiLayout;
