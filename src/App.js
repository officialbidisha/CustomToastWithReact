import "./App.css";
import { useState } from "react";
import Toast from "./components/Toast";

function App() {
  const [toastList, setList] = useState([]);
  let toastProperties = null;

  const addSuccessToast = () => {
    showToast({
      id: 1,
      title: "Success Toast",
      description: "This is a success toast",
      position: "bottom-left",
      type: "success",
      onClose: closeAction,
    });
  };

  const addFailureToast = () => {
    showToast({
      id: 2,
      title: "Failure Toast",
      description: "This is a success toast",
      position: "bottom-right",
      type: "failure",
      onClose: closeAction,
    });
  };

  const addInfoToast = () => {
    showToast({
      id: 3,
      title: "Info Toast",
      description: "This is a success toast",
      position: "top-right",
      type: "info",
      onClose: closeAction,
    });
  };

  const addWarningToast = () => {
    showToast({
      id: 4,
      title: "Warning Toast",
      description: "This is a success toast",
      position: "top-left",
      type: "warning",
      onClose: closeAction,
      timeOut:600,
    });
  };
  const closeAction = (e) => {
    console.log("-----closed------");
  };
  const showToast = (toast) => {
    toastProperties = toast;
    setList((prev) => [...prev, toastProperties]);
  };

  return (
    <div className="App">
      <div className="list">
        <button onClick={addSuccessToast}>Success</button>
        <button onClick={addFailureToast}>Failure</button>
        <button onClick={addInfoToast}> Info</button>
        <button onClick={addWarningToast}>Warning</button>
      </div>
      <Toast toastList={toastList} setList={setList}></Toast>
    </div>
  );
}

export default App;
