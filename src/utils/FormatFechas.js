import dayjs from "dayjs";
import "dayjs/locale/es";

export const getToday = () => {
  return dayjs().day() === 0 ? 7 : dayjs().day();
};

export const getCurrentDay = (value) => {
  return dayjs(value).day() === 0 ? 7 : dayjs(value).day();
};

export const getMinutes = () => {
  return dayjs().minute() < 10 ? `0${dayjs().minute()}` : dayjs().minute();
};

export function weekLabel(fecha) {
  const current = new Date(`${fecha}:10:00:00`);
  const week = [];
  const weekFormat = [];

  if (current.getDay() === 0) {
    //En los casos en que es domingo, restar como si fuera septimo dia y no cero
    current.setDate(current.getDate() - 7 + 1);
  } else {
    current.setDate(current.getDate() - current.getDay() + 1);
  }

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  week.forEach((w) => {
    weekFormat.push(dayjs(w).format("YYYY-MM-DD"));
  });

  return weekFormat;
}
