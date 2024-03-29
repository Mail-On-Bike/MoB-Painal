import axios from "axios";
import authHeader from "@/services/auth-header";

export async function getSemana() {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_HERMES}/semana-laboral`,
      {
        headers: authHeader(),
      }
    );

    return data;
  } catch (error) {
    console.error(error.message);
  }
}
