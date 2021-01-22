<!-- 附件页面 -->
<template>
    <div class="wenjian">
        <div class="wxin">
            <div class="top">执行力进度反馈</div>
            <div class="main">
                <Table border :columns="columns1" :data="data1">
                    <template slot-scope="{row}" slot="name">
                        <Select v-model="models" style="width:100px">
                            <Option
                                v-for="item in cityList"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                           
                        </Select>
                         <i>{{row.name}}</i>
                    </template>
                    <template slot-scope="{row}" slot="tile">
                        <Input v-show="flag" v-model="row.tile" type="textarea" :autosize="{minRows: 2,maxRows: 9}" placeholder="会议情况内容说明..."/>
                        <Poptip trigger="hover" word-wrap  width="450"  :content="row.tile">
                        <div v-show="!flag" style="width:500px; cursor: pointer; white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;">{{ row.tile }}</div>
                        </Poptip>
                    </template>
                </Table>
                <div class="botm">
                    <Upload action="http://192.168.0.90:8011/dh-annex-table/file" :on-remove="wjremove" :data="da" :on-progress="wjread" :default-file-list="defaultList" :on-success="fn">
                        <Button type="info" icon="ios-cloud-upload-outline"
                            >上传附件</Button
                        >
                    </Upload>
                </div>
                <div class="mbotm">
                        <Button type="primary" @click="nb">提交</Button>
                        <Button type="warning">取消</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            da:{//传给后端的资源
               meetingDate:"2020-01-20",
               reportName:"测试一",
               uid:"",

            },
            flag:true,
            defaultList: [
                   
                ],
            models: "",
            columns1: [
                {
                    title: "完成情况",
                    slot: "name",
                    width: "120",
                    align: "center",
                },
                {
                    title: "说明",
                    slot: "tile",
                    align: "center",
                },
            ],
            data1: [
                {
                    name: "",
                    tile: "",
                },
            ],
            cityList: [
                {
                    value: "进行中",
                    label: "进行中",
                },
                {
                    value: "遵照执行",
                    label: "遵照执行",
                },
                {
                    value: "完成",
                    label: "完成",
                },
                {
                    value: "延期",
                    label: "延期",
                },
            ],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn(){//钩子函数上传成功就调用此方法了
            alert("恭喜成功1了！")
        },
        nb(){
            this.flag=false;
            alert("提交成功马上回去")
            setTimeout(()=>{
                this.$router.go(-1);
            },1000)
        },
        wjremove(file,filelist){
            console.log(file)
            console.log(filelist)
        },
        wjread(a,b,c){
            console.log(a)
            console.log(b.uid);
            this.da.uid=b.uid;
            console.log(c)
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //拿到上个页面传过来的索引
        let arr = JSON.parse(sessionStorage.getItem("data"));
         console.log(arr)
         let obj=arr[this.$route.query.text];
        let ojb = {
            name:obj.completionStatus,
            tile:obj.informationNote   
        }
        this.models = ojb.wczt;
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>

<style lang="less" scoped>
.wenjian {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    font-size: 0.42rem;
    background-color: rgba(212, 212, 212, 1);
    .wxin {
        width: 811px;
        height: auto;
        margin: 20px auto;
        padding-bottom: 30px;
        background-color: white;
        border: 1px solid #ccc;
        .top {
            width: 90%;
            border-bottom: 1px solid #ccc;
            height: 45px;
            line-height: 45px;
            text-align: center;
            font-size: 16px;
            margin: 0 auto;
            font-weight: 600;
            margin-bottom: 40px;
        }
        .main {
            width: 80%;
            height: auto;
            margin: 0 auto;
            .ivu-table-wrapper {
                overflow: visible;
            }
            // .ivu-select-selection{
            //     width: 90px !important;
            // }
            .botm {
                width: 100%;
                height: 160px;
                margin-top: 20px;
                // overflow-y: scroll;
                .ivu-upload-list li{
                    color: #2D8CF0;
                    span>i{
                        color: #2D8CF0;
                    }
                }
            }
            .mbotm{
                width: 25%;
                display: flex;
                justify-content: space-between;
                margin: 0 auto;
            }
        }
    }
}
</style>