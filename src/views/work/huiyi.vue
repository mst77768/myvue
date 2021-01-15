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
                    <Select v-model="search.reportType" clearable style="width: 4.2rem">
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
                        style="width: 4.2rem"
                        @on-change="start"
                    ></DatePicker>
                    &nbsp; --&nbsp;
                    <DatePicker
                        type="date"
                        placeholder="年/月/日"
                        style="width: 4.2rem"
                        @on-change="end"
                    ></DatePicker>
                </div>
                <div class="itme">
                    <b>报告状态: </b>
                    <Select v-model="search.reportStatus" clearable style="width: 4.2rem">
                        <Option
                            v-for="item in cityList1"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <Button type="info" @click="getsearch">查询</Button>
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
                    <Table stripe :columns="columns1" :data="data1" max-height="500">
                        <template slot-scope="{ row }" slot="gmtCreate">
                            {{ row.gmtCreate.substring(0, 10) }}
                        </template>
                        <template slot-scope="{ row }" slot="reportStatus">
                            {{ cityList1[row.reportStatus-1].label }}
                        </template>
                        <template slot-scope="{ row }" slot="attachmentsNumber">
                            <Tooltip
                                content="点击查看附件！"
                                placement="top"
                                theme="light"
                            >
                                <a
                                    style="font-size: 16px; font-weight: 800"
                                    @click="golook(row)"
                                    >{{ row.attachmentsNumber }}</a
                                >
                            </Tooltip>
                        </template>
                        <template slot-scope="{ index }" slot="action">
                            <Tooltip
                                content="求修改！"
                                placement="top-start"
                                theme="light"
                            >
                                <Icon type="ios-create" @click="dyin(index)" />
                            </Tooltip>

                            <Tooltip
                                content="当前状态"
                                placement="top-start"
                                theme="light"
                            >
                                <Icon type="md-checkmark-circle" />
                            </Tooltip>
                        </template>
                    </Table>
                    <div class="botm">
                        <Page
                            :total="count"
                            :page-size-opts="[6, 9, 12]"
                            :page-size="search.limit"
                            show-total
                            show-elevator
                            show-sizer
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
import ajax from "@/api/ajax.js";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            count: 19,
           
            search: {
                    pageNum: 1,
                    limit: 12,
                    begin: "",
                    end: "",
                    reportStatus: "",
                    reportType: "",
            },
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
                    slot: "gmtCreate",
                    align: "center",
                    width: "150",
                },
                {
                    title: "报告类型",
                    key: "reportType",
                    align: "center",
                    width: "130",
                },
                {
                    title: "报告状态",
                    slot: "reportStatus",
                    align: "center",
                    width: "130",
                },
                {
                    title: "报告名称",
                    key: "reportName",
                    align: "center",
                    width: "260",
                },

                {
                    title: "地点",
                    key: "meetingPlace",
                    align: "center",
                },
                {
                    title: "附件",
                    slot: "attachmentsNumber",
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
            data1: [],
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

            cityList1: [
                {
                    value: "1",
                    label: "未提交",
                },
                {
                    value: "2",
                    label: "已提交",
                },
                {
                    value: "3",
                    label: "未审核",
                },
                {
                    value: "4",
                    label: "已审核",
                },
                {
                    value: "5",
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

        golook(row) {
            sessionStorage.setItem("look",JSON.stringify(row));
            if(row.reportType==="周例会"){
this.$router.push("/readhuiyi")
            }else if(row.reportType==="月度会议"){
                this.$router.push("/readyuedu");
            }
            // this.$router.push(`/readhuiyi/${row.name}`);
            
            
        },
        getsearch() {
            ajax(
                "http://192.168.0.91:8080/dh-meeting-title/searchConferesnceReport",
               this.search,
                "post"
            ).then((data) => {
                console.log(data);
                console.log(data.data.pageInfo.list);
                let oldarr = data.data.pageInfo.list;
                this.count=data.data.pageInfo.total
                console.log(oldarr);
                oldarr.forEach((item, index) => {
                    item.name = index + 1;
                    if (item.gmtModified) {
                        item.gmtModified = 0;
                    }
                });
                this.data1 = data.data.pageInfo.list;
            });
        },
        start(date) {
            this.search.begin = date;
        },
        end(date) {
            this.search.end = date;
        },
        goye(e) {
           this.search.pageNum=e;
           console.log(this.search.pageNum);
           this.getsearch()
        },
        numb(e) {
           this.search.limit=e;
           this.getsearch()
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getsearch();
    },
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
            height: 90%;
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
                .botm {
                    width: 90%;
                    display: flex;
                    margin-top: 0.7rem;
                    
                   
                    justify-content: flex-end;
                }
            }
        }
    }
}
</style>

