import { toast } from "react-toastify";
import { Dialog } from "../components/Dialog";
import { createElement } from "react";
export const showMessage = {
  success: (msg: string) => toast.success(msg),
  error: (msg: string) => toast.error(msg),
  warn: (msg: string) => toast.warn(msg),
  warning: (msg: string) => toast.warning(msg),
  info: (msg: string) => toast.info(msg),
  dismiss: () => toast.dismiss(),
  confirm: (data: string, onClosing: (confirmation: boolean) => void) =>
    toast((props) => createElement(Dialog, props), {
      data,
      onClose: (confirmation) => {
        if (confirmation) return onClosing(true);
        return onClosing(false);
      },
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      draggable: false,
      position: 'top-center'
    }),
};
