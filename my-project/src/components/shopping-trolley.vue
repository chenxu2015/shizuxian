<style lang="scss" scoped>
$bgcolor:#51B951;
.search-box{
	background-color:#51B951;
	padding:12px;
	text-align: center;
	font-size:16px;
	color:#fff;
}
.filter-condition{
	padding:16px;
	border-bottom:1px solid #dcdddd;
}
.category-list-box{
	padding-bottom:58px;
	.media{
		position:relative;
		margin-top:16px;
		padding:0 16px 16px 16px;
		border-bottom:1px solid #dcdddd;
		img{
			width:80px;
			height:80px;
		}
		.action-box{
			position: absolute;
		    bottom: 4px;
		    right: 14px;
		    span{
		    	font-size:18px;
		    }
		    i{
		    	font-size:24px;
		    }
		    .icon-yuanquanjianhao{
		    	color:#bbb;
		    }
		    .icon-yuanquanjiahao{
		    	color:$bgcolor;
		    }
		}
		.fuxuankuang-box{
			height:70px;
			line-height: 70px;
			i{
				font-size:24px;
			}
			.icon-fuxuankuang{
				color:$bgcolor;
			}
			.icon-yuanquan{
				color:#bbb;
			}
		}
	}
	.statistics-box{
		margin: 0;
        padding-bottom: 0;
        position: fixed;
        bottom: 57px;
        background-color: #F1EEEE;
        width: 100%;
    	.all-checked{
    		height:70px;line-height:70px;font-size:22px;border-right:1px solid #bbb;
    	}
    	.price-box{
			padding-left:10px;
			.money{
				color:red;
			}
			.discount{
				font-size:12px;
				margin-top:6px;
			}
			.count,.after-discount{
				font-size:16px;
				font-weight: bold;
			}
		}
		.settle-accounts-box{
			background-color:$bgcolor;
			width:80px;
			height:50px;
			line-height:50px;
			position:absolute;
			bottom:0;
			right:0;
			color:#fff;
			text-align:center;
		}
	}

}
</style>
<template>
  <div id="firstcomponent" style="padding-bottom:75px;">
    <section class="search-box">
        购物车
    </section>
    <section class="category-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <!--media start-->
        <div class="media" v-for="(buycarObj, index) in buycarListMap.list">
            <section>
                <div class="media-left fuxuankuang-box"  v-on:click="checkedBuycar(buycarObj.recordId,index,buycarObj.status)">
                    <i class="iconfont" v-bind:class="{ 'icon-fuxuankuang': buycarObj.status == 'checked', 'icon-yuanquan': buycarObj.status != 'checked'}"></i>
                </div>
                <a class="media-left" href="#">
                     <img :src="buycarListMap.basePic + buycarListMap.pmap[buycarObj.relateId].logoUri" />
                </a>
                <div class="media-body">
                    <router-link :to="{name: 'productDetails', params: {detailId: buycarListMap.pmap[buycarObj.relateId].recordId}}" class="media-heading" style="display:block;">
    		    	    {{buycarListMap.pmap[buycarObj.relateId].title}}
    		        </router-link>
                    <span style="color:red;">{{buycarListMap.pmap[buycarObj.relateId].price}}</span>
                </div>
            </section>
            <section class="action-box">
                <i class="iconfont icon-yuanquanjianhao" v-on:click="reduceBuycar(index)"></i>
                <span>{{buycarObj.number}}</span>
                <i class="iconfont icon-yuanquanjiahao" v-on:click="addBuycar(index)"></i>
            </section>
        </div>
        <!--media end-->
        <div class="media statistics-box">
            <div class="media-left fuxuankuang-box">
                <i class="iconfont icon-fuxuankuang" v-on:click="allCheckedBuycar()"></i>
            </div>
            <a class="media-left all-checked" href="javascript:;" v-on:click="allCheckedBuycar()">
                全选
            </a>
            <div class="media-body  price-box">
                <div class="discount"><span>优惠：</span><span class="money">{{productPriceObj.preferentialPrice}}</span></div>
                <div class="count"><span>商品总额：</span><span class="money">{{productPriceObj.productTotalPrice}}</span></div>
                <div class="after-discount"><span>折后总价：</span><span class="money">{{productPriceObj.saleTotalPrice}}</span></div>
            </div>
            <div class="settle-accounts-box" v-on:click="payBuycar()">结算</div>
        </div>
    </section>
</div>

