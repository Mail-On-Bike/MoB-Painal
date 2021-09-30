<template>
  <div v-if="showModalPswd">
		<div class="modal fade show" id="exampleModalScrollable" tabindex="-1" aria-labelledby="exampleModalScrollableTitle" style="display: block;" aria-modal="true" role="dialog">
			<div class="modal-dialog modal-dialog-centered">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="exampleModalScrollableTitle">Actualizar Contraseña</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="closeModalPswd"></button>
					</div>
					<div class="modal-body">
						<div class="row">
							<div class="col-12">
									<div class="form-group">
											<label for="">Contraseña Actual</label>
											<input type="password" class="form-control" v-model="pswd.oldPassword">
									</div>
							</div>
							<div class="col-12">
									<hr>
							</div>
							<div class="col-12">
									<div class="form-group">
											<label for="">Nueva Contraseña</label>
											<input type="password" class="form-control" v-model="pswd.newPassword">
									</div>
							</div>
							<div class="col-12">
										<div class="form-group">
												<label for="">Confirmar contraseña</label>
												<input type="password" class="form-control" v-model="pswd.confirmPassword">
										</div>
								</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-danger" @click="closeModalPswd">Cancelar</button>
						<button type="button" class="btn btn-accept" @click="updatePassword">Guardar</button>
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
  props: ["showModalPswd"],
  emits: ["closeModalPswd", "updatePassword"],
  setup(props, { emit }) {
    let pswd = ref({
			newPassword: '',
			confirmPassword: '',
			oldPassword: ''
    })

		const updatePassword= () => {
			emit("updatePassword", pswd)
		}
    const closeModalPswd = () => {
      emit("closeModalPswd");
    };

    return {
			pswd,
      closeModalPswd,
			updatePassword
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