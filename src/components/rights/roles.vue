<template>
  <el-card>
    <my-bread
      level1="权限管理"
      level2="角色列表"
    ></my-bread>
    <el-table
      :data="rolesList"
      style="width: 100%"
    >
      <el-table-column
        type="index"
        label="#"
        width="40"
      >
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述"
      >
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            plain
            type="primary"
            icon="el-icon-edit"
            circle
            @click="showEditUserDia(scope.row)"
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
            @click="showUserRoleDia(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>

        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
        rolesList:[]
    };
  },
  created(){
      this.getRolesList()
  },
  methods: {
   async getRolesList() {
     const res=await this.$http.get(`roles`);
     const {data,meta:{msg,status}}=res.data;
     this.rolesList=data;
    }
  }
};
</script>

<style>
</style>
