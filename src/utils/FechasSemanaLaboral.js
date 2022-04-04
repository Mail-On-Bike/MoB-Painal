import { getHours, getMinutes, getToday, weekLabel } from "./FormatFechas";

import dayjs from "dayjs";
import "dayjs/locale/es";

const getMaxHour = (semanaArray, currentDay) => {
  return semanaArray.find((day) => day.id === currentDay).deadline;
};

const nextDay = (semanaArray, currentDay) => {
  const fecha = dayjs().format("YYYY-MM-DD");
  const nextWeek = dayjs()
    .set("date", dayjs().date() + 7)
    .format("YYYY-MM-DD");

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
  const day = getToday();
  const hour = `${getHours()}:${getMinutes()}`;

  if (
    !semanaArray.find((d) => d.id === day).isLaborable ||
    hour > getMaxHour(semanaArray, day)
  )
    return nextDay(semanaArray, day);

  return dayjs().format("YYYY-MM-DD");
};

export const getFechaFinal = (semanaArray, inicio) => {
  const fechaInicio = dayjs(inicio).format("YYYY-MM-DD");
  const currentDay = dayjs(inicio).day() === 0 ? 7 : dayjs(inicio).day();
  const nextWeek = dayjs()
    .set("date", dayjs().date() + 7)
    .format("YYYY-MM-DD");

  const laborablesRestantes = semanaArray
    .filter((d) => d.isLaborable)
    .filter((d) => d.id > currentDay + 1)
    .map((d) => d.id);
  const laborablesNext = semanaArray
    .filter((d) => d.isLaborable)
    .filter((d) => d.id <= currentDay + 1)
    .map((d) => d.id);

  const newArray = laborablesRestantes.concat(laborablesNext);
  const result = weekLabel(fechaInicio);
  const result2 = weekLabel(nextWeek);

  return newArray[0] === 1 ? result2[newArray[0] - 1] : result[newArray[0] - 1];
};
