export const setWebSocket = (socket) => ({
  type: "SET_WEBSOCKET",
  payload: socket,
});
export const  getWebSocket = () => ({
  type: "GET_WEBSOCKET",
});

const initialState = {
  webSocket: null,
};
export const selectWebSocket = (state) => state.websocket.webSocket;
const websocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_WEBSOCKET":
      return {
        ...state,
        webSocket: action.payload,
      };
    case "GET_WEBSOCKET":
      return state.webSocket;
    default:
      return state;
  }
};

export default websocketReducer;
