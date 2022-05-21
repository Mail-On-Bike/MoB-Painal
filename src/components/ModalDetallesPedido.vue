<template>
  <div v-if="showModal">
    <div
      class="modal fade show"
      id="exampleModalScrollable"
      tabindex="-1"
      aria-labelledby="exampleModalScrollableTitle"
      style="display: block"
      aria-modal="true"
      role="dialog"
    >
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalScrollableTitle">
              Datos del pedido: # {{ pedido.id }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-12 text-left card-detalles-pedido p-1">
                <div class="d-flex w-100 justify-content-between mb-3">
                  <div>
                    <h6 class="mb-2">{{ pedido.tipoDeEnvio.tipo }}</h6>
                    <span for=""
                      >{{ pedido.tipoCarga }} /
                      {{ pedido.modalidad.tipo }}</span
                    ><br />
                    <span>Distancia: {{ pedido.distancia }}km.</span><br />
                    <span>CO2 Ahorrado: {{ pedido.CO2Ahorrado }}km.</span>
                  </div>
                  <div class="text-end">
                    <h5
                      class="fw-700"
                      :class="{
                        fc_programado: pedido.statusId === 1,
                        fc_por_recoger: pedido.statusId === 2,
                        fc_en_transito: pedido.statusId === 3,
                        fc_entregado: pedido.statusId === 4,
                        fc_falso_flete: pedido.statusId === 5,
                      }"
                    >
                      {{ pedido.status.tag }}
                    </h5>
                    <span>{{ formatUIDate(pedido.fecha) }}</span>
                  </div>
                </div>
                <div class="d-flex w-100 flex-column">
                  <div
                    class="w-100 d-flex"
                    style="border-bottom: 1px solid #ddd"
                  >
                    <div
                      class="mb-0 w-auto py-1 px-4 fw-600"
                      style="
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        background-color: aliceblue;
                      "
                    >
                      Origen
                    </div>
                  </div>
                  <div class="d-flex flex-column p-2">
                    <span class="mb-1"
                      ><i class="fas fa-map-marker-alt me-1"></i>
                      {{ pedido.direccionRemitente }},
                      {{ pedido.distritoRemitente }}</span
                    >
                    <div class="d-flex justify-content-between">
                      <span class="mb-1"
                        ><i class="fas fa-user me-1"></i>
                        {{ pedido.contactoRemitente }}</span
                      >
                      <span class="mb-1"
                        ><i class="fas fa-phone me-1"></i>
                        {{ pedido.telefonoRemitente }}</span
                      >
                    </div>
                    <div class="w-100">
                      <span class="mb-1"
                        ><i class="fas fa-comment-alt me-1"></i>
                        {{
                          pedido.otroDatoRemitente != ""
                            ? pedido.otroDatoRemitente
                            : "Sin Comentarios Adiconales"
                        }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="d-flex w-100 flex-column">
                  <div
                    class="w-100 d-flex"
                    style="border-bottom: 1px solid #ddd"
                  >
                    <div
                      class="mb-0 w-auto py-1 px-4 fw-600"
                      style="
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        background-color: aliceblue;
                      "
                    >
                      Destino
                    </div>
                  </div>
                  <div class="d-flex flex-column p-2">
                    <span class="mb-1"
                      ><i class="fas fa-map-marker-alt me-1"></i>
                      {{ pedido.direccionConsignado }},
                      {{ pedido.distrito.distrito }}</span
                    >
                    <div class="d-flex justify-content-between">
                      <span class="mb-1"
                        ><i class="fas fa-user me-1"></i>
                        {{ pedido.contactoConsignado }}</span
                      >
                      <span class="mb-1"
                        ><i class="fas fa-phone me-1"></i>
                        {{ pedido.telefonoConsignado }}</span
                      >
                    </div>
                    <div class="w-100">
                      <span class="mb-1"
                        ><i class="fas fa-comment-alt me-1"></i>
                        {{
                          pedido.otroDatoConsignado != ""
                            ? pedido.otroDatoConsignado
                            : "Sin Comentarios Adiconales"
                        }}</span
                      >
                    </div>
                  </div>
                </div>
                <div class="d-flex w-100 flex-column">
                  <div
                    class="w-100 d-flex"
                    style="border-bottom: 1px solid #ddd"
                  >
                    <div
                      class="mb-0 w-auto py-1 px-4 fw-600"
                      style="
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        background-color: aliceblue;
                      "
                    >
                      Pago
                    </div>
                  </div>
                  <div class="d-flex justify-content-between p-2">
                    <div class="d-flex flex-column justify-content-center">
                      <span>Forma de Pago</span>
                      <h6 class="fw-600">{{ pedido.formaPago }}</h6>
                    </div>
                    <div class="d-flex flex-column justify-content-center">
                      <span>Tarifa</span>
                      <h5 class="fw-600">S./ {{ pedido.tarifa }}</h5>
                    </div>
                  </div>
                </div>
                <div class="d-flex w-100 flex-column">
                  <div
                    class="w-100 d-flex"
                    style="border-bottom: 1px solid #ddd"
                  >
                    <div
                      class="mb-0 w-auto py-1 px-4 fw-600"
                      style="
                        border-top-left-radius: 10px;
                        border-top-right-radius: 10px;
                        background-color: aliceblue;
                      "
                    >
                      Comentarios
                    </div>
                  </div>
                  <div class="d-flex justify-content-between p-2">
                    <span>{{ pedido.comentario }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import { formatUIDate } from "../utils";

export default {
  props: ["showModal", "pedido"],
  emits: ["closeModal"],
  setup(props, { emit }) {
    const closeModal = () => {
      emit("closeModal");
    };

    return {
      closeModal,
      formatUIDate,
    };
  },
};
</script>

<style lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
</style>
