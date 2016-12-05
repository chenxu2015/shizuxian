<style lang="scss" scoped>

#firstcomponent{
    padding-bottom:60px;
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
            span{
                font-size: 14px;color: #666; display: block;
            }
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
    <div id="firstcomponent" class="container" style="padding:0;padding-bottom:60px;">
        <section style="position: relative;background-color:rgb(76, 187, 8);height:50px;line-height:50px;text-align: center;overflow:hidden;">
            <span style="font-size:16px;color:white;float:left;margin-left:10px;"><i class="iconfont icon-position"></i>上海</span>
            <span style="color:white;font-size:22px;margin-left:-50px;">十足鲜</span>
        </section>  
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="indexTopre in indexTopreMap.list"><img :src="indexTopreMap.basePic + indexTopre.content.logo" width="100%" /></div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <ul class="row action-list-box">
            <li class="col-xs-1 col-sm-1 col-md-1 col-lg-1" style="text-align:center;"></li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><a href="/content/collect" class="iconfont icon-collect" style="color:rgba(88,153,217,1);"><span>收藏</span></a></li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><a href="/content/all-order" class="iconfont icon-order" style="color:rgba(124,200,47,1);"><span>订单</span></a></li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><a href="/content/collect" class="iconfont icon-recharge" style="color:rgba(79,205,204,1);"><span>充值</span></a></li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><a href="tel:15900996441" class="iconfont icon-telphone" style="color:rgba(88,138,66,1);"><span>客服</span></a></li>
            <li class="col-xs-2 col-sm-2 col-md-2 col-lg-2" style="text-align:center;"><a href="/content/collect" class="iconfont icon-enterprise" style="color:rgba(125,102,180,1);"><span>企业</span></a></li>
        </ul>
       <div class="home-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    <h3 style="border-bottom:1px solid #dcdddd;font-size:16px;padding:8px 10px;color:red;">限时抢购</h3>
    <ul class="row wares-box">
        <li class="col-xs-4 col-sm-4" v-for="indexSettime in indexSettimeMap.list">
            <a :href="'product-details/'+ indexSettime.recordId">
                <img :src="indexSettimeMap.basePic + indexSettime.logoUri" width="100%" height="120px;" />
                <p>{{indexSettime.title}}
                    <br/><span style="color:rgb(76, 187, 8);">${{indexSettime.price}}</span></p>
            </a>
        </li>
    </ul>
    <h3 style="border-bottom:1px solid #dcdddd;font-size:16px;padding:8px 10px;color:red;">热卖推荐</h3>
    <ul class="row wares-box">
        <li class="col-xs-4 col-sm-4">
            <a href="/content/product-details">
                <img src="../assets/img/meinv2.jpg" width="100%" />
                <p>红辣椒
                    <br/><span>6.19/125g</span></p>
            </a>
        </li>
        <li class="col-xs-4 col-sm-4">
            <a href="/content/product-details">
                <img src="../assets/img/meinv2.jpg" width="100%" />
                <p>红辣椒
                    <br/><span>6.19/125g</span></p>
            </a>
        </li>
        <li class="col-xs-4 col-sm-4">
            <a href="/content/product-details">
                <img src="../assets/img/meinv2.jpg" width="100%" />
                <p>红辣椒
                    <br/><span>6.19/125g</span></p>
            </a>
        </li>
        <li class="col-xs-4 col-sm-4">
            <a href="/content/product-details">
                <img src="../assets/img/meinv2.jpg" width="100%" />
                <p>红辣椒
                    <br/><span>6.19/125g</span></p>
            </a>
        </li>
        <li class="col-xs-4 col-sm-4">
            <a href="/content/product-details">
                <img src="../assets/img/meinv2.jpg" width="100%" />
                <p>红辣椒
                    <br/><span>6.19/125g</span></p>
            </a>
        </li>
        <li class="col-xs-4 col-sm-4">
            <a href="/content/product-details">
                <img src="../assets/img/meinv2.jpg" width="100%" />
                <p>红辣椒
                    <br/><span>6.19/125g</span></p>
            </a>
        </li>
    </ul>

        </div>
    </div>
</template>
<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(VueInfiniteScroll)
import swiper from 'swiper'

export default {
    	data() {
            return {
                loading: false,
                post: null,
                error: null,
                indexTopreMap:{},
                indexSettimeMap:{}
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
                this.error = this.post = null;
                this.loading = true;
                var _self = this;
                //获取首页头部广告位 start
                function getIndexTopre(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.indexTopreMap = data.data;
                        for(var i in _self.indexTopreMap.list){
                            _self.indexTopreMap.list[i].content = JSON.parse(_self.indexTopreMap.list[i].content);
                        }
                         //设置swiper插件
                        setTimeout(function() {
                            var mySwiper = new Swiper('.swiper-container', {
                                pagination: '.swiper-pagination'
                            });
                        },100);
                    }
                }
                //获取首页头部广告位 end
                //获取首页限时推荐 start
                function getIndexSettimeMap(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.indexSettimeMap = data.data;
                    }
                }
                //获取首页限时推荐 end
                setTimeout(function(){
                    var indexToprePara = {"maxNum":3};
                    commonAjax("/api/getIndexTopre.xhtml",indexToprePara,"get",getIndexTopre);
                    var indexSettimeMapPara = {"pageNo":0,"maxNum":3};
                    commonAjax("/api/index.xhtml",indexSettimeMapPara,"get",getIndexSettimeMap);
                }, 100);
            },
            loadMore: function() {
                console.log("loadMore...");
                this.busy = true;
                setTimeout(() => {
                    
                    this.busy = false;
                }, 1000);
            }
        }
}
</script>
