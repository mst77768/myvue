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
                <tab1 v-show="index == 0" />
                <tab2 v-show="index == 1" />
                <tab3 v-show="index == 2" />
                <tab4 v-show="index == 3" />
                <tab5 v-show="index == 4" />
                <tab6 v-show="index == 5" />
                <tab7 v-show="index == 6" />
            </div>
            <div class="updatab" v-if="index == 0">
                <Upload
                    multiple
                    action="http://192.168.0.91:8080/ossservice/oss/upload"
                    :on-success="success"
                    :before-upload="upload"
                    :on-remove="removefile"
                >
                    <Button icon="ios-cloud-upload-outline">上传附件</Button>
                </Upload>
            </div>
            <div class="bomt">
                <Button size="large" type="primary" @click="add">提交</Button>
                <Button
                    size="large"
                    type="success"
                    @click="$router.push('huiyi')"
                    >取消</Button
                >
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import tab1 from "./tab/tab1";
import tab2 from "./tab/tab2";
import tab3 from "./tab/tab3";
import tab4 from "./tab/tab4";
import tab5 from "./tab/tab5";
import tab6 from "./tab/tab6";
import tab7 from "./tab/tab7";
import ajax from "@/api/ajax.js";
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
            arr: [
                "月度总结",
                "2020部门目标",
                "2020核心目标和措施",
                "2020－2030利润目标",
                "2020－2022员工收入目标",
                "管理四项基本原则",
                "绩效处罚",
            ],
            fileurl: {
                attachmentsName: "", //附件名称
                department: "数据化研发部门",
                fileUrl: "", //附件地址
                meetingDate: "", //时间
                personnel: "李兴波",
                reportName: "", //报告名称
            },
            filearr: [],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn(index) {
            this.index = index;
        },
        add() {
            //提交操作
            let obj = JSON.parse(sessionStorage.getItem("wenjiantype"));
            let obj2 = JSON.parse(sessionStorage.getItem("enddata"));
            obj["meetingPlace"] = "大会议室";
            obj["reportType"] = "月度会议";
            console.log(obj);
            let form = {
                ...obj,
                ...obj2,
                titleName: "月度总结",
                reportContent: this.arr[this.arr.length - 1].value6,
                reportTitle: this.arr[this.arr.length - 1].value16,
            };
            if (sessionStorage.getItem("arrlength") == 1) {
                ajax(
                    "http://192.168.0.91:8080/dh-meeting-title/saveMonthlyMeetingHeader",
                    obj,
                    "post"
                ).then((res) => {
                    console.log(res);
                    ajax(
                        "http://192.168.0.91:8080/dh-mreport/saveMonthlyMeetingContent",
                        form,
                        "post"
                    ).then((res) => {
                        console.log(res);
                        ajax(
                            "http://192.168.0.91:8080/dh-annex-table/uploadMeetingAttachment",
                            this.filearr,
                            "post"
                        ).then((res) => {
                            console.log(res);
                        });
                    });
                });
            } else {
                ajax(
                    "http://192.168.0.91:8080/dh-mreport/saveMonthlyMeetingSmallContent",
                    form,
                    "post"
                ).then((res) => {
                    console.log(res);
                    ajax(
                        "http://192.168.0.91:8080/dh-annex-table/uploadMeetingAttachment",
                        this.filearr,
                        "post"
                    ).then((res) => {
                        console.log(res);
                    });
                });
            }
        },
        upload() {
            let obj = JSON.parse(sessionStorage.getItem("wenjiantype"));

            this.fileurl.meetingDate = obj.meetingDate;
            this.fileurl.reportName = obj.reportName;
        },
        success(res, file, filearr) {
            let arr = [];
            for (let i = 0; i < filearr.length; i++) {
                this.fileurl.fileUrl =
                    filearr[i].response.data.uploadDto.fileUrl;
                this.fileurl.attachmentsName =
                    filearr[i].response.data.uploadDto.originalFilename;
                arr.push(JSON.parse(JSON.stringify(this.fileurl)));
            }
            this.filearr = arr;
            console.log(this.fileurl);

            console.log(res);
            console.log(file);
            console.log(filearr);
        },
        removefile(file,filearr){
            let arr = [];
            for (let i = 0; i < filearr.length; i++) {
                this.fileurl.fileUrl =
                    filearr[i].response.data.uploadDto.fileUrl;
                this.fileurl.attachmentsName =
                    filearr[i].response.data.uploadDto.originalFilename;
                arr.push(JSON.parse(JSON.stringify(this.fileurl)));
            }
            this.filearr = arr;
            let obj={
                originalFilename:file.name,
                fileUrl:file.response.data.uploadDto.fileUrl
            }
            ajax("http://192.168.0.91:8080/ossservice/oss/delete",obj,"post").then(res=>{//删除功能
                console.log(res.code)
                if(res.code==200){ 
                   this.$Message.success('文件删除成功！');
                }
            })
            console.log(file);
            console.log(filearr)
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
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
    }

    .bomt {
        width: 23%;
        display: flex;
        margin: 15px auto;
        margin-top: 9.6rem;
        justify-content: space-between;
        .ivu-btn {
            width: 80px;
        }
        .ivu-btn-success {
            background-color: #d7d7d7;
            border-color: white;
        }
    }
}
</style>