import { useState } from "react";
import Btn from "../../components/ui/btn";
import Select from "../../components/ui/select";
import { aparmnetsDiscount, apartmentsSort } from "../../config/sortConfig";
import "./index.css";

const Apartments = () => {
  const [activeIcon, setActiveIcon] = useState({
    all: false,
    noDiscount: false,
    withDiscount: false,
  });

  const handleActiveIcon = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const name = e.target.name;
    setActiveIcon((prev) => {
      const active = Object.fromEntries(
        Object.entries(prev).map(([icon]) =>
          icon === name ? [name, true] : [icon, false],
        ),
      );
      return active as typeof activeIcon;
    });
  };
  return (
    <div className="apartments">
      <div className="apartments-header">
        <h1>All apartments</h1>
        <menu>
          {aparmnetsDiscount.map((discount) => {
            const { name, content } = discount;
            return (
              <Btn
                key={name}
                variation="ghost"
                size="md"
                active={`${activeIcon && activeIcon[name] && "act"}`}
                name={name}
                onClick={handleActiveIcon}
              >
                {content}
              </Btn>
            );
          })}
        </menu>
        <Select options={apartmentsSort} size="md" />
      </div>
      <table className="apartments-table">
        <thead className="apartments-table-header">
          <tr>
            <th>Cabin</th>
            <th>Capacity</th>
            <th>Price</th>
            <th>Discount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apartment 1</td>
            <td>100€</td>
            <td>4</td>
          </tr>
        </tbody>
        <tfoot>
          {" "}
          {/* optional - totals, summaries */}
          <tr>
            <td>Total</td>
            <td>100€</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default Apartments;
