export const convertDate = (value) => {
  return value.split("/").reverse().join("-");
};

export const getToday = () => {
  const fecha = new Date().toLocaleString("es", { timeZone: "America/Lima" });
  const date = fecha.split(", ")[0];

  return new Date(convertDate(date));
};

export const getTodayDay = () => {
  return getToday().getDay() === 0 ? 7 : getToday().getDay();
};

export const getDayFromDate = (value) => {
  const fecha = new Date(value).toLocaleString("es", {
    timeZone: "America/Lima",
  });

  return new Date(convertDate(fecha.split(", ")[0])).getDay();
};

export const formatDate = (value) => {
  const fecha = new Date(value).toLocaleString("es", {
    timeZone: "America/Lima",
  });
  const date = fecha.split(", ")[0];

  return convertDate(date);
};

export function weekLabel(current) {
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
    weekFormat.push(w.toISOString().split("T")[0]);
  });

  return weekFormat;
}