</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import VueInfiniteScroll from 'vue-infinite-scroll'
Vue.use(VueInfiniteScroll)
export default {
    	data() {
            return {
                buycarListMap:{},
                productPriceObj:{}
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
                //获得购物车列表 start
                function getBuycarListMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        var buycarListMap = data.data;
                        for(var i in buycarListMap.list){
                            console.log(buycarListMap.pmap[buycarListMap.list[i].relateId]);
                            if(!buycarListMap.pmap[buycarListMap.list[i].relateId]){
                                buycarListMap.list.splice(i,1);
                            }
                        }
                        for(var i in buycarListMap.list){
                            console.log(buycarListMap.pmap[buycarListMap.list[i].relateId]);
                            if(!buycarListMap.pmap[buycarListMap.list[i].relateId]){
                                buycarListMap.list.splice(i,1);
                            }
                        }
                        _self.buycarListMap = buycarListMap;
                        _self.calculateBuycarMoney();
                    }
                }
                //获得购物车列表 end
                setTimeout(function(){
                    //获得购物车列表
                    var buycarListMapPara = {"api_u_key":getCookie("api_u_key"),"pageNo":0,"maxPage":12};
                    commonAjax("/api/buycar/getmybuycar.xhtml",buycarListMapPara,"get",getBuycarListMapFunc);
                }, 100);
            },
            loadMore: function() {
                console.log("loadMore category...");
                this.busy = true;
            },calculateBuycarMoney: function(){
                //计算统计优惠价格
                console.log("calculateBuycarMoney");
                var _self = this;
                var productTotalPrice = 0;
                for(var i in _self.buycarListMap.list){
                    if(!_self.buycarListMap.pmap[_self.buycarListMap.list[i].relateId]){
                        _self.buycarListMap.list.splice(i,1);
                    }
                    productTotalPrice+=(_self.buycarListMap.pmap[_self.buycarListMap.list[i].relateId].price * _self.buycarListMap.list[i].number)
                }
                _self.productPriceObj.productTotalPrice = productTotalPrice.toFixed(1);
                _self.productPriceObj.saleTotalPrice = (productTotalPrice * 0.8).toFixed(1);
                _self.productPriceObj.preferentialPrice = (_self.productPriceObj.productTotalPrice - _self.productPriceObj.saleTotalPrice).toFixed(1);
            },addBuycar: function(index){
                var _self = this;
                var buycarObj = _self.buycarListMap.list[index];
                var recordId = buycarObj.recordId;
                var number = buycarObj.number;
                 //增加货物到购物车 start
                function addbuycarMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        buycarObj.number = (number + 1);
                        _self.calculateBuycarMoney();
                    }
                }
                //增加货物到购物车 end
                setTimeout(function(){
                    //增加货物到购物车
                    var addbuycarMapPara = {"api_u_key":getCookie("api_u_key"),"tag":"product","relateId":recordId,"number":1};
                    commonAjax("/api/buycar/addbuycar.xhtml",addbuycarMapPara,"get",addbuycarMapFunc);
                }, 100);
            },reduceBuycar: function(index){
                var _self = this;
                var buycarObj = _self.buycarListMap.list[index];
                var recordId = buycarObj.recordId;
                var number = buycarObj.number;
                 //增加货物到购物车 start
                function reducebuycarMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        buycarObj.number = (number - 1);
                        _self.calculateBuycarMoney();
                    }
                }
                //增加货物到购物车 end
                if(number >= 1){
                    setTimeout(function(){
                        //增加货物到购物车
                        var reducebuycarMapPara = {"api_u_key":getCookie("api_u_key"),"tag":_self.buycarListMap.list[index].tag,"relateId":recordId,"number":(number - 1)};
                        commonAjax("/api/buycar/updatebuycar.xhtml",reducebuycarMapPara,"get",reducebuycarMapFunc);
                    }, 100);
                }
            },checkedBuycar: function(relateId,index,status){
                console.log("checkedBuycar" + relateId);
                 console.log("index" + index);
                  console.log("status" + status);   
                var _self = this;
                console.log("--:" +_self.buycarListMap);
                 //选中购物车 start
                function checkedBuycarMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                         _self.calculateBuycarMoney();
                    }
                }

                //选中购物车 end
                setTimeout(function(){
                    var mystatus = status == "checked" ? "unchecked" : "checked";
                    console.log("mystatus:" + mystatus);
                    console.log("_self.buycarListMap:" + _self.buycarListMap);
                    console.log("_self.buycarListMap.list:" + _self.buycarListMap.list);
                    _self.buycarListMap.list[index].status = mystatus;
                    //选中购物车
                    var checkedBuycarMapPara = {"api_u_key":getCookie("api_u_key"),"recordId":relateId,"status":mystatus,"number":_self.buycarListMap.list[index].number};
                    commonAjax("/api/buycar/updatebuycar.xhtml",checkedBuycarMapPara,"get",checkedBuycarMapFunc);
                }, 100);
            },allCheckedBuycar: function(){
                console.log("allCheckedBuycar");
                var _self = this;
                 //全选购物车 start
                function allCheckedBuycarMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        for(var i in _self.buycarListMap.list){
                            _self.buycarListMap.list[i].status = "checked";
                        }
                        _self.calculateBuycarMoney();
                    }
                }
                //全选购物车 end
                setTimeout(function(){
                    //增加货物到购物车
                    var allCheckedBuycarMapPara = {"api_u_key":getCookie("api_u_key"),"status":"Y"};
                    commonAjax("/api/buycar/checkAll.xhtml",allCheckedBuycarMapPara,"get",allCheckedBuycarMapFunc);
                }, 100);
            },goProductDetail: function(){
                console.log("goProductDetail");
                var _self = this;
                 //全选购物车 start
                function allCheckedBuycarMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.buycarListMap = data.data;
                         _self.calculateBuycarMoney();
                    }
                }
                //全选购物车 end
                setTimeout(function(){
                    //增加货物到购物车
                    var allCheckedBuycarMapPara = {"api_u_key":0,"relateId":12,"status":3,"number":5};
                    commonAjax("/api/buycar/updatebuycar.xhtml",allCheckedBuycarMapPara,"get",allCheckedBuycarMapFunc);
                }, 100);
            },payBuycar: function(){
                console.log("payBuycar");
                var _self = this;
                 //全选购物车 start
                function payBuyCarMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        
                    }
                }
                //全选购物车 end
                setTimeout(function(){
                    //增加货物到购物车
                    var payBuyCarMapPara = {};
                    commonAjax("/api/order/payBuyCar.xhtml",payBuyCarMapPara,"get",payBuyCarMapFunc);
                }, 100);
            },alertHandleClick: function() {
              console.log(12);
            }
        }
}
</script>


