export type ApartmentMenuType = {
  id: string;
  handleActiveEditModal: () => void;
  deleteApartment: (value: string) => void;
  duplicateApartment: (value: string) => void;
};
