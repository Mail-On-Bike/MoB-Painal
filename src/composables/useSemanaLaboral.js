import { ref } from "vue";
import { getSemana } from "../services/semana-laboral.service";

const formatDate = (value) => {
  let fecha = new Date(value);
  let year = fecha.getFullYear();
  let month = fecha.getMonth() + 1;
  let date = fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate();

  return year + "-" + month + "-" + date;
};

const getFechaInicial = () => {
  let fecha = new Date();
  let year = fecha.getFullYear();
  let month = fecha.getMonth() + 1;
  let date = fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate();

  return year + "-" + month + "-" + date;
};

const getFechaFinal = () => {
  let fecha = new Date();

  return formatDate(fecha.setDate(fecha.getDate() + 2));
};

const useSemanaLaboral = async () => {
  const semana = ref([]);
  const fechaInicial = ref("");
  const fechaFinal = ref("");

  await getSemana()
    .then((res) => {
      semana.value = res;
      // console.log({ res });
    })
    .catch((err) => console.error(err));

  fechaInicial.value = getFechaInicial(semana);
  // console.log(fechaInicial.value);

  fechaFinal.value = getFechaFinal(semana);
  // console.log(fechaFinal.value);
  
  return { semana: semana.value, fechaInicial: fechaInicial.value, fechaFinal: fechaFinal.value };
};

export default useSemanaLaboral;
