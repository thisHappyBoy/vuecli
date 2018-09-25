<template>
    <div class="login">
        <transition name="form-fade" mode="in-out">
            <section class="form_contianer" v-show="showLogin">
                <div class="manage_tip"><span class="title">MACA平台</span></div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
                    <el-form-item prop="username">
                        <span class="fa-tips"><i class="fa fa-user"></i></span>
                        <el-input class="area" type="text" placeholder="用户名" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <span class="fa-tips"><i class="fa fa-user"></i></span>
                        <el-input class="area" type="text" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登录</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                },
                showLogin: false
            }
        },
        mounted(){
            this.showLogin = true;
        }
    }
</script>

<style scoped>

</style>