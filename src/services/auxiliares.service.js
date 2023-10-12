import axios from "axios";

const API_URL = import.meta.env.VITE_HERMES;

class AuxiliarService {
  getRolesUsers() {
    return axios.get(`${API_URL}/auxiliares/roles-usuarios`);
  }

  getDistritos() {
    return axios.get(`${API_URL}/auxiliares/distritos`);
  }

  getDistritosZonaCobertura() {
    return axios.get(`${API_URL}/auxiliares/zona-cobertura`);
  }

  getTipoCarga() {
    return axios.get(`${API_URL}/auxiliares/tipos-de-carga`);
  }

  getTipoComprobante() {
    return axios.get(`${API_URL}/auxiliares/tipos-de-comprobantes`);
  }

  getTipoEnvio() {
    return axios.get(`${API_URL}/auxiliares/tipos-de-envios`);
  }

  getFormasPago() {
    return axios.get(`${API_URL}/auxiliares/formas-de-pago`);
  }

  getModalidad() {
    return axios.get(`${API_URL}/auxiliares/modalidad`);
  }

  getRangosMoB() {
    return axios.get(`${API_URL}/auxiliares/rangos-MoBiker`);
  }

  getRolCliente() {
    return axios.get(`${API_URL}/auxiliares/roles-clientes`);
  }

  getEntidadesBancarias() {
    return axios.get(`${API_URL}/auxiliares/entidades-financieras`);
  }

  getStatusPedidos() {
    return axios.get(`${API_URL}/auxiliares/status`);
  }
}

export default new AuxiliarService();
