<template>
    <el-container class="mainContainer">
        <el-header>
            <Nav></Nav>
        </el-header>
        <el-container>
            <Sidebar></Sidebar>
            <el-container>
                <el-main>
                    <div class="home">
                        <h1>This is an home page</h1>
                        <router-view/>
                        <!--<img alt="Vue logo" src="../assets/logo.png">-->
                        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
                    </div>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<style>
    .mainContainer {
        height: 100vh;
    }

    .el-header {
        padding: 0;
    }

    .el-main {
        padding: 0;
    }

    .el-footer {
        background-color: #545c64;
        line-height: 60px;
        color: #fff;
    }
</style>

<script>
    import Nav from '@/components/Navbar.vue';
    import Sidebar from '@/components/Sidebar.vue';

    export default {
        name: 'home',
        components: {
            Nav,
            Sidebar
        },
        data () {
            return {};
        }
    };
</script>
