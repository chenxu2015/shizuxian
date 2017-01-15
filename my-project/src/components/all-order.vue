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
	padding:0;
	border-bottom:1px solid #dcdddd;
	button{
		border:0;
		border-radius: 0;
		font-size:16px;
	}
	.iconfont{
		color:#ccc;
	}
	.open{
	    .iconfont{
			color:$bgcolor;
		}
	    button{
	    	box-shadow: none;
	    	background-color: #eee;
	    }
	}
	
}
.category-list-box{
	padding-bottom:58px;
	.media{
		img{
			width:60px;
			height:60px;
		}
		margin-top:16px;
		padding:0 0px 0px 0px;
		border-bottom:4px solid #dcdddd;
		position:relative;
		.icon-shopping-add{
			color:$bgcolor;
			font-size:26px;
			position:absolute;
			bottom:4px;
			right:20px;
		}
		.order-action-box{
			font-size:16px;
			padding:0 0 8px 0;
			border-bottom:1px solid #dcdddd;
			padding:0 10px 6px;
			color:$bgcolor;
			.order-num-title{
			}
			.order-num{
				padding-left:34px;
			}
			.order-status{
				float:right;
				color:red;
			}
		}
		.pay-box{
			position:absolute;
			right:10px;
			bottom:0px;
			padding:6px;
			button{
				padding:6px 12px;
				border-radius:6px;
				border:1px solid #dcdddd;
				background-color:#eee;
			}
			.go-pay{
				color:red;
				font-weight: bold;
			}
			.cancel-pay{
				color:#888;
			}
		}
		.product-detail-box{
			padding:10px 0 10px 10px;
			position:relative;
			border-bottom:1px solid #dcdddd;
		}
		.product-detail-box:last-child{
			border-bottom:0;
		}
	}
}
</style>
<template>
  <div id="secondcomponent">
    <section class="search-box">
      全部订单
    </section>
    <section class="category-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
    	<!-- 订单列表 start -->
        <div class="media" v-for="orderObj in orderList">
          <!--订单号 start-->
          <div class="order-action-box">
          	<span class="order-num-title">订单号</span>
          	<span class="order-num">{{orderObj.tradeNo}}</span>
          	<span class="order-status" v-if="orderObj.status == 0" style="color:red;">待支付</span>
          	<span class="order-status" v-if="orderObj.status == 100" style="color:green;">已支付</span>
          </div>
          <!--订单号 end-->
          <!--产品详情 start-->
          <section class="product-detail-box" v-for="(infoObj,key) in orderObj.otherInfo">
			  <a class="media-left" href="javascript:;">
			    <img :src="productLogoPrefix + proMap[orderObj.recordId][key].logoUri" />
			  </a>
			  <div class="media-body">
			    <h4 class="media-heading">
			    	<router-link :to="{name: 'productDetails', params: {detailId: proMap[orderObj.recordId][key].recordId}}">
			    		{{proMap[orderObj.recordId][key].title}}
			    	</router-link>
			    </h4>
			    <span style="color:red;">￥{{proMap[orderObj.recordId][key].price}} X {{infoObj}}</span>
			  </div>
			  <div class="pay-box">
				<!-- <button class="go-pay" type="button">去支付</button> -->
				<router-link :to="{name: 'evaluateDetails', params: {detailId: proMap[orderObj.recordId][key].recordId}}">
					<button class="cancel-pay" type="button" >评价</button>
	            </router-link>
			  </div>
          </section>
		  <!--产品详情 end-->
		  <!--共计多少钱 start-->
		  <section style="padding:10px;text-align:right;">
		  	共计：<span style="color:red;">￥{{orderObj.totalPrice}}</span>元
		  </section>
		  <!--共计多少钱 start-->
		</div>
		<!-- 订单列表 end -->
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
            	orderList:[],
            	proMap:{},
            	productLogoPrefix:"http://likezu-test.oss-cn-shanghai.aliyuncs.com/"
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
                var listMyOrderPara = {"api_u_key":getCookie("api_u_key")};
                commonAjax("/api/order/listMyOrder.xhtml",listMyOrderPara,"post",function(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                    	_self.proMap = data.data.proMap;
                        _self.orderList = data.data.orderList;
                        for(var i in _self.orderList){
                        	_self.orderList[i].otherInfo = JSON.parse(_self.orderList[i].otherInfo);

                        	_self.orderList[i].totalPrice = 0;
                        	for (var key in _self.orderList[i].otherInfo){
                        		var productNum = _self.orderList[i].otherInfo[key];
                        		var productPrice = _self.proMap[_self.orderList[i].recordId][key].price;
                        		_self.orderList[i].totalPrice = (productNum * productPrice) + _self.orderList[i].totalPrice;
                        	}
                        	console.log("proTotalPrice:" + _self.orderList[i].totalPrice);
                        }
                        //临时方案，删除数据不正常的
                        // var orderListTemp = [];
                        // for(var i in _self.orderList){
                        // 	if(_self.orderList[i].tradeNo == "117010410025794495" || _self.orderList[i].tradeNo == "117010409411566672"){
                        // 		orderListTemp.push(_self.orderList[i]);
                        // 		console.log(_self.orderList[i].tradeNo);
                        // 	}
                        // }
                        // _self.orderList = orderListTemp;
                        //临时方案
                    }
                });
            },
            loadMore: function() {
                console.log("loadMore category...");
                this.busy = true;
            }
        }
}
</script>


