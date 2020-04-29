import { showMessage } from "react-native-flash-message";
import { colors } from "../styles";

export const showToast = (message, description, type = "success", time) => {
  showMessage({
    message,
    description,
    type,
    backgroundColor: type === "success" ? colors.secundary : colors.tomato,
    floating: true,
    position: "top",
    animationDuration: time ? time : 400
  });
};
