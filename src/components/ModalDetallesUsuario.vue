<template>
  <div v-if="showModal">
		<div class="modal fade show" id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableTitle" style="display: block;" aria-modal="true" role="dialog">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalScrollableTitle">Actualizar mi perfil</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModal"></button>
					</div>
					<div class="modal-body">
						<div class="row">
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                        <label for="">Nombre de Contacto</label>
                        <input type="text" class="form-control" v-model="userProfileUpdated.contacto">
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                        <label for="">Username</label>
                        <input type="text" class="form-control" v-model="userProfileUpdated.username">
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                        <label for="">Email</label>
                        <input type="text" class="form-control" v-model="userProfileUpdated.email">
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 col-xs-12">
                    <div class="form-group">
                        <label for="">Telefono</label>
                        <input type="text" class="form-control" v-model="userProfileUpdated.telefono">
                    </div>
                </div>
            </div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger" @click="closeModal">Cancelar</button>
						<button type="button" class="btn btn-accept" @click="updateProfile">Guardar</button>
					</div>
				</div>
			</div>
		</div>
		<div class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import {ref} from 'vue';
export default {
  props: ["showModal", "userProfile"],
  emits: ["closeModal", "updateProfile"],
  setup(props, { emit }) {
    let userProfileUpdated = ref({
			contacto: props.userProfile.contacto,
			username: props.userProfile.username,
			email: props.userProfile.email,
      telefono: props.userProfile.telefono
    })

		const updateProfile = () => {
			emit("updateProfile", userProfileUpdated)
		}
    const closeModal = () => {
      emit("closeModal");
    };

    return {
			userProfileUpdated,
      closeModal,
			updateProfile
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