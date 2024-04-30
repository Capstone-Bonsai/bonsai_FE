import React from "react";
import MinHeight from "../../components/MinHeight";
import { HomeOutlined, PhoneOutlined, MailOutlined } from "@ant-design/icons";
import bg_thanhson from "../../assets/thanhSonGarden.jpg";
function Contact() {
  return (
    <MinHeight>
      <div className="my-5 m-auto w-[70%] flex justify-between px-10 ">
        <div className="w-[58%] ">
          <img
            src={bg_thanhson}
            className="w-full rounded-[10px] drop-shadow-lg"
            alt=""
          />
        </div>
        <div className="bg-[#f2f2f2] w-[40%] p-5">
          <div className="text-[32px] text-[#333333] font-[500] mb-5">
            Giới thiệu
          </div>
          <div className="text-[15px] text-[#333333] font-[400]">
            Thanh Sơn Garden là thương hiệu dẫn đầu trong lĩnh vực cung cấp các
            loại Cây phong thủy, cây văn phòng, sen đá, xương rồng & tiểu cảnh
            cao cấp trang trí nội thất. Chúng tôi luôn cố gắng tạo ra những sản
            phẩm đẹp, độc đáo và khác biệt hoàn toàn so với thị trường. Chúng
            tôi biến sản phẩm thành những tác phẩm nghệ thuật với tất cả niềm
            đam mê và tâm huyết của mình... để đáp ứng mọi nhu cầu của khách
            hàng. của khách hàng
          </div>
          <div className="mt-5 gap-2 flex items-center text-[20px] font-[500] text-[#222222] mb-[8px]">
            <HomeOutlined />
            Địa chỉ
          </div>
          <div className="text-[15px] text-[#666666]">
            372 Quốc lộ 20, Liên Nghĩa, Đức Trọng, Lâm Đồng
          </div>
          <div className="py-5 border-y my-5 ">
            <div className="text-[20px] font-[500] text-[#222222] gap-2 flex items-center ">
              <PhoneOutlined /> Số điện thoại
            </div>
            <div className="text-[15px] text-[#666666]">0909.045.444</div>
          </div>
          <div>
            <div className="text-[20px] font-[500] text-[#222222] gap-2 flex items-center">
              {" "}
              <MailOutlined /> Email
            </div>
            <div className="text-[15px] text-[#666666]">
              caycanhlamdongTTS@gmail.com
            </div>
          </div>
        </div>
      </div>
    </MinHeight>
  );
}

export default Contact;
