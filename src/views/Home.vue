<template>
    <div class="overlay">
      <div class="container">
        <div class="row">
          <div class="col-12 text-center mt-5">
            <h4 class="text-center">Bienvenido a Mail on Bike</h4>
            <br><br>
          </div>
          <div class="col-xl-4 col-lg-6">
            <div class="card l-bg-azul-4">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-biking"></i></div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Pedidos del día</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-6">
                    <h2 class="d-flex align-items-center mb-0">
                      {{totalPedidosActuales}}
                    </h2>
                  </div>
                  <div class="col-6 text-right">
                    <span>{{porcentajeCompletado}}% ({{totalPedidosActualesFinalizados}}/{{totalPedidosActuales}})</span>
                  </div>
                </div>
                <div class="progress mt-1 " data-height="8" style="height: 8px;">
                  <div class="progress-bar l-bg-orange" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" :style="[{width: porcentajeCompletado + '%'}]"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-6">
            <div class="card l-bg-cherry ">
              <div class="card-statistic-3 p-4">
                <div class="card-icon card-icon-large"><i class="fas fa-bicycle"></i></div>
                <div class="mb-4">
                  <h5 class="card-title mb-0">Pedidos totales</h5>
                </div>
                <div class="row align-items-center mb-2 d-flex">
                  <div class="col-6">
                    <h2 class="d-flex align-items-center mb-0">
                      {{user.clienteAsignado.biciEnvios}}
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-4 col-lg-6">
              <div class="card l-bg-green-dark">
                  <div class="card-statistic-3 p-4">
                      <div class="card-icon card-icon-large"><i class="fas fa-leaf"></i></div>
                      <div class="mb-4">
                          <h5 class="card-title mb-0">C02 Ahorrado</h5>
                      </div>
                      <div class="row align-items-center mb-2 d-flex">
                          <div class="col-8">
                              <h2 class="d-flex align-items-center mb-0">
                                {{user.clienteAsignado.CO2Ahorrado}}
                              </h2>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="col-xl-4 col-lg-6">
              <div class="card l-bg-blue-dark">
                  <div class="card-statistic-3 p-4">
                      <div class="card-icon card-icon-large"><i class="fas fa-road"></i></div>
                      <div class="mb-4">
                          <h5 class="card-title mb-0">Kilómetros totales</h5>
                      </div>
                      <div class="row align-items-center mb-2 d-flex">
                          <div class="col-8">
                              <h2 class="d-flex align-items-center mb-0">
                                {{user.clienteAsignado.kilometros}} km.
                              </h2>
                          </div>
                          <!-- <div class="col-4 text-right">
                              <span>9.23% <i class="fa fa-arrow-up"></i></span>
                          </div> -->
                      </div>
                      <!-- <div class="progress mt-1 " data-height="8" style="height: 8px;">
                          <div class="progress-bar l-bg-green" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;"></div>
                      </div> -->
                  </div>
              </div>
          </div>
          
          <div class="col-xl-4 col-lg-6">
              <div class="card l-bg-orange-dark">
                  <div class="card-statistic-3 p-4">
                      <div class="card-icon card-icon-large"><i class="fas fa-deaf"></i></div>
                      <div class="mb-4">
                          <h5 class="card-title mb-0">Horas de ruido ahorrado</h5>
                      </div>
                      <div class="row align-items-center mb-2 d-flex">
                          <div class="col-8">
                              <h2 class="d-flex align-items-center mb-0">
                                {{user.clienteAsignado.ruido}}h.
                              </h2>
                          </div>
                      </div>
                      <!-- <div class="progress mt-1 " data-height="8" style="height: 8px;">
                          <div class="progress-bar l-bg-cyan" role="progressbar" data-width="25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style="width: 25%;"></div>
                      </div> -->
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import {computed, onMounted, ref} from 'vue';
import { useStore } from 'vuex';
import PedidoService from '@/services/pedido.service';
export default {
  name: 'Home',
  components: {
  },
  setup(){
    const store = useStore()
		const user = computed(() => store.state.user);

    let totalPedidosActuales = ref(0);
    let porcentajeCompletado = ref("");
    let pedidosActuales = ref([]);

    let pedidosActualesActivos = ref([]); 
		let totalPedidosActualesActivos = ref(0)

		let pedidosActualesFinalizados = ref([]); 
		let totalPedidosActualesFinalizados = ref(0)

    onMounted(() =>{
			getPedidosActuales();
		})

    const getPedidosActuales = async () => {
			let params = {
				id: store.state.user.clienteAsignado.id,
        desde: getTodayDate(),
        hasta: getTodayDate()
			}
			let response = await PedidoService.getPedidosDelCliente(params);
			pedidosActuales.value = response.data.pedidos;
			totalPedidosActuales.value = response.data.totalPedidos;

      filterPedidos();
    }

    const filterPedidos = () => {
			// Pedidos Activos (Status 1:Programado, 2:Por Recoger, 3:En Ruta)
			pedidosActualesActivos.value = pedidosActuales.value.filter((pedido) => {
				if(pedido.statusId == 1 || pedido.statusId == 2 || pedido.statusId == 3){
					return pedido;
				}
			})
			totalPedidosActualesActivos.value = pedidosActuales.value.length;

			// Pedidos Finalizados (Status 4:Entregado, 5:Falso Flete)
			pedidosActualesFinalizados.value = pedidosActuales.value.filter((pedido) => {
				if(pedido.statusId == 4 || pedido.statusId == 5){
					return pedido;
				}
			})
			totalPedidosActualesFinalizados.value = pedidosActualesFinalizados.value.length;	
      
      
      porcentajeCompletado.value = totalPedidosActualesFinalizados.value * 100 / totalPedidosActuales.value;
      if(totalPedidosActuales.value === 0){
        porcentajeCompletado.value = 100
      }
		}

    const getTodayDate = () => {
      let today = new Date();
      return  (today.getMonth() + 1) > 9 ? today.getFullYear() + "-" +  (today.getMonth() + 1) : today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate();  
    }

    return{
			user,
      pedidosActuales,
      totalPedidosActuales,
      totalPedidosActualesFinalizados,
      porcentajeCompletado,
      getPedidosActuales,
    }
  }
}
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
  .card {
    background-color: #fff;
    border-radius: 10px;
    border: none !important;
    margin-bottom: 30px;
    box-shadow: 0 0.46875rem 2.1875rem rgba(90,97,105,0.1), 0 0.9375rem 1.40625rem rgba(90,97,105,0.1), 0 0.25rem 0.53125rem rgba(90,97,105,0.12), 0 0.125rem 0.1875rem rgba(90,97,105,0.1);
}
.l-bg-azul-4 {
    background: linear-gradient(to right, rgb(5, 32, 44),rgb(12, 110, 151) ) !important;
    color: #fff;
}
.l-bg-cherry {
    background: linear-gradient(to right, #35192a, #f09) !important;
    color: #fff;
}

.l-bg-blue-dark {
    background: linear-gradient(to right, #214a66, #3cc8ff) !important;
    color: #fff;
}

.l-bg-green-dark {
    background: linear-gradient(to right, #0a504a, #38ef7d) !important;
    color: #fff;
}

.l-bg-orange-dark {
    background: linear-gradient(to right, #a86008, #ffba56) !important;
    color: #fff;
}

.card .card-statistic-3 .card-icon-large .fas, .card .card-statistic-3 .card-icon-large .far, .card .card-statistic-3 .card-icon-large .fab, .card .card-statistic-3 .card-icon-large .fal {
    font-size: 110px;
}

.card .card-statistic-3 .card-icon {
    text-align: center;
    line-height: 50px;
    margin-left: 15px;
    color: #000;
    position: absolute;
    right: 2px;
    top: 20px;
    opacity: 0.1;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}

.l-bg-green {
    background: linear-gradient(135deg, #23bdb8 0%, #43e794 100%) !important;
    color: #fff;
}

.l-bg-orange {
    background: linear-gradient(to right, #f9900e, #ffba56) !important;
    color: #fff;
}

.l-bg-cyan {
    background: linear-gradient(135deg, #289cf5, #84c0ec) !important;
    color: #fff;
}
</style>
