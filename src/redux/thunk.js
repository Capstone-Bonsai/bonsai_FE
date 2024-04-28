import { toast } from "react-toastify";
import {
  getWebSocket,
  selectWebSocket,
  setWebSocket,
} from "./slice/websocketReducer";
import Cookies from "universal-cookie";
export const connectWebSocket = () => {
  const cookies = new Cookies();
  const userInfo = cookies.get("user");
  return (dispatch) => {
    const socket = new WebSocket(
      `wss://capstoneb.azurewebsites.net/notification-hub?access_token=${userInfo?.token}`
    );
    const handshakeData = { protocol: "json", version: 1 };
    const handshakeRequest =
      JSON.stringify(handshakeData) + String.fromCharCode(0x1e);
    dispatch(setWebSocket(socket));

    socket.onopen = () => {
      socket.send(handshakeRequest);
    };

    socket.onerror = (error) => {};

    socket.onmessage = (event) => {
      const jsonEndIndex = event.data.lastIndexOf("}") + 1;
      const jsonOnly = event.data.substring(0, jsonEndIndex);
      var jsonObject = JSON.parse(jsonOnly);
      if (jsonObject?.type == 1) toast.info(jsonObject.arguments[0]);
      //
      // var cleanedJsonString = event.data.replace(/[^\x20-\x7E]/g, "");
      // var jsonObject = JSON.parse(cleanedJsonString);
      // console.log(jsonObject);
      // if (jsonObject?.type == 1) toast.info(jsonObject.arguments[0]);
    };
    socket.onclose = () => {};
  };
};
export const disconnectWebSocket = () => {
  return (dispatch, getState) => {
    dispatch(getWebSocket());
    const webSocket = selectWebSocket(getState());
    if (webSocket) {
      webSocket.onclose(1000);
    }
  };
};
export const resetWebsocket = () => {
  return (dispatch) => {
    dispatch(setWebSocket(null));
  };
};
