import supabase from "#/config/supabaseClientVite";
import type { ApartmentType } from "#/types/pagest.types.ts/ApartmentPage.types.ts/Apartment.type";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestAddNewApartment = async (apartment: ApartmentType) => {
  console.log('apartmentId: ', apartment)

  const response = await supabase
    .from("apartments")
    .insert(apartment)

  if (response.error) {
    if (isAuthApiError(response)) {
      return response.error;
    } else {
      throw new GenericError();
    }
  }

  return response;
};
