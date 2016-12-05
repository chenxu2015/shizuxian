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
		padding:0 16px 16px 16px;
		border-bottom:1px solid #dcdddd;
		position:relative;
		.icon-shopping-add{
			color:$bgcolor;
			font-size:26px;
			position:absolute;
			bottom:4px;
			right:20px;
		}
	}
}
</style>
<template>
  <div id="secondcomponent">
     <section class="search-box">
     	<form action="">
		    <input type="search" name="search" id="search" placeholder="请输入要搜索的内容" />
		    <span class="search-button">搜索</span>
		</form>
     </section>
     <section class="filter-condition">
     	<div class="btn-group">
		  <div class="btn-group">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      全部
		      <span class="iconfont icon-xialajiantou-shen"></span>
		    </button>
		    <ul class="dropdown-menu" role="menu">
		      <li><a href="#">海贝类</a></li>
		      <li><a href="#">鱼类</a></li>
		      <li><a href="#">贝壳类</a></li>
		      <li><a href="#">虾类</a></li>
		    </ul>
		  </div>
		  <div class="btn-group">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      销量排序
		      <span class="iconfont icon-xialajiantou-shen"></span>
		    </button>
		    <!-- <ul class="dropdown-menu" role="menu">
		      <li><a href="#">Dropdown link</a></li>
		      <li><a href="#">Dropdown link</a></li>
		    </ul> -->
		  </div>
		  <div class="btn-group">
		    <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
		      价格排序
		      <span class="iconfont icon-xialajiantou-shen"></span>
		    </button>
		   <!--  <ul class="dropdown-menu" role="menu">
		      <li><a href="#">Dropdown link</a></li>
		      <li><a href="#">Dropdown link</a></li>
		    </ul> -->
		  </div>
		</div>
     </section>
     <section class="category-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="media" v-for="categoryIndex in categoryIndexMap.list">
		  <a class="media-left" href="#">
		    <img :src="categoryIndexMap.basePic + categoryIndex.logoUri">
		  </a>
		  <div class="media-body">
		    <h4 class="media-heading">
		    	{{categoryIndex.title}}
		    </h4>
		    <span style="color:red;">{{categoryIndex.price}}</span>
		  </div>
		  <i class="iconfont icon-shopping-add"></i>
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
                categoryIndexMap:{}
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
            	//获取分类数据 start
 				function getCategoryMap(data){
 					console.log("分类数据：" + data);
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryMap = data.data;
                    }
                }
            	//获取分类数据 end
                //获取主页的数据 start
                function getCategoryIndexMap(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        _self.categoryIndexMap = data.data;
                    }
                }
                //获取主页的数据 end
                setTimeout(function(){
                    var categoryIndexMapPara = {"pageNo":0,"maxNum":12};
                    commonAjax("/api/index.xhtml",categoryIndexMapPara,"get",getCategoryIndexMap);
                    var getCategoryMapPara = {};
                    commonAjax("/api/getprocateData.xhtml",getCategoryMapPara,"get",getCategoryMap);
                }, 100);
            },
            loadMore: function() {
                console.log("loadMore category...");
                this.busy = true;
            }
        }
}
</script>


