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
          @click.prevent="showAddUserVue()"
          type="success"
          plain
        >添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
      :data="userlist"
      style="width: 100%">
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
          @click="deleteUser(scope.row.id)"
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
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
    <!-- 添加用户,默认隐藏,位置随意 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="邮箱"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.email"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="电话"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.mobile"
            autocomplete="off"
          ></el-input>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="addUser()"
        >确 定</el-button>
      </div>
    </el-dialog>
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
      pagesize: 2,
      dialogFormVisible: false,
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      // 设置默认的token
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      //   发送请求
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );

      // console.log(res);
      const {
        data: { total, users },
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
    },

    // 管理每页显示多少条
    handleSizeChange(val) {
      //   设置每页的条数
      this.pagesize = val;
      //  返回第一页
      this.pagenum = 1;
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
    },
    // 添加用户
    showAddUserVue() {
      this.form={}
      this.dialogFormVisible = true;
    },
    addUser() {
      this.$http.post(`users`, this.form).then(res => {
      //   // console.log(res);
        const {
          meta: { msg, status }
        } = res.data;
        if (status === 201) {
          this.getUserList();
          this.$message.success(msg);
          this.dialogFormVisible = false;
        }
      });
    },
    // 删除用户
    deleteUser(userId){
       this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //发送删除请求:id
          // 1. data中找userId
          // 2. 把userId以参数形式传入
         this.$http.delete(`users/${userId}`)
         .then(res=>{
           console.log(res)
          if(res.data.meta.status===200){
             this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getUserList();
          }
         })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
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
