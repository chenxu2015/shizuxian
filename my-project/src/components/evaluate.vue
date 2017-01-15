<style lang="scss" scoped>
$bgcolor:#51B951;
#envaluatecomponent{
    padding-bottom:102px;
}
.address-title{
    background-color:$bgcolor;
    padding:12px;
    color:#fff;
    text-align:center;
    font-size:16px;
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
.evaluate-box{
    textarea{
        padding:10px;
        width:100%;
        border:1px solid #dcdddd;
        border-top:0;
    }
}
.envaluate-content-list{
    li{
        padding:10px;
        padding-right:30px;
        border-bottom:1px solid #dcdddd;
        position:relative;
        .add-time{
            text-align:right;
            color:#bbb;
        }
        .icon-delete{
            position:absolute;
            right:10px;
            top:10px;
        }
    }
    
}
</style>
<template>
  <div id="envaluatecomponent">
     <section class="address-title">
        评价
     </section>
     <!--评价列表 start-->
     <ul class="envaluate-content-list" v-for="evaluate in evaluateList">
         <li>{{evaluate.content}}
            <div class="add-time">{{evaluate.addTime}}</div>
            <i class="iconfont icon-delete" v-on:click="deleteEvaluate(evaluate.recordId)"></i>
        </li>
     </ul>
     <!--评价列表 end-->
    <section class="add-address-btn" v-on:click="addEvaluate()">
        确 定
    </section>
    <section class="evaluate-box">
        <textarea placeholder="请输入您的评价" rows="6" v-model="evaluateContent">
            
        </textarea>
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
                evaluateContent:"",
                evaluateList:[]
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
                //获得评论列表 start
                var getListCommentPara = {"api_u_key":getCookie("api_u_key"),"tag":"product","relateId":_self.$route.params.detailId,"pageNo":0,"pageMax":100};
                commonAjax("/api/comment/listComment.xhtml",getListCommentPara,"get",function(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        console.log("已获得评论列表");
                        _self.evaluateList = data.data.list;
                    }
                });
                //获得评论列表 end
            },
            loadMore: function() {
                console.log("loadMore category...");
                this.busy = true;
            },addEvaluate:function(){
                var _self = this;
                //发表评论 start
                var sendEvaluatePara = {"api_u_key":getCookie("api_u_key"),"tag":"product","relateId":_self.$route.params.detailId,"title":"","content":_self.evaluateContent};
                commonAjax("/api/comment/addComment.xhtml",sendEvaluatePara,"get",function(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        var comment = data.data.comment;
                        _self.evaluateList.push(comment);
                        _self.evaluateContent = "";
                    }
                });
                //发表评论 end
                // alert("已评价");
                // window.history.go(-1);
            },deleteEvaluate:function(recordId){
                var _self = this;
                //删除评论 start
                var deleteEvaluatePara = {"api_u_key":getCookie("api_u_key"),"recordId":recordId};
                commonAjax("/api/comment/delComment.xhtml",deleteEvaluatePara,"get",function(data){
                    data = JSON.parse(data);
                    if(data.isSuccess){
                        for(var i in _self.evaluateList){
                            if(_self.evaluateList[i].recordId == recordId){
                                _self.evaluateList.splice(i,1);
                                break;
                            }
                        }
                    }
                });
                //删除评论 end
            }
        }
}
</script>


