<template>
  <el-container class="container_home">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img
              src="../../assets/images/logo.png"
              alt="logo"
            >
          </div>
        </el-col>
        <el-col :span="18">
          <div class="grid-content bg-purple-light">
            <h3>电商后台管理系统
            </h3>
          </div>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a
              href="#"
              class="logout"
              @click.prevent="handleSignout()"
            >退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside
        width="200px"
        class="aside"
      >
        <!-- 侧边栏导航 -->
        <el-menu
          :unique-opened="true"
          :router="true"
        >
          <el-submenu
            :index="item1.order+''"
            v-for="(item1,i) in menus"
            :key="i"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item1.authName}}</span>
            </template>
            <el-menu-item-group v-for="(item2,i) in item1.children" :key="i">
              <el-menu-item :index="item2.path">
                <i class="el-icon-menu"></i>
                <span>{{item2.authName}}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view class="main_container"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    };
  },

  created() {
    // 获取导航数据
    this.getMenus();
  },
  methods: {
    // 退出功能
    handleSignout() {
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
    },
    showUserList() {
      this.$router.push({ name: "user" });
    },
    showRightsList() {
      this.$router.push({ name: "rights" });
    },
    // 获取导航数据
    getMenus() {
      this.$http.get(`menus`).then(res => {
        // console.log(res);
        const { data } = res.data;
        this.menus = data;
      });
    }
  }
};
</script>

<style>
.container_home {
  height: 100%;
}
.header {
  background: #b3c0d1;
}
.aside {
  background: #d3dce6;
}
.main {
  background: #e9eef3;
}
h3 {
  text-align: center;
  line-height: 60px;
  color: #fff;
}
.logout {
  line-height: 60px;
}
.main_container {
  height: 100%;
}
</style>
