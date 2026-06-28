import { useState } from "react";
import Btn from "#/components/ui/btn";
import Select from "#/components/ui/select";
import {
  aparmnetsDiscount,
  apartmentsSort,
} from "#/config/configData/sortConfig";
import "./index.css";
import Apartment from "./apartment";
import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { requestApartments } from "#/api/requestApartmets";
import type { ActiveIcon } from "#/types/pagest.types.ts/ApartmentPage.types.ts/ActiveIcon.type";
import type { ApartmentType } from "#/types/pagest.types.ts/ApartmentPage.types.ts/Apartment.type";
import ApartmentModal from "./apartment/apartmentModal";
import { getFormData } from "#/utils/getFormData";
import { requestAddNewApartment } from "#/api/requestAddNewApartment";

const Apartments = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeIcon, setActiveIcon] = useState<ActiveIcon>({
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

  return (
    <div className="apartments">
      <div className="apartments-header">
        <h1>All apartments</h1>
        <menu>
          {aparmnetsDiscount.map((discount) => {
            const { name, content, id } = discount;
            return (
              <Btn
                type="button"
                key={name}
                onClick={() => handleDiscount(name, id)}
                variation="ghost"
                size="md"
                active={`${activeIcon[id as keyof ActiveIcon] && "act"}`}
                name={name}
              >
                {content}
              </Btn>
            );
          })}
        </menu>
        <Select onChange={setSort} options={apartmentsSort} size="md" />
      </div>
      <table className="apartments-table">
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
      </table>
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
