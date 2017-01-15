<style lang="scss" scoped>
$bgcolor:#51B951;
.recharge-title{
	background-color:$bgcolor;
	padding:12px;
    color:#fff;
    text-align:center;
    font-size:16px;
}
.recharge-box-title{
    padding:20px 0;
    border-bottom:1px solid #dcdddd;
    p{
        font-size:20px;
        color:$bgcolor;
        text-align: center;
    }
    div{
        text-align: center;
        margin-top:6px;
        span{
            color:red;
        }
    }
}
.recharge-list{
    >li{
        text-align:center;
        padding:12px;
        margin-top:20px;
        border-bottom:1px solid #dcdddd;
        border-top:1px solid #dcdddd;
        span{
            color:red;
            margin-right:10px;
        }
        button{
            margin-left:10px;
        }
    }
}
</style>
<template>
  <div id="recharge">
     <section class="recharge-title">
     	支付页面
     </section>
     <section style="text-align:center;margin:20px 0;">
         <button type="button" class="btn btn-success">确认支付</button>
     </section>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default {
    	data() {
            return {
                discountList:[],
                memberInfo:{}
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
            	  console.log("获取充多少送多少列表");
                //获取首页限时推荐 end
                setTimeout(function(){
                    var getAllChargeDiscountPara = {};
                    commonAjax("/api/getAllChargeDiscount.xhtml",getAllChargeDiscountPara,"get",function(data){
                        data = JSON.parse(data);
                        if(data.isSuccess){
                            _self.discountList = data.data.list;
                        }
                    });
                }, 100);
                setTimeout(function(){
                    //获取验证码 start
                    var loginMemberInfoPara = {"api_u_key": getCookie("api_u_key")};
                    commonAjax("/api/getLoginMemberInfo.xhtml",loginMemberInfoPara,"get",function(){
                        data = JSON.parse(data);
                        if(data.code == "3000"){
                            goIndex();
                        }else{
                            if(data.isSuccess){
                                _self.memberInfo = data.data;
                                setCookie("recordId", _self.memberInfo.member.recordId);
                            }
                        }
                    });
                }, 200);
            },payCharger:function(chageDisCountId){
                //获取首页限时推荐 end
                setTimeout(function(){
                    var payChargerPara = {"api_u_key": getCookie("api_u_key"),"chageDisCountId":chageDisCountId};
                    commonAjax("/api/order/payCharger.xhtml",payChargerPara,"get",function(data){
                        data = JSON.parse(data);
                        if(data.isSuccess){
                           
                        }
                    });
                }, 100);
            }
        }
}
</script>


