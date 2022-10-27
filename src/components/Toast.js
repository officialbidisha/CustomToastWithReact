import { useEffect, useRef } from "react";
import "./Toast.css";
import ReactDOM from "react-dom";
const Toast = (props) => {
  let { toastList, setList } = props;

  const toastRef = useRef(null);

  const calculateToastColor = (toast) => {
    switch (toast.type) {
      case "success":
        return "green";
      case "failure":
        return "red";
      case "warning":
        return "orange";
      case "info":
        return "cyan";
      default:
        return "pink";
    }
  };

  useEffect(() => {
    toastList.map((toast) => {
      if (toast.timeOut) {
        let { id, onClose, timeOut } = toast;
        const interval = setTimeout(() => {
          handleClick({ event: { e: null, id }, closeAction: onClose });
        }, timeOut);
        return () => {
          clearTimeout(interval);
        };
      }
    });
  }, [toastList]);

  useEffect(() => {
    return () => {
      if (document.querySelector("#toast").children.length>0) {
        document.querySelector('#toast').childNodes[0].remove();
      }
    };
  }, []);

  const handleClick = (event) => {
    const list = toastList.filter((l) => l.id !== event.event.id);
    setList(list);
    if (event.closeAction) {
      event.closeAction(event.event.e);
    }
  };

  return toastList.map((toast, index) => {
    const { id, position, backgroundColor, title, description, onClose } =
      toast;
    const finalPosition = position ?? "top-right";
    const finalBackgroundColor = backgroundColor ?? calculateToastColor(toast);
    return ReactDOM.createPortal(
      <div
        className={`toast-content ${finalPosition}`}
        key={index}
        style={{
          backgroundColor: finalBackgroundColor,
        }}
        ref={toastRef}
      >
        <button
          className="close-button"
          onClick={(e) =>
            handleClick({ event: { e, id }, closeAction: onClose })
          }
        >
          X
        </button>
        <div className="toast-container">
          <p className="toast-title">{title}</p>
          <p className="toast-description">{description}</p>
        </div>
      </div>,
      document.querySelector("#toast")
    );
  });
};
export default Toast;
