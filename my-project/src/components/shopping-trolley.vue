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
    	position:relative;
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
  <div id="firstcomponent">
    <section class="search-box">
        购物车
    </section>
    <section class="category-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <!--media start-->
        <div class="media">
            <div class="media-left fuxuankuang-box">
                <i class="iconfont icon-fuxuankuang"></i>
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
            <section class="action-box">
                <i class="iconfont icon-yuanquanjianhao"></i>
                <span>2</span>
                <i class="iconfont icon-yuanquanjiahao"></i>
            </section>
        </div>
        <!--media end-->
        <div class="media">
            <div class="media-left fuxuankuang-box">
                <i class="iconfont icon-yuanquan"></i>
            </div>
            <a class="media-left" href="#">
                <img src="../assets/img/meinv2.jpg" alt="../assets/img/meinv2.jpg">
            </a>
            <div class="media-body">
                <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
                <span style="color:red;">$5.95</span>
            </div>
            <section class="action-box">
                <i class="iconfont icon-yuanquanjianhao"></i>
                <span>2</span>
                <i class="iconfont icon-yuanquanjiahao"></i>
            </section>
        </div>
        <div class="media">
            <div class="media-left fuxuankuang-box">
                <i class="iconfont icon-fuxuankuang"></i>
            </div>
            <a class="media-left" href="#">
                <img src="../assets/img/meinv4.jpg" alt="../assets/img/meinv2.jpg">
            </a>
            <div class="media-body">
                <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
                <span style="color:red;">$5.95</span>
            </div>
            <section class="action-box">
                <i class="iconfont icon-yuanquanjianhao"></i>
                <span>2</span>
                <i class="iconfont icon-yuanquanjiahao"></i>
            </section>
        </div>
        <div class="media">
            <div class="media-left fuxuankuang-box">
                <i class="iconfont icon-fuxuankuang"></i>
            </div>
            <a class="media-left" href="#">
                <img src="../assets/img/meinv4.jpg" alt="../assets/img/meinv2.jpg">
            </a>
            <div class="media-body">
                <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
                <span style="color:red;">$5.95</span>
            </div>
            <section class="action-box">
                <i class="iconfont icon-yuanquanjianhao"></i>
                <span>2</span>
                <i class="iconfont icon-yuanquanjiahao"></i>
            </section>
        </div>
        <div class="media">
            <div class="media-left fuxuankuang-box">
                <i class="iconfont icon-yuanquan"></i>
            </div>
            <a class="media-left" href="#">
                <img src="../assets/img/meinv6.jpg" alt="../assets/img/meinv2.jpg">
            </a>
            <div class="media-body">
                <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
                <span style="color:red;">$5.95</span>
            </div>
            <section class="action-box">
                <i class="iconfont icon-yuanquanjianhao"></i>
                <span>2</span>
                <i class="iconfont icon-yuanquanjiahao"></i>
            </section>
        </div>
        <div class="media">
            <div class="media-left fuxuankuang-box">
                <i class="iconfont icon-fuxuankuang"></i>
            </div>
            <a class="media-left" href="#">
                <img src="../assets/img/meinv2.jpg" alt="../assets/img/meinv2.jpg">
            </a>
            <div class="media-body">
                <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
                <span style="color:red;">$5.95</span>
            </div>
            <section class="action-box">
                <i class="iconfont icon-yuanquanjianhao"></i>
                <span>2</span>
                <i class="iconfont icon-yuanquanjiahao"></i>
            </section>
        </div>
        <div class="media statistics-box">
            <div class="media-left fuxuankuang-box">
                <i class="iconfont icon-fuxuankuang"></i>
            </div>
            <a class="media-left all-checked" href="#">
                全选
            </a>
            <div class="media-body  price-box">
                <div class="discount"><span>优惠：</span><span class="money">22.2</span></div>
                <div class="count"><span>商品总额：</span><span class="money">22.2</span></div>
                <div class="after-discount"><span>折后总价：</span><span class="money">22.2</span></div>
            </div>
            <div class="settle-accounts-box">结算</div>
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


