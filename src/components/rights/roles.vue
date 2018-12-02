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
            @click="showEditRightDia(scope.row)"
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
            @click="showUserRightDia(scope.row)"
            size="mini"
            plain
            type="success"
            icon="el-icon-check"
            circle
          ></el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- 树形结构角色列表 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisibleTree"
      width="50%"
      :before-close="handleClose"
    >
      <el-tree
        :data="rolesTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        :default-checked-keys="checked"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisibleTree = false">取 消</el-button>
        <el-button
          type="primary"
          @click="EditRightTree()"
        >确 定</el-button>
      </span>
    </el-dialog>

  </el-card>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      dialogVisibleTree: false,
      rolesTree: [],
      checked: [],
      currRoleId: "",
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  created() {
    // 获取角色列表
    this.getRolesList();
  },
  methods: {
    async getRolesList() {
      const res = await this.$http.get(`roles`);
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      this.rolesList = data;
    },
    // 展开行删除权限
    deleteRole(role, rightId) {
      this.$http.delete(`roles/${role.id}/rights/${rightId}`).then(res => {
        // console.log(res);
        // 更新整个视图
        // this.getRolesList();
        // res中返回了200和剩余角色
        const { data } = res.data;
        role.children = data;
      });
    },
    // 显示树形权限列表
    showUserRightDia(role) {
      // console.log(role);
      // 获取当前角色的id值
      this.currRoleId = role.id;
      this.dialogVisibleTree = true;
      // 获取树形结构的角色列表
      this.$http.get(`rights/tree`).then(res => {
        // console.log(res);
        this.rolesTree = res.data.data;
        //  获取当前权限的id
        // 当前角色的权限
        let tmpTree = [];
        role.children.forEach(item1 => {
          // tmpTree.push(item1.id);---会全部选中一级
          item1.children.forEach(item2 => {
            // tmpTree.push(item2.id);
            item2.children.forEach(item3 => {
              tmpTree.push(item3.id);
            });
          });
        });
        this.checked = tmpTree;
        // console.log(this.checked);
      });
    },
    // 点击树形权限列表的确定时触发
    EditRightTree() {
      // roles/:roleId/rights
      // rids 树形节点中所有全选和半选的id数组
      // 获取全选id的数组arr1--getCheckedKeys方法
      // 1.给要操作的DOM设置ref属性值
      let arr1 = this.$refs.tree.getCheckedKeys();
      // 获取半选id的数组arr2--getHalfCheckedKeys方法
      let arr2 = this.$refs.tree.getHalfCheckedKeys();
      // 合并两个数组---ES6语法:展开运算符
      let arr = [...arr1, ...arr2];
      this.$http
        .post(`roles/${this.currRoleId}/rights`, { rids: arr.join(",") })
        .then(res => {
          // console.log(res);
        });
      // 更新视图
      this.getRolesList();
      this.dialogVisibleTree = false;
    },

    // 点击树形权限列表的X时,触发
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style>
.addRoleBtn {
  margin-top: 20px;
}
</style>
