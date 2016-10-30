<template>
  <div id="firstcomponent">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">slider1</div>
        <div class="swiper-slide">slider2</div>
        <div class="swiper-slide">slider3</div>
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
  import swiper from 'swiper'
  export default {
    data () {
      return {
        loading: false,
        post: null,
        error: null
      }
    },
    created () {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.fetchData()
    },
    watch: {
      // 如果路由有变化，会再次执行该方法
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.error = this.post = null
        this.loading = true
        setTimeout(function(){
          var mySwiper = new Swiper('.swiper-container',{
            pagination : '.swiper-pagination'
          });
        });
      }
    }
  }
</script>
<style>
.swiper-slide{
  background-color:#428bca;
  height:200px;
}
</style>