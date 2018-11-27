<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
// 1.导入组件
import Login from './components/login/login'

export default {
  name:'app',
  components:{
    Login,
  }
}
</script>

<style>
#app{
  height: 100%;
}
</style>
