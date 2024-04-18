import Cookies from "universal-cookie";
import { setCartFromCookie } from "../../redux/slice/bonsaiSlice";
import { toast } from "react-toastify";

export const addToCart = async (
  bonsaiId,
  bonsaiName,
  bonsaiPrice,
  bonsaiImage,
  bonsaiSubCategory,
  dispatch
) => {
  const cookieExpires = new Date(Date.now() + 60 * 24 * 60 * 60 * 1000);
  const cookies = new Cookies(null, { expires: cookieExpires });
  const userInfo = cookies.get("user");
  const idUser = userInfo?.id;
  let cartItems;
  if (!idUser) {
    cartItems = cookies.get("cartItems") || [];
  } else {
    cartItems = cookies.get(`cartId ${idUser}`) || [];
  }
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  const isProductExist = cartItems.some((item) => item.bonsaiId === bonsaiId);
  if (isProductExist) {
    toast.info("Sản phẩm đã có trong giỏ hàng!");
    return;
  }
  cartItems.push(bonsaiId);
  toast.success("Đã thêm sản phẩm vào giỏ hàng!");
  const cartId = !idUser ? "cartItems" : `cartId ${idUser}`;
  await cookies.set(cartId, cartItems, { path: "/" });
  const itemCount = cartItems.length;
  dispatch(setCartFromCookie({ itemCount }));
};
