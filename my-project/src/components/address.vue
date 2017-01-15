<style lang="scss" scoped>
$bgcolor:#51B951;
.address-title{
	background-color:$bgcolor;
	padding:12px;
    color:#fff;
    text-align:center;
    font-size:16px;
}
.add-address{
    background-color:#dcdddd;
    padding:12px;
    color:#000;
    text-align:center;
    font-size:16px;
    position:fixed;
    width:100%;
    bottom:58px;
    color:$bgcolor;
}
.address-list{
    background-color:#eee;
    .name,.telphone{
        font-size:16px;
    }
    >li{
        padding:10px;
        p{color:#999}
        position:relative;
        border-bottom: 1px solid #ddd;
    }
}
</style>
<template>
  <div id="addresscomponent">
     <section class="address-title">
     	我的收货地址
     </section>
    <router-link :to="{path: '/content/add-address'}">
        <section class="add-address">
                + 新增收货地址
        </section>
    </router-link>
    <ul class="address-list">
        <li v-for="addressObj in addressList">
            <span class="name">{{addressObj.contactName}}</span>
            <span class="telphone">{{addressObj.contactNumber}}</span>
            <p><span>长沙市</span><span>{{addressObj.address}}</span></p>
            <i class="iconfont icon-delete" v-on:click="deleteAddress(addressObj.recordId)" style="position:absolute;top:20px;right:20px;"></i>
        </li>
    </ul>
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
                addressList:[]
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
                var getMemberAddressListPara = {"api_u_key":getCookie("api_u_key")};
                commonAjax("/api/getMemberAddressList.xhtml",getMemberAddressListPara,"post",function(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                       _self.addressList = data.data.addressList;
                    }
                });

                // //获得所有市 start
                // var getAllCityDataPara = {"type":"pro"};
                // commonAjax("/api/getAllCityData.xhtml",getAllCityDataPara,"get",function(data){
                //     data = JSON.parse(data);
                //     if(data.isSuccess){
                //         console.log("已获得所有市");
                //         _self.allCityList = data.data.allCityList;
                //     }
                // });
                //获得所有市 end
            },loadMore: function() {
                console.log("loadMore category...");
                this.busy = true;
            },deleteAddress: function(recordId){
                var _self = this;
                //删除地址信息
                var deleteAddressPara = {"api_u_key":getCookie("api_u_key"),"addressId":recordId};
                commonAjax("/api/delMemberAddress.xhtml",deleteAddressPara,"post",function(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        for(var i in _self.addressList){
                            if(_self.addressList[i].recordId == recordId){
                                _self.addressList.splice(i,1);
                                break;
                            }
                        }
                    }
                });
            }
        }
}
</script>


