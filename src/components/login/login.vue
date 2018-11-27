<template>
  <div class=container>
    <el-form
      :label-position="labelPosition"
      label-width="80px"
      class="container_1"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="密码" class="psw">
        <el-input></el-input>
      </el-form-item>
      <el-button type="primary" class="login-btn">登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
                labelPosition: 'top',
        }
    }

}
</script>

<style>
.container{
    height: 100%;
    background: #324152;
    display: flex;
    justify-content: center;
    align-items: center;

}
.container_1{
    width: 400px;
    background: #fff;
    padding: 30px;
    border-radius: 5px;
}
.login-btn{
    width: 400px;
}
.el-form--label-top .el-form-item__label{
    padding: 0;
}
.el-form-item{
    margin-bottom: 0;
}
.psw{
    margin-bottom: 22px;
}
</style>
