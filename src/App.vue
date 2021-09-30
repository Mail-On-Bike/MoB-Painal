<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <sidebar-menu v-if="showSidebar" @hideSidebar="hideSidebar" @go="go"></sidebar-menu>
  <div v-if="loggedIn" class="topbar">
    <div><i class="fas fa-bars menu-icon" @click="showSidebar = !showSidebar"></i></div>
    <div class="btn-group">
      <button type="button" class="profile-icon dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fas fa-user-circle"></i>
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#" @click="go('ayuda')"><i class="fas fa-question-circle"></i> Ayuda</a></li>
        <li><a class="dropdown-item" href="#" @click="go('configuracion')"><i class="fas fa-user-cog"></i> Configuración</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#" @click="go('cerrarSesion')"><i class="fas fa-sign-out-alt"></i> Cerrar Sesión</a></li>
      </ul>
    </div>
  </div>
  <div :class="{ layoutMain: loggedIn, layoutLogin: !loggedIn }">
    <div ref="mainLayout" :class="{overlayMain: loggedIn, overlayLogin: !loggedIn}">
      <router-view @scrollToTop="scrollToTop"/>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex"
import {computed, ref, provide} from 'vue'
import SidebarMenu from './components/SidebarMenu.vue';
import "./assets/scss/main.scss";
import {useRouter} from 'vue-router';
export default {
  components: {
    SidebarMenu
  },
  setup(){
    const store = useStore();
    const router = useRouter();
    let loggedIn = computed(() => store.getters.loggedIn)
    let showSidebar = ref(false);
    const hideSidebar = () => {
      showSidebar.value = false;
    }


    const mainLayout = ref()

    // Función para hacer el routing de manera manual
    const go = (link) => {
      switch(link){
        case 'home':{
            router.push('/');
            break;
        }
        case 'misPedidos':{
            router.push('/misPedidos');
            break;
        }
        case 'nuevoPedido':{
            router.push('/nuevoPedido');
            break;
        }
        case 'ayuda':{
            router.push('/ayuda');
            break;
        }
        case 'configuracion':{
            router.push('/configuracion');
            break;
        }
        case 'cerrarSesion':{
            store.dispatch('logout');
            break;
        }
      }
      hideSidebar();
    }

    const scrollToTop = ()  =>{
      mainLayout.value.scrollTop = 0;
    }

    provide('scrollToTop', scrollToTop)
    return {
      loggedIn,
      showSidebar,
      mainLayout,
      hideSidebar,
      go,
      scrollToTop
    }
  }
}
</script>

<style lang="scss">
@import "./assets/scss/_variables.scss";

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.topbar{
  height: 60px;
  padding: 0px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: white;
  box-shadow: 0px 3px 8px 0px rgba(0,0,0,0.25);
  position: relative;
  .menu-icon {
    font-size: 1.8rem;
  }

  .profile-icon{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: $azul-4;
    color: white;
    display: flex;
    align-items: center;
    border: 0px;
    justify-content: center;
    i{
      font-size: 30px;
    }
  }

  .dropdown-toggle::after {
    display: none;
  }

  a.dropdown-item{
    font-size: 14px;
    padding: 5px 20px;
    transition: .5s;
    color: $azul-1;
    i{
      min-width: 20px;
    }
    &:hover{
      padding: 5px 10px 5px 30px;
    }
  }

  .dropdown-menu.show{
    box-shadow: -1px 6px 12px -2px rgba(0,0,0,0.75);
  }
}

.fa-bars.menu-icon{
  cursor: pointer !important;
}


</style>
