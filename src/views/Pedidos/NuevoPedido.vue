<template>
  <h3 class="text-center">Nuevo Pedido</h3>
  <div class="row" style="width: 100%; margin: 0">
    <div class="col-md-2"></div>
    <div class="col-md-8 col-12">
      <div v-if="continuar" class="container">
        <div class="row">
          <div class="col-12">
            <div class="form-group">
              <label class="white" for="">Tipo de Envio</label>
              <select
                disabled
                readonly
                @change="changeDistritos($event)"
                name=""
                id=""
                class="form-select"
                v-model="nuevoPedido.tipoEnvio"
                required
              >
                <option value="E-Commerce">E-Commerce</option>
                <option value="Express">Express</option>
              </select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label class="white" for="">Modalidad</label>
              <select
                class="form-select"
                name=""
                id=""
                v-model="nuevoPedido.modalidad"
              >
                <option v-for="modalidad in modalidades" :key="modalidad.tipo">
                  {{ modalidad.tipo }}
                </option>
              </select>
            </div>
          </div>

          <div class="col-8">
            <div class="form-group">
              <label class="white" for="">Formas de Pago</label>
              <select
                class="form-select"
                name=""
                id=""
                v-model="nuevoPedido.formaPago"
                required
              >
                <option
                  v-for="formaDePago in formasDePago"
                  :key="formaDePago.id"
                >
                  {{ formaDePago.pago }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-4">
            <div class="form-group">
              <label class="white" for="recaudo">Recaudo</label>
              <input
                id="recaudo"
                type="number"
                step="0.01"
                min="0"
                class="form-control"
                v-model.number="nuevoPedido.recaudo"
              />
            </div>
          </div>

          <div class="col-6">
            <div class="form-group">
              <label class="white" for="">Fecha de Envío</label>
              <input
                type="date"
                class="form-control"
                v-model="nuevoPedido.fecha"
                :class="{ empty: validar && !nuevoPedido.fecha }"
                :min="fechaMinima"
                :max="fechaMaxima"
                required
              />
            </div>
          </div>
          <div class="mb-1 col-6">
            <div class="form-group">
              <label class="white" for="">Tipo de carga</label>
              <select
                name=""
                id=""
                class="form-select"
                v-model="nuevoPedido.tipoCarga"
                required
              >
                <option
                  v-for="tipo in tiposDeCarga"
                  :key="tipo.tipo"
                  :value="tipo.tipo"
                >
                  {{ tipo.tipo }}
                </option>
              </select>
            </div>
          </div>
          <div class="mb-3 col-12">
            <div class="tab-container">
              <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item" role="presentation" style="width: 50%">
                  <button
                    class="nav-link active"
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home"
                    type="button"
                    role="tab"
                    aria-controls="home"
                    aria-selected="true"
                    style="width: 100%"
                  >
                    Origen
                  </button>
                </li>
                <li class="nav-item" role="presentation" style="width: 50%">
                  <button
                    class="nav-link"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile"
                    type="button"
                    role="tab"
                    aria-controls="profile"
                    aria-selected="false"
                    style="width: 100%"
                  >
                    Destino
                  </button>
                </li>
              </ul>
              <div class="tab-content" id="myTabContent">
                <div
                  class="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div class="pt-2 row">
                    <div class="col-12">
                      <div class="form-group">
                        <input
                          type="checkbox"
                          v-model="usarMiInfoRemitente"
                          @change="checkRemitente($event)"
                        />
                        Llenar con mi información
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Nombre de Contacto</label>
                        <input
                          type="text"
                          class="form-control"
                          :maxLength="100"
                          required
                          v-bind:class="{
                            empty:
                              validar &&
                              nuevoPedido.contactoRemitente.trim() === '',
                          }"
                          v-model.trim="nuevoPedido.contactoRemitente"
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Teléfono</label>
                        <input
                          type="text"
                          class="form-control"
                          :maxLength="15"
                          required
                          v-bind:class="{
                            empty:
                              validar &&
                              nuevoPedido.telefonoRemitente.trim() === '',
                          }"
                          v-model.trim="nuevoPedido.telefonoRemitente"
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Dirección</label>
                        <input
                          type="text"
                          class="form-control"
                          :maxLength="150"
                          required
                          v-bind:class="{
                            empty:
                              validar &&
                              nuevoPedido.direccionRemitente.trim() === '',
                          }"
                          v-model.trim="nuevoPedido.direccionRemitente"
                        />
                        <p class="pt-2">
                          {{ countDireccionRemitente }} de 150 caracteres
                        </p>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Distrito</label>
                        <select
                          name=""
                          class="form-select"
                          required
                          v-bind:class="{
                            empty:
                              validar &&
                              nuevoPedido.distritoRemitente.trim() === '',
                          }"
                          id=""
                          v-model.trim="nuevoPedido.distritoRemitente"
                        >
                          <option
                            v-for="distrito in distritos"
                            :key="distrito.id"
                            :value="distrito.distrito"
                          >
                            {{ distrito.distrito }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Otro dato y/o observación</label>
                        <textarea
                          class="form-control"
                          name=""
                          id=""
                          rows="3"
                          style="resize: none"
                          v-model="nuevoPedido.otroDatoRemitente"
                          :maxLength="250"
                        ></textarea>
                        <p class="text-end pt-2">
                          {{ countOtroDatoRemitente }} de 250 caracteres
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  class="tab-pane fade"
                  id="profile"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                >
                  <div class="pt-2 row">
                    <div class="col-12">
                      <div class="form-group">
                        <input
                          type="checkbox"
                          v-model="usarMiInfoConsignado"
                          @change="checkConsignado($event)"
                        />
                        Llenar con mi información
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Empresa (Opcional)</label>
                        <input
                          type="text"
                          class="form-control"
                          :maxLength="150"
                          v-model="nuevoPedido.empresaConsignado"
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Nombre de Contacto</label>
                        <input
                          type="text"
                          class="form-control"
                          :maxLength="100"
                          required
                          v-bind:class="{
                            empty:
                              validar &&
                              nuevoPedido.contactoConsignado.trim() === '',
                          }"
                          v-model="nuevoPedido.contactoConsignado"
                        />
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Telefono</label>
                        <input
                          type="text"
                          class="form-control"
                          :maxLength="15"
                          required
                          v-bind:class="{
                            empty:
                              validar &&
                              nuevoPedido.telefonoConsignado.trim() === '',
                          }"
                          v-model="nuevoPedido.telefonoConsignado"
                        />
                      </div>
                    </div>
                    <div class="col-8">
                      <div class="form-group">
                        <label for="">Dirección</label>
                        <input
                          type="text"
                          :maxLength="150"
                          required
                          class="form-control"
                          :class="{
                            empty:
                              validar &&
                              nuevoPedido.direccionConsignado.trim() === '',
                          }"
                          v-model="nuevoPedido.direccionConsignado"
                        />
                        <p class="pt-2">
                          {{ countDireccionConsignado }} de 150 caracteres
                        </p>
                      </div>
                    </div>

                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Distrito</label>
                        <select
                          name=""
                          required
                          class="form-select"
                          v-bind:class="{
                            empty:
                              validar &&
                              nuevoPedido.distritoConsignado.trim() === '',
                          }"
                          id=""
                          v-model="nuevoPedido.distritoConsignado"
                        >
                          <option
                            v-for="distrito in distritos"
                            :key="distrito.id"
                            :value="distrito.distrito"
                          >
                            {{ distrito.distrito }}
                          </option>
                        </select>
                      </div>
                    </div>
                    <div class="col-12">
                      <div class="form-group">
                        <label for="">Otro dato y/o observación</label>
                        <textarea
                          class="form-control"
                          name=""
                          id=""
                          rows="3"
                          style="resize: none"
                          v-model="nuevoPedido.otroDatoConsignado"
                          :maxLength="250"
                        ></textarea>
                        <p class="text-end pt-2">
                          {{ countOtroDatoConsignado }} de 250 caracteres
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-next w-100" @click="continuarPedido">
              Continuar
            </button>
          </div>
        </div>
      </div>

      <div v-if="!continuar" class="container">
        <div class="row">
          <div class="text-left col-12 card-pedido">
            <div class="flex card-pedido-header space-between">
              <h5 class="w-auto white">Datos del pedido</h5>

              <button class="btn-sm btn-warning" @click="editarPedido">
                <i class="fas fa-edit"></i>
              </button>
            </div>

            <br />
            <div class="flex">
              <div class="pr-1 w-65">
                <h6 class="white">Fecha de envío:</h6>
                <p class="white-seconday">
                  {{ formatUIDate(nuevoPedido.fecha) }}
                </p>
              </div>
              <div class="w-35">
                <h6 class="white">Tipo de Envío:</h6>
                <p class="white-seconday">{{ nuevoPedido.tipoEnvio }}</p>
              </div>
            </div>
            <div class="flex">
              <div class="pr-1 w-65">
                <h6 class="white">Tipo de Carga:</h6>
                <p class="white-seconday">{{ nuevoPedido.tipoCarga }}</p>
              </div>
              <div class="w-35">
                <h6 class="white">Modalidad:</h6>
                <p class="white-seconday">{{ nuevoPedido.modalidad }}</p>
              </div>
            </div>
            <hr class="white" />
            <div class="flex">
              <div class="pr-1 w-65">
                <h6 class="white">Origen:</h6>
                <p class="white-seconday">
                  {{ nuevoPedido.direccionRemitente }},
                  {{ nuevoPedido.distritoRemitente }}
                </p>
              </div>
              <div class="w-35">
                <h6 class="white">Contacto:</h6>
                <p class="white-seconday">
                  {{ nuevoPedido.contactoRemitente }},
                  {{ nuevoPedido.telefonoRemitente }}
                </p>
              </div>
            </div>
            <h6 class="white">Observaciones en el Origen:</h6>
            <p class="white-seconday">{{ nuevoPedido.otroDatoRemitente }}</p>
            <hr class="white" />
            <div class="flex">
              <div class="pr-1 w-65">
                <h6 class="white">Destino:</h6>
                <p class="white-seconday">
                  {{ nuevoPedido.direccionConsignado }},
                  {{ nuevoPedido.distritoConsignado }}
                </p>
              </div>
              <div class="w-35">
                <h6 class="white">Contacto:</h6>
                <p class="white-seconday">
                  {{ nuevoPedido.contactoConsignado }},
                  {{ nuevoPedido.telefonoConsignado }}
                </p>
              </div>
            </div>
            <h6 class="white">Observaciones en el Destino:</h6>
            <p class="white-seconday">{{ nuevoPedido.otroDatoConsignado }}</p>
            <hr class="white" />
            <div class="flex">
              <div class="pr-1 w-65">
                <h6 class="white">Distancia Total:</h6>
                <p class="white-seconday">{{ nuevoPedido.distancia }} km</p>
              </div>
              <div class="w-35">
                <h6 class="white">Tarifa:</h6>
                <p class="white-seconday">S./ {{ nuevoPedido.tarifa }}</p>
              </div>
            </div>

            <div class="flex">
              <div class="pr-1 w-65">
                <h6 class="white">Forma de pago:</h6>
                <p class="white-seconday">{{ nuevoPedido.formaPago }}</p>
              </div>
              <div class="w-35">
                <h6 class="white">Recaudo:</h6>
                <p class="white-seconday">S./ {{ nuevoPedido.recaudo }}</p>
              </div>
            </div>
          </div>
          <div class="col-12"><br /></div>
          <div class="col-6">
            <button class="btn btn-danger" @click="home">Cancelar</button>
          </div>
          <div class="col-6">
            <button
              class="btn btn-accept"
              style="min-width: 100px"
              @click="handleAnadirPedido"
              :disabled="saving"
            >
              <div
                v-if="saving"
                class="spinner-border text-light"
                role="status"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              <span v-else> Confirmar </span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-3"></div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, ref } from "vue";
