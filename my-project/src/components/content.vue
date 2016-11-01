<template>
    <div id="firstcomponent">
        <router-view></router-view>
        <nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
            <div class="container">
                <ul class="nav-box-bottom row">
                    <li class="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <router-link to="/content/home">
                            <button>首页</button>
                        </router-link>
                    </li>
                    <li class="col-xs-3 col-sm-3 col-md-3 col-lg">
                        <router-link to="/content/category">
                            <button>分类</button>
                        </router-link>
                    </li>
                    <li class="col-xs-3 col-sm-3 col-md-3 col-lg">
                        <router-link to="/content/shopping-trolley">
                            <button>购物车</button>
                        </router-link>
                    </li>
                    <li class="col-xs-3 col-sm-3 col-md-3 col-lg">
                        <router-link to="/content/myaccount">
                            <button>我的账户</button>
                        </router-link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    }
}
</script>
<style>
</style>
