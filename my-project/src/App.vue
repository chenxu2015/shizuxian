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
<template>
  <div id="app">
    <router-view class="view"></router-view>  
    
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

