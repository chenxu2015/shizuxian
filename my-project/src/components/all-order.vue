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
			width:80px;
			height:80px;
		}
		margin-top:16px;
		padding:0 16px 46px 16px;
		border-bottom:1px solid #dcdddd;
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
	}
}
</style>
<template>
  <div id="secondcomponent">
    <section class="search-box">
      全部订单
    </section>
    <section class="category-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="media">
          <div class="order-action-box">
          	<span class="order-num-title">订单号</span>
          	<span class="order-num">S909405603043</span>
          	<span class="order-status">未支付</span>
          </div>
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv1.jpg" alt="../assets/img/meinv1.jpg">
		  </a>
		  <div class="media-body">
		    <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		  <div class="pay-box">
			<button class="go-pay" type="button">去支付</button>
			<button class="cancel-pay" type="button">取消订单</button>
		  </div>
		</div>
		 <div class="media">
          <div class="order-action-box">
          	<span class="order-num-title">订单号</span>
          	<span class="order-num">S909405603043</span>
          	<span class="order-status">未支付</span>
          </div>
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv1.jpg" alt="../assets/img/meinv1.jpg">
		  </a>
		  <div class="media-body">
		    <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		  <div class="pay-box">
			<button class="go-pay" type="button">去支付</button>
			<button class="cancel-pay" type="button">取消订单</button>
		  </div>
		</div>
		<div class="media">
          <div class="order-action-box">
          	<span class="order-num-title">订单号</span>
          	<span class="order-num">S909405603043</span>
          	<span class="order-status">未支付</span>
          </div>
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv1.jpg" alt="../assets/img/meinv1.jpg">
		  </a>
		  <div class="media-body">
		    <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		  <div class="pay-box">
			<button class="go-pay" type="button">去支付</button>
			<button class="cancel-pay" type="button">取消订单</button>
		  </div>
		</div>
		 <div class="media">
          <div class="order-action-box">
          	<span class="order-num-title">订单号</span>
          	<span class="order-num">S909405603043</span>
          	<span class="order-status">未支付</span>
          </div>
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv1.jpg" alt="../assets/img/meinv1.jpg">
		  </a>
		  <div class="media-body">
		    <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		  <div class="pay-box">
			<button class="go-pay" type="button">去支付</button>
			<button class="cancel-pay" type="button">取消订单</button>
		  </div>
		</div>
		<div class="media">
          <div class="order-action-box">
          	<span class="order-num-title">订单号</span>
          	<span class="order-num">S909405603043</span>
          	<span class="order-status">未支付</span>
          </div>
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv1.jpg" alt="../assets/img/meinv1.jpg">
		  </a>
		  <div class="media-body">
		    <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		  <div class="pay-box">
			<button class="go-pay" type="button">去支付</button>
			<button class="cancel-pay" type="button">取消订单</button>
		  </div>
		</div>
		 <div class="media">
          <div class="order-action-box">
          	<span class="order-num-title">订单号</span>
          	<span class="order-num">S909405603043</span>
          	<span class="order-status">未支付</span>
          </div>
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv1.jpg" alt="../assets/img/meinv1.jpg">
		  </a>
		  <div class="media-body">
		    <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		  <div class="pay-box">
			<button class="go-pay" type="button">去支付</button>
			<button class="cancel-pay" type="button">取消订单</button>
		  </div>
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
                
                
            },
            loadMore: function() {
                console.log("loadMore category...");
                this.busy = true;
            }
        }
}
</script>


