import { useState } from "react";
import Btn from "#/components/ui/btn";
import {
  aparmnetsDiscount,
  apartmentsSort,
} from "#/config/configData/sortConfig";
import "./index.css";
import Apartment from "./apartment";
import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { requestApartments } from "#/api/requestApartmets";
import type { ActiveApratmentFilter } from "#/types/pagest.types.ts/ApartmentPage.types.ts/ActiveApratmentFilter.type";
import type { ApartmentType } from "#/types/pagest.types.ts/ApartmentPage.types.ts/Apartment.type";
import ApartmentModal from "./apartment/apartmentModal";
import { getFormData } from "#/utils/getFormData";
import { requestAddNewApartment } from "#/api/requestAddNewApartment";
import Filters from "#/components/ui/filters";
import Sort from "#/components/ui/sort";
import Table from "#/components/ui/table";
import { theadData } from "./apartmentsTableData";

const columns = [
  {
    key: "img",
    className: "img-td",
    render: (row) => <img src={row.img} alt={row.name} />,
  },
  { key: "id", className: "id-td" },
  { key: "name", className: "name-td" },
  {
    key: "capacity",
    className: "capacity-td",
    render: (row) => `Fits up to ${row.capacity} guests`,
  },
  { key: "price", className: "price-td", render: (row) => `$${row.price}` },
  {
    key: "discount",
    className: "discount-td",
    render: (row) => `$${row.discount}`,
  },
];

const Apartments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIcon, setActiveIcon] = useState<ActiveApratmentFilter>({
    all: true,
    noDiscount: false,
    withDiscount: false,
  });
  const filterValues = {
    discount: searchParams.get("discount") ?? "all",
    sortBy: searchParams.get("sortBy") ?? "name-asc",
  };
  const [activeModal, setActiveModal] = useState<boolean>(false);

  const {
    data: apartments,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["apartments", filterValues],
    queryFn: () => requestApartments(filterValues),
    placeholderData: keepPreviousData,
  });
  if (isLoading) return;

  const setSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    searchParams.set("sortBy", option);
    setSearchParams(searchParams);
  };
  const handleDiscount = (discount: string, id: string) => {
    setDiscount(discount);
    handleActiveIcon(id);
  };
  const setDiscount = (discount: string) => {
    searchParams.set("discount", discount);
    setSearchParams(searchParams);
  };

  const handleActiveIcon = (name: string) => {
    setActiveIcon((prev) => {
      const active = Object.fromEntries(
        Object.entries(prev).map(([icon]) =>
          icon === name ? [name, true] : [icon, false],
        ),
      );
      return active as typeof activeIcon;
    });
  };
  const handleAddNewApartment = async (
    e: React.ChangeEvent<HTMLFormElement>,
  ) => {
    const data = getFormData(e);
    await requestAddNewApartment(data);
    handleActiveModal();
    refetch();
  };

  const handleActiveModal = () => {
    setActiveModal((prev) => !prev);
  };
  //Napraviti komponentu filters(odradeno) i sort(odradeno, preimenovana select componenta)
  //Sa tables napraviti da bude reusable u bookings
  //Table, tablehead, tablebody, tablerow
  //Filters, sort

  return (
    <div className="apartments">
      <div className="apartments-header">
        <h1>All apartments</h1>
        <Filters
          filtersData={aparmnetsDiscount}
          handleFilter={handleDiscount}
          activeFilter={activeIcon}
        />
        <Sort onChange={setSort} options={apartmentsSort} size="md" />
      </div>
      <Table theadData={theadData} tbodyData={apartments} columns={columns} />
      {/* <table className="apartments-table">
        <thead className="apartments-table-header">
          <tr>
            <th className="apartment-th">Apartment</th>
            <th className="capacity-th">Capacity</th>
            <th className="price-th">Price</th>
            <th className="discount-th">Discount</th>
          </tr>
        </thead>
        {apartments?.map((apartment: ApartmentType, index: number) => {
          return (
            <Apartment
              key={apartment.id}
              isLast={index === apartments.length - 1}
              apartment={apartment}
              refetch={refetch}
            />
          );
        })}
      </table> */}
      {activeModal && (
        <ApartmentModal
          activeModal={activeModal}
          handleActiveModal={handleActiveModal}
          handleApartmentData={handleAddNewApartment}
        />
      )}
      <Btn
        onClick={handleActiveModal}
        type="button"
        variation="primary"
        size="lg"
      >
        Add new apartment
      </Btn>
    </div>
  );
};
export default Apartments;
