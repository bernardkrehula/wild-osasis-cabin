import supabase from "#/config/supabaseClientVite";
import { GenericError } from "#/utils/GenericError";
import { isAuthApiError } from "@supabase/supabase-js";

export const requestEditApartment = async (apartment) => {
  const { id } = apartment;

  const response = await supabase
    .from("apartments")
    .update(apartment)
    .eq("id", id);

  if (response.error) {
    if (isAuthApiError(response)) {
      return response.error;
    } else {
      throw new GenericError();
    }
  }
  console.log(response);
  return response;
};
