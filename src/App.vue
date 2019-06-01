<template>
    <div id="app">
        <el-container class="mainContainer">
            <el-header>
                <Nav></Nav>
            </el-header>
            <el-container>
                <Sidebar></Sidebar>
                <el-container>
                    <el-main>
                        <router-view/>
                    </el-main>
                    <el-footer>Footer</el-footer>
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>

<style>
    body {
        margin: 0;
        padding: 0;
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }

    .mainContainer {
        height: 100vh;
    }

    .el-header {
        background-color: #545c64;
        color: #333;
        line-height: 60px;
        text-align: right;
        font-size: 12px;
        height: 61px !important;
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
    import Nav from "./components/Nav";
    import Sidebar from "./components/Sidebar";
    export default {
        components: { Nav, Sidebar },
        data() {
            return {};
        }
    };
</script>
