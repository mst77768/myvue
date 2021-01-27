<!-- 附件页面 -->
<template>
    <div class="wenjian">
        <div class="wxin">
            <div class="top">执行力进度反馈</div>
            <div class="main">
                <Table border :columns="columns1" :data="data1">
                    <template slot-scope="{ row }" slot="name">
                        <Select
                            v-model="models"
                            size="small"
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
                </Table>
                <div class="botm">
                    <!-- <Upload action="http://192.168.0.90:8011/dh-annex-table/file"  :default-file-list="defaultList" :on-success="fn">
                        <span v-show="flase"><Button  type="info" icon="ios-cloud-upload-outline"
                            >上传附件</Button
                        >
                        </span>
                    </Upload> -->
                    <h3>附件如下:</h3>
                    <p v-for="(item, index) in defaultList" :key="index">
                        <a :href="item.value" :download="item.label">{{
                            item.label
                        }}</a>
                    </p>
                </div>
                <div class="btnbox">
                    <Button type="warning" @click="$router.go(-1)">返回</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ajax from "@/api/ajax.js";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            defaultList: [],
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
                    key: "tile",
                    align: "center",
                    tooltip: true,
                },
            ],
            data1: [],
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
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn() {
            //钩子函数上传成功就调用此方法了
            alert("恭喜成功1了！");
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        // let arr = JSON.parse(sessionStorage.getItem("data"));
        // let ojb = arr[];
        // console.log(ojb.id)
        ajax(
            `http://192.168.0.91:8080/dh-executive-tracking/progressFeedbackEcho/${this.$route.query.text}`,
            {},
            "get"
        ).then((res) => {
            // console.log(res.data.echo.attachments_name);
            console.log(res.code);
            if (res.code == 201) {
                this.$Message.warning(res.data.msg);
            } else {
                let abb = [];
                if (res.data.echo.attachments_name != null) {
                    abb = res.data.echo.attachments_name;
                }
                console.log(abb);
                
                this.models = res.data.echo.completionStatus;
                let obj = {
                    name: "",
                    tile: res.data.echo.informationNote
                        ? res.data.echo.informationNote
                        : "无",
                };
                this.data1.push(obj);
                this.defaultList = abb;
            }
        });
        // this.models = ojb.completionStatus;

        // this.data1.push(obj)
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        //拿到上个页面传过来的索引
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
        height: 414px;
        margin: 20px auto;
        background-color: white;
       position: relative;
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
                height: 200px;
                margin-top: 20px;
                // overflow-y: scroll;
                h3 {
                    margin-bottom: 0.5rem;
                }
                p {
                    margin-bottom: 0.2rem;
                    padding-left: 1rem;
                }
            }
            .btnbox{
                width: 70px;
                height: 40px;
                position: absolute;
                left: 50%;
                margin-left: -35px;
                bottom: 40px;
            }
        }
    }
}
</style>