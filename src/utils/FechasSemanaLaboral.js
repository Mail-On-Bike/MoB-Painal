import {
  convertDate,
  formatDate,
  getDayFromDate,
  getToday,
  getTodayDay,
  weekLabel,
} from "./FormatFechas";

const getMaxHour = (semanaArray, currentDay) => {
  return semanaArray.find((day) => day.id === currentDay).deadline;
};

const nextDay = (semanaArray, currentDay) => {
  const fecha = getToday();
  const nextWeek = new Date(new Date().setDate(new Date(fecha).getDate() + 7));

  const laborablesRestantes = semanaArray
    .filter((d) => d.isLaborable)
    .filter((d) => d.id > currentDay)
    .map((d) => d.id);
  const laborablesNext = semanaArray
    .filter((d) => d.isLaborable)
    .filter((d) => d.id <= currentDay)
    .map((d) => d.id);

  const newArray = laborablesRestantes.concat(laborablesNext);

  const result = weekLabel(fecha);
  const result2 = weekLabel(nextWeek);

  return newArray[0] === 1 ? result2[newArray[0] - 1] : result[newArray[0] - 1];
};

export const getFechaInicial = (semanaArray) => {
  const fecha = new Date().toLocaleString("es", { timeZone: "America/Lima" });
  const date = fecha.split(" ")[0];
  const day = getTodayDay();
  const hour = fecha.split(" ")[1];

  if (
    !semanaArray.find((d) => d.id === day).isLaborable ||
    hour > getMaxHour(semanaArray, day)
  )
    return nextDay(semanaArray, day);

  return convertDate(date);
};

export const getFechaFinal = (semanaArray, inicio) => {
  const fechaInicio = new Date(formatDate(inicio));
  const currentDay = getDayFromDate(fechaInicio);
  const nextWeek = new Date(
    new Date().setDate(new Date(fechaInicio).getDate() + 7)
  );

  const laborablesRestantes = semanaArray
    .filter((d) => d.isLaborable)
    .filter((d) => d.id > currentDay + 2)
    .map((d) => d.id);
  const laborablesNext = semanaArray
    .filter((d) => d.isLaborable)
    .filter((d) => d.id <= currentDay + 2)
    .map((d) => d.id);

  const newArray = laborablesRestantes.concat(laborablesNext);

  const result = weekLabel(fechaInicio);
  const result2 = weekLabel(nextWeek);

  return convertDate(
    newArray[0] === 1 ? result2[newArray[0] - 1] : result[newArray[0] - 1]
  );
};
