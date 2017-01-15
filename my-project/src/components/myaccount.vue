<template>
    <div class="account-box">
        <header class="account-title">
            我的账户
        </header>
        <section class="user-info clearfix">
            <div class="user-head">
                <img :src="memberInfo.basePic + memberInfo.member.headUri" />
            </div>
            <div class="user-style">
                <h4 class="h4 qq-user">QQ用户</h4>
                <h5 class="h5 ordinary-user">{{memberInfo.member.userName}}</h5>
            </div>
        </section>
        <section class="account-balance clearfix">
                <router-link :to="{path: '/content/recharge'}">
                    <div class="Recharge-balance col-xs-6 col-md-6">
                            <div class="balance-item clearfix">
                                <div class="balance-icon">
                                    <img src="../assets/img/recharge-balance.png" height="72" width="72" />
                                </div>
                                <div class="balance-info">
                                    <p class="balance-quantity" v-show="memberInfo.amount">￥{{memberInfo.amount}}</p>
                                    <p class="balance-quantity" v-show="!memberInfo.amount">￥0</p>
                                    <p>充值余额</p>
                                </div>
                            </div>
                    </div>
                </router-link>
            <div class="purse-balance col-xs-6 col-md-6">
                <div class="balance-item clearfix purse">
                    <!-- <div class="balance-icon">
                        <img src="../assets/img/purse-balance.png" height="72" width="72" />
                    </div> -->
                    <!-- <div class="balance-info">
                        <p class="balance-quantity">0.00</p>
                        <p>钱包余额</p>
                    </div> -->
                </div>
            </div>
        </section>
        <section class="function-area">
        	<ul class="function-list">
        		<li class="col-xs-3 function-item">
                     <router-link :to="{path: '/content/collect'}">
                        <img src="../../static/icon/我的账户-收藏.png" />
                        <p>我的收藏</p>
                     </router-link>
        		</li>
                <li class="col-xs-3">
                    <router-link :to="{path: '/content/all-order'}">
                        <img src="../../static/icon/我的账户-订单.png" />
                        <p>订单查询</p>
                    </router-link>
                </li>
                <li class="col-xs-3">
                    <router-link :to="{path: '/content/address'}">
                        <img src="../../static/icon/我的账户-地址.png" />
                        <p>收货地址</p>
                    </router-link>
                </li>
                <!-- <li class="col-xs-3">
                    <img src="../../static/icon/我的账户-收藏.png" />
                    <p>在线退换货</p>
                </li> -->
                <li class="col-xs-3">
                    <img src="../../static/icon/我的账户-关于我们.png" />
                    <p>关于我们</p>
                </li>
                <li class="col-xs-3">
                    <a href="tel:15900996441">
                        <img src="../../static/icon/我的账户-电话 副本.png" />
                        <p>客服电话</p>
                    </a>
                </li>
                <li class="col-xs-3 question">
                    <img src="../../static/icon/我的账户-问题.png" />
                    <p>常见问题</p>
                </li>
        	</ul>
        </section>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
        data() {
            this.captchaId = "";
            return {
                memberInfo:{}
            }
        },
        created() {
            this.fetchData()
        },
        watch: {
            '$route': 'fetchData'
        },
        methods: {
            fetchData() {
                var _self = this;
                console.log("测试前缀地址urlPrefix111：" + urlPrefix);
                function getLoginMemberInfoFunc(data){
                    data = JSON.parse(data);
                    if(data.code == "3000"){
                        goIndex();
                    }else{
                        if(data.isSuccess){
                            _self.memberInfo = data.data;
                            setCookie("recordId", _self.memberInfo.member.recordId);
                        }
                    }
                }
                setTimeout(function(){
                    //获取验证码 start
                    var loginMemberInfoPara = {"api_u_key": getCookie("api_u_key")};
                    commonAjax("/api/getLoginMemberInfo.xhtml",loginMemberInfoPara,"get",getLoginMemberInfoFunc);
                }, 200);
               
            }
        }
}
</script>
<style lang="scss" scoped>
$bgcolor:#51b951;
.account-title {
    text-align: center;
    background-color: $bgcolor;
    padding: 12px;
    color: #fff;
}

.user-info {
    padding: 20px;
    .user-head {
        float: left;
        img {
            width: 80px;
            height: 80px;
            border-radius:50%;
        }
    }
    .user-style {
        float: left;
        padding-left:14px;
        .qq-user {
            color: $bgcolor;
        }
    }
}

.account-balance {
    overflow: hidden;
    border: 1px solid #DEDEDE;
    padding: 15px 0;
    .balance-item {
    	// border-right:1px solid #DEDEDE;
        .balance-icon {
            float: left;
            margin-right: 10px;
            img {
                width: 45px;
                height: 45px;
            }
        }
        .balance-info {
            float: left;
            p {
                font-size: 16px;
            }
            .balance-quantity {
                color: $bgcolor;
            }
        }
    }
    .purse{
    	border-right:none;
    }
}
.function-area{
    .function-list{
        li{
            padding:20px 10px;
            border:1px solid #DEDEDE;
            border-top:none;
            border-right:none;
            img{
                display: block;
                width:40px;
                height:40px;
                margin:0 auto;
                margin-bottom: 5px;
            }
            p{
                width:100%;
                text-align:center;
            }
        }
        .question{
            border-right: 1px solid #DEDEDE;
        }
    }
}
</style>
