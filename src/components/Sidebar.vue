<template>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu
                :default-active="$route.path"
                :default-openeds="['1']"
                router>
            <el-submenu index="1">
                <template slot="title">Microservices</template>
                <el-menu-item-group>
                    <template slot="title">ETCD</template>
                    <el-menu-item index="/">Home</el-menu-item>
                    <el-menu-item index="/about">About</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
    export default {
        name: 'sidebar'
    };
</script>

<style scoped>
    .el-aside {
        color: #333;
    }
</style>
