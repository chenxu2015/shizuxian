<style lang="scss">

#firstcomponent{
    padding-bottom:50px;
}
.swiper-slide {
    background-color: #428bca;
    height: 200px;
}
.home-list-box ul li{
}
.action-list-box{
    border-bottom: 1px solid #dcdddd; padding-bottom: 9px;
    li{
        text-align:center;
        font-size:12px;
        color:#666;
        .iconfont{
            font-size:34px;
        }
    }
}
.wares-box{
    border-bottom:1px solid #dcdddd;
    li{
        border-right:1px solid #dcdddd;
        padding:10px;
        p{text-align:center;padding-top:8px;}
    }
}
</style>
<template>
    <div id="firstcomponent" class="container" style="padding:0;">
        <section style="position: relative;background-color:rgb(76, 187, 8);height:50px;line-height:50px;text-align: center;overflow:hidden;">
            <span style="font-size:16px;color:white;float:left;margin-left:10px;"><i class="iconfont icon-position"></i>上海</span>
            <span style="color:white;font-size:22px;margin-left:-50px;">十足鲜</span>
        </section>  
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide"><img src="../../static/img/meinv1.jpg" width="100%" /></div>
                <div class="swiper-slide"><img src="../../static/img/meinv2.jpg" width="100%" /></div>
                <div class="swiper-slide"><img src="../../static/img/meinv3.jpeg" width="100%" /></div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <ul class="row action-list-box">
            <li class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="text-align:center;"></li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><i class="iconfont icon-collect" style="color:rgba(88,153,217,1);"></i>收藏</li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><i class="iconfont icon-order" style="color:rgba(124,200,47,1);"></i>订单</li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><i class="iconfont icon-recharge" style="color:rgba(79,205,204,1);"></i>充值</li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><i class="iconfont icon-telphone" style="color:rgba(88,138,66,1);"></i>客服</li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><i class="iconfont icon-enterprise" style="color:rgba(125,102,180,1);"></i>企业</li>
        </ul>
        <div class="home-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <h3 style="border-bottom:1px solid #dcdddd;font-size:16px;padding:8px 10px;color:red;">限时抢购</h3>
             <ul class="row wares-box">
                <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv5.jpg" width="100%" height="120px;" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
                 <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv3.jpeg" width="100%" height="120px;" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
                <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv4.jpg" width="100%" height="120px;" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
             </ul>
             <h3 style="border-bottom:1px solid #dcdddd;font-size:16px;padding:8px 10px;color:red;">热卖推荐</h3>
             <ul class="row wares-box">
                <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv2.jpg" width="100%" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
                 <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv2.jpg" width="100%" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
                <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv2.jpg" width="100%" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
                <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv2.jpg" width="100%" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
                 <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv2.jpg" width="100%" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
                <li class="col-xs-4 col-sm-4">
                    <img src="../../static/img/meinv2.jpg" width="100%" />
                    <p>红辣椒<br/><span>6.19/125g</span></p>
                </li>
             </ul>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(VueInfiniteScroll)
import swiper from 'swiper'
import common from '../assets/common.js'
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
                //设置swiper插件
                setTimeout(function() {
                    var mySwiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination'
                    });
                });
                // setTimeout(function(){
                //     console.log("setTimeout");
                //     commonAjax("/api/index.xhtml",execute,para);
                // },2000);
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
