<style lang="scss" scoped>
$bgcolor:#51B951;
#enterprise-components{
	background-color:#eee;
	width:100%;
	height:10000px;
	padding:50% 30px;
	line-height:30px;
	font-size: 18px;
	.explain-box{
		text-align: center;
		color:#999;
	}
	.apply-for-btn{
		position:fixed;
		bottom:59px;
		left:0;
		background-color:#ddd;
		width:100%;
		height:70px;
		text-align:center;
		button{
			padding:6px 20%;
			margin-top:20px;
		}
	}
}
</style>
<template>
  <div id="enterprise-components">
     <section class="explain-box">
     	成为企业客户申请，我们会进行审核，审核成功就能成为企业用户。
     </section>
     <section class="apply-for-btn">
     	<button class="btn btn-success" v-on:click="applyForBtn()">申请成为企业用户</button>
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
            },applyForBtn(){
            	var _self = this;
            	//申请成为企业用户 start
                function applyForFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        alert("申请成功");
                        //申请成功
                        _self.$router.push({ path: '/content/home' });
                    }
                }
                //申请成为企业用户 end
                setTimeout(function(){
                    var applyForPara = {"api_u_key":getCookie("api_u_key")};
                    commonAjax("/api/applyCorpUser.xhtml",applyForPara,"post",applyForFunc);
                }, 100);
            }
        }
}
</script>


