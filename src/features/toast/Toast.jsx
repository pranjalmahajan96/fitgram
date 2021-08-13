import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const customToast = (msg) => {
  toast(msg, {
    position: "bottom-left",
    autoClose: 3000
  });
};
