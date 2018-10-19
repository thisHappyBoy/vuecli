<template>
    <div class="login">
        <transition name="form-fade" mode="in-out">
            <section class="form_content" v-show="showLogin">
                <div class="manage_tip"><span class="title">MACA平台</span></div>
                <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
                    <el-form-item prop="username">
                        <span class="fa-tips"><i class="el-icon-maca-account"></i></span>
                        <el-input class="area" type="text" placeholder="邮箱" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <span class="fa-tips"><i class="el-icon-maca-password"></i></span>
                        <el-input class="area" type="password" placeholder="密码" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item prop="code">
                        <span class="fa-tips"><i class="el-icon-maca-code"></i></span>
                        <el-input class="area code" type="text" placeholder="验证码" v-model="loginForm.cache"></el-input>
                        <el-button type="primary" @click="getCode('loginForm')" class="get-code">获取验证码</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('loginForm')" class="submit-btn">登录</el-button>
                    </el-form-item>
                </el-form>
            </section>
        </transition>
    </div>
</template>

<script>
    import { JSEncrypt } from 'jsencrypt';

    export default {
        name: "login",
        data(){
            return {
                loginForm: {
                    username: '',
                    password: '',
                    cache: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        { pattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/, message: '请输入正确的邮箱格式', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { pattern: /(?=.*[A-Z])(?=.*[a-z])[\x21-\x7e]{6,16}/, message: '密码格式错误', trigger: 'blur' }
                    ],
                    cache: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                },
                showLogin: false
            }
        },
        mounted(){
            this.showLogin = true;
        },
        methods: {
            rasEncrypt(password){
                let publicKey = '-----BEGIN PUBLIC KEY-----\n' +
                    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDIw6wbLR6Zo6NQW/WANlzdL49f\n' +
                    'Jo6glCWHwJCyJpIlYRi/W7JeZ7pY04cz11jub6z4xi+ywT56bfwzA/q6qSSkFOvH\n' +
                    'hAoYieUdoPxLhju8bXiL/4kMyinKizrw9JzVnAGaUblCL0PWy+YanbNT1U/MykzU\n' +
                    'a8daL1Fvz+Co9DX6BwIDAQAB\n' +
                    '-----END PUBLIC KEY-----'; // 从后台获取公钥，这里省略，直接赋值
                let encryptor = new JSEncrypt();  // 新建JSEncrypt对象
                encryptor.setPublicKey(publicKey);  // 设置公钥
                let rsaPassword = encryptor.encrypt(password);  // 对密码进行加密
                return rsaPassword;
            },
            dataChange() {
                let userData = {};
                let pw = this.rasEncrypt(this.loginForm.password);
                userData.username = this.loginForm.username;
                userData.password = pw;
                userData.cache = this.loginForm.cache;
                return userData;
            },
            getCode(loginForm) {
                let current = this;
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        //用户获取验证码的接口
                        this.$axios.post('/api/zhimakaimen/sendcaptcha',this.$qs.stringify(this.dataChange())).then( (res) => {
                            console.log(res.data);
                            if( parseInt(res.data.ret) === 1 ) {
                                this.$notify({
                                    title: '成功',
                                    message: res.data.msg,
                                    type: 'success'
                                });
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: res.data.msg,
                                });
                            }
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的用户名密码',
                        });
                        return false;
                    }
                });
            },
            submitForm(loginForm) {
                // aaron.chen@wiwide.com   Bcia12345678
                this.$refs[loginForm].validate((valid) => {
                    if (valid) {
                        //用户登录的接口
                        this.$axios.post('/api/zhimakaimen/index',this.$qs.stringify(this.dataChange())).then( (res) => {
                            console.log(res.data);
                            if( parseInt(res.data.ret) === 1 ) {
                                this.$router.push('personalCenter');
                            } else {
                                this.$notify.error({
                                    title: '错误',
                                    message: res.data.msg,
                                });
                            }
                        });
                    } else {
                        this.$notify.error({
                            title: '错误',
                            message: '请输入正确的用户名密码',
                        });
                        return false;
                    }
                });
            }
        }
    }
</script>

<style type="text/css">
    .login{
        width: 100%;
        height: 100%;
        background: url(../assets/bg.png) no-repeat center center;
        background-size: 100% 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: -1;
    }
    .form_content {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 400px;
        height: 100%;
        min-height: 650px;
        position: relative;
        margin: auto;
    }
    .manage_tip{
        margin-bottom:20px;
    }
    .manage_tip > .title{
        font-family: cursive;
        font-weight: bold;
        font-size: 26px;
        color: #000000;
    }
    .loginForm {
        background: url(../assets/login_bg.png) no-repeat center center;
        background-size: 100% 100%;
        width: 360px;
        min-height: 230px;
        padding: 20px;
    }
    .fa-tips {
        position: absolute;
        top: 0;
        left: 10px;
        z-index: 20;
        font-size: 16px;
    }
    .loginForm .el-input__inner {
        padding-left: 30px!important;
    }
    .area {
        width: 100%;
        display: block;
    }
    .area.code {
        width: 60%;
        display: inline-block;
    }
    .get-code {float: right;}
    .submit-btn {
        width: 60%;
        display: block;
        margin: 20px auto 0 auto;
    }
</style>