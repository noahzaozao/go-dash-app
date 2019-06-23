<template>
  <el-menu
    :default-active="activeIndex"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="handleSelect"
    router>
    <el-menu-item index="dashboard">Dashboard</el-menu-item>
    <el-submenu index="2">
      <template slot="title">Control Console</template>
      <el-menu-item index="">Option 1</el-menu-item>
      <el-menu-item index="">Option 2</el-menu-item>
      <el-submenu index="">
        <template slot="title">Option 3</template>
        <el-menu-item index="">Option 1</el-menu-item>
        <el-menu-item index="">Option 2</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="notification">Notification Center</el-menu-item>
    <el-menu-item index="">Management</el-menu-item>
    <el-dropdown @command="handleCommand">
      <i class="el-icon-setting" style="margin-right: 15px; color: #fff"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>Settings</el-dropdown-item>
        <el-dropdown-item command="onLogout">Logout</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span style="font-size: 12px; color: #fff; margin-right: 15px;">{{username}}</span>
  </el-menu>
</template>

<script>
import UserModule from '../service/UserModule';
  export default {
    name: 'navbar',
    data () {
      return {
        activeIndex: 'dashboard',
        username: ''
      };
    },
    mounted () {
      this.onInitData();
    },
    methods: {
      handleCommand (command) {
        this[command]();
      },
      async onInitData () {
        console.log('onInitData');
        try {
          const res = await UserModule.getUserInfo();
          if (res && res.return_code === this.$RETURN_CODE.OK) {
            this.username = res.data.user.username;
          }
        } catch (err) {
          this.$notify({
            title: '错误',
            message: err,
            type: 'warning'
          });
        }
      },
      async onLogout () {
        console.log('onLogout');
        try {
          const res = await UserModule.logout();
          if (res && res.return_code === this.$RETURN_CODE.OK) {
            localStorage.removeItem('jwt_token');
            setTimeout(function () {
              window.location.href = '/login';
            }, 1000);
          }
        } catch (err) {
          this.$notify({
            title: '错误',
            message: err,
            type: 'warning'
          });
        }
      },
      handleSelect () {
        console.log('demo');
      }
    }
  };
</script>

<style scoped>
</style>
