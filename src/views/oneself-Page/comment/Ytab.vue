<!--  -->
<template>
    <div class="tab2">
        <div class="top1">
            <div
                v-for="(item, index1) in arr"
                :key="index1"
                @click="fn(index1)"
            >
                <span :class="{ ative: index == index1 }">
                    {{ item }}
                </span>
            </div>
        </div>
        <div class="mainx">
            <div class="tab">
                <tab1 v-show="index == 0" :arr="arr2"/>
                <tab2 v-show="index == 1" />
                <tab3 v-show="index == 2" />
                <tab4 v-show="index == 3" />
                <tab5 v-show="index == 4" />
                <tab6 v-show="index == 5" />
                <tab7 v-show="index == 6" />
            </div>
            <div class="updatab" v-if="index==0">
                <!-- <Upload multiple action="//jsonplaceholder.typicode.com/posts/">
                    <Button icon="ios-cloud-upload-outline">上传附件</Button>
                </Upload> -->
                <h3>附件如下:</h3>
                <p v-for="(item,index) in urlarr" :key="index">
                    <a :href="item.fileUrl" :download="item.attachmentsName">{{item.attachmentsName}}</a>
                </p>
            </div>
            <div class="bomt">
                <Button
                    size="large"
                    type="primary"
                    @click="$router.push('huiyi')"
                    >返回首页</Button
                >
               
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ajax from "@/api/ajax.js"
import tab1 from "./tab/Ytab";
import tab2 from "./tab/tab2";
import tab3 from "./tab/tab3";
import tab4 from "./tab/tab4";
import tab5 from "./tab/tab5";
import tab6 from "./tab/tab6";
import tab7 from "./tab/tab7";

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        tab1,
        tab2,
        tab3,
        tab4,
        tab5,
        tab6,
        tab7,
    },
    data() {
        //这里存放数据
        return {
            index: 0,
            urlarr:[]
        };
    },
    props:["arr","arr2"],
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn(index) {
            this.index = index;
        },
        async getfileurl(obj){
            let res=await ajax(`http://192.168.0.91:8080/dh-mreport/monthlyMeetingAttachmentEcho/${obj.meetingDate}/${obj.reportName}`);
            console.log(res.data.attachments)
            this.urlarr=res.data.attachments;//附件
            // if(this.urlarr.length==0){
            //     this.index=1;
            // }    
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        let obj=JSON.parse(sessionStorage.getItem("look"))
        this.getfileurl(obj)
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
.tab2 {
    width: 100%;
    height: auto;
    .top1 {
        display: flex;
        height: 45px;
        width: 100%;
        margin-top: 10px;
        align-items: center;
        justify-content: space-around;
        background-color: #a5e4ea;
        div {
            font-size: 14px;
            font-weight: 800;
            cursor: pointer;

            &:hover {
                color: white;
            }
        }
        .ative {
            color: white;
            font-size: 15px;
            border-bottom: 3px solid gold;
            border-radius: 100px;
        }
    }
    .mainx {
        width: 100%;
        height: auto;
        padding-bottom: 20px;
        border: 1px solid #ccc;
        .updatab{
            h3{
                margin-left: 10px;
                margin-bottom: 10px;
            }
            p {
               padding-left: 20px;
               margin-bottom: 5px;     
            }
        }
    }
   
     .bomt {
        width: 23%;
        display: flex;
        margin: 15px auto;
        margin-top: 9.6rem;
        justify-content: center;
        .ivu-btn {
            width: 120px;
        }
        .ivu-btn-success {
            background-color: #d7d7d7;
            border-color: white;
        }
    }
}
</style>