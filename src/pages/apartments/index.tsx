import { useState } from "react";
import Btn from "../../components/ui/btn";
import Select from "../../components/ui/select";
import { aparmnetsDiscount, apartmentsSort } from "../../config/sortConfig";
import "./index.css";
import { apartmentsConifg } from "../../config/apartmentsConfig";
import Apartment from "./apartment";
import { useSearchParams } from "react-router-dom";

const Apartments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIcon, setActiveIcon] = useState({
    all: false,
    noDiscount: false,
    withDiscount: false,
  });

 
  const setDiscount = (discount: string) => {
    searchParams.set("discount", discount)
    setSearchParams(searchParams);
    console.log('radi')
  }

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

  const handleSetDiscount = (e: React.ChangeEvent<HTMLButtonElement>) => {
    handleActiveIcon(e);
    setDiscount('no-discount');
  }
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
                onClick={handleSetDiscount}
              >
                {content}
              </Btn>
            );
          })}
        </menu>
        <Select options={apartmentsSort} onChange={setSort} size="md" />
      </div>
      <div className="apartments-table">
        <thead className="apartments-table-header">
          <tr>
            <th className="apartment-th">Apartment</th>
            <th className="capacity-th">Capacity</th>
            <th className="price-th">Price</th>
            <th className="discount-th">Discount</th>
          </tr>
        </thead>

        <table className="apartments-table-content">
          {apartmentsConifg.map((apartment) => {
            return <Apartment key={apartment.id} apartment={apartment} />;
          })}
        </table> 
      </div>
    </div>
  );
};
export default Apartments;
