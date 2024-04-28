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
      console.log("WebSocket connection opened");
      socket.send(handshakeRequest);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
    };

    socket.onclose = () => {};
  };
};
export const disconnectWebSocket = () => {
  return (dispatch, getState) => {
    dispatch(getWebSocket());
    const webSocket = selectWebSocket(getState());
    if (webSocket) {
      webSocket.close();
    }
  };
};
export const resetWebsocket = () => {
  return (dispatch) => {
    dispatch(setWebSocket(null));
  };
};
