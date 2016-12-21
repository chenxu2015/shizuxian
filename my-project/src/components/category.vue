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
     <section class="search-box">
     	<form action="">
		    <input type="search" v-model="search_keyword" name="search" id="search" placeholder="请输入要搜索的内容" />
		    <span class="search-button" v-on:click="categoryFilterByKeyword()">搜索</span>
		</form>
     </section>
     <section class="filter-condition">
     	<div class="btn-group">
		  <div class="btn-group">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      城市
		      <span class="iconfont icon-xialajiantou-shen"></span>
		    </button>
		    <ul class="dropdown-menu" role="menu">
		      <li><a href="javascript:;" v-for="categoryCity in categoryCityDataMap.pro" v-on:click="categoryFilterByCity(categoryCity.recordId)">{{categoryCity.name}}</a></li>
		    </ul>
		  </div>
		  <div class="btn-group">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      分类
		      <span class="iconfont icon-xialajiantou-shen"></span>
		    </button>
		    <ul class="dropdown-menu" role="menu">
		      <li><a href="javascript:;" v-for="categoryObj in categoryMap.cateList" v-on:click="categoryFilterByCategory(categoryObj.recordId)">{{categoryObj.name}}</a></li>
		    </ul>
		  </div>
		  <div class="btn-group">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      渔港
		      <span class="iconfont icon-xialajiantou-shen"></span>
		    </button>
		   	<ul class="dropdown-menu" role="menu">
		      <li><a href="javascript:;" v-for="allFishPort in allFishPortParaMap.list" v-on:click="categoryFilterByFishPort(allFishPort.recordId)">{{allFishPort.name}}</a></li>
		    </ul>
		  </div>
		</div>
     </section>
     <section class="category-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="media" v-for="categoryIndex in categoryIndexMap.list">
          <router-link :to="{name: 'productDetails', params: {detailId: categoryIndex.recordId}}" style="display:block;">
			  <a class="media-left" href="javascript:;">
			    <img :src="categoryIndexMap.basePic + categoryIndex.logoUri">
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
            	var _self = this;
                //获取主页的数据 start
                function getCategoryIndexMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryIndexMap = data.data;
                    }
                }
                //获取主页的数据 end
                //获取分类数据 start
 				function getCategoryMapFunc(data){
 					console.log("分类数据：" + data);
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryMap = data.data;
                    }
                }
            	//获取分类数据 end
                //获取所有渔港数据列表 start
                function getAllFishPortParaMapFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.allFishPortParaMap = data.data;
                    }
                }
                //获取所有渔港数据列表 end
               //获取所有渔港数据列表 start
               function getCategoryCityDataFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryCityDataMap = data.data;
                    }
               }
               //获取所有渔港数据列表 end
                setTimeout(function(){
                	//获得首页数据，作为分类页面数据
                    var categoryIndexMapPara = {"pageNo":0,"maxNum":12};
                    commonAjax("/api/index.xhtml",categoryIndexMapPara,"get",getCategoryIndexMapFunc);
                    //获取城市列表
                    var indexCityDataPara = {};
                    commonAjax("/api/getCityData.xhtml",indexCityDataPara,"get",getCategoryCityDataFunc);
                    //获取分类
                    var categoryMapPara = {};
                    commonAjax("/api/getprocateData.xhtml",categoryMapPara,"get",getCategoryMapFunc);
                    //获取鱼港里码表
                    var allFishPortPara = {};
                    commonAjax("/api/getAllFishPort.xhtml",allFishPortPara,"get",getAllFishPortParaMapFunc);
                }, 100);
            },
            loadMore: function() {
                console.log("loadMore category...");
                this.busy = true;
            },categoryFilterByCity: function(city){
            	console.log("city:" + city);
                var _self = this;
            	//获取主页的数据 筛选城市 start
                function getCategoryIndexMapByCityFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryIndexMap = data.data;
                    }else{
                       _self.categoryIndexMap = []; 
                    }
                }
                //获取主页的数据  筛选城市 end
            	//获得首页数据，作为分类页面数据，并且用城市筛选
            	setTimeout(function(){
	                var categoryIndexMapByCityPara = {"cityId":city};
	                commonAjax("/api/index.xhtml",categoryIndexMapByCityPara,"get",getCategoryIndexMapByCityFunc);
            	},100);
            },categoryFilterByCategory: function(category){
            	console.log("category:" + category);
                var _self = this;
            	//获取主页的数据 筛选城市 start
                function getCategoryIndexMapByCategoryFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryIndexMap = data.data;
                    }else{
                        _self.categoryIndexMap = [];
                    }
                }
                //获取主页的数据  筛选城市 end
            	//获得首页数据，作为分类页面数据，并且用城市筛选
            	setTimeout(function(){
	                var categoryIndexMapByCategoryPara = {"proCateId":category};
	                commonAjax("/api/index.xhtml",categoryIndexMapByCategoryPara,"get",getCategoryIndexMapByCategoryFunc);
            	},100);
            },categoryFilterByFishPort: function(fishPort){
            	console.log("FishPort:" + fishPort);
            	//获取主页的数据 筛选城市 start
                var _self = this;
                function getCategoryIndexMapByFishPortFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryIndexMap = data.data;
                    }
                }
                //获取主页的数据  筛选城市 end
            	//获得首页数据，作为分类页面数据，并且用城市筛选
            	setTimeout(function(){
	                var categoryIndexMapByFishPortPara = {"cityId":0};
	                commonAjax("/api/index.xhtml",categoryIndexMapByFishPortPara,"get",getCategoryIndexMapByFishPortFunc);
            	},100);
            },categoryFilterByKeyword:function(){
                    console.log("search_keyword"+this.search_keyword);
                    //获取主页的数据 根据关键字 start
                    var _self = this;
                    function getCategoryIndexMapByKeywordFunc(data){
                        data = JSON.parse(data);
                        if(data.isSuccess){
                            _self.categoryIndexMap = data.data;
                        }else{
                            _self.categoryIndexMap = [];
                        }
                    }
                    //获取主页的数据  根据关键字 end
                    //获得首页数据，作为分类页面数据，根据关键字
                    setTimeout(function(){
                        var getCategoryIndexMapByKeywordPara = {"searchKey":_self.search_keyword};
                        commonAjax("/api/index.xhtml",getCategoryIndexMapByKeywordPara,"get",getCategoryIndexMapByKeywordFunc);
                    },100);
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


