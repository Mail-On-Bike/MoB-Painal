<template>
  <div v-if="showModal">
		<div class="modal fade show" id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableTitle" style="display: block;" aria-modal="true" role="dialog">
			<div class="modal-dialog modal-dialog-scrollable">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalScrollableTitle">Datos del pedido: # {{pedido.id}}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12 text-left card-detalles-pedido">
								<div class="flex">
									<div class="w-65 pr-1">
										<h6 >Fecha de envío:</h6>
										<p >{{pedido.fecha}}</p>
									</div>
									<div class="w-35">
										<h6 >Tipo de Envío:</h6>
										<p >{{pedido.tipoDeEnvio.tipo}}</p>
									</div>
								</div>
								<div class="flex">
									<div class="w-65 pr-1">
										<h6 >Tipo de Carga:</h6>
										<p >{{pedido.tipoCarga}}</p>
									</div>
									<div class="w-35">
										<h6 >Modalidad:</h6>
										<p >{{pedido.modalidad.tipo}}</p>
									</div>
								</div>
								<div class="flex">
									<div class="w-65 pr-1">
										<h6 >Origen:</h6>
										<p >{{pedido.direccionRemitente}}, {{pedido.distritoRemitente}}</p>
									</div>
									<div class="w-35">
										<h6 >Contacto:</h6>
										<p >{{pedido.contactoRemitente}}, {{pedido.telefonoRemitente}}</p>
									</div>
								</div>
								<h6 >Observaciones en el Origen:</h6>
								<p >{{pedido.otroDatoRemitente}}</p>
                <hr>
								<div class="flex">
									<div class="w-65 pr-1">
										<h6 >Destino:</h6>
										<p >{{pedido.direccionConsignado}}, {{pedido.distritoConsignado}}</p>
									</div>
									<div class="w-35">
										<h6 >Contacto:</h6>
										<p >{{pedido.contactoConsignado}}, {{pedido.telefonoConsignado}}</p>
									</div>
								</div>
								<h6 >Observaciones en el Destino:</h6>
								<p >{{pedido.otroDatoConsignado}}</p>
								<div class="flex">
									<div class="w-65 pr-1">
										<h6 >Distancia Total: </h6>
										<p >{{pedido.distancia}} km</p>
									</div>
									<div class="w-35">
										<h6 >Tarifa: </h6>
										<p >S./ {{pedido.tarifa}}</p>
									</div>
								</div>
								
								<h6 >Forma de pago predefinida: </h6>
								<p >Credito</p>
							</div>  
							<div class="col-12"><br></div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-backdrop fade show"></div>
    <!-- <transition name="modal">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">Modal title</h5>
                <button
                  style="font-size: 14px; background-color: white; border: 0"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span
                    style="font-size: 14px !important"
                    aria-hidden="true"
                    @click="closeModal"
                    >X</span
                  >
                </button>
              </div>
              <div class="modal-body">
                <div class="row">
                  <div class="col-12 text-left card-pedido">
                    <div class="card-pedido-header flex space-between">
                      <h5 class="white w-auto">Datos del pedido</h5>

                      <button class="btn-sm btn-warning" @click="editarPedido">
                        <i class="fas fa-edit"></i>
                      </button>
                    </div>

                    <br />
                    <div class="flex">
                      <div class="w-50 pr-1">
                        <h6 >Fecha de envío:</h6>
                        <p >{{ pedido.fecha }}</p>
                      </div>
                      <div class="w-50">
                        <h6 >Tipo de Envío:</h6>
                        <p >
                          {{ pedido.tipoEnvio }}
                        </p>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-65 pr-1">
                        <h6 >Tipo de Carga:</h6>
                        <p >
                          {{ pedido.tipoCarga }}
                        </p>
                      </div>
                      <div class="w-35">
                        <h6 >Modalidad:</h6>
                        <p >
                          {{ pedido.modalidad }}
                        </p>
                      </div>
                    </div>
                    <div class="flex">
                      <div class="w-65 pr-1">
                        <h6 >Origen:</h6>
                        <p >
                          {{ pedido.direccionRemitente }},
                          {{ pedido.distritoRemitente }}
                        </p>
                      </div>
                      <div class="w-35">
                        <h6 >Contacto:</h6>
                        <p >
                          {{ pedido.contactoRemitente }},
                          {{ pedido.telefonoRemitente }}
                        </p>
                      </div>
                    </div>
                    <h6 >Observaciones en el Origen:</h6>
                    <p >
                      {{ pedido.otroDatoRemitente }}
                    </p>
                    <div class="flex">
                      <div class="w-65 pr-1">
                        <h6 >Destino:</h6>
                        <p >
                          {{ pedido.direccionConsignado }},
                          {{ pedido.distritoConsignado }}
                        </p>
                      </div>
                      <div class="w-35">
                        <h6 >Contacto:</h6>
                        <p >
                          {{ pedido.contactoConsignado }},
                          {{ pedido.telefonoConsignado }}
                        </p>
                      </div>
                    </div>
                    <h6 >Observaciones en el Destino:</h6>
                    <p >
                      {{ pedido.otroDatoConsignado }}
                    </p>
                    <div class="flex">
                      <div class="w-65 pr-1">
                        <h6 >Distancia Total:</h6>
                        <p >
                          {{ pedido.distancia }} km
                        </p>
                      </div>
                      <div class="w-35">
                        <h6 >Tarifa:</h6>
                        <p >
                          S./ {{ pedido.tarifa }}
                        </p>
                      </div>
                    </div>

                    <h6 >Forma de pago predefinida:</h6>
                    <p >Credito</p>
                  </div>
                  <div class="col-12"><br /></div>
                  <div class="col-6">
                    <button class="btn btn-danger">Cancelar</button>
                  </div>
                  <div class="col-6">
                    <button class="btn btn-accept" @click="handleAnadirPedido">
                      Confirmar
                    </button>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  @click="closeModal"
                >
                  Close
                </button>
                <button type="button" class="btn btn-primary">
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition> -->
  </div>
</template>

<script>
export default {
  props: ["showModal", "pedido"],
  emits: ["closeModal"],
  setup(props, { emit }) {
    const closeModal = () => {
      emit("closeModal");
    };

    return {
      closeModal,
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