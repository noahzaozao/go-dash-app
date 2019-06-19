<template>
    <el-container>
        <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" label-width="100px" class="registerForm">
            <el-form-item label="用户名" prop="pass">
                <el-input type="text" v-model="registerForm.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="registerForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('registerForm')">提交</el-button>
                <el-button @click="resetForm('registerForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-container>
</template>

<script>
    import api from '../api/api.js';

    export default {
        name: 'register',
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
                registerForm: {
                    username: '',
                    password: ''
                },
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
            submitForm (formName) {
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
                    api.post(api.API_HOST + '/api/user/register', param, r => {
                        if (r.return_code === api.OK) {
                            localStorage.setItem('jwt_token', r.data.token.token);
                            setTimeout(function () {
                                window.location.href = '/';
                            }, 1000);
                        } else {
                            console.log(r.message);
                        }
                    });
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
    .registerForm {
        position: relative;
        width: 500px;
        margin: 160px auto;
    }

    .el-form-item {
        margin-right: 50px;
    }
</style>
