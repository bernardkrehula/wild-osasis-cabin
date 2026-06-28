import type { SelectType } from "#/types/navbar.types.ts/SelectType";
import "./index.css";
import Option from "./option";

const Select = ({ options, size, onChange }: SelectType) => {
  return (
    <select onChange={onChange} className={`select ${size}`}>
      {options.map((option) => {
        const {name, content} = option;
        return <Option name={name} content={content} />;
      })}
    </select>
  );
};
export default Select;
