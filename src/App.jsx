import { useEffect, useState } from "react";
import Router from "./router/Router";
import { useDispatch, useSelector } from "react-redux";
import { connectWebSocket, resetWebsocket } from "./redux/thunk";

function App() {
  const webSocket = useSelector((state) => state.webSocket);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetWebsocket());
    dispatch(connectWebSocket());
    return () => {
      if (webSocket) {
        webSocket.onclose(1000);
      }
    };
  }, [dispatch, webSocket]);
  return (
    <>
      <Router />
    </>
  );
}

export default App;
