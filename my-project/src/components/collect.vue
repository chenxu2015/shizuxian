<style lang="scss" scoped>
$bgcolor:#51B951;
.search-box{
	background-color:$bgcolor;
	padding:12px;
	input{
	    padding: 6px 12px;
	    width: calc(100% - 60px);
	    border: 1px solid #51D851;
	    border-radius: 12px;
	    background-color: rgba(255,255,255,0.8);
	}
	.search-button{
		color:#fff;
		font-size:18px;
		margin-left:12px;
	}
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
		padding:0 40px 16px 16px;
		border-bottom:1px solid #dcdddd;
		position:relative;
		.icon-shopping-add{
			color:$bgcolor;
			font-size:26px;
			position:absolute;
			bottom:4px;
			right:14px;
		}
	}
}
</style>
<template>
  <div id="secondcomponent">
     <section class="search-box" style="color:#fff;text-align:center;font-size:16px;">
     	我的收藏
     </section>
     <section class="category-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="media" v-for="categoryIndex in categoryIndexMap">
          <router-link :to="{name: 'productDetails', params: {detailId: categoryIndex.recordId}}" style="display:block;">
			  <a class="media-left" href="javascript:;">
			    <img :src="'http://likezu-test.oss-cn-shanghai.aliyuncs.com/' + categoryIndex.logoUri">
			  </a>
			  <div class="media-body">
			    <h4 class="media-heading">
			    	{{categoryIndex.title}}
			    </h4>
			    <span style="color:red;">{{categoryIndex.price}}</span>
			  </div>
          </router-link>
		  <i class="iconfont icon-shopping-add" v-on:click="shoppingAddTrolley(categoryIndex.recordId)"></i>
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
                categoryIndexMap:{},
                categoryCityDataMap:{},
                allFishPortParaMap:{},
                categoryMap:{},
                search_keyword:""
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
            	console.log(123);
            	var _self = this;
                //获取主页的数据 start
                function getCategoryIndexMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryIndexMap = data.data.result;
                    }
                }
                //获取主页的数据 end
                setTimeout(function(){
                	console.log(1233);
                	//获得首页数据，作为分类页面数据
                	console.log("---"+getCookie("api_u_key"));
                    var categoryIndexMapPara = {"api_u_key":getCookie("api_u_key"),"pageNo":0,"maxNum":100,"tag":"product"};
                    commonAjax("/api/collection/ListCollection.xhtml",categoryIndexMapPara,"get",getCategoryIndexMapFunc);
                }, 100);
            },
            loadMore: function() {
                console.log("loadMore category...");
                this.busy = true;
            },shoppingAddTrolley:function(recordId){
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


