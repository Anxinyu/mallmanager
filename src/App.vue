<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 1.导入组件
import Login from './components/login/login.vue'
import Home from './components/home/home.vue'

export default {
  name:'app',
  components:{
    Login,Home
  }
}
</script>

<style>
#app{
  height: 100%;
}
</style>
