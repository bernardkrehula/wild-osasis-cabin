import type { ActiveApratmentFilter } from "#/types/pagest.types.ts/ApartmentPage.types.ts/ActiveApratmentFilter.type";
import type { FilterType } from "#/types/ui.types.ts/filters.type.ts/FilterType";
import Btn from "../../btn";
import "./index.css";

const Filter = ({ filter, handleFilter, activeFilter }: FilterType) => {
  const { name, content, id } = filter;
  return (
    <Btn
      type="button"
      key={name}
      onClick={() => handleFilter(name, id)}
      variation="ghost"
      size="md"
      active={`${activeFilter[id as keyof ActiveApratmentFilter] && "act"}`}
      name={name}
    >
      {content}
    </Btn>
  );
};
export default Filter;
