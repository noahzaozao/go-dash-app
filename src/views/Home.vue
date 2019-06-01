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
                        <!--<img alt="Vue logo" src="../assets/logo.png">-->
                        <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
                    </div>
                </el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/HelloWorld.vue'

    export default {
        name: 'home',
        components: {
            // HelloWorld
        }
    };
</script>
