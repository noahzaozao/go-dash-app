<template>
    <el-container>
        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="loginForm">
            <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    import api from '../api/api.js';

    export default {
        name: 'login',
        data () {
            // 验证用户名
            const validateUserName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入用户名'));
                }
            };
            // 验证密码
            const validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                }
            };
            return {
                // 登录表单
                loginForm: {
                    username: '',
                    password: ''
                },
                // 验证规则
                rules: {
                    username: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            async submitForm (formName) {
                // 检验表单
                this.$refs[formName].validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
                try {
                    var param = {
                        mobile: this[formName].username,
                        password: this[formName].password
                    };

                    const r = await api.post('http://localhost:18080/api/user/login', param);
                    console.log(r);
                    if (r.return_code === 0) {
                        localStorage.setItem('jwt_token', r.data);
                        setTimeout(function () {
                            window.location.href = '/';
                        }, 1000);
                    } else if (r.return_code < 0) {
                        console.log(r.message);
                    }
                    app.canClick = true;
                } catch (err) {
                    console.error(err);
                }
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
