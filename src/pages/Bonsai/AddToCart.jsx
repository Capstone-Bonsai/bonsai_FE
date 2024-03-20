import Cookies from "universal-cookie";
import { setCartFromCookie } from "../../redux/slice/bonsaiSlice";
import { toast } from "react-toastify";

const cookies = new Cookies();
const userInfo = cookies.get("user");
const idUser = userInfo?.id;
export const addToCart = async (
  bonsaiId,
  bonsaiName,
  bonsaiPrice,
  bonsaiImage,
  bonsaiSubCategory,
  dispatch
) => {
  let cartItems =
    userInfo != null
      ? cookies.get(`cartId ${idUser}`) || []
      : cookies.get("cartItems") || [];

  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  const isProductExist = cartItems.some((item) => item.bonsaiId === bonsaiId);
  if (isProductExist) {
    toast.info("Sản phẩm đã có trong giỏ hàng!");
    return;
  }

  cartItems.push({
    bonsaiId,
    name: bonsaiName,
    price: bonsaiPrice,
    image: bonsaiImage,
    subCategory: bonsaiSubCategory,
  });
  toast.success("Đã thêm sản phẩm vào giỏ hàng!");

  const cartId = userInfo != null ? `cartId ${idUser}` : "cartItems";

  await cookies.set(cartId, cartItems, { path: "/" });

  const itemCount = cartItems.length;
  dispatch(setCartFromCookie({ cartItems, itemCount }));
};
