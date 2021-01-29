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
                    <Button type="warning">取消</Button>
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
            tab: true,
            flag: true,
            defaultList: [],
            form: {
                completionStatus: "",
                informationNote: "",
                id: "",
            },
            form2: {
                attachmentsName: "",
                department: "数据化研发中心",
                detId: "",
                fileUrl: "",
                personnel: "李兴波",
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
        fn(res, file, filelist) {
            //钩子函数上传成功就调用此方法了
            console.log(res.data.uploadDto.fileUrl);
            console.log(res.data.uploadDto.originalFilename)
            this.form2.attachmentsName=res.data.uploadDto.originalFilename;//文件名称
            this.form2.fileUrl=res.data.uploadDto.fileUrl
            this.tab = false;
            console.log(file);
            console.log(filelist);
            let arr=[];
            for(let i=0;i<filelist.length;i++){
                this.form2.fileUrl=filelist[i].response.data.uploadDto.fileUrl
                this.form2.originalFilename=filelist[i].name
                arr.push(JSON.parse(JSON.stringify(this.form2)))
            }
            this.arr=arr;
        },
        async nb() {
            this.flag = false;
           
            if (this.tab) {
                let res = await ajax(
                    "http://192.168.0.91:8011/dh-executive-tracking/saveProgressFeedback",
                    this.form,
                    "post"
                );
                console.log(res);
                if (res.code === 200) {
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
            }
        },
        wjremove(file, filelist) {
            console.log(file.name);
            console.log(file.response.data.uploadDto.fileUrl)
            ajax("http://192.168.0.91:8011/ossservice/oss/delete",{
                 fileUrl:file.response.data.uploadDto.fileUrl,
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
        // console.log(obj.id);
        // this.form.id =this.form2.detId= obj.id;
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