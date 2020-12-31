<!-- 智能办公下面会议报告模块主页面 -->
<template>
    <div class="huiyi">
        <Breadcrumb>
            <BreadcrumbItem to="huiyi">智能办公</BreadcrumbItem>
            <BreadcrumbItem to="huiyi">会议报告</BreadcrumbItem>
        </Breadcrumb>
        <div class="tabbox">
            <div class="topbox">
                <div class="itme">
                    <b>报告类型: </b>
                    <Select v-model="model1" style="width: 140px">
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <div class="itme">
                    <b>报告日期: </b>
                    <DatePicker
                        type="date"
                        placeholder="年/月/日"
                        style="width: 140px"
                    ></DatePicker>
                    &nbsp; --&nbsp;
                    <DatePicker
                        type="date"
                        placeholder="年/月/日"
                        style="width: 140px"
                    ></DatePicker>
                </div>
                <div class="itme">
                    <b>报告状态: </b>
                    <Select v-model="model2" style="width: 140px">
                        <Option
                            v-for="item in cityList1"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <Button type="info">查询</Button>
            </div>
            <div class="tablebox">
                <div class="sumbit">
                    <div class="sumxin">
                        <Button
                            type="primary"
                            @click="$router.push('/adwenjian')"
                            >新增</Button
                        >
                    </div>
                </div>
                <div class="table">
                    <Table  stripe :columns="columns1" :data="data1">
                        <template slot-scope="{ row }" slot="fujian">
                            <a>{{ row.fujian }}</a>
                        </template>
                        <template slot-scope="{ index }" slot="action" >
                            <Tooltip content="求修改！" placement="top-start" theme="light">
                                <Icon type="ios-create" @click="dyin(index)" />
                            </Tooltip>

                            <Tooltip content="当前状态" placement="top-start" theme="light">
                                <Icon type="md-checkmark-circle" />
                            </Tooltip>
                            <Tooltip content="亲！打印哦" placement="top-start" theme="light">
                                <Icon type="md-print" @click="daochu(index)" />
                             </Tooltip>
                        </template>
                    </Table>
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
            columns1: [
                {
                    type: "selection",
                    width: 60,
                    align: "center",
                },
                {
                    title: "序号",
                    key: "name",
                    align: "center",
                    width: 70,
                },
                {
                    title: "报告日期",
                    key: "age",
                    align: "center",
                    width: "150",
                },
                {
                    title: "报告类型",
                    key: "leixin",
                    align: "center",
                    width: "130",
                },
                {
                    title: "报告状态",
                    key: "state",
                    align: "center",
                    width: "130",
                },
                {
                    title: "报告名称",
                    key: "reportname",
                    align: "center",
                    width: "230",
                },
                {
                    title: "发布日期",
                    key: "releasedata",
                    align: "center",
                     width: "146",
                },
                {
                    title: "地点",
                    key: "address",
                    align: "center",
                    width:120
                },
                {
                    title: "附件",
                    slot: "fujian",
                    align: "center",
                    width: "100",
                },
                {
                    title: "操作",
                    slot: "action",
                    width: 250,
                    align: "center",
                },
            ],
            data1: [
                {
                    name: 1,
                    age: "2020-12-18",
                    leixin: "月度会议",
                    state: "未提交",
                    reportname: "2020年12月份月度总结报告",
                    releasedata: "2020-12-20",
                    address: "大会议室",
                    fujian: "3",
                },
                {
                    name: 2,
                    age: "2020-11-10",
                    leixin: "月度会议",
                    state: "已提交",
                    reportname: "2020年11月份月度总结报告",
                    releasedata: "2020-11-12",
                    address: "大会议室",
                    fujian: "3",
                },
                {
                    name: 3,
                    age: "2020-12-05",
                    leixin: "周例会",
                    state: "未审核",
                    reportname: "安全生产周例会纪要2020W49",
                    releasedata: "2020-12-06",
                    address: "大会议室",
                    fujian: "0",
                },
                {
                    name: 4,
                    age: "2020-12-08",
                    leixin: "周例会",
                    state: "已审核",
                    reportname: "安全生产周例会纪要2020W48",
                    releasedata: "2020-12-09",
                    address: "大会议室",
                    fujian: "0",
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
                    value: "其他会议",
                    label: "其他会议",
                },
            ],
            model1: "",
            model2: "",
            cityList1: [
                {
                    value: "未提交",
                    label: "未提交",
                },
                {
                    value: "已提交",
                    label: "已提交",
                },
                {
                    value: "未审核",
                    label: "未审核",
                },
                {
                    value: "已审核",
                    label: "已审核",
                },
                {
                    value: "已确定",
                    label: "已确定",
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
        dyin(index) {
            this.$Message.info(`打印第${index + 1}行数据`);
        },
        daochu(index) {
            this.$Message.info(`导出第${index + 1}行数据`);
        },
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
.huiyi {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    font-size: 0.42rem;
    .tabbox {
        width: 100%;
        height: 97%;
        overflow: hidden;
        .topbox {
            display: flex;
            height: 50px;
            background-color: white;
            align-items: center;
            margin: 10px auto;
            border: 1px solid #ccc;
            .itme {
                margin-left: 40px;
                b {
                    font-weight: 600;
                    margin-right: 14px;
                }
            }
            .ivu-btn {
                width: 80px;
                margin-left: 120px;
            }
        }
        .tablebox {
            width: 100%;
            height: 800px;
             border: 1px solid #ccc;
            border-radius: 5px;
            background-color: white;
            .sumbit {
                width: 100%;
                height: 45px;
                border-bottom: 1px solid #ccc;
                .sumxin {
                    width: 80%;
                    display: flex;
                    height: 100%;
                    justify-content: flex-end;
                    align-items: center;
                    .ivu-btn {
                        width: 80px;
                    }
                }
            }
            .table {
                width: 85%;
                height: 400px;
                margin-top: 10px;
                box-sizing: border-box;
                padding-left: 6px;
                .ivu-table-cell-slot i {
                    font-size: 28px;
                    margin-right: 12px;
                    margin-left: 12px;
                    cursor: pointer;
                }
                .ivu-icon-ios-create {
                    color: burlywood;
                }
                .ivu-icon-md-checkmark-circle {
                    color: deepskyblue;
                    font-size: 24px;
                }
                .ivu-icon-md-print {
                    color: #82c1ff;
                }
            }
        }
    }
}
</style>

