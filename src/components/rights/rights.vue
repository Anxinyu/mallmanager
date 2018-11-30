<template>
  <el-card>
    <!-- 面包屑 -->
    <my-bread
      level1='权限管理'
      level2='权限列表'
    ></my-bread>
    <!-- 表格 -->
    <el-table
      :data="rightList"
      border
      stripe
      style="width: 100%"
      height="450px"
    >
      <el-table-column
        type="index"
        label="#"
        width="80"
      >
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="level"
        label="层级"
      >
      <template slot-scope="scope">
          <span v-if="scope.row.level==='0'">一级</span>
          <span v-if="scope.row.level==='1'">二级</span>
          <span v-if="scope.row.level==='2'">三级</span>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rightList: []
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    getRoleList() {
      this.$http.get(`rights/list`).then(res => {
        console.log(res);
        const {
          data,
          meta: { msg, status }
        } = res.data;
        if (status === 200) {
          this.rightList = data;
        }
      });
    },
  }
};
</script>

<style>
.el-breadcrumb{
    margin-bottom: 20px;
}
</style>
