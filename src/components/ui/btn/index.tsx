import type { BtnType } from "../../../types/ui.types.ts/BtnType";
import "./index.css";

const Btn = ({
  variation,
  size,
  type = "button",
  onClick,
  children,
  disabled,
  name,
}: BtnType) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${variation} ${size}`}
      type={type}
      disabled={disabled}
      name={name}
    >
      {children}
    </button>
  );
};
export default Btn;
