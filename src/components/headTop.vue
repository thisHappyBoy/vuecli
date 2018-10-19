<template>
    <div>
        <div class="header">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" background-color="#05223F" text-color="#fff" active-text-color="#2EB2FF">
                <el-submenu index="1" style="float: right;">
                    <template slot="title">用户名</template>
                    <el-menu-item index="logout">退出登录</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "headTop",
        data() {
            return {
                activeIndex: '1'
            };
        },
        methods: {
            logout(select) {
                console.log(select);
                this.$axios.post('/api/zhimakaimen/logout').then( (res) => {
                    console.log(res);
                    if( parseInt(res.data.ret) === 1 ) {
                        this.$router.push('/login');
                    }
                });
            },
            handleSelect(key, keyPath) {
                this.logout();
                // return this.$route.path.replace(keyPath, '');
            }
        }
    }
</script>

<style type="text/css">
    .header {
        position: relative;
        width: 100%;
        height: 60px;
        background: #05223f;
    }
    .header .el-menu-demo {
        width: 1200px;
        margin: 0 auto;
    }
</style>