import Btn from "#/components/ui/btn";
import Input from "#/components/ui/input";
import { apartmentEditConfig } from "./apartmentEditConfig";
import "./index.css";

const ApartmentEditModal = ({
  handleActiveEditModal,
  handleEditApartment,
  apartment,
}) => {
  return (
    <form
      className="apartment-edit-modal"
      onSubmit={handleEditApartment}
      id={apartment.id}
    >
      <div className="backdrop" />
      <div className="apartment-edit-content">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="x-icon"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>

        <div className="apartment-inputs">
          {apartmentEditConfig.map((property) => {
            const { label, type, name } = property;

            if (name === "img") return;
            return (
              <div>
                <span>{label}</span>
                <Input
                  name={name}
                  defaultValue={apartment[name]}
                  variation="custom-search"
                  type={type}
                />
              </div>
            );
          })}
        </div>

        <div className="apartment-edit-btns">
          <Btn type="button" onClick={handleActiveEditModal} variation="primary" size="lg">
            Cancel
          </Btn>
          <Btn type="submit" variation="primary" size="lg">
            Edit
          </Btn>
        </div>
      </div>
    </form>
  );
};
export default ApartmentEditModal;
