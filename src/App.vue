<template>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
  <div v-if="loggedIn" id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/login">Login</router-link> 
    <router-link to="/about">About</router-link>
  </div>
  <div 
   :class="{ layoutMain: loggedIn, layoutLogin: !loggedIn }">
    <div :class="{overlayMain: loggedIn, overlayLogin: !loggedIn}">
      <router-view/>
    </div>
  </div>
</template>

<script>
import {useStore} from "vuex"
import {computed} from 'vue'

export default {
  setup(){
    const store = useStore();
    const loggedIn = computed(() => store.getters.loggedIn)
    return {
      loggedIn
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
</style>
