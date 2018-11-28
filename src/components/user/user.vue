<template>
  <el-card class="box-card">
    <!--面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item><a href="/">首页</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row class="user_search">
      <el-col>
        <el-input
          @clear="loadUserList"
          placeholder="请输入内容"
          v-model="query"
          class="input-with-select"
          clearable
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            @click.prevent="searchUser"
          ></el-button>
        </el-input>
        <el-button
          type="success"
          plain
        >添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="userlist"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="#"
        width="40"
      >
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      > </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{scope.row.create_time|fmtdate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>

      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            size="mini"
            plain
            type="danger"
            icon="el-icon-delete"
            circle
          ></el-button>
          <el-button
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      userlist: [],
      total: -1,
      pagenum: 1,
      pagesize: 2
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      // 设置默认的token
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      //   发送请求
      this.$http
        .get(
          `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
            this.pagesize
          }`
        )
        .then(res => {
          console.log(res);
          const {
            data: { total, pagenum, users },
            meta: { msg, status }
          } = res.data;
          if (status === 200) {
            //   1.给表格数据赋值
            this.userlist = users;
            // 2.给total赋值
            this.total = total;
            // 3.提示
            this.$message.success(msg);
          } else {
            this.$message.warning(msg);
          }
        });
    },
    // 管理每页显示多少条
    handleSizeChange(val) {
      //   设置每页的条数
      this.pagesize = val;
      //  返回第一页
      //   this.pagenum = 1;
      this.getUserList();
    },
    // 控制当前页,点击数字切换数据
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },
    // 搜索框
    searchUser() {
      this.getUserList();
    },
    // 清空搜素框
    loadUserList() {
      this.getUserList();
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.user_search {
  margin-top: 15px;
}
.input-with-select {
  width: 400px;
}
</style>
