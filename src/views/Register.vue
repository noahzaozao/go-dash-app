<template>
    <el-container>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="loginForm">
            <el-form-item label="用户名" prop="pass">
                <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    export default {
        name: 'Register',
        data () {
            return {
                ruleForm: {
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules: {
                }
            };
        },
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        return false;
                    }
                });
            },
            resetForm (formName) {
                this.$refs[formName].resetFields();
            }
        }
    };
</script>

<style scoped>
    .loginForm {
        position: relative;
        width: 500px;
        margin: 160px auto;
    }

    .el-form-item {
        margin-right: 50px;
    }
</style>
