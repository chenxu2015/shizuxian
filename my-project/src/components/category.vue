<style lang="scss">
.search-box{
	background-color:green;
	padding:12px;
	input{
		padding:6px 12px;
		width:calc(100% - 60px);
		border:1px solid #51D851;
		border-radius:12px;
	}
	.search-button{
		color:#fff;
		font-size:18px;
		margin-left:12px;
	}
}
.filter-condition{
	padding:16px;
	border-bottom:1px solid #dcdddd;
}
.category-list-box{
	.media{
		img{
			width:80px;
			height:80px;
		}
		margin-top:16px;
		padding:0 16px 16px 16px;
		border-bottom:1px solid #dcdddd;
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
     	搜索条件
     </section>
     <section class="category-list-box" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <div class="media">
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv1.jpg" alt="../assets/img/meinv1.jpg">
		  </a>
		  <div class="media-body">
		    <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		</div>
		<div class="media">
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv2.jpg" alt="../assets/img/meinv2.jpg">
		  </a>
		  <div class="media-body">
		   <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		</div>
		<div class="media">
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv2.jpg" alt="../assets/img/meinv2.jpg">
		  </a>
		  <div class="media-body">
		   <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		</div>
		<div class="media">
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv2.jpg" alt="../assets/img/meinv2.jpg">
		  </a>
		  <div class="media-body">
		   <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
		  </div>
		</div>
		<div class="media">
		  <a class="media-left" href="#">
		    <img src="../assets/img/meinv2.jpg" alt="../assets/img/meinv2.jpg">
		  </a>
		  <div class="media-body">
		   <h4 class="media-heading">
		    	红彩椒250g（250g/份）
		    </h4>
		    <span style="color:red;">$5.95</span>
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


