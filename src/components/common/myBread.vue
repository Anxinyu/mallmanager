<template>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    name:'my-bread',
  data() {
    return {
      // level1:'',
      // level2:''
    };
  },
  props: ["level1", "level2"]
};
</script>

<style>
</style>
