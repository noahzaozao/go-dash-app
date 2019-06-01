<template>
    <div id="app">
        <el-container style="height: 100vh; border: 1px solid #eee">
            <el-header style="text-align: right; font-size: 12px">
                <Nav></Nav>
            </el-header>
            <el-container>
                <Sidebar></Sidebar>
                <el-container>
                    <el-main style="padding: 0">
                        <router-view/>
                    </el-main>
                    <Footer></Footer>
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


</style>

<script>
    import Nav from "./components/Nav";
    import Sidebar from "./components/Sidebar";
    import Footer from "./components/Footer";
    export default {
        components: {Nav, Sidebar, Footer},
        data() {
            return {};
        }
    };
</script>
