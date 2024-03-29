import axios from "axios";
import authHeader from "@/services/auth-header";

export default async function calcularComision(mobiker, tipoEnvio) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_HERMES}/calcular-comision?mob=${mobiker}&tipoEnvio=${tipoEnvio}`,
      {
        headers: authHeader(),
      }
    );

    return data;
  } catch (error) {
    console.error(
      `Error desde el servicio calcular Comision: ${error.message}`
    );
  }
}
