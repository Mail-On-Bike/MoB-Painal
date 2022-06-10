<template>
  <div>
    <div class="row" style="width: 100%;">
      <div class="col-md-2"></div>
      <div class="col-md-8 col-12">
        <div class="row">
          <div class="col-12 profile-container">
            <div class="row">
              <div class="col-12">
                <div class="profile-header" style="">
                  <div class="img-profile" style=""></div>
                  <div class="profile-info" style="">
                    <h6>{{ user.clienteAsignado.razonComercial }}</h6>
                    <span>{{ user.username }}</span>
                    <div class="indicators">
                      <i class="fas fa-bicycle"></i>
                      {{ user.clienteAsignado.biciEnvios }} &nbsp;
                      <i class="fas fa-road"></i>
                      {{ user.clienteAsignado.kilometros }}km. &nbsp;
                      <i class="fas fa-leaf"></i>
                      {{ user.clienteAsignado.CO2Ahorrado }} &nbsp;
                      <i class="fas fa-deaf"></i>
                      {{ user.clienteAsignado.ruido }}h.
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 row profile-content" style="margin-top:15px;">
                <div class="col-12 profile-title">
                  <div>
                    <h5>Mi Perfil (Usuario)</h5>
                    <hr class="hr-title" />
                  </div>
                  <div>
                    <button class="btn-sm " @click="detallesUsuario">
                      <i class="fas fa-edit"></i>
                    </button>
                  </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Nombre de contacto</label>
                    <b>{{ user.contacto }}</b>
                  </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Email</label>
                    <b>{{ user.email }}</b>
                  </div>
                </div>
                <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Teléfono</label>
                    <b>{{ user.telefono }}</b>
                  </div>
                </div>
                <div
                  class="col-lg-3 col-md-4 col-sm-6 col-xs-12"
                  style="min-height: 62px;"
                >
                  <div class="profile-item">
                    <label>Contraseña</label>
                    <div
                      style="display:flex;justify-content:space-between; align-items:center; "
                    >
                      <input
                        :type="showPswd ? 'text' : 'password'"
                        value="contraseña"
                        :class="
                          showPswd ? 'pswd-show-input' : 'pswd-hide-input'
                        "
                        readonly
                        disabled
                      />
                      <button class="btn-sm" @click="changePassword()">
                        <i class="fas fa-edit"></i>
                      </button>
                      <!-- <i v-if="!showPswd" @click="showPswd = true" class="fas fa-eye"></i>
											<i v-else @click="showPswd = false" class="fas fa-eye-slash"></i> -->
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-12 profile-title">
                  <div>
                    <h5>Información del Cliente</h5>
                    <hr class="hr-title" />
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Nombre de contacto</label>
                    <b>{{ user.clienteAsignado.contacto }}</b>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Email</label>
                    <b>{{ user.clienteAsignado.email }}</b>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Teléfono</label>
                    <b>{{ user.clienteAsignado.telefono }}</b>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Dirección</label>
                    <b>{{ user.clienteAsignado.direccion }}</b>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Distrito</label>
                    <b>{{ user.clienteAsignado.distrito.distrito }}</b>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Forma de Pago</label>
                    <b>{{ user.clienteAsignado.formaDePago.pago }}</b>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Comprobante</label>
                    <b>{{ user.clienteAsignado.tipoDeComprobante.tipo }}</b>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Tipo de Carga</label>
                    <b>{{ user.clienteAsignado.tipoDeCarga.tipo }}</b>
                  </div>
                </div>
                <div class="col-md-3 col-sm-6 col-xs-12">
                  <div class="profile-item">
                    <label>Tipo de Emvío</label>
                    <b>{{ user.clienteAsignado.tipoDeEnvio.tipo }}</b>
                  </div>
                </div>
                <div class="col-12">
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-2"></div>
    </div>
  </div>
  <modal-detalles-usuario
    @closeModal="closeModal"
    @updateProfile="updateProfile"
    :showModal="showModal"
    :userProfile="userProfile"
  ></modal-detalles-usuario>
  <modal-change-password
    @closeModalPswd="closeModalPswd"
    @updatePassword="updatePassword"
    :showModalPswd="showModalPswd"
  ></modal-change-password>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import ModalDetallesUsuario from "../../components/ModalDetallesUsuario.vue";
