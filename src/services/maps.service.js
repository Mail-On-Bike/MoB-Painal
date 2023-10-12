import axios from "axios";
import authHeader from "@/services/auth-header";

export default async function consultarApi(
  origen,
  distritoOrigen,
  destino,
  distritoDestino
) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_HERMES}/consultar-google-maps-api`,
      { origen, distritoOrigen, destino, distritoDestino },
      {
        headers: authHeader(),
      }
    );

    return data;
  } catch (error) {
    console.error(
      `Error desde el servicio Consultar API del Maps: ${error.message}`
    );
  }
}
