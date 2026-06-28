import type { OptionType } from "./OptionType";

export type SelectType = {
  options: OptionType[];
  size: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};
