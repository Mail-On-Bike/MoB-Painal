<template>
    <div class="login-container">
        <div class="overlay">
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
        
    </div>
</template>

<script>
import {useStore} from "vuex"
import { reactive, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'

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
            let response = await store.dispatch("login", user);
            if(response.accessToken){
                router.push("/");
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

.login-container{
    width: 100%;
    height: 100vh;
    background-image: url(http://mailonbike.com/wp-content/uploads/2018/09/169937362.jpeg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}

.overlay{
    width: 100%;
    height: 100%;
    //background-color: rgba(2, 7, 22, 0.89);
    background: rgba(5, 43, 141, 0.712);
    background: linear-gradient(90deg, rgba(5, 43, 141, 0.89) 0%, rgba(39, 117, 169, 0.897) 50%, rgba(70, 185, 195, 0.897)100%);
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>
