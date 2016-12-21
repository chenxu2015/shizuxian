<style lang="scss" scoped>
$bgcolor:#51B951;
.login-box{
	padding-top:20%;
	.icon-close{
		position:fixed;
		right:8%;
		top:3%;
		font-size:30px;
		color:#aaa;
	}
	.title{
		text-align:center;
		font-size:20px;
		padding:10px 0;
	}
	.form-box div{
		padding:30px 0px 20px 10%;
		border-bottom:1px solid #dcdddd;
		input{
			    border: 0;
			    padding: 6px;
			    width: 120px;
		}
		.icon-refresh-icon{
			color:$bgcolor;
			margin-left:10px;
			font-size:20px;
		}
	}
	.login-btn{
		button{
			width:70%;
			margin-top:50px;
			margin-left:15%;
			background-color:$bgcolor;
			border-color:$bgcolor;
			padding:10px;
		}
	}
}
</style>
<template>
  <div id="login">
     <div class="login-box">
       <i class="iconfont icon-close" v-on:click="closeLoginPageFunc()"></i>
       <section class="title">用户登录</section>
       <section class="form-box">
       	 	<div>手机号：<input type="number" v-model="mobilePhone" placeholder="输入手机号码" /></div> 
       	 	<div>验证码：<input type="input" v-model="captcha" placeholder="输入右侧字母" /><img data-act="captcha" src="" width="100px;"/><i class="iconfont icon-refresh-icon"></i></div> 
       	 	<div>校验码：<input type="number" v-model="mobileCheckCode" placeholder="输入短信校验码" />
						<button class="btn btn-success" v-on:click="getMobileCheckCode()">获取验证码</button>
       	 	</div> 
       </section>
       <section class="login-btn">
       		<button class="btn btn-primary" v-on:click="sendLoginFunc()">登 录</button>
       </section>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
    	data() {
            this.captchaId = "";
            this.mobilePhone = "";
            this.captcha = "";
            this.mobileCheckCode = "";
            this.dynamicCode = "";
            return {
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
                //获取验证码 start
                function getCaptchaIdFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
	                    //获取验证码图片
	                     _self.captchaId = data.data.captchaId;
	                     $("[data-act=captcha]").attr("src","http://139.224.65.231/resurgam/captcha.xhtml?captchaId=" + _self.captchaId);
                    }
                }
                //获取验证码 end
                //获取验证码图片 start
                // function getCaptchaPicFunc(data){
                //     data = JSON.parse(data);
                //     if(data.isSuccess){
                //     }
                // }
                //获取验证码图片 end

                setTimeout(function(){
                	//获取验证码 start
                    var captchaIdPara = {};
                    commonAjax("/api/getCaptchaId.xhtml",captchaIdPara,"get",getCaptchaIdFunc);
                }, 300);
               
            },getMobileCheckCode(){
            	var _self = this;
            	//获取验证码 start
                var mobileCheckCodePara = {"mobile":this.mobilePhone,"captchaId":this.captchaId,"captcha":this.captcha};
                commonAjax("/api/sendLoginDynamicCode.xhtml",mobileCheckCodePara,"post",getMobileCheckCodeFunc);
                function getMobileCheckCodeFunc(data){
                	console.log("getMobileCheckCodeFunc:" + data);
                	data = JSON.parse(data);
                	if(data.isSuccess){
	                    _self.dynamicCode = data.data.dynamicCode;
                    }
                }
            },sendLoginFunc(){
            	var _self = this;
            	//获取验证码 start
                var sendLoginPara = {"mobile":this.mobilePhone,"code":this.mobileCheckCode,"imei":"111"};
                commonAjax("/api/loginByMobileCode.xhtml",sendLoginPara,"post",sendLoginFunc);
                function sendLoginFunc(data){
                	data = JSON.parse(data);
                	if(data.isSuccess){
                		//设置session
                		setCookie("userMobilePhone", _self.mobilePhone);
                		setCookie("api_u_key", data.data.api_u_key);
                		_self.$router.push({ path: '/content/myaccount' });
                    }
                }
            },closeLoginPageFunc(){
            	this.$router.push({ path: '/content/home' });
            }
        }
}
</script>


