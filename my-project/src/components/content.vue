<template>
    <div id="firstcomponent">
        <router-view></router-view>
        <nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
            <div class="container">
                <ul class="nav-box-bottom row">
                    <li class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <router-link to="/content/home">
                            <i class="iconfont icon-home"></i>
                            <span>首页</span>
                        </router-link>
                    </li>
                    <li class="col-xs-3 col-sm-3 col-md-3 col-lg">
                        <router-link to="/content/category">
                            <i class="iconfont icon-category"></i>
                            <span>分类</span>
                        </router-link>
                    </li>
                    <li class="col-xs-3 col-sm-3 col-md-3 col-lg">
                        <router-link to="/content/shopping-trolley">
                            <i class="iconfont icon-shopping-carts"></i>
                            <span>购物车</span>
                        </router-link>
                    </li>
                    <li class="col-xs-3 col-sm-3 col-md-3 col-lg">
                        <a href="javascript:;" v-on:click="checkIsLoginFunc()">
                            <i class="iconfont icon-my"></i>
                            <span>我的账户</span>
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
        data() {
            return {
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            
        },
        methods: {
            fetchData() {
                this.$router.push({ path: '/content/home' });
            },checkIsLoginFunc(){ 
                if(!getCookie("userMobilePhone")){
                    this.$router.push({ path: '../login' });
                }else{
                    this.$router.push({ path: '/content/myaccount' });
                }
            }
        }
}
</script>
<style lang="scss" scoped>
$bgcolor:#51B951;
.nav-box-bottom li {
    float: left;
    font-size: 12px;
    text-align: center;
    padding: 6px;
    button {
        border: 0;
        background-color: rgba(255, 255, 255, 0);
        font-size: 10px;
    }
    a {
        display: inline-block;
        width: 100%;
    }
    .router-link-active{
        color:$bgcolor;
    }
    i {
        display: block;
        font-size: 20px;
    }
}
</style>
