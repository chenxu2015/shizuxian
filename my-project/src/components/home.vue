
<template>
    <div id="firstcomponent">
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide">slider12</div>
                <div class="swiper-slide">slider2</div>
                <div class="swiper-slide">slider3</div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="home-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
             <ul>
                <li v-for="box in boxs">{{box}}</li>
             </ul>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(VueInfiniteScroll)
import swiper from 'swiper'
export default {
    data() {
            return {
                loading: false,
                post: null,
                error: null,
                boxs:[1,1,1,1,1,1,1,1,1,1,1,1]
            }
        },
        created() {
            // 组件创建完后获取数据，
            // 此时 data 已经被 observed 了
            this.fetchData()
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                this.error = this.post = null
                this.loading = true
                setTimeout(function() {
                    var mySwiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination'
                    });
                });
            },
            loadMore: function() {
                console.log("loadMore...");
                this.busy = true;
                setTimeout(() => {
                    for (var i = 0, j = 10; i < j; i++) {
                        this.boxs.push(i);
                    }
                    this.busy = false;
                }, 1000);
            }
        }
}
</script>
<style>
#firstcomponent{
    padding-bottom:50px;
}
.swiper-slide {
    background-color: #428bca;
    height: 200px;
}
.home-list-box ul li{

}
</style>
