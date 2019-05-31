<template>
    <div id="app">
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-header style="text-align: right; font-size: 12px">
                <el-menu :default-active="$route.path" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
                    <el-menu-item index="1">处理中心</el-menu-item>
                    <el-submenu index="2">
                        <template slot="title">我的工作台</template>
                        <el-menu-item index="2-1">选项1</el-menu-item>
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        <el-submenu index="2-4">
                            <template slot="title">选项4</template>
                            <el-menu-item index="2-4-1">选项1</el-menu-item>
                            <el-menu-item index="2-4-2">选项2</el-menu-item>
                            <el-menu-item index="2-4-3">选项3</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-menu-item index="3" disabled>消息中心</el-menu-item>
                    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px; color: #fff"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span style="font-size: 12px; color: #fff; margin-right: 15px;">王小虎</span>
                </el-menu>

            </el-header>

            <el-container>
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
                    <el-footer style="color: #fff;">Footer</el-footer>
                </el-container>
            </el-container>

        </el-container>
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
        background-color: #545c64;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }

    .el-footer {
        background-color: #545c64;
        color: #333;
        line-height: 60px;
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
