<template>
    <div id="product-box">
        
        <div class="swiper-container">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="pic in detailMap.picList">
                <img :src="detailMap.basePic + pic.url" width="100%" />
            </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
        <div class="description col-xs-12 col-sm-12">
            <p>
                <span>{{detailMap.product.title}}</span>
            </p>
        </div>
        <div class="product-recommend col-xs-12 col-sm-12">
            <span>{{detailMap.product.describer}}</span>
        </div>
        <div class="product-price col-xs-7 col-sm-7">
            <span>{{detailMap.product.price}}<span>
        </div>
        <div class="product-details col-xs-12 col-sm-12">
            <div class="product-title">
                <h2 class="h5">商品详情</h2>
            </div>
            <ul class="product-info-list">
                <li>商品名称：<span>大黄鱼</span></li>
                <li>商品规格：<span>单体重量在100g－200g</span></li>
                <li>商品单位：<span>斤</span></li>
                <li>商品所在仓库：<span>舟山渔港</span></li>
                <li class="end">商品支持配送地区：<span>上海</span></li>
            </ul>
        </div>
        <div class="tool-menu">
            <span class="collection col-xs-6 col-sm-6">收藏</span>
            <span class="collection-icon"></span>
            <span class="purchase col-xs-6 col-sm-6">立即下单</span>
        </div>
    </div>
</template>
<style>
.swiper-slide {
    background-color: #428bca;
    height: 150px;
}

.description{
    margin:0 auto;
    float:none;
    margin-top:15px;
}
.description span{
    font-size:25px;
    margin-right:5px;
}
.product-recommend{
    margin-top:5px;
}
.product-recommend span{
    font-size:20px;
    color:#666;
}
.product-price{
    float:none;
    margin:0 auto;
    border-bottom:1px solid #EE2229;
    margin-top:15px;
}
.product-price span{
    font-size:20px;
    color:#EE2229;
}
.product-details{
    margin:15px 0 21px 0;
}
.product-details li{
    border-top:1px solid #E5E4E5; 
    line-height:29px;  
}
.end{
    border-bottom:1px solid #E5E4E5;
}
.tool-menu{
    position:relative;
}
i{
    font-style:normal;
    font-weight:normal;
}
.purchase,
.collection{
    height:50px;
    line-height:50px;
    text-align:center;
}
.purchase{
    background-color:#7EC954;
    font-size:18px;
    color:#fff;
    cursor:pointer;
}
.collection{
    position:relative;
    top:13px;
}
.collection-icon{
    display:inline-block;
    height:25px;
    width:25px;
    background:url("../assets/img/collection.png") center bottom no-repeat;
    background-size:80%;
    position:absolute;
    top:222px;
    left:81px;
    cursor:pointer;
}
</style>
<script>
import Vue from 'vue'
import swiper from 'swiper'
export default {
    data() {
            return {
                detailMap:{}
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
                var _self = this;
                function getDetailFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.detailMap = data.data;
                        setTimeout(function() {
                            var mySwiper = new Swiper('.swiper-container', {
                                pagination: '.swiper-pagination',
                                paginationClickable: true
                            });
                        });
                    }else{
                        alert("获取数据异常");
                    }
                }
                setTimeout(function(){
                    var detailPara = {"recordId":_self.$route.params.detailId};
                    commonAjax("/api/productDetails.xhtml",detailPara,"get",getDetailFunc);
                }, 100);
            }
        }
}
</script>
