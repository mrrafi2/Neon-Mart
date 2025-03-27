import { createPortal } from "react-dom";

const OverlayPortal = ({ children }) => {
  return createPortal(children, document.body);
};

export default OverlayPortal;
