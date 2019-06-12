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
        <span style="font-size: 12px; color: #fff; margin-right: 15px;">Username</span>
    </el-menu>
</template>

<script>
    import api from '../api/api.js';

    export default {
        name: 'navbar',
        data () {
            return {
                activeIndex: 'dashboard'
            };
        },
        methods: {
            handleCommand (command) {
                this[command]();
            },
            onLogout () {
                console.log('onLogout');
                api.post('http://localhost:18080/api/user/logout', {}, function (r) {
                    console.log(r);
                    if (r.return_code === api.OK) {
                        localStorage.removeItem('jwt_token');
                        setTimeout(function () {
                            window.location.href = '/login';
                        }, 1000);
                    } else if (r.return_code < 0) {
                        console.log(r.message);
                    }
                });
            },
            handleSelect () {
                console.log('demo');
            }
        }
    };
</script>

<style scoped>
</style>
