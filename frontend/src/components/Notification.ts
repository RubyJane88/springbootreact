import { notification } from "antd";

export const openNotification = (
  type: string,
  message: string,
  description: string
) => {
  notification[type]({
    message,
    description,
  });
};

export const successNotification = (message, description) => {
  openNotification("success", message, description);
};

export const infoNotification = (message, description) => {
  openNotification("info", message, description);
};

export const warningNotification = (message, description) => {
  openNotification("warning", message, description);
};

export const errorNotification = (message, description) => {
  openNotification("error", message, description);
};
