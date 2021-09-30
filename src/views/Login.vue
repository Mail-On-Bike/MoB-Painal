<template>
    <div class="overlay flex-center">
        <div class="login-form-container">
            <div class="image-container">
                <div class="img-radius">
                    <img src="../assets/MoB-logo.png" alt="">
                </div>
            </div>   
            <br><br>
            <div class="form-group"> 
                <input type="email" v-model="user.email" class="form-control login-input" placeholder="Email">
            </div>
            <div class="form-group">
                <input type="password" v-model="user.password" class="form-control login-input" placeholder="Contraseña">
            </div>
            <div class="form-group">
                <br>
                <button class="btn btn-accept w-100 br-50" @click="login">Iniciar Sesión</button>
            </div>
        </div>
    </div>
</template>

<script>
import {useStore} from "vuex"
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

export default {
    setup() {
        const store = useStore();
        const router = useRouter();
        const user = reactive({
            email: '',
            password: ''
        })

        // beforeMounted
        onBeforeMount(() => {
            if(store.getters.loggedIn){
                router.push("/");
            }
        })
        
        // methods
        const login = async () => {
            Swal.fire({
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading()
                },
            })
            let response = await store.dispatch("login", user);
            if(response){
                if(response.accesToken != ""){
                    router.push("/");
                    Swal.fire({
                        title: 'Loggeado!',
                        icon: 'success',
                        showConfirmButton: false,
                        allowOutsideClick: false,
                    })
                    setTimeout(function(){
                        
                        Swal.close();
                    }, 1000)
                    
                }
            }else{
                Swal.fire({
                    title: 'Oops!',
                    text: 'Usuario o contraseña incorrectos',
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            }
        }

        return {
            login,
            user
        }
    },
}
</script>

<style lang="scss">
.login-form-container{
    min-width: 250px;
    max-width: 400px;
    width: 100%;
    height: auto;
    padding: 25px;
    border-radius: 5px;
}

.image-container{
    width: 100%;
    height: auto;
    padding: 10px 80px;
    .img-radius{
        border-radius: 50%;
        box-shadow: -1px 6px 12px -2px rgba(0,0,0,0.75);
        img {
            width: 100%;
            
        }
    }
}

.login-input{
    border-radius: 40px !important;
    height: 40px !important;
    font-weight: 600 !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
}

.form-group{
    text-align: initial;
    margin-bottom: 10px;
}







</style>
