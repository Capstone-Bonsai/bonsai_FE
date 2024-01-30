import testProduct from "../assets/testProduct.png";
import bonsaiOfficeImage from "../assets/bonsai_office.png";
import CayTung from "../assets/cay-tung.png";

const topProducts = [
  {
    id: 1,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: testProduct,
  },
  {
    id: 2,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: testProduct,
  },
  {
    id: 3,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: testProduct,
  },
  {
    id: 4,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: testProduct,
  },
];

const bonsaiOffice = [
  {
    id: 1,
    name: "Cây Mộc Hương",
    price: "850.000đ",
    image: bonsaiOfficeImage,
  },
  {
    id: 2,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: bonsaiOfficeImage,
  },
  {
    id: 3,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: bonsaiOfficeImage,
  },
  {
    id: 4,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: bonsaiOfficeImage,
  },
  {
    id: 5,
    name: "Cây Mộc Hương",
    price: "850.000đ",
    image: bonsaiOfficeImage,
  },
  {
    id: 6,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: bonsaiOfficeImage,
  },
  {
    id: 7,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: bonsaiOfficeImage,
  },
  {
    id: 8,
    name: "Tiểu cảnh gốm vẽ 26",
    price: "100.000đ",
    image: bonsaiOfficeImage,
  },
];

const productDetailImage = {
  id: 1,
  name: "Tiểu cảnh gốm vẽ 26",
  price: "100.000đ",
  image: [
    {
      id: 1,
      image: testProduct,
    },
    { id: 2, image: bonsaiOfficeImage },
    { id: 3, image: CayTung },
    { id: 4, image: CayTung },
  ],
};


const productList = [
  {
    productId: 1,
    name: "Cây Tùng 1",
    price: 150000,
    image: CayTung,
  },
  {
    productId: 2,
    name: "Cây Tùng 2",
    price: 150000,
    image: CayTung,
  },
  {
    productId: 3,
    name: "Cây Tùng 3",
    price: 150000,
    image: CayTung,
  },
  {
    productId: 4,
    name: "Cây Tùng 4",
    price: 150000,
    image: CayTung,
  },
];


export { topProducts, bonsaiOffice, productDetailImage, productList };
