<template>
    <div class="person">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb">
            <el-breadcrumb-item :to="{ path: '/personalCenter' }">个人中心</el-breadcrumb-item>
        </el-breadcrumb>
        <div>
            <el-container class="info">
                <el-main style="flex: 1;">
                    <p class="info-header">账号信息</p>
                    <ul class="info-list">
                        <li><label>邮箱：</label><div>{{userInfo.user_name}}</div></li>
                        <li><label>手机：</label><div>{{userInfo.phone}}</div></li>
                        <li><label>用户级别：</label><div>{{userInfo.level}}</div></li>
                        <li><label>创建时间：</label><div>{{userInfo.addtime}}</div></li>
                        <li><label>上次登录时间：</label><div>{{userInfo.uplogintime}}</div></li>
                    </ul>
                </el-main>
                <el-main style="flex: 1;">
                    <p class="info-header">修改密码</p>
                    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="原密码" prop="oldPass">
                            <el-input type="password" v-model="ruleForm2.oldPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="新密码" prop="newPass">
                            <el-input type="password" v-model="ruleForm2.newPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                        </el-form-item>
                    </el-form>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>
    export default {
        name: "personalCenter",
        data() {
            let validatePass = (rule, value, callback) => {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            };
            let validatePass2 = (rule, value, callback) => {
                if (value !== this.ruleForm2.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: 'left',
                userInfo: {
                    user_name: "暂无",
                    phone: "暂无",
                    level: "暂无",
                    addtime: "暂无",
                    uplogintime: "暂无"
                },
                ruleForm2: {
                    oldPass: '',
                    newPass: '',
                    checkPass: ''
                },
                rules2: {
                    oldPass: [
                        { required: true, message: '请输入原密码', trigger: 'blur' },
                        { pattern: /(?=.*[A-Z])(?=.*[a-z])[\x21-\x7e]{6,16}/, message: '密码格式错误', trigger: 'blur' }
                    ],
                    newPass: [
                        { required: true, message: '请输入新密码', trigger: 'blur' },
                        { pattern: /(?=.*[A-Z])(?=.*[a-z])[\x21-\x7e]{6,16}/, message: '密码格式错误', trigger: 'blur' },
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, message: '请确认密码', trigger: 'blur' },
                        { pattern: /(?=.*[A-Z])(?=.*[a-z])[\x21-\x7e]{6,16}/, message: '密码格式错误', trigger: 'blur' },
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
            };
        },
        mounted() {
            this.initData();
        },
        methods: {
            async initData() {
                this.$axios.post('/api/users/ajaxuserinfo').then( (res) => {
                    console.log(res);
                    if( parseInt(res.data.ret) === 1 ) {
                        this.userInfo = res.data.data;
                    }
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style type="text/css">
    .person {
        width: 1200px;
        margin: 0 auto;
    }
    .breadcrumb {
        height: 40px;
        margin-top: 20px;
        padding-bottom: 10px;
        padding-left: 20px;
        line-height: 40px;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    /**************详情页组件样式********************/
    .info {
        min-height: 200px;
        width: 100%;
        margin-top: 20px;
        margin-bottom: 50px;
        background: #ffffff;
        box-shadow: 0 1px 10px rgba(0,0,0,0.1);
        border-radius: 10px;
    }
    .info-header {
        padding-bottom: 10px;
        margin-bottom: 20px;
        font-size: 18px;
        color: #333;
        line-height: 40px;
        border-bottom: 1px solid rgba(0,0,0,.1);
    }
    .info-detail > div {
        width: 550px;
        padding-top: 30px;
        margin-left: 30px;
        display: inline-block\0;
        vertical-align: top\0;
    }
    .info-detail > div > p {
        display: flex;
        align-items: center;
        padding-bottom: 10px;
        margin-bottom: 20px;
        font-size: 18px;
        color: rgb(51,51,51);
        height: 40px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
    }
    .info-detail > div > p > img {
        width: 12px;
        height: 12px;
        margin-right: 10px;
        margin-top: 3px;
    }
    .info-list > li {
        display: flex;
        position: relative;
        align-items: baseline;
        padding-right: 10px;
        margin-top: 10px;
        font-size: 14px;
        min-height: 40px;
        color: rgb(51,51,51);
    }
    .info-list > li > label {
        display: inline-block;
        width: 130px;
        padding-left: 20px;
        position: relative;
        align-self: flex-start;
        padding-top: 14px;
        vertical-align: top\0;
    }
    .info-list > li > div {
        display: flex;
        position: relative;
        flex-direction: column;
        margin-left: 20px;
        min-width: 390px;
        min-height: 40px;
        line-height: 40px;
        min-width: 350px\0;
        display: inline-block\0;
    }
    .info-list > li > label::before {
        content: '*';
        color: #f56c6c;
        margin-right: 4px;
    }
</style>