import Pedido from "../../models/Pedido";
import { useRouter } from "vue-router";

import consultarApi from "@/services/maps.service";
import calcularTarifa from "@/services/tarifa.service";
import calcularEstadisticas from "@/services/ecoamigable.service";
import PedidoService from "@/services/pedido.service";
import { useStore } from "vuex";
import Swal from "sweetalert2";
import calcularComision from "@/services/comision.service";
import {
  getCurrentDay,
  getFechaInicial,
  getFechaFinal,
  formatUIDate,
  isValid,
} from "../../utils";
import { getSemana } from "../../services/semana-laboral.service";

export default {
  setup() {
    const nuevoPedido = reactive(new Pedido());
    const continuar = ref(true);
    const usarMiInfoRemitente = ref(false);
    const usarMiInfoConsignado = ref(false);
    const validar = ref(false);
    const fechaMinima = ref();
    const fechaMaxima = ref();
    const saving = ref(false);

    const countOtroDatoRemitente = computed(() => {
      return nuevoPedido.otroDatoRemitente.length;
    });
    const countOtroDatoConsignado = computed(() => {
      return nuevoPedido.otroDatoConsignado.length;
    });

    const countDireccionRemitente = computed(() => {
      return nuevoPedido.direccionRemitente.length;
    });
    const countDireccionConsignado = computed(() => {
      return nuevoPedido.direccionConsignado.length;
    });

    const store = useStore();
    const router = useRouter();

    const distritos = ref();

    const tiposDeCarga = computed(() => store.state.auxiliares.tiposDeCarga);
    const modalidades = computed(() => store.state.auxiliares.modalidades);
    const tiposDeEnvio = computed(() => store.state.auxiliares.tiposDeEnvio);
    const clienteData = computed(() => store.getters.clienteData);
    const formasDePago = ref([
      { id: 5, pago: "Efectivo en Origen" },
      { id: 6, pago: "Efectivo en Destino" },
      { id: 7, pago: "Transferencia" },
    ]);

    let semana;

    onBeforeMount(async () => {
      semana = await getSemana();
      fechaMinima.value = getFechaInicial(semana);
      fechaMaxima.value = getFechaFinal(semana, fechaMinima.value);

      nuevoPedido.fecha = fechaMinima.value;
    });

    const isLaborable = () => {
      const currentDay = getCurrentDay(fechaMinima.value);
      return semana.find((day) => day.id === currentDay).isLaborable;
    };

    const esDomingo = (date) => {
      let newDate = new Date(date);
      if (newDate.getDay() === 6) {
        return true;
      }
      return false;
    };

    nuevoPedido.tipoEnvio = clienteData.value.tipoDeEnvio.tipo;
    nuevoPedido.modalidad = "Una vía";
    nuevoPedido.tipoCarga = clienteData.value.tipoDeCarga.tipo;
    nuevoPedido.tipoEnvio = clienteData.value.tipoDeEnvio.tipo;
    for (let i = 0; i < formasDePago.value.length; i++) {
      if (!formasDePago.value[i].pago === clienteData.value.formaDePago.pago) {
        formasDePago.value.push(clienteData.value.formaDePago);
      }
    }
    nuevoPedido.formaPago = clienteData.value.formaDePago.pago;

    nuevoPedido.rolCliente = clienteData.value.rolCliente.rol;
    nuevoPedido.operador = store.getters.operador;

    if (nuevoPedido.tipoEnvio === "E-Commerce") {
      distritos.value = store.state.auxiliares.zonaCobertura;
      Swal.fire({
        title: "¡Hey!",
        text: 'Te recordamos que algunos distritos no los cubrimos por completo, los encontrarás marcados con un " * ", y estarán sujetos a revisión',
        icon: "info",
        confirmButtonText: "OK",
      });
    } else {
      distritos.value = store.state.auxiliares.distritos;
    }

    nuevoPedido.empresaRemitente = clienteData.value.razonComercial;
    nuevoPedido.contactoRemitente = "";
    nuevoPedido.telefonoRemitente = "";
    nuevoPedido.direccionRemitente = "";
    nuevoPedido.distritoRemitente = "";
    nuevoPedido.otroDatoRemitente = "";

    nuevoPedido.empresaConsignado = "";
    nuevoPedido.contactoConsignado = "";
    nuevoPedido.telefonoConsignado = "";
    nuevoPedido.direccionConsignado = "";
    nuevoPedido.distritoConsignado = "";
    nuevoPedido.otroDatoConsignado = "";

    nuevoPedido["isRuteo"] = false;
    nuevoPedido["ruteoId"] = null;

    const changeDistritos = (e) => {
      nuevoPedido.distritoConsignado = "";
      nuevoPedido.distritoRemitente = "";
      if (e.target.value === "E-Commerce") {
        Swal.fire({
          title: "¡Hey!",
          text: 'Te recordamos que hay algunos distritos que nos los cubrimos por completo, los encontrarás marcados con un " * ", y estarán sujetos a revisión',
          icon: "info",
          confirmButtonText: "OK",
        });
        distritos.value = store.state.auxiliares.zonaCobertura;
      } else {
        distritos.value = store.state.auxiliares.distritos;
      }
    };

    const continuarPedido = () => {
      // Validando formulario
      if (!isValid(nuevoPedido)) {
        validar.value = true;
        Swal.fire({
          title: "Heey!",
          text: "Tienes algunos campos vacíos",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      // Validando que la fecha elegida es laborable
      if (!isLaborable()) {
        Swal.fire({
          title: "Heey!",
          text: "No se puede solicitar un envio para el día seleccionado",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }
      // Validando que la fecha elegida no sea domingo
      if (esDomingo(nuevoPedido.fecha)) {
        Swal.fire({
          title: "¡Oops!",
          text: "No se pueden solicitar envios en Domingo",
          icon: "warning",
          confirmButtonText: "OK",
          timer: 2000,
        });
        return;
      }

      // Si todo sale bien, calcula la distancia y cambia de vista
      continuar.value = false;
      calcularDistancia();
    };

    const editarPedido = () => {
      continuar.value = true;
      // validar.value = false;
    };

    // const changeNumeroDireccionRemitente = (e) => {
    //   nuevoPedido.direccionRemitente =
    //     nuevoPedido.calleDireccionRemitente + " " + e.target.value;
    // };

    const calcularDistancia = async () => {
      try {
        saving.value = true;
        nuevoPedido.distancia = await consultarApi(
          nuevoPedido.direccionRemitente,
          nuevoPedido.distritoRemitente,
          nuevoPedido.direccionConsignado,
          nuevoPedido.distritoConsignado
        );

        if (
          typeof nuevoPedido.distancia === "undefined" ||
          nuevoPedido.distancia === null
        ) {
          Swal.fire({
            title: "Oops!",
            text: "Ocurrió un error al calcular la distancia, verifica que las direcciones y distritos sean los correctos",
            icon: "error",
            confirmButtonText: "OK",
          });
          continuar.value = true;
          return;
        }

        const response = await calcularTarifa(
          nuevoPedido.distancia,
          nuevoPedido.tipoEnvio,
          nuevoPedido.modalidad,
          nuevoPedido.distritoRemitente,
          nuevoPedido.distritoConsignado,
          nuevoPedido.empresaRemitente
        );

        nuevoPedido.tarifa = response.tarifa;
        nuevoPedido.tarifaMemoria = response.tarifa;
        nuevoPedido.tarifaSugerida = response.tarifaSugerida;

        // Calcular las estadísticas Ecoamigables
        const stats = await calcularEstadisticas(nuevoPedido.distancia);
        nuevoPedido.CO2Ahorrado = stats.co2;
        nuevoPedido.ruido = stats.ruido;

        saving.value = false;
        return nuevoPedido.distancia;
      } catch (error) {
        saving.value = false;
        console.error("Mensaje de error: ", error.message);
      }
    };

    const handleAnadirPedido = async () => {
      if (esDomingo(nuevoPedido.fecha)) {
        Swal.fire({
          title: "¡Oops!",
          text: "No se pueden solicitar envios en Domingo",
          icon: "warning",
          confirmButtonText: "OK",
          timer: 2000,
        });
        return;
      }

      try {
        saving.value = true;
        nuevoPedido.mobiker = "Asignar MoBiker";
        nuevoPedido.status = 1;
        nuevoPedido.tramite = 0;

        const comision = await calcularComision(
          nuevoPedido.mobiker,
          nuevoPedido.tipoEnvio
        );

        nuevoPedido.comision = nuevoPedido.tarifa * comision;

        const response = await PedidoService.storageNuevoPedido(nuevoPedido);

        if (response.status === 200) {
          if (
            nuevoPedido.distritoConsignado.includes("*") ||
            nuevoPedido.distritoRemitente.includes("*")
          ) {
            Swal.fire({
              title: "Distrito con restricciones",
              text: "El pedido será revisado para validar cobertura, te avisaremos si es aprobado o rechazado",
              icon: "info",
              showCancelButton: false,
              confirmButtonText: "¡Entendido!",
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire({
                  title: "¡Genial!",
                  text: response.data.message,
                  icon: "success",
                  confirmButtonText: "OK",
                  timer: 2000,
                });
              }
            });
          } else {
            Swal.fire({
              title: "¡Genial!",
              text: response.data.message,
              icon: "success",
              confirmButtonText: "OK",
              timer: 2000,
            });
          }

          saving.value = false;
          router.push("/misPedidos");
        }
      } catch (error) {
        saving.value = false;
        console.error(error);
      }
    };

    const checkRemitente = () => {
      if (usarMiInfoRemitente.value) {
        nuevoPedido.contactoRemitente = clienteData.value.contacto;
        nuevoPedido.direccionRemitente = clienteData.value.direccion;
        nuevoPedido.distritoRemitente = clienteData.value.distrito.distrito;
        nuevoPedido.telefonoRemitente = clienteData.value.telefono;
        nuevoPedido.otroDatoRemitente = clienteData.value.otroDato ?? "";
      } else {
        nuevoPedido.contactoRemitente = "";
        nuevoPedido.direccionRemitente = "";
        nuevoPedido.distritoRemitente = "";
        nuevoPedido.telefonoRemitente = "";
        nuevoPedido.otroDatoRemitente = "";
      }
    };

    const checkConsignado = () => {
      if (usarMiInfoConsignado.value) {
        nuevoPedido.contactoConsignado = clienteData.value.contacto;
        nuevoPedido.direccionConsignado = clienteData.value.direccion;
        nuevoPedido.distritoConsignado = clienteData.value.distrito.distrito;
        nuevoPedido.telefonoConsignado = clienteData.value.telefono;
        nuevoPedido.empresaConsignado = clienteData.value.razonComercial;
        nuevoPedido.otroDatoConsignado = clienteData.value.otroDato ?? "";
      } else {
        nuevoPedido.contactoConsignado = "";
        nuevoPedido.direccionConsignado = "";
        nuevoPedido.distritoConsignado = "";
        nuevoPedido.telefonoConsignado = "";
        nuevoPedido.empresaConsignado = "";
        nuevoPedido.otroDatoConsignado = "";
      }
    };

    const home = () => {
      router.go(-1);
    };

    return {
      nuevoPedido,
      continuar,
      continuarPedido,
      calcularDistancia,
      handleAnadirPedido,
      checkRemitente,
      checkConsignado,
      editarPedido,
      changeDistritos,
      distritos,
      tiposDeEnvio,
      tiposDeCarga,
      formasDePago,
      modalidades,
      clienteData,
      usarMiInfoRemitente,
      usarMiInfoConsignado,
      validar,
      home,
      fechaMinima,
      fechaMaxima,
      saving,
      formatUIDate,
      countOtroDatoRemitente,
      countOtroDatoConsignado,
      countDireccionRemitente,
      countDireccionConsignado,
    };
  },
};
</script>

<style lang="scss">
h6 {
  margin-bottom: 2px !important;
}
.container {
  padding: 0px !important;
}

.tab-container {
  border-radius: 5px;
  background-color: white;
  border: 0 !important;
  padding-bottom: 5px;
  .nav-link.active {
    background-color: #6bb5d8 !important;
    color: white !important;
    font-weight: 600;
  }

  .nav-link {
    color: #2c3e50 !important;
    font-weight: 500;
    border: 0 !important;
  }
}
.row {
  width: 100%;
  margin: 0 !important;
}

label {
  font-weight: 500;
}

h4,
h3 {
  color: white !important;
  font-weight: 600;
}
</style>
