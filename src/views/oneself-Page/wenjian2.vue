<!-- 附件页面 -->
<template>
    <div class="wenjian">
        <div class="wxin">
            <div class="top">执行力进度反馈</div>
            <div class="main">
                <Table border :columns="columns1" :data="data1">
                    <template slot-scope="{ row }" slot="name">
                        <Select
                            v-model="form.completionStatus"
                            style="width: 100px"
                        >
                            <Option
                                v-for="item in cityList"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                        <i>{{ row.name }}</i>
                    </template>
                    <template slot-scope="{ row }" slot="tile">
                        <Input
                            v-show="flag"
                            v-model="form.informationNote"
                            type="textarea"
                            :autosize="{ minRows: 2, maxRows: 9 }"
                            placeholder="会议情况内容说明..."
                        />
                        <Poptip
                            trigger="hover"
                            word-wrap
                            width="450"
                            :content="row.tile"
                        >
                            <div
                                v-show="!flag"
                                style="
                                    width: 500px;
                                    cursor: pointer;
                                    white-space: nowrap;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                "
                            >
                                {{ row.tile }}
                            </div>
                        </Poptip>
                    </template>
                </Table>
                <div class="botm">
                    <Upload
                        action="http://192.168.0.91:8011/ossservice/oss/upload"
                        :on-remove="wjremove"
                        :on-progress="wjread"
                        :default-file-list="defaultList"
                        :on-success="fn"
                    >
                        <Button type="info" icon="ios-cloud-upload-outline"
                            >上传附件</Button
                        >
                    </Upload>
                </div>
                <div class="mbotm">
                    <Button type="primary" @click="nb">提交</Button>
                    <Button type="warning" @click="$router.go(-1)">取消</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ajax from "@/api/ajax";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            tab: false,
            flag: true,
            defaultList: [],
            urllist:[],
            form: {
                completionStatus: "",
                informationNote: "",
                id: "",
            },
            form2: {
                attachmentsName: "",
                detId: "",
                fileUrl: "", 
            },

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
                    value: "未提交",
                    label: "未提交",
                },
                {
                    value: "已提交",
                    label: "已提交",
                },
                {
                    value: "进行中",
                    label: "进行中",
                },
                {
                    value: "完成",
                    label: "完成",
                },
                {
                    value: "遵照执行",
                    label: "遵照执行",
                },
                {
                    value: "延期",
                    label: "延期",
                },
            ],
            arr:[],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn(res) {
            //钩子函数上传成功就调用此方法了
            console.log(res.data.uploadDto.fileUrl);
            // res.data.uploadDto['attachmentsName']=res.data.uploadDto.originalFilename
            let obj={
                attachmentsName:res.data.uploadDto.originalFilename,
                fileUrl:res.data.uploadDto.fileUrl,
                detId:this.form2.detId
            }
            this.arr.push(obj)
        },
        async nb() {
            this.flag = false;
            console.log(this.arr)
            if (this.tab) {
                let res = await ajax(
                    "http://192.168.0.91:8011/dh-executive-tracking/saveProgressFeedback",
                    this.form,
                    "post"
                );
                console.log(res);
                if (res.code == 200) {
                    this.$Message.success("提交" + res.msg);
                    this.$router.push("/rlzz");
                }
            } else {
                let res = await ajax(
                    "http://192.168.0.91:8011/dh-annex-table/uploadFeedbackAttachment",
                    this.arr,
                    "post"
                );
                console.log(res)
                 if (res.code == 200) {
                    this.$Message.success("提交" + res.msg);
                    this.$router.push("/rlzz");
                }
            }
        },
        wjremove(file, filelist) {
            console.log(file.response);
            console.log(this.arr)
            let arr=[];
            
            
            // console.log(file.response.data.uploadDto.fileUrl)
            let url="";
            if(file.response){
                console.log(file.response.data.uploadDto.fileUrl)
                url=file.response.data.uploadDto.fileUrl;
                for(let i=0;i<this.arr.length;i++){
                if(file.response.data.uploadDto.fileUrl==this.arr[i].fileUrl){
                    console.log(111)
                }else{
                   arr.push(this.arr[i]); 
                }
                this.arr=JSON.parse(JSON.stringify(arr))
            }
            }else{
                console.log(file.url)
                url=file.url;
            }
            ajax("http://192.168.0.91:8011/ossservice/oss/delete",{
                 fileUrl:url,
                 originalFilename:file.name
            },"post").then(res=>{
                console.log(res)
            })
             console.log(filelist);
        },
        wjread(a, b, c) {
            console.log(a);
            console.log(b);
            // this.da.uid = b.uid;
            console.log(c);
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //拿到上个页面传过来的索引
        // let arr = JSON.parse(sessionStorage.getItem("data"));
        // console.log(arr);
        // let obj = arr[this.$route.query.text];
        //  console.log(obj.id);
         let obj=JSON.parse(sessionStorage.getItem("weninfo"));
        //  console.log(obj);
         this.form.completionStatus=obj.Status;
         this.form.informationNote=obj.info;
         this.form.id =JSON.parse(sessionStorage.getItem("wenID"))
         this.form2.detId=JSON.parse(sessionStorage.getItem("wenID"))
         ajax(`http://192.168.0.91:8011//dh-executive-tracking/progressFeedbackEcho/${this.form2.detId}`).then(res=>{
             console.log(res)
             if(res.data.echo.attachments_name){
                this.defaultList=res.data.echo.attachments_name;
             }
            //  console.log(res.data.echo.attachments_name)
            
         })
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
                .ivu-upload-list li {
                    color: #2d8cf0;
                    span > i {
                        color: #2d8cf0;
                    }
                }
            }
            .mbotm {
                width: 25%;
                display: flex;
                justify-content: space-between;
                margin: 0 auto;
            }
        }
    }
}
</style>