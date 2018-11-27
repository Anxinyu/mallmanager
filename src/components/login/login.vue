<template>
  <div class=container>
    <el-form
      label-position="top"
      label-width="80px"
      class="container_1"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item
        label="密码"
        class="psw"
      >
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
        @click.prevent="handleLogin()"
        type="primary"
        class="login-btn"
      >登录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            formdata:{
                username:'',
                password:''
            }
        }
    },
    methods:{
        // 登录请求
        // ES7 async+await 希望让异步操作的代码,看起来像同步代码
        async handleLogin(){
           const res=await this.$http.post('login',this.formdata)
                // console.log(res)
            const {data,meta:{msg,status}}=res.data;
            // 登录成功,跳转home
            if(status===200){
                // 保存token值
                localStorage.setItem('token',data.token);
                // 跳转home页面
                this.$router.push({name:'home'});
                // 提示登录成功
                this.$message.success(msg);
            }else{
                this.$message.error(msg);
            }

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
