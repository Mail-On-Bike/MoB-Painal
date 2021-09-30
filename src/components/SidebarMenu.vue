<template>
    <div class="sidebar-layout" @click="bgClick">
        
    </div>
    <div class="sidebar-menu text-left">
        <span class="menu-item" @click="goClick('home')"><i class="fas fa-home"></i> Home</span>
        <span class="menu-item" @click="goClick('misPedidos')"><i class="fas fa-bicycle"></i> Mis Pedidos</span> 
        <hr>
        <span class="menu-item btn-crear" @click="goClick('nuevoPedido')"><i class="fas fa-plus-circle fa-lg"></i> &nbsp; Crear Pedido</span> 
    </div>
</template>

<script>
export default {
    emits: ['hideSidebar', 'go'],
    setup(props, {emit}){
        const bgClick = () => {
            emit('hideSidebar') 
        }
        const goClick = (link) => {
            emit('go', link) 
        }

        return{
            bgClick,
            goClick
        }
    }
}
</script>