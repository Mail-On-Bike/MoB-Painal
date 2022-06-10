<template>
  <h3 class="text-center">Mis Pedidos</h3>
  <hr />
  <div class="row">
    <div class="col-md-2"></div>
    <div class="col-md-8 col-sm-12" id="navContainer">
      <div class="pedidosDetails" style="">
        <div>
          <a>Rango: </a> &nbsp;
          <span v-if="currentPage > 0" @click="getPedidos(currentPage - 1)"
            ><i class="fas fa-chevron-circle-left"></i
          ></span>
          &nbsp; <span>{{ mostrandoDesde }} - {{ mostrandoHasta }}</span> &nbsp;
          <span
            v-if="currentPage + 1 < totalPages"
            @click="getPedidos(currentPage + 1)"
            ><i class="fas fa-chevron-circle-right"></i
          ></span>
        </div>
        <div>
          Total: <b>{{ totalPedidos }}</b>
        </div>
      </div>
      <ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="todos-tab"
            data-bs-toggle="tab"
            data-bs-target="#todos"
            type="button"
            role="tab"
            aria-controls="todos"
            aria-selected="true"
          >
            Todos
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="activos-tab"
            data-bs-toggle="tab"
            data-bs-target="#activos"
            type="button"
            role="tab"
            aria-controls="activos"
            aria-selected="false"
          >
            Activos
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="finalizados-tab"
            data-bs-toggle="tab"
            data-bs-target="#finalizados"
            type="button"
            role="tab"
            aria-controls="finalizados"
            aria-selected="false"
          >
            Finalizados
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="anulados-tab"
            data-bs-toggle="tab"
            data-bs-target="#anulados"
            type="button"
            role="tab"
            aria-controls="anulados"
            aria-selected="false"
          >
            Anulados
          </button>
        </li>
      </ul>
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="todos"
          role="tabpanel"
          aria-labelledby="todos-tab"
        >
          <div class="pedidosIndividualesDetails">
            <span>Total: &nbsp; {{ totalPedidosTodos }} </span>
          </div>
          <div
            @click="detallesPedido(pedido)"
            class="pedido-card"
            v-for="(pedido, index) in pedidosTodosPaginados[currentPageTodos]"
            :key="index"
          >
            <div style="display: flex; align-items: center; padding: 10px">
              <i
                class="fas fa-route fa-3x"
                :class="{
                  fc_programado: pedido.statusId == 1,
                  fc_por_recoger: pedido.statusId == 2,
                  fc_en_transito: pedido.statusId == 3,
                  fc_entregado: pedido.statusId == 4,
                  fc_falso_flete: pedido.statusId == 5,
                  fc_anulado: pedido.statusId == 6,
                }"
              >
              </i>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 10px;
              "
            >
              <div style="display: flex; flex-direction: column">
                <b class="w-100">Origen</b>
                <span class="w-100"
                  >{{ pedido.direccionRemitente }},
                  {{ pedido.distritoRemitente }}</span
                >
                <b class="w-100">Destino</b>
                <span class="w-100"
                  >{{ pedido.direccionConsignado }},
                  {{ pedido.distrito.distrito }}</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  margin-left: 10px;
                "
              >
                <span style="text-align: right">{{
                  formatUIDate(pedido.fecha)
                }}</span>
                <div style="text-align: right">
                  <span
                    class="pedido-tag"
                    :class="{
                      bg_programado: pedido.statusId == 1,
                      bg_por_recoger: pedido.statusId == 2,
                      bg_en_transito: pedido.statusId == 3,
                      bg_entregado: pedido.statusId == 4,
                      bg_falso_flete: pedido.statusId == 5,
                      bg_anulado: pedido.statusId == 6,
                    }"
                  >
                    {{ pedido.status.tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <nav aria-label="...">
            <ul class="pagination">
              <li v-if="currentPageTodos != 1" class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="changePage('todos', parseInt(currentPageTodos) - 1)"
                >
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li
                v-for="(page, key) in pedidosTodosPaginados"
                :key="key"
                class="page-item"
                :class="{ active: key == currentPageTodos }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="changePage('todos', key)"
                  >{{ key }}</a
                >
              </li>
              <li
                v-if="
                  currentPageTodos < Object.keys(pedidosTodosPaginados).length
                "
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="changePage('todos', parseInt(currentPageTodos) + 1)"
                >
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          class="tab-pane fade"
          id="activos"
          role="tabpanel"
          aria-labelledby="activos-tab"
        >
          <div class="pedidosIndividualesDetails">
            <span>Total: &nbsp; {{ totalPedidosActivos }}</span>
          </div>
          <div
            class="pedido-card"
            v-for="(pedido, index) in pedidosActivosPaginados[
              currentPageActivos
            ]"
            :key="index"
          >
            <div style="display: flex; align-items: center; padding: 10px">
              <i
                class="fas fa-route fa-3x"
                :class="{
                  fc_programado: pedido.statusId == 1,
                  fc_por_recoger: pedido.statusId == 2,
                  fc_en_transito: pedido.statusId == 3,
                }"
              >
              </i>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 10px;
              "
            >
              <div style="display: flex; flex-direction: column">
                <b class="w-100">Origen</b>
                <span class="w-100"
                  >{{ pedido.direccionRemitente }},
                  {{ pedido.distritoRemitente }}</span
                >
                <b class="w-100">Destino</b>
                <span class="w-100"
                  >{{ pedido.direccionConsignado }},
                  {{ pedido.distrito.distrito }}</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  margin-left: 10px;
                "
              >
                <span style="text-align: right">{{
                  formatUIDate(pedido.fecha)
                }}</span>
                <div style="text-align: right">
                  <span
                    class="pedido-tag"
                    :class="{
                      bg_programado: pedido.statusId == 1,
                      bg_por_recoger: pedido.statusId == 2,
                      bg_en_transito: pedido.statusId == 3,
                    }"
                  >
                    {{ pedido.status.tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <nav aria-label="...">
            <ul class="pagination">
              <li v-if="currentPageActivos != 1" class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="
                    changePage('activos', parseInt(currentPageActivos) - 1)
                  "
                >
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li
                v-for="(page, key) in pedidosActivosPaginados"
                :key="key"
                class="page-item"
                :class="{ active: key == currentPageActivos }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="changePage('activos', key)"
                  >{{ key }}</a
                >
              </li>
              <li
                v-if="
                  currentPageActivos <
                  Object.keys(pedidosActivosPaginados).length
                "
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="
                    changePage('activos', parseInt(currentPageActivos) + 1)
                  "
                >
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          class="tab-pane fade"
          id="finalizados"
          role="tabpanel"
          aria-labelledby="finalizados-tab"
        >
          <div class="pedidosIndividualesDetails">
            <span>Total: &nbsp; {{ totalPedidosFinalizados }}</span>
          </div>
          <div
            class="pedido-card"
            v-for="(pedido, index) in pedidosFinalizadosPaginados[
              currentPageFinalizados
            ]"
            :key="index"
          >
            <div style="display: flex; align-items: center; padding: 10px">
              <i
                class="fas fa-route fa-3x"
                :class="{
                  fc_entregado: pedido.statusId == 4,
                  fc_falso_flete: pedido.statusId == 5,
                }"
              >
              </i>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 10px;
              "
            >
              <div style="display: flex; flex-direction: column">
                <b class="w-100">Origen</b>
                <span class="w-100"
                  >{{ pedido.direccionRemitente }},
                  {{ pedido.distritoRemitente }}</span
                >
                <b class="w-100">Destino</b>
                <span class="w-100"
                  >{{ pedido.direccionConsignado }},
                  {{ pedido.distrito.distrito }}</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  margin-left: 10px;
                "
              >
                <span style="text-align: right">{{
                  formatUIDate(pedido.fecha)
                }}</span>
                <div style="text-align: right">
                  <span
                    class="pedido-tag"
                    :class="{
                      bg_entregado: pedido.statusId == 4,
                      bg_falso_flete: pedido.statusId == 5,
                    }"
                  >
                    {{ pedido.status.tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <nav aria-label="...">
            <ul class="pagination">
              <li v-if="currentPageFinalizados != 1" class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="
                    changePage(
                      'finalizados',
                      parseInt(currentPageFinalizados) - 1
                    )
                  "
                >
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li
                v-for="(page, key) in pedidosFinalizadosPaginados"
                :key="key"
                class="page-item"
                :class="{ active: key == currentPageFinalizados }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="changePage('finalizados', key)"
                  >{{ key }}</a
                >
              </li>
              <li
                v-if="
                  currentPageFinalizados <
                  Object.keys(pedidosFinalizadosPaginados).length
                "
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="
                    changePage(
                      'finalizados',
                      parseInt(currentPageFinalizados) + 1
                    )
                  "
                >
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <div
          class="tab-pane fade"
          id="anulados"
          role="tabpanel"
          aria-labelledby="anulados-tab"
        >
          <div class="pedidosIndividualesDetails">
            <span>Total: &nbsp; {{ totalPedidosAnulados }}</span>
          </div>
          <div
            class="pedido-card"
            v-for="(pedido, index) in pedidosAnuladosPaginados[
              currentPageAnulados
            ]"
            :key="index"
          >
            <div style="display: flex; align-items: center; padding: 10px">
              <i
                class="fas fa-route fa-3x"
                :class="{ fc_anulado: pedido.statusId == 6 }"
              ></i>
            </div>
            <div
              style="
                display: flex;
                justify-content: space-between;
                width: 100%;
                padding: 10px;
              "
            >
              <div style="display: flex; flex-direction: column">
                <b class="w-100">Origen</b>
                <span class="w-100"
                  >{{ pedido.direccionRemitente }},
                  {{ pedido.distritoRemitente }}</span
                >
                <b class="w-100">Destino</b>
                <span class="w-100"
                  >{{ pedido.direccionConsignado }},
                  {{ pedido.distrito.distrito }}</span
                >
              </div>
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  margin-left: 10px;
                "
              >
                <span style="text-align: right">{{
                  formatUIDate(pedido.fecha)
                }}</span>
                <div style="text-align: right">
                  <span
                    class="pedido-tag"
                    :class="{ bg_anulado: pedido.statusId == 6 }"
                  >
                    {{ pedido.status.tag }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <nav aria-label="...">
            <ul class="pagination">
              <li v-if="currentPageAnulados != 1" class="page-item">
                <a
                  class="page-link"
                  href="#"
                  @click="
                    changePage('anulados', parseInt(currentPageAnulados) - 1)
                  "
                >
                  <i class="fas fa-chevron-left"></i>
                </a>
              </li>
              <li
                v-for="(page, key) in pedidosAnuladosPaginados"
                :key="key"
                class="page-item"
                :class="{ active: key == currentPageAnulados }"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="changePage('anulados', key)"
                  >{{ key }}</a
                >
              </li>
              <li
                v-if="
                  currentPageAnulados <
                  Object.keys(pedidosAnuladosPaginados).length
                "
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  @click="
                    changePage('anulados', parseInt(currentPageAnulados) + 1)
                  "
                >
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <modal-detalles-pedido
    @closeModal="closeModal"
    :showModal="showModal"
    :pedido="pedidoSeleccionado"
  ></modal-detalles-pedido>
</template>

<script>
import { inject, onMounted, ref } from "vue";
import { useStore } from "vuex";
import PedidoService from "@/services/pedido.service";
import ModalDetallesPedido from "../../components/ModalDetallesPedido.vue";
import { formatUIDate } from "../../utils";
import { useRouter } from 'vue-router';

export default {
  components: {
    ModalDetallesPedido,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    let pedidosTodos = ref([]);
    let pedidosTodosPaginados = ref({});
    let currentPageTodos = ref(1);
    let totalPedidosTodos = ref(0);

    let pedidosActivos = ref([]);
    let pedidosActivosPaginados = ref({});
    let currentPageActivos = ref(1);
    let totalPedidosActivos = ref(0);

    let pedidosFinalizados = ref([]);
    let pedidosFinalizadosPaginados = ref({});
    let currentPageFinalizados = ref(1);
    let totalPedidosFinalizados = ref(0);

    let pedidosAnulados = ref([]);
    let pedidosAnuladosPaginados = ref({});
    let currentPageAnulados = ref(1);
    let totalPedidosAnulados = ref(0);

    let totalPedidos = ref(0);
    let mostrandoDesde = ref(0);
    let mostrandoHasta = ref(0);
    let currentPage = ref(0);
    let totalPages = ref(0);

    let showModal = ref(false);
    let pedidoSeleccionado = ref({});

    onMounted(() => {
      try {
        getPedidos();
      } catch (error) {
        localStorage.clear();
        store.dispatch('logout')
        router.push('/login')
      }
    });

    const getPedidos = async (page = 0, size = 500) => {
      try {
        let params = {
          id: store.state.user.clienteAsignado.id,
          page: page,
          size: size,
        };
        let response = await PedidoService.getPedidosDelCliente(params);
        pedidosTodos.value = response.data.pedidos;
        totalPedidos.value = response.data.totalPedidos;
        currentPage.value = response.data.currentPage;
        totalPages.value = response.data.totalPages;

        if (response.data.totalPedidos === 0) {
          mostrandoDesde.value = 0;
          mostrandoHasta.value = 0;
        } else if (response.data.totalPedidos <= size) {
          mostrandoDesde.value = 1;
          mostrandoHasta.value = response.data.pedidos.length;
        } else {
          mostrandoDesde.value = response.data.currentPage * size + 1;
          mostrandoHasta.value =
            mostrandoDesde.value - 1 + response.data.pedidos.length;
        }
        filterPedidos();
      } catch (error) {
        localStorage.clear();
        store.dispatch('logout')
        router.push('/login')
      }
    };

    const filterPedidos = () => {
      totalPedidosTodos.value = pedidosTodos.value.length;
      pedidosTodosPaginados.value = paginar(pedidosTodos.value);

      // Pedidos Activos (Status 1:Programado, 2:Por Recoger, 3:En Ruta)
      pedidosActivos.value = pedidosTodos.value.filter((pedido) => {
        if (
          pedido.statusId == 1 ||
          pedido.statusId == 2 ||
          pedido.statusId == 3
        ) {
          return pedido;
        }
      });
      totalPedidosActivos.value = pedidosActivos.value.length;
      pedidosActivosPaginados.value = paginar(pedidosActivos.value);

      // Pedidos Finalizados (Status 4:Entregado, 5:Falso Flete)
      pedidosFinalizados.value = pedidosTodos.value.filter((pedido) => {
        if (pedido.statusId == 4 || pedido.statusId == 5) {
          return pedido;
        }
      });
      totalPedidosFinalizados.value = pedidosFinalizados.value.length;
      pedidosFinalizadosPaginados.value = paginar(pedidosFinalizados.value);

      // Pedidos Anulados (Status 6:Anulado)
      pedidosAnulados.value = pedidosTodos.value.filter((pedido) => {
        if (pedido.statusId == 6) {
          return pedido;
        }
      });
      totalPedidosAnulados.value = pedidosAnulados.value.length;
      pedidosAnuladosPaginados.value = paginar(pedidosAnulados.value);
    };

    const paginar = (pedidosParaPaginar, max = 50) => {
      let count = 1;
      let page = 1;
      let pedidosPaginados = {};
      pedidosPaginados[page] = [];
      for (let i = 0; i < pedidosParaPaginar.length; i++) {
        pedidosPaginados[page].push(pedidosParaPaginar[i]);
        if (count % max == 0 && count < pedidosParaPaginar.length) {
          page++;
          pedidosPaginados[page] = [];
        }
        count++;
      }

      return pedidosPaginados;
    };

    const changePage = (tipo, pagina) => {
      switch (tipo) {
        case "todos": {
          currentPageTodos.value = pagina;
          break;
        }
        case "activos": {
          currentPageActivos.value = pagina;
          break;
        }
        case "finalizados": {
          currentPageFinalizados.value = pagina;
          break;
        }
        case "anulados": {
          currentPageAnulados.value = pagina;
          break;
        }
      }
      scroll();
    };

    const scroll = inject("scrollToTop");

    const detallesPedido = (pedido) => {
      pedidoSeleccionado.value = pedido;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return {
      pedidosTodos,
      pedidosTodosPaginados,
      currentPageTodos,
      totalPedidosTodos,
      pedidosActivos,
      pedidosActivosPaginados,
      currentPageActivos,
      totalPedidosActivos,
      pedidosFinalizados,
      pedidosFinalizadosPaginados,
      currentPageFinalizados,
      totalPedidosFinalizados,
      pedidosAnulados,
      pedidosAnuladosPaginados,
      currentPageAnulados,
      totalPedidosAnulados,
      currentPage,
      totalPages,
      mostrandoDesde,
      mostrandoHasta,
      totalPedidos,
      showModal,
      pedidoSeleccionado,
      changePage,
      getPedidos,
      detallesPedido,
      closeModal,
      formatUIDate,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/_variables.scss";

#navContainer {
  background: white;
  .nav-tabs {
    justify-content: center;
  }
  .nav-link {
    color: #777;
    font-weight: 600;
    outline: none;
    text-decoration: none;
    border: 0;

    &.active {
      color: $azul-1;
      font-weight: 700;
      background-color: transparent;
      border: 0;
      border-bottom: 3px solid $azul-5;
    }
  }
}

.pedido-card {
  width: 100%;
  min-height: 100px;
  border-radius: 5px;
  border: 2px solid #eee;
  color: black !important;
  margin-bottom: 15px;
  display: flex;
}
</style>
