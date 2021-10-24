import axios from "axios";
import authHeader from "@/services/auth-header";

export default async function calcularTarifa(
  distancia,
  tipoEnvio,
  modalidad,
  distrito
) {
  try {
    const {
      data: { tarifa, tarifaSugerida },
    } = await axios.post(
      `${process.env.VUE_APP_HERMES}/calcular-tarifa`,
      { distancia, tipoEnvio, modalidad, distrito },
      {
        headers: authHeader(),
      }
    );

    return { tarifa, tarifaSugerida };
  } catch (error) {
    console.error(`Error desde el servicio calcular Tarifa: ${error.message}`);
  }
}
