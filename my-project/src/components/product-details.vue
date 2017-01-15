<style lang="scss" scoped>
$bgcolor:#51B951;
#product-box{
    padding-bottom:108px;
}
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
    margin:15px 0 0px 0;
    h2{
        font-weight:bold;
    }
}
.product-details li{
    border-top:1px solid #E5E4E5; 
    line-height:29px;  
}
.end{
    border-bottom:1px solid #E5E4E5;
}
.tool-menu{
        position: fixed;
    width: 100%;
    bottom: 58px;
    background-color: #F1EEEE;
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
        position: relative;
    top: 13px;
    width: 100%;
}
.collection-icon{
    display: inline-block;
    height: 25px;
    width: 25px;
    position: absolute;
    top: 2px;
    left: 81px;
    cursor: pointer;
    font-size: 20px;
}
.icon-product-collected{
    color:$bgcolor;
}
.text-product-collected{
    color:$bgcolor;
}
.envaluate-title{
    padding:0px 0 0 10px;
    border-bottom:1px solid #dcdddd;
    overflow:hidden;
    padding:10px 14px;
    margin-top:6px;
    background-color:#eee;
    margin-top:220px;
    font-weight: bold;
}
.envaluate-content-list{
    li{
        padding:10px 10px 10px 14px;
        border-bottom:1px solid #dcdddd;
        position:relative;
        .add-time{
            text-align:right;
            color:#bbb;
            padding-top:6px;
        }
        .icon-delete{
            position:absolute;
            right:10px;
            top:10px;
        }
    }
    
}
</style>
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
        <div class="product-details col-xs-12 col-sm-12 clearfix">
            <div class="product-title clearfix">
                <h2 class="h5">商品详情</h2>
            </div>
            <ul class="product-info-list clearfix">
                <li>商品名称：<span>大黄鱼</span></li>
                <li>商品规格：<span>单体重量在100g－200g</span></li>
                <li>商品单位：<span>斤</span></li>
                <li>商品所在仓库：<span>舟山渔港</span></li>
                <li class="end">商品支持配送地区：<span>上海</span></li>
            </ul>
        </div>
        <!--评价列表 start-->
        <div class="envaluate-title" v-if="evaluateList.length > 0">评价</div>
         <ul class="envaluate-content-list" v-for="evaluate in evaluateList">
             <li>{{evaluate.content}}
                <div class="add-time">{{evaluate.addTime}}</div>
            </li>
         </ul>
         <!--评价列表 end-->
        <div class="tool-menu clearfix">
            <div style="width: 50%; float: left;" v-on:click="collectProduct(detailMap.product.recordId)">
                <span class="collection col-xs-6 col-sm-6" v-bind:class="{ 'text-product-collected': isCollected, 'text-product-collect': !isCollected}">收藏</span>
                <span class="collection-icon iconfont" v-bind:class="{ 'icon-product-collected': isCollected, 'icon-product-collect': !isCollected}"></span>
            </div>
            <span class="purchase col-xs-6 col-sm-6" v-on:click="addShoppingTrolley(detailMap.product.recordId)">加入购物车</span>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import swiper from 'swiper'
export default {
    data() {
            return {
                detailMap:{},
                evaluateList:[],
                isCollected:false
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
                //获取数据详情
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
                //是否被收藏
                function isCollectedFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.isCollected = true;
                    }else{
                        _self.isCollected = false;
                    }
                    console.log("isCollected:" + _self.isCollected);
                }
                //获取商品详情
                var detailPara = {"recordId":_self.$route.params.detailId};
                commonAjax("/api/productDetails.xhtml",detailPara,"get",getDetailFunc);
                //判断是否被收藏
                var isCollectedPara = {"api_u_key":getCookie("api_u_key"),"relatedId":_self.$route.params.detailId,"tag":"product"};
                commonAjax("/api/collection/isCollected.xhtml",isCollectedPara,"get",isCollectedFunc);
                //获得评论列表 start
                var getListCommentPara = {"api_u_key":getCookie("api_u_key"),"tag":"product","relateId":_self.$route.params.detailId,"pageNo":0,"pageMax":100};
                commonAjax("/api/comment/listComment.xhtml",getListCommentPara,"get",function(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        console.log("已获得评论列表");
                        _self.evaluateList = data.data.list;
                    }
                });
                //获得评论列表 end
            },collectProduct: function(relatedId) {
                console.log("collectProduct...");
                var _self = this;
                function collectProductFunc(data){
                    data = JSON.parse(data);
                    if(_self.isCollected){
                        _self.isCollected = false;
                    }else{
                        _self.isCollected = true;
                    }
                }
                setTimeout(function(){
                    var collectProductPara = {"api_u_key":getCookie("api_u_key"),"tag":"product","relatedId":relatedId};
                    if(_self.isCollected){
                        commonAjax("/api/collection/cancelCollection.xhtml",collectProductPara,"get",collectProductFunc);
                    }else{
                        commonAjax("/api/collection/addCollection.xhtml",collectProductPara,"get",collectProductFunc);
                    }
                }, 100);
            },addShoppingTrolley: function(recordId) {
                console.log("加入购物车...");
                console.log("recordId:" + recordId);
                //增加购物车 start
                function categoryAddShoppingTrolleyFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        alert("已添加到购物车");   
                    }
                }
                //增加购物车 end
                setTimeout(function(){
                    var categoryAddShoppingTrolleyPara = {"api_u_key":getCookie("api_u_key"),"tag":"product","relateId":recordId,"number":1};
                    commonAjax("/api/buycar/addbuycar.xhtml",categoryAddShoppingTrolleyPara,"get",categoryAddShoppingTrolleyFunc);
                },100);
            }
        }
}
</script>
