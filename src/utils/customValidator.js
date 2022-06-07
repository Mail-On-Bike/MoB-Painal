/**
 * Valida el formulario. Retorna false en caso de algo no esté bien.
 * @params pedido - Objeto Pedido
 * @returns {boolean}
 */
export const isValid = (pedido) => {
  const {
    fecha,
    contactoRemitente,
    telefonoRemitente,
    direccionRemitente,
    distritoRemitente,
    contactoConsignado,
    telefonoConsignado,
    direccionConsignado,
    distritoConsignado,
  } = pedido;

  if (!fecha) return false;

  // Sección para Remitente
  if (
    !contactoRemitente ||
    contactoRemitente.trim() === "" ||
    contactoRemitente.length > 100
  )
    return false;

  if (
    !telefonoRemitente ||
    telefonoRemitente.trim() === "" ||
    telefonoRemitente.length > 15
  )
    return false;

  if (
    !direccionRemitente ||
    direccionRemitente.trim() === "" ||
    direccionRemitente.length > 150
  )
    return false;

  if (!distritoRemitente || distritoRemitente.trim() === "") return false;

  // Sección para Consignado
  if (
    !contactoConsignado ||
    contactoConsignado.trim() === "" ||
    contactoConsignado.length > 100
  )
    return false;

  if (
    !telefonoConsignado ||
    telefonoConsignado.trim() === "" ||
    telefonoConsignado.length > 15
  )
    return false;

  if (
    !direccionConsignado ||
    direccionConsignado.trim() === "" ||
    direccionConsignado.length > 150
  )
    return false;

  if (!distritoConsignado || distritoConsignado.trim() === "") return false;

  // Si todo va bien, return true
  return true;
};
