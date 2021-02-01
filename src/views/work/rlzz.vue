<!-- 热力追踪页面 -->
<template>
    <div class="rlzz">
        <Breadcrumb>
            <BreadcrumbItem to="huiyi">智能办公</BreadcrumbItem>
            <BreadcrumbItem to="rlzz">执行力跟踪</BreadcrumbItem>
        </Breadcrumb>
        <div class="rlzzbox">
            <div class="top">
                <div class="leftb">
                    <div class="item">
                        <b>来源： </b>
                        <Select
                            v-model="form.source"
                            clearable
                            style="width: 4.54rem"
                        >
                            <Option
                                v-for="item in cityList"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="item">
                        <b>发布时间：</b>
                        <DatePicker
                            type="date"
                            placeholder="/年/月/日"
                            @on-change="start"
                            style="width: 4.54rem"
                        ></DatePicker>
                    </div>
                    <div class="item">
                        <b>责任部门：</b>
                        <Select
                            v-model="form.executiveDepartment"
                            clearable
                            @on-change="bumen"
                            style="width: 4.54rem"
                        >
                            <Option
                                v-for="item in zheren"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="item">
                        <b>协调部门：</b>
                        <Select
                            v-model="form.coordinationDepartment"
                            clearable
                            style="width: 4.54rem"
                            @on-change="xietiaofn"
                        >
                            <Option
                                v-for="item in xietiao"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="item">
                        <b>时效类型：</b>
                        <Select
                            v-model="form.prescription_type"
                            clearable
                            style="width: 4.54rem"
                        >
                            <Option
                                v-for="item in type"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="item">
                        <b>完成情况：</b>
                        <Select
                            v-model="form.completionStatus"
                            clearable
                            style="width: 4.54rem"
                        >
                            <Option
                                v-for="item in zhuantai"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="item">
                        <b>责任人：</b>

                        <Input
                            v-model="form.leading_cadre"
                            placeholder="请输入"
                            style="width: 4.54rem"
                        />
                    </div>
                    <div class="item">
                        <b>协调人：</b>
                        <Input
                            v-model="form.coordinator"
                            placeholder="请输入"
                            style="width: 4.54rem"
                        />
                    </div>
                </div>
                <Button type="primary" @click="seach">查询</Button>
                <div class="item" style="margin-left:60px">
                        <b>关键字：</b>
                        <Input
                            v-model="form.retrieval"
                            placeholder="请输入"
                            style="width: 4.54rem"
                        />
                    </div>
            </div>
            <div class="tablebox1">
                <div class="top1">
                    <div class="topxin">
                        <Button type="warning" @click="goadd">新增</Button>
                        <!-- <Button type="warning">编辑</Button> -->
                        <Button
                            type="primary"
                            :disabled="flag"
                            @click="$router.push(`/fankui?text=${index}`)"
                            >进度反馈</Button
                        >
                    </div>
                </div>
                <div class="tablexin">
                    <Table
                        border
                        :columns="columns1"
                        :data="data1"
                        highlight-row
                        disabled-hover
                        @on-row-click="fn2"
                        :height="hig"
                    >
                        <template slot-scope="{ row }" slot="executionContent">
                            <Poptip
                                trigger="hover"
                                word-wrap
                                width="450"
                                :content="row.executionContent"
                            >
                                <div
                                    style="
                                        width: 500px;
                                        cursor: pointer;
                                        white-space: nowrap;
                                        overflow: hidden;
                                        text-overflow: ellipsis;
                                    "
                                >
                                    {{ row.executionContent }}
                                </div>
                            </Poptip>
                        </template>
                        <template
                            slot-scope="{ row, index }"
                            slot="attachmentsNumber"
                        >
                            <Poptip
                                trigger="hover"
                                width="200"
                                content="点击查看附件"
                            >
                                <span
                                    style="
                                        cursor: pointer;
                                        color: red;
                                        font-width: 800;
                                        font-size: 16px;
                                    "
                                    @click="goupdata(row)"
                                    >{{ row.attachmentsNumber }}</span
                                >
                            </Poptip>
                        </template>
                        <template slot-scope="{ row }" slot="prescriptionType">
                         <span v-if="row.prescriptionType">
                             时效
                             </span>   
                        <span v-else>
                            
                            非时效
                            </span>   
                        
                        </template>
                        
                    </Table>
                    <div class="botm">
                        <Page
                            :total="count"
                            :page-size-opts="[6, 9, 12]"
                            :page-size="size"
                            show-total
                            show-elevator
                            show-sizer
                            placement="top"
                            @on-change="goye"
                            @on-page-size-change="numb"
                        />
                    </div>
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
            hig: 0,
            count: 0,
            size: 6,
            page: 1,
            index: 0,
            zheren: [],
            xietiao: [],
            flag: true,
            form: {
                source: "", //来源
                releaseTime: "",
                prescription_type: "",
                completion_status: "",
                executive_department: "",
                leading_cadre: "",
                coordination_department: "",
                coordinator: "",
                retrieval: "",
                pageNum: 1,
                pageSize: 6,
            },
            type: [
                {
                    value: "非时效",
                    label: "非时效",
                },
                {
                    value: "时效",
                    label: "时效",
                },
            ],
            zhuantai: [
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
            cityList: [
                {
                    value: "月度会议",
                    label: "月度会议",
                },
                {
                    value: "周例会",
                    label: "周例会",
                },
                {
                    value: "邮件",
                    label: "邮件",
                },
                {
                    value: "微信",
                    label: "微信",
                },
                {
                    value: "不符合",
                    label: "不符合",
                },
            ],

            columns1: [
                {
                    title: "序号",
                    key: "name",
                    width: "80",
                    align: "center",
                },
                {
                    title: "来源",
                    key: "source",
                    align: "center",
                    width: "100",
                },
                {
                    title: "发布日期",
                    key: "releaseTime",
                    align: "center",
                    width: "120",
                    tooltip: true,
                },
                {
                    title: "时效类型",
                    slot: "prescriptionType",
                    align: "center",
                    width: "120",
                },
                {
                    title: "要求完成时间",
                    key: "requiredCompletionTime",
                    align: "center",
                    width: "140",
                    tooltip: true,
                },
                {
                    title: "汇报频率",
                    key: "reportingFrequency",
                    align: "center",
                    width: "120",
                },
                {
                    title: "执行内容",
                    slot: "executionContent",
                    align: "center",
                    width: "550",
                },
                {
                    title: "责任部门",
                    key: "executiveDepartment",
                    align: "center",
                    width: "120",
                },
                {
                    title: "负责人",
                    key: "leadingCadre",
                    align: "center",
                    width: "120",
                },
                {
                    title: "协调部门",
                    key: "coordinationDepartment",
                    align: "center",
                    width: "120",
                },
                {
                    title: "协调人",
                    key: "coordinator",
                    align: "center",
                    width: "120",
                },
                {
                    title: "完成状态",
                    key: "completionStatus",
                    align: "center",
                    width: "120",
                },
                {
                    title: "情况说明",
                    key: "informationNote",
                    align: "center",
                    width: "180",
                    tooltip: true,
                },
                {
                    title: "附件总数",
                    slot: "attachmentsNumber",
                    align: "center",
                    width: "140",
                },
            ],
            data1: [],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        async bumen() {
            //请求回来的部门数据
            let data = await ajax(
                "http://192.168.0.91:8011/sys-dept/findDepartmentHead",
                {
                    name: this.form.executiveDepartment,
                },
                "get"
            );
            console.log(data.data.username);
            this.form.leading_cadre = data.data.username;
        },
        async xietiaofn() {
            let data = await ajax(
                "http://192.168.0.91:8011/sys-dept/findDepartmentHead",
                {
                    name: this.form.coordinationDepartment,
                },
                "get"
            );
            this.form.coordinator = data.data.username;
        },
        fn(data) {
            //获取时间的方法
            console.log(data);
        },
        goadd() {
            //跳转到添加页面去
            this.$router.push("/addhuiyi");
        },
        goupdata(index) {
            //跳转到附件的页面
            console.log(index);
            this.$router.push(`/wenjian?text=${index.id}`);
        },
        fn2(a, b) {
            this.index = b;
            this.flag = false;
            console.log(a);
            sessionStorage.setItem("wenID", JSON.stringify(a.id));
            sessionStorage.setItem("weninfo",JSON.stringify({Status:a.completionStatus,info:a.informationNote}))
        },
        async getdata(pageNum = 1, pageSize = 6) {
            //定义一个分页方法
            let res = await ajax(
                "http://192.168.0.91:8011/dh-executive-tracking/searchExecutiveTracking",
                {
                    pageNum,
                    pageSize,
                },
                "post"
            );
            console.log(res);
            this.count = parseInt(res.data.pageInfo.total);
            let arr = res.data.pageInfo.list;
            console.log(arr);
            arr.forEach((item, index) => {
                //给数组对象的加个新字段
                item["name"] = index + 1;
            });
            this.data1 = arr; //获取数据
            if (sessionStorage.getItem("bumen")) {
                this.xietiao = this.zheren = JSON.parse(
                    sessionStorage.getItem("bumen")
                );
            } else {
                let bumen = await ajax(
                    "http://192.168.0.91:8011/sys-dept/searchDepartmentName",
                    {},
                    "post"
                );
                console.log(bumen);
                // console.log(bumen.data.names)
                sessionStorage.setItem(
                    "bumen",
                    JSON.stringify(bumen.data.names)
                );
                this.xietiao = this.zheren = bumen.data.names;
            }
        },
        goye(e) {
            this.page = e;
            this.getdata(this.page, this.size);
        },
        numb(e) {
            this.size = e;
            this.getdata(this.page, this.size);
        },
        start(date) {
            //获取日期的方法
            console.log(date);
            this.form.releaseTime = date;
        },
        async seach() {
            //检索的方法

            let obj = JSON.parse(JSON.stringify(this.form));
            if (obj.retrieval.trim() != "" && obj.retrieval.trim().length < 2) {
                this.$Message.warning("关键字不能少于两个！");
                return false;
            }
            this.xietiao.forEach((item) => {
                if (item.value == obj.coordinationDepartment) {
                    obj.coordinationDepartment = item.label;
                } else if (item.value == obj.executiveDepartment) {
                    obj.executiveDepartment = item.label;
                }
            });
            console.log(obj);
            let res = await ajax(
                "http://192.168.0.91:8011/dh-executive-tracking/searchExecutiveTracking",
                obj,
                "post"
            );
            console.log(res);
            console.log(res.data.pageInfo.list);
            this.count = parseInt(res.data.pageInfo.total);
            let arr = res.data.pageInfo.list;
            arr.forEach((item, index) => {
                //给数组对象的加个新字段
                item["name"] = index + 1;
            });
            this.data1 = arr; //获取数据
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.hig = window.innerHeight / 2;

        this.getdata();
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {
        if (!sessionStorage.getItem("data")) {
            sessionStorage.setItem("data", JSON.stringify(this.data1));
        }
    }, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.rlzz {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    font-size: 0.42rem;

    .rlzzbox {
        width: 100%;
        height: 97%;
        overflow: hidden;

        .top {
            display: flex;
            margin-top: 0.24rem;
            height: 3.9rem;
            box-sizing: border-box;
            background-color: white;
            border: 1px solid #ccc;
            align-items: center;

            .leftb {
                width: 68%;
                height: 100%;
                display: flex;
                align-content: center;
                flex-wrap: wrap;
                margin-left: 0.6rem;
                .item {
                    width: 25%;
                    height: 50%;
                    line-height: 1.51rem;
                    display: flex;
                    align-items: center;
                    b {
                        font-weight: 500;
                        margin-right: 5px;
                        display: inline-block;
                        width: 2.1rem;
                        white-space: nowrap;
                    }
                }
            }
            .ivu-btn {
                width: 2.42rem;
                margin-left: 2.1rem;
            }
        }
        .tablebox1 {
            width: 100%;
            height: 81%;
            margin-top: 15px;
            border-radius: 8px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            background-color: white;
            .top1 {
                height: 1.36rem;
                width: 100%;
                border-bottom: 1px solid #ccc;
                .topxin {
                    width: 95%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    .ivu-btn {
                        margin-right: 0.6rem;
                    }
                }
            }
            .tablexin {
                width: 98%;
                height: 19.4rem;
                box-sizing: border-box;
                margin: 10px auto;
                position: relative;
                .ivu-table-wrapper {
                    overflow: visible;
                }
                .botm {
                    display: flex;
                    justify-content: flex-end;
                    width: 97%;
                    margin-top: 0.5rem;
                }
            }
        }
    }
}
</style>