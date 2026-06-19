import type { IconType } from "../../../types/ui.types.ts/IconType";
import { iconConfig } from "./iconsConfig";
import "./index.css";

const Icon = ({ name, variation, onClick }: IconType) => {
  return (
    <svg
      onClick={onClick}
      className={`icon ${variation}`}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconConfig[name].map((d, index) => {
        return <path key={index} d={d} />;
      })}
    </svg>
  );
};
export default Icon;
