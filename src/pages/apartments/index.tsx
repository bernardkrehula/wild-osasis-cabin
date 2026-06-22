import { useState } from "react";
import Btn from "#/components/ui/btn";
import Select from "#/components/ui/select";
import { aparmnetsDiscount, apartmentsSort } from "#/config/sortConfig";
import "./index.css";
import { apartmentsConifg } from "#/config/apartmentsConfig";
import Apartment from "./apartment";
import { useSearchParams } from "react-router-dom";
import { apartmentEditConfig } from "./apartment/apartmentEditModal/apartmentEditConfig";

const Apartments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIcon, setActiveIcon] = useState({
    all: false,
    noDiscount: false,
    withDiscount: false,
  });
  const [apartments, setApartments] = useState(apartmentsConifg);
  const [inputsValue, setInputsValue] = useState({
    id: 0,
    capacity: 0,
    price: 0,
    discount: 0,
  });

  const setSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    searchParams.set("sortBy", option);
    setSearchParams(searchParams);
  };
  const setDiscount = (discount: string) => {
    searchParams.set("discount", discount);
    setSearchParams(searchParams);
  };

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
    setDiscount("no-discount");
    filterDiscount(e);
  };
  const filterDiscount = (e: React.ChangeEvent<HTMLButtonElement>) => {
    const name = e.target.name;
    setApartments((prev) => {
      switch (name) {
        case "all":
          return apartmentsConifg;
        case "noDiscount":
          return apartmentsConifg.filter((a) => a.discount === 0);
        case "withDiscount":
          return apartmentsConifg.filter((a) => a.discount > 0);
        default:
          return prev;
      }
    });
  };

  const sortApartments = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;

    setApartments((prev) => {
      const sorted = [...prev];

      switch (sort) {
        case "name-asc":
          return sorted.sort((a, b) =>
            a.id.toLowerCase().localeCompare(b.id.toLowerCase()),
          );
        case "name-desc":
          return sorted.sort((a, b) =>
            b.id.toLowerCase().localeCompare(a.id.toLowerCase()),
          );
        case "price-asc":
          return sorted.sort((a, b) => a.price - b.price);
        case "price-desc":
          return sorted.sort((a, b) => b.price - a.price);
        case "capacity-asc":
          return sorted.sort((a, b) => a.capacity - b.capacity);
        case "capacity-desc":
          return sorted.sort((a, b) => b.capacity - a.capacity);
        default:
          return prev;
      }
    });
  };
  const handleSetSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e);
    sortApartments(e);
  };

  const handleEditApartment = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValue = apartmentEditConfig.map(({name}) => ({[name]: formData.get(name)}))
    setInputsValue(formValue)
    console.log(formValue)
  }
  const handleInputs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputsValue(prev => ({...prev, [name]: value}))
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
        <Select options={apartmentsSort} onChange={handleSetSort} size="md" />
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
          {apartments.map((apartment) => {
            return <Apartment key={apartment.id} apartment={apartment} handleEditApartment={handleEditApartment} handleInputs={handleInputs} inputsValue={inputsValue}/>;
          })}
        </table>
      </div>
      <Btn variation="ghost" size="md">Add new apartment</Btn>
    </div>
  );
};
export default Apartments;
