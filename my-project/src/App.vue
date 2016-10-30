<template>
  <div id="app">
    <router-view class="view"></router-view>  
    <nav class="navbar navbar-default navbar-fixed-bottom" role="navigation">
      <div class="container">
        <ul class="nav-box-bottom row">
          <li class="col-xs-3 col-sm-3 col-md-3 col-lg-3"><router-link to="/home"><button>首页</button></router-link></li>
          <li class="col-xs-3 col-sm-3 col-md-3 col-lg"><router-link to="/category"><button>分类</button></router-link></li>
          <li class="col-xs-3 col-sm-3 col-md-3 col-lg"><router-link to="/shopping-trolley"><button>购物车</button></router-link></li>
          <li class="col-xs-3 col-sm-3 col-md-3 col-lg"><router-link to="/myaccount"><button>我的账户</button></router-link></li>
        </ul>
      </div>
    </nav>
  </div>
</template>
<script>
export default {
  data:function(){
    return {
      title:"<span style='color:red;'>大家好，我是陈旭</span>"
    };
  }
}
</script>
<style>
.nav-box-bottom li{
  float:left;
  height: 50px;
  line-height: 50px;
  font-size: 12px;
}
.nav-box-bottom li button{
  border: 0;
  background-color: rgba(255,255,255,0);
}
.nav-box-bottom li a{
    display: inline-block;
    width: 100%;
}
</style>
