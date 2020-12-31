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
                            v-model="model8"
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
                        <TimePicker
                            format="HH:mm"
                            placeholder="--:--"
                            style="width: 4.54rem"
                            @on-change="fn"
                        ></TimePicker>
                    </div>
                    <div class="item">
                        <b>责任部门：</b>
                        <Select
                            v-model="model8"
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
                        <b>协调部门：</b>
                        <Select
                            v-model="model8"
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
                        <b>时效类型：</b>
                        <Select
                            v-model="model8"
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
                        <b>完成情况：</b>
                        <Select
                            v-model="model8"
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
                        <b>责任人：</b>
                        <Select
                            v-model="model8"
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
                        <b>协调人：</b>
                        <Select
                            v-model="model8"
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
                </div>
                <Button type="primary">查询</Button>
            </div>
            <div class="tablebox1">
                <div class="top1">
                    <div class="topxin">
                        <Button type="info" @click="goadd">新增</Button>
                        <Button type="warning">编辑</Button>
                        <Button
                            type="primary"
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
                        highlight-row="true"
                        disabled-hover
                        @on-row-click="fn2"
                        :height="hig"
                    >
                        <template slot-scope="{ row }" slot="text">
                            <Poptip
                                trigger="hover"
                                word-wrap
                                width="450"
                                :content="row.text"
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
                                    {{ row.text }}
                                </div>
                            </Poptip>
                        </template>
                        <template slot-scope="{ row, index }" slot="number">
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
                                    @click="goupdata(index)"
                                    >{{ row.number }}</span
                                >
                            </Poptip>
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
            hig: "",
            index: 0,
            abb: "马帅要",
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
            model8: "",
            columns1: [
                {
                    title: "序号",
                    key: "id",
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
                    key: "date",
                    align: "center",
                    width: "120",
                },
                {
                    title: "时效类型",
                    key: "aging",
                    align: "center",
                    width: "120",
                },
                {
                    title: "要求完成时间",
                    key: "overtime",
                    align: "center",
                    width: "140",
                },
                {
                    title: "汇报频率",
                    key: "frequency",
                    align: "center",
                    width: "120",
                },
                {
                    title: "执行内容",
                    slot: "text",
                    align: "center",
                    width: "550",
                },
                {
                    title: "执行部门",
                    key: "execute",
                    align: "center",
                    width: "120",
                },
                {
                    title: "负责人",
                    key: "person",
                    align: "center",
                    width: "120",
                },
                {
                    title: "协调部门",
                    key: "xietiao",
                    align: "center",
                    width: "120",
                },
                {
                    title: "协调人",
                    key: "xietiao",
                    align: "center",
                    width: "120",
                },
                {
                    title: "完成状态",
                    key: "wczt",
                    align: "center",
                    width: "120",
                },
                {
                    title: "情况说明",
                    key: "qksm",
                    align: "center",
                    width: "180",
                },
                {
                    title: "附件总数",
                    slot: "number",
                    align: "center",
                    width: "140",
                },
            ],
            data1: [
                {
                    id: 1,
                    source: "周例会",
                    date: "2020-02-11",
                    aging: "时效",
                    overtime: "2020-05-20",
                    frequency: "月末",
                    text:
                        "当前公司首要任务是确保公司员工特别是船员避免受到新冠疫情侵害。要求船员部高度重视，建立健全相关制度，采取一切可行措施保证船员尽量避免与外界接触，适时监控船舶执行情况，每日在公司微信群发布“船员防疫监控日报”。",
                    execute: "信息化中心",
                    person: "李兴波",
                    wczt: "完成",
                    number: 3,
                },
                {
                    id: 2,
                    source: "月度例会",
                    date: "2016-10-01",
                    aging: "时效",
                    overtime: "2020-05-20",
                    frequency: "月末",
                    text:
                        "目前，整个国家正在处在危机中。如果疫情短时间不能好转，将会有大量民营企业企业破产，鼎衡也会面临重大困难。我们必须做好三个月（即直到5月底）才能恢复正常的准备。",
                    execute: "信息化中心",
                    person: "李兴波",
                    wczt: "进行中",
                },
                {
                    id: 3,
                    source: "邮件",
                    date: "2016-10-02",
                    aging: "时效",
                    overtime: "2020-05-20",
                    frequency: "月末",
                    text:
                        "装载易凝固货物船舶加装伴温管解决防冻问题，10月份之前全部完成",
                    execute: "信息化中心",
                    person: "李兴波",
                    wczt: "进行中",
                },
                {
                    id: 4,
                    source: "微信",
                    date: "2016-10-04",
                    aging: "非时效",
                    overtime: "2020-05-20",
                    frequency: "月末",
                    text:
                        "最近这几艘船舶报表主机平均转速均达不到115转左右，远低于设计转速。要弄明白为什么？用主机健康管理程序中的表格进行分析，判断是主机是否处于健康状态，或污底或螺旋桨问题。脱开轴发只是权宜之计，根本解决办法还是要让船舶恢复到试航状态。目前油价很低，船舶能够开快一点对效益提升立竿见影。要想方设法发掘主机潜力，合理配载，增加航速。",
                    execute: "信息化中心",
                    person: "李兴波",
                    wczt: "进行中",
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
            this.$router.push(`/wenjian?text=${index}`);
        },
        fn2(a, b) {
            this.index = b;
            console.log(a);
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.hig = window.innerHeight / 2;
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
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
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
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
            height: 82%;
            margin-top: 15px;
            border-radius: 8px;
            box-sizing: border-box;
            border: 1px solid #ccc;
            background-color: white;
            .top1 {
                height: 45px;
                width: 100%;
                border-bottom: 1px solid #ccc;
                .topxin {
                    width: 95%;
                    height: 100%;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                    .ivu-btn {
                        margin-right: 20px;
                    }
                }
            }
            .tablexin {
                width: 98%;
                height: 640px;
                box-sizing: border-box;
                margin: 10px auto;
                position: relative;
                .ivu-table-wrapper {
                    overflow: visible;
                }
            }
        }
    }
}
</style>