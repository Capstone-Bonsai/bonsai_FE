import React from "react";
import logo_final from "../assets/logo_footer_final.png";
function Footer() {
  
  const linksFooter = [
    { id: 1, text: "Hướng dẫn đặt hàng & thanh toán", href: "#" },
    { id: 2, text: "Chính sách giao hàng & đổi trả", href: "#" },
    { id: 3, text: "Thỏa thuận người dùng", href: "#" },
    { id: 4, text: "Chính sách bảo mật", href: "#" },
    { id: 5, text: "Chính sách đại lý", href: "#" },
  ];

  return (
    <div className="min-h-[400px] bg-[#028711] mt-auto w-full">
      <div className="w-[70%] h-full m-auto pt-4 mb-5 flex justify-between">
        <div className="w-[400px]">
          <div className="font-bold text-[#000000] text-[20px]">
            Về chúng tôi
          </div>
          <img src={logo_final} alt="" className="ml-[-10px] mt-5" />
          <div className="text-[#FFFFFF]">
            Thanh Sơn Garden là thương hiệu dẫn đầu trong lĩnh vực cung cấp các
            loại Cây phong thủy, cây văn phòng, sen đá, xương rồng & tiểu cảnh
            cao cấp trang trí nội thất. <br />
            Chúng tôi luôn cố gắng tạo ra những sản phẩm đẹp, độc đáo và khác
            biệt hoàn toàn so với thị trường. Chúng tôi biến sản phẩm thành
            những tác phẩm nghệ thuật với tất cả niềm đam mê và tâm huyết của
            mình... để đáp ứng mọi nhu cầu của khách hàng. của khách hàng.
          </div>
        </div>
        <div className="w-[400px]">
          <div className="font-bold text-[#000000] text-[20px]">
            Hỗ trợ khách hàng
          </div>
          <div className="text-[#FFFFFF] mt-5">
            <ul>
              {linksFooter.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-[400px]">
          <div className="font-bold text-[#000000] text-[20px]">Địa chỉ</div>
          <div className="text-[#FFFFFF] mt-5">
            372 Quốc lộ 20, Liên Nghĩa, Đức Trọng, Lâm Đồng
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
