import "./index.css";
import type { InputType } from "../../../types/ui.types.ts/InputType";

const Input = ({
  placeholder,
  onChange,
  variation,
  type,
  name,
  value,
}: InputType) => {
  return (
    <input
      className={`input ${variation}`}
      type={type}
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      value={value}
    />
  );
};
export default Input;
