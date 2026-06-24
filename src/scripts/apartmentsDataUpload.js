import supabase from "../config/supabaseClientNode.js";
import { apartmentsData } from "../data/apartmentsData.js";

const apartmentsDataUpload = async () => {
  try {
    const { data, error } = await supabase
      .from("apartments")
      .insert(apartmentsData)
      .select();

    return data;
  } catch (error) {
    console.log(error);
  }
};
apartmentsDataUpload();
