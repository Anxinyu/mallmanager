<template>
  <el-card>
    <my-bread
      level1="权限管理"
      level2="角色列表"
    ></my-bread>
    <el-button
      type="primary"
      plain
      class="addRoleBtn"
    >添加角色</el-button>
    <el-table
      :data="rolesList"
      style="width: 100%"
    >
      <!-- 展开行 -->
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row
            v-for="(item1,i) in scope.row.children"
            :key="i"
          >
            <el-col :span="4">
              <!-- 角色id和权限id -->
              <el-tag
                closable
                @close="deleteRole(scope.row,item1.id)"
              >{{item1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="20">
              <el-row
                v-for="(item2,i) in item1.children"
                :key="i"
              >
                <el-col :span="4">
                  <el-tag
                    closable
                    type="success"
                    @close="deleteRole(scope.row,item2.id)"
                  >{{item2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>

                </el-col>
                <el-col :span="20">
                  <el-tag
                    closable
                    type="warning"
                    @close="deleteRole(scope.row,item3.id)"
                    v-for="(item3,i) in item2.children"
                    :key="i"
                  >{{item3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row>
            <el-col
              v-if="scope.row.children.length===0"
              :span="4"
            >
              未分配权限
            </el-col>
          </el-row>
        </template>

      </el-table-column>
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
      rolesList: []
    };
  },
  created() {
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const res = await this.$http.get(`roles`);
      console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      this.rolesList = data;
    },
    // 展开行删除权限
    deleteRole(role, rightId) {
      this.$http.delete(`roles/${role.id}/rights/${rightId}`).then(res => {
        console.log(res);
        // 更新整个视图
        // this.getRolesList();
        // res中返回了200和剩余角色
        const { data } = res.data;
        role.children = data;
      });
    }
  }
};
</script>

<style>
.addRoleBtn {
  margin-top: 20px;
}
</style>