import AuthService from "../../services/auth.service";
import Swal from "sweetalert2";
import ModalChangePassword from "../../components/ModalChangePassword.vue";

export default {
  components: {
    ModalDetallesUsuario,
    ModalChangePassword,
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
    let showModal = ref(false);
    let showModalPswd = ref(false);

    let showPswd = ref(false);
    let userProfile = ref({
      contacto: user.value.contacto,
      email: user.value.email,
      username: user.value.username,
      telefono: user.value.telefono,
    });

    const showPassword = () => {
      if (showPswd.value) {
        showPswd.value = true;
      } else {
        showPswd.value = false;
      }
    };

    const detallesUsuario = () => {
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const updateProfile = async (profileUpdated) => {
      profileUpdated.value["clienteId"] = user.value.clienteAsignado.id;
      const response = await AuthService.updateProfileUser(
        user.value.id,
        profileUpdated.value
      );
      let responseUpdate = await store.dispatch("updateProfile", response);
      if (responseUpdate) {
        if (response.accesToken != "") {
          Swal.fire({
            title: "Actualizado con éxito!",
            icon: "success",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000,
          });
          closeModal();
        }
      } else {
        Swal.fire({
          title: "Oops!",
          text: "Ocurrió un error al actualizar",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    const changePassword = () => {
      showModalPswd.value = true;
    };

    const closeModalPswd = () => {
      showModalPswd.value = false;
    };

    const updatePassword = async (pswd) => {
      if (pswd.value.newPassword === pswd.value.confirmPassword) {
        const response = await AuthService.changePassword(
          user.value.id,
          pswd.value
        );
        if (response) {
          Swal.fire({
            title: "Contraseña actualizada con éxito!",
            icon: "success",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000,
          });
          closeModalPswd();
        }
      } else {
        console.log("Error");
      }
    };

    return {
      showPswd,
      user,
      userProfile,
      showModal,
      showModalPswd,
      showPassword,
      detallesUsuario,
      updateProfile,
      closeModal,
      updatePassword,
      changePassword,
      closeModalPswd,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/_variables.scss";

.profile-header {
  padding: 5px;
  display: flex;
  align-items: center;
}

.profile-info {
  padding: 5px;
  line-height: 18px;
}

.profile-container {
  padding: 15px 0px !important;
  background-color: $azul-1;
  padding: 0;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.profile-content {
  padding: 25px 15px !important;
  background-color: white;
  margin-top: 15px !important;
  border-top-left-radius: 35px;
  border-top-right-radius: 35px;
  color: black;
}

.profile-item {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
}

.profile-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.hr-title {
  width: 25px !important;
  height: 5px !important;
  background-color: blue !important;
  margin: 0 !important;
}

.profile-title h3,
.profile-title h4,
.profile-title h5 {
  margin: 0;
}

.profile-item label {
  color: #999;
}

.img-profile {
  min-width: 70px;
  min-height: 70px;
  height: auto;
  border-radius: 50%;
  background-color: aliceblue;
  margin-right: 10px;
  max-width: 70px;
}

.pswd-hide-input {
  border: 0;
  background: white !important;
  font-size: 18px !important;
  font-weight: 700;
  width: 75%;
}
.pswd-show-input {
  border: 0;
  background: white !important;
  font-size: 14px !important;
  width: 75%;
}
.pswd-hide-input:focus {
  border: 0 !important;
  background: white;
}
.pswd-show-input:focus {
  border: 0;
  background: white !important;
}
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
  margin-left: 0 !important;
  margin-right: 0 !important;
}

label {
  font-weight: 500;
}

.indicators {
  font-size: 12px;
  padding: 3px 0px;
  color: #ddd;
}

h4,
h3 {
  color: white !important;
  font-weight: 600;
}
</style>
