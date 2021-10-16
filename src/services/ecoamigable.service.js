import axios from "axios";
import authHeader from "@/services/auth-header";

export default async function calcularEstadisticas(distancia) {
  try {
    const {
      data: { co2, ruido },
    } = await axios.post(
      `${process.env.VUE_APP_HERMES}/calcular-estadisticas-ecoamigables`,
      { distancia },
      {
        headers: authHeader(),
      }
    );

    return { co2, ruido };
  } catch (error) {
    console.error(
      `Error desde el servicio calcular estadisticas ecoamigables: ${error.message}`
    );
  }
}
