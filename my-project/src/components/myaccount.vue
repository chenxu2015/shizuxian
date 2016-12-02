<template>
    <div class="account-box">
        <header class="account-title">
            我的账户
        </header>
        <section class="user-info clearfix">
            <div class="user-head">
                <img src="../assets/img/user-head.png" />
            </div>
            <div class="user-style">
                <h4 class="h4 qq-user">QQ用户</h4>
                <h5 class="h5 ordinary-user">普通用户</h5>
            </div>
        </section>
        <section class="account-balance clearfix">
            <div class="Recharge-balance col-xs-6 col-md-6">
                <div class="balance-item clearfix">
                    <div class="balance-icon">
                        <img src="../assets/img/recharge-balance.png" height="72" width="72" />
                    </div>
                    <div class="balance-info">
                        <p class="balance-quantity">0.00</p>
                        <p>充值余额</p>
                    </div>
                </div>
            </div>
            <div class="purse-balance col-xs-6 col-md-6">
                <div class="balance-item clearfix purse">
                    <div class="balance-icon">
                        <img src="../assets/img/purse-balance.png" height="72" width="72" />
                    </div>
                    <div class="balance-info">
                        <p class="balance-quantity">0.00</p>
                        <p>钱包余额</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="function-area">
        	<ul class="function-list">
        		<li class="col-xs-3 function-item">
        			<img src="../../static/icon/我的账户-收藏.png" />
        			<p>我的收藏</p>
        		</li>
                <li class="col-xs-3">
                    <img src="../../static/icon/我的账户-订单.png" />
                    <p>订单查询</p>
                </li>
                <li class="col-xs-3">
                    <img src="../../static/icon/我的账户-地址.png" />
                    <p>收货地址</p>
                </li>
                <li class="col-xs-3">
                    <img src="../../static/icon/我的账户-收藏.png" />
                    <p>在线退换货</p>
                </li>
                <li class="col-xs-3">
                    <img src="../../static/icon/我的账户-关于我们.png" />
                    <p>关于我们</p>
                </li>
                <li class="col-xs-3">
                    <img src="../../static/icon/我的账户-电话 副本.png" />
                    <p>客服电话</p>
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
export default {
    data() {
        return {
            author: "微信公众号 jinkey-love",
            articles: []
        }
    }
}
</script>
<style lang="scss" scoped>
.account-title {
    text-align: center;
    background-color: #7EC954;
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
        }
    }
    .user-style {
        float: left;
        .qq-user {
            color: #7EC954;
        }
    }
}

.account-balance {
    overflow: hidden;
    border: 1px solid #DEDEDE;
    padding: 15px 0;
    .balance-item {
    	border-right:1px solid #DEDEDE;
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
                color: #7EC954;
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
