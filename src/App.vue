<template>
    <div id="app">
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1']" router>
                    <el-submenu index="1">
                        <template slot="title"><i class="el-icon-message"></i>Microservices</template>
                        <el-menu-item-group>
                            <template slot="title">ETCD</template>
                            <el-menu-item index="/"><i class="el-icon-star-on"></i>Home</el-menu-item>
                            <el-menu-item index="/about"><i class="el-icon-star-on"></i>About</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style="text-align: right; font-size: 12px">
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>王小虎</span>
                </el-header>

                <el-main style="padding: 0">
                    <router-view/>
                    <!--<el-table :data="tableData">-->
                    <!--<el-table-column prop="date" label="日期" width="140">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="name" label="姓名" width="120">-->
                    <!--</el-table-column>-->
                    <!--<el-table-column prop="address" label="地址">-->
                    <!--</el-table-column>-->
                    <!--</el-table>-->
                </el-main>
            </el-container>
        </el-container>
        <!--<div id="nav">-->
        <!--<router-link to="/">Home</router-link>-->
        <!--|-->
        <!--<router-link to="/about">About</router-link>-->
        <!--</div>-->
        <!--<router-view/>-->
    </div>
</template>

<style>
    body {
        margin: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 0;
    }

    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>

<script>
    export default {
        data() {
            const item = {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            };
            return {
                tableData: Array(20).fill(item)
            }
        }
    };
</script>
