<template>
    <el-menu
        :default-active="$route.path"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
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
        <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px; color: #fff"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Settings</el-dropdown-item>
                <el-dropdown-item>Logout</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span style="font-size: 12px; color: #fff; margin-right: 15px;">Username</span>
    </el-menu>
</template>

<script>
    export default {
        name: 'navbar'
    };
</script>

<style scoped>
</style>
