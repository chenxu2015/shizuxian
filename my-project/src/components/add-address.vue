<style lang="scss" scoped>
$bgcolor:#51B951;
.linkman-box-div{
    .linkman-box{
        border-bottom:1px solid #dcdddd;
        p{
            margin:14px 0 8px 14px;
        }
        input{
            width:100%;
            padding:14px 14px;
            border:0;
            border-top:1px solid #dcdddd;
            background-color:#f7f5f5;
        }
    }
}
.add-address-btn{
    background-color:$bgcolor;
    padding:12px;
    color:#fff;
    text-align:center;
    font-size:16px;
    position:fixed;
    width:100%;
    bottom:58px;
}
.address-city-box{
    overflow:hidden;
    >li{
        float:left;
        width:30.3%;
        margin-right:3%;
        background-color:#eee;
    }
    .pro-list-ul,.city-list-ul,.dis-list-ul{
        height:500px;
        overflow:hidden;
        overflow-y:auto;
        >li{
            height:24px;
            font-size:14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            padding:0 4px;
        }
        >li.active{
            background-color:$bgcolor;
            color:#fff;
        }
    }
}
</style>
<template>
  <div id="addresscomponent">
     <div class="linkman-box-div">
         <section class="linkman-box">
             <p style="font-size:16px;">联系人</p>
             <input type="text" id="name" placeholder="姓名" />
             <input type="number" id="telphone" placeholder="手机号" />
             <p style="font-size:16px;">收货地址</p>
             <input type="text" id="city-address" data-toggle="modal" data-target="#choose-address" placeholder="所在地址" />
             <input type="text" id="detail-address" placeholder="详细地址" />
         </section>
         <!-- 按钮触发模态框 -->
        <!-- 模态框（Modal） -->
        <div class="modal fade" style="border-radius:0;" id="choose-address" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog" style="border-radius:0;">
                <div class="modal-content" style="width:100%;height:100%;border-radius:0;">
                    <div class="modal-body">
                        <ul class="address-city-box">
                            <li class="pro-list">
                                <ul class="pro-list-ul">
                                    <li v-for="(proviceObj, index) in proviceList" v-on:click="choosePro(proviceObj.recordId,index)">{{proviceObj.name}}</li>
                                </ul>
                            </li>
                            <li>
                                <ul class="city-list-ul">
                                    <li v-for="(cityObj, index) in cityList" v-on:click="chooseCity(cityObj.recordId,index)">{{cityObj.name}}</li>
                                </ul>
                            </li>
                            <li>
                                <ul class="dis-list-ul">
                                    <li v-for="(disObj, index) in disList" v-on:click="chooseDis(disObj.recordId,index)">{{disObj.name}}</li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消
                        </button>
                        <button type="button" class="btn btn-success" v-on:click="confirmChooseAddress()">
                            确 定
                        </button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal -->
        </div>
         <section class="add-address-btn" v-on:click="addAddress()">
             确 定
         </section>
     </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export default {
    	data() {
            return {
                proviceList:[],
                cityList:[],
                disList:[],
                addressObj:{}
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
                document.title = '新增地址';
                console.log("-----");
            	console.log("获得所有省");
                //获得所有省 start
                function getAllProDataFunc(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        console.log("已获得所有省");
                        _self.proviceList = data.data.proviceList;
                    }
                }
                //获得所有省 end
                setTimeout(function(){
                    var getAllProDataPara = {"type":"pro"};
                    commonAjax("/api/getAllCityData.xhtml",getAllProDataPara,"get",getAllProDataFunc);
                },100);
            },choosePro:function(recordId,index){
                var _self = this;
                console.log("recordId:" + recordId);
                _self.addressObj.proId = recordId;
                $(".pro-list-ul li:nth-child("+ (index+1) +")").addClass("active").siblings().removeClass("active");
                //获得所有市 end
                setTimeout(function(){
                    var getAllCityDataPara = {"type":"city"};
                    commonAjax("/api/getAllCityData.xhtml",getAllCityDataPara,"get",function(data){
                        data = JSON.parse(data);
                        if(data.isSuccess){
                            console.log("已获得所有市");
                            _self.cityList = data.data.cityList[recordId];
                        }
                    });
                },100);
            },chooseCity:function(recordId,index){
                var _self = this;
                $(".city-list-ul li:nth-child("+ (index+1) +")").addClass("active").siblings().removeClass("active");
                 _self.addressObj.cityId = recordId;
                //获得所有市 end
                setTimeout(function(){
                    var getAllDisDataPara = {"type":"dis"};
                    commonAjax("/api/getAllCityData.xhtml",getAllDisDataPara,"get",function(data){
                        data = JSON.parse(data);
                        if(data.isSuccess){
                            console.log("已获得所有区");
                            _self.disList = data.data.disList[recordId];
                        }
                    });
                },100);
            },chooseDis:function(recordId,index){
                var _self = this;
                $(".dis-list-ul li:nth-child("+ (index+1) +")").addClass("active").siblings().removeClass("active");
                _self.addressObj.disId = recordId;
            },confirmChooseAddress:function(){
                 var _self = this;
                var pro = $(".pro-list-ul li.active").text();
                var city = $(".city-list-ul li.active").text();
                var dis = $(".dis-list-ul li.active").text();
                if(pro && city && dis){
                }else{
                    alert("请选择完整的地址");
                }
                $("#city-address").val(pro + " " + city + " " + dis);
                $("#choose-address").modal("hide");
            },addAddress:function(){
                var _self = this;
                var $name = $("#name");
                var $telphone = $("#telphone");
                var $cityAddress = $("#city-address");
                var $detailAddress = $("#detail-address");
                if(!$name.val() || $name.val().length <= 0){
                    $name.focus();
                }else if(!$telphone.val() || $telphone.val().length <= 0){
                    $telphone.focus();
                }else if(!$cityAddress.val() || $cityAddress.val().length <= 0){
                    $cityAddress.focus();
                }else if(!$detailAddress.val() || $detailAddress.val().length <= 0){
                    $detailAddress.focus();
                }
                //新建收货地址
                setTimeout(function(){
                    var addMemberAddressPara = {"api_u_key":getCookie("api_u_key"),"proId":_self.addressObj.proId,"cityId":_self.addressObj.cityId,"disId":_self.addressObj.disId,"address":$detailAddress.val(),"contactNumber":$telphone.val(),"contactName":$name.val()};
                    // var addMemberAddressPara = {"api_u_key":getCookie("api_u_key"),"recordId":getCookie("recordId"),"proId":2,"cityId":2,"disId":21,"address":$detailAddress.val(),"contactNumber":$telphone.val(),"contactName":$name.val()};
                    commonAjax("/api/addMemberAddress.xhtml",addMemberAddressPara,"post",function(data){
                        data = JSON.parse(data);
                        if(data.isSuccess){
                            _self.$router.push({ path: '/content/address' });
                        }
                    });
                },100);
            }
        }
}
</script>


