import { getSemana } from "../services/semana-laboral.service";

const useSemanaLaboral = async () => {
  const semana = await getSemana();

  return {
    semana,
  };
};

export default useSemanaLaboral;
