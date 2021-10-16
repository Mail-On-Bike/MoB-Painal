import AuxiliarService from "@/services/auxiliares.service";

const rolesUsuariosStorage = JSON.parse(
  localStorage.getItem("rolesUsuarios_mob_painal")
);
const distritosStorage = JSON.parse(
  localStorage.getItem("distritos_mob_painal")
);
const zonaCoberturaStorage = JSON.parse(
  localStorage.getItem("zonaCobertura_mob_painal")
);
const tiposDeCargaStorage = JSON.parse(
  localStorage.getItem("tiposDeCarga_mob_painal")
);
const tiposDeComprobanteStorage = JSON.parse(
  localStorage.getItem("tiposDeComprobante_mob_painal")
);
const tiposDeEnvioStorage = JSON.parse(
  localStorage.getItem("tiposDeEnvio_mob_painal")
);
const formasDePagoStorage = JSON.parse(
  localStorage.getItem("formasDePago_mob_painal")
);
const modalidadesStorage = JSON.parse(
  localStorage.getItem("modalidades_mob_painal")
);
const rangosMoBikerStorage = JSON.parse(
  localStorage.getItem("rangosMoBiker_mob_painal")
);
const rolClienteStorage = JSON.parse(
  localStorage.getItem("rolCliente_mob_painal")
);
const entidadesBancariasStorage = JSON.parse(
  localStorage.getItem("entidadesBancarias_mob_painal")
);
const statusDelPedidoStorage = JSON.parse(
  localStorage.getItem("statusDelPedido_mob_painal")
);

export const auxiliares = {
  namespaced: true,
  state: {
    rolesUsuarios: rolesUsuariosStorage ? rolesUsuariosStorage : [],
    distritos: distritosStorage ? distritosStorage : [],
    zonaCobertura: zonaCoberturaStorage ? zonaCoberturaStorage : [],
    tiposDeCarga: tiposDeCargaStorage ? tiposDeCargaStorage : [],
    tiposDeComprobante: tiposDeComprobanteStorage
      ? tiposDeComprobanteStorage
      : [],
    tiposDeEnvio: tiposDeEnvioStorage ? tiposDeEnvioStorage : [],
    formasDePago: formasDePagoStorage ? formasDePagoStorage : [],
    modalidades: modalidadesStorage ? modalidadesStorage : [],
    rangosMoBiker: rangosMoBikerStorage ? rangosMoBikerStorage : [],
    rolCliente: rolClienteStorage ? rolClienteStorage : [],
    entidadesBancarias: entidadesBancariasStorage
      ? entidadesBancariasStorage
      : [],
    statusDelPedido: statusDelPedidoStorage ? statusDelPedidoStorage : [],
  },
  mutations: {
    setRolesUsuarios(state, payload) {
      state.rolesUsuarios = payload;
      localStorage.setItem("rolesUsuarios_mob_painal", JSON.stringify(payload));
    },
    setDistritos(state, payload) {
      state.distritos = payload;
      localStorage.setItem("distritos_mob_painal", JSON.stringify(payload));
    },
    setZonaCobertura(state, payload) {
      state.zonaCobertura = payload;
      localStorage.setItem("zonaCobertura_mob_painal", JSON.stringify(payload));
    },
    setTiposCarga(state, payload) {
      state.tiposDeCarga = payload;
      localStorage.setItem("tiposDeCarga_mob_painal", JSON.stringify(payload));
    },
    setTiposComprobante(state, payload) {
      state.tiposDeComprobante = payload;
      localStorage.setItem(
        "tiposDeComprobante_mob_painal",
        JSON.stringify(payload)
      );
    },
    setTiposEnvios(state, payload) {
      state.tiposDeEnvio = payload;
      localStorage.setItem("tiposDeEnvio_mob_painal", JSON.stringify(payload));
    },
    setFormasPago(state, payload) {
      state.formasDePago = payload;
      localStorage.setItem("formasDePago_mob_painal", JSON.stringify(payload));
    },
    setModalidades(state, payload) {
      state.modalidades = payload;
      localStorage.setItem("modalidades_mob_painal", JSON.stringify(payload));
    },
    setRangosMoBiker(state, payload) {
      state.rangosMoBiker = payload;
      localStorage.setItem("rangosMoBiker_mob_painal", JSON.stringify(payload));
    },
    setRolCliente(state, payload) {
      state.rolCliente = payload;
      localStorage.setItem("rolCliente_mob_painal", JSON.stringify(payload));
    },
    setEntidadesBancarias(state, payload) {
      state.entidadesBancarias = payload;
      localStorage.setItem(
        "entidadesBancarias_mob_painal",
        JSON.stringify(payload)
      );
    },
    setStatusPedido(state, payload) {
      state.statusDelPedido = payload;
      localStorage.setItem(
        "statusDelPedido_mob_painal",
        JSON.stringify(payload)
      );
    },
  },
  actions: {
    async getRolesUsuarios({ commit }) {
      try {
        const response = await AuxiliarService.getRolesUsers();
        commit("setRolesUsuarios", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getDistritosLima({ commit }) {
      try {
        const response = await AuxiliarService.getDistritos();
        commit("setDistritos", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getZonaCobertura({ commit }) {
      try {
        const response = await AuxiliarService.getDistritosZonaCobertura();
        console.log(response);
        commit("setZonaCobertura", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getTiposCarga({ commit }) {
      try {
        const response = await AuxiliarService.getTipoCarga();
        commit("setTiposCarga", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getComprobantes({ commit }) {
      try {
        const response = await AuxiliarService.getTipoComprobante();
        commit("setTiposComprobante", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getTiposEnvios({ commit }) {
      try {
        const response = await AuxiliarService.getTipoEnvio();
        commit("setTiposEnvios", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getFormasPago({ commit }) {
      try {
        const response = await AuxiliarService.getFormasPago();
        commit("setFormasPago", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getModalidades({ commit }) {
      try {
        const response = await AuxiliarService.getModalidad();
        commit("setModalidades", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getRangosMoB({ commit }) {
      try {
        const response = await AuxiliarService.getRangosMoB();
        commit("setRangosMoBiker", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getRolCliente({ commit }) {
      try {
        const response = await AuxiliarService.getRolCliente();
        commit("setRolCliente", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getEntidadesBancarias({ commit }) {
      try {
        const response = await AuxiliarService.getEntidadesBancarias();
        commit("setEntidadesBancarias", response.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getStatusPedido({ commit }) {
      try {
        const response = await AuxiliarService.getStatusPedidos();
        commit("setStatusPedido", response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {},
};
