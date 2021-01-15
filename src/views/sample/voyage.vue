<!-- 本页面是航次效益分析表页面 -->
<template>
    <div class="voyage">
        <Breadcrumb>
            <BreadcrumbItem to="/">航次管理</BreadcrumbItem>
            <BreadcrumbItem to="voyagetable">航次效益分析</BreadcrumbItem>
        </Breadcrumb>
        <div class="voyagebox">
            <div class="top">
                <ul v-if="flag">
                    <li
                        v-for="(item, index) in week"
                        :class="index == card ? 'ative' : ''"
                        :key="index"
                        @click="getweek(index)"
                    >
                        {{ item }}
                    </li>
                </ul>
                <div class="right">
                    <Button type="primary" con="ios-search" @click="nb"
                        >搜索</Button
                    >
                    <Button type="warning" @click="updta"> 导出</Button>
                </div>
            </div>
            <Seach v-if="!flag" />
            <div class="sumbox" v-if="!flag">
                <span>航次总数: 100</span>
                <span>货运总量: 100吨</span>
                <span>平均TC: 5000美金</span>
            </div>
            <div class="tabbox">
                <Table
                    border
                    stripe
                    :loading="loading"
                    
                    ref="tables"
                    :columns="columns4"
                    :data="data1"
                >
                    <template slot-scope="{ row }" slot="voyageEndTime">
                        {{ row.voyageEndTime.substring(0, 7).toString() }}
                    </template>
                    <template slot-scope="{ row }" slot="cha">
                        <a style="color: red" @click="golook(row)">
                            {{ (row.actualTc - row.idealTc).toFixed(2) }}
                        </a>
                        <!-- 这里是差异 -->
                    </template>
                </Table>
                <Switch v-model="loading"></Switch>
            </div>
            <div class="botm">
                <Page
                    :total="count"
                    :page-size-opts="[6, 9, 12]"
                    :page-size="limit"
                    show-total
                    show-elevator
                    show-sizer
                    @on-change="goye"
                    @on-page-size-change="numb"
                />
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ExportJsonExcel from "js-export-excel";
import Seach from "./componts/seach";
import ajax from "@/api/ajax.js";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Seach,
    },
    data() {
        //这里存放数据
        return {
            count: 0,
            limit:9,
            week: [],//用于存放周
            card: 0, //默认第一
            flag: true,//状态控制
            weekpage:1,
            columns4: [
                {
                    type: "selection",

                    align: "center",
                },
                {
                    title: "月份",
                    key: "voyageEndTime",
                    slot: "voyageEndTime",
                },
                {
                    title: "船名",
                    key: "vesselNo",
                },
                {
                    title: "航次号",
                    key: "voyageNo",
                },
                {
                    title: "币别",
                    key: "currency",
                },
                {
                    title: "船型",
                    key: "vesselType",
                },
                {
                    title: "航线",
                    key: "route",
                    tooltip: true,
                },
                {
                    title: "货品",
                    key: "cargo",
                },
                {
                    title: "货量",
                    key: "volume",
                },
                {
                    title: "租家",
                    key: "charterer",
                    tooltip: true,
                },
                {
                    title: "运费",
                    key: "idealFreight",
                },
                {
                    title: "预算TC",
                    key: "budgetTc",
                },
                {
                    title: "理想TC",
                    key: "idealTc",
                },
                {
                    title: "实际TC",
                    key: "actualTc",
                },
                {
                    title: "差异",
                    slot: "cha",
                    fixed: "right",
                },
            ],
            data1: [],//这里用于存放表格的数据也就是请求回来的数据
            loading: true,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
       async getweek(i) {//点击周请求每个周的数据请求
            this.card = i; //点击修改数据
             this.loading=true;
            let data=await ajax("/tcSummary/getTCSummary",{
                limit:this.limit,page:1,week:i
            },"post");
            console.log(data);
            this.data1=data.data.tcSummarys;
            this.count=data.data.voyageSum
            this.loading=false

        },
        nb() {
            this.flag = false;
        },
        golook(a) {
            //跳转到航次效益分析数据的页面
            localStorage.setItem("id", JSON.stringify(a));
            this.$router.push("voyageLook");
        },
        updta() {
            //导出表功能的实现
            const data = this.data1 ? this.data1 : ""; //表格数据
            var option = {};
            let dataTable = [];
            if (data) {
                for (let i in data) {
                    if (data) {
                        let obj = {
                            "月份": data[i].voyageEndTime,
                            "船名": data[i].vesselNo,
                            "航次号": data[i].voyageNo,
                            "币别": data[i].currency,
                            "船型": data[i].vesselType,
                            "航线": data[i].route,
                            "货品": data[i].cargo,
                            "货量": data[i].volume,
                            "租家": data[i].charterer,
                            "运费": data[i].idealFreight,
                            "预算TC": data[i].budgetTc,
                            "理想TC": data[i].idealTc,
                            "实际TC": data[i].actualTc,
                            "差异": (data[i].actualTc - data[i].idealTc).toFixed(
                                2
                            ),
                        };
                        dataTable.push(obj);
                    }
                }
            }
            option.fileName = "航次效益分析表";
            option.datas = [
                {
                    sheetData: dataTable,
                    sheetName: "sheet",
                    sheetFilter: ["月份", "船名", "航次号","币别","船型","航线","货品","货量","租家","运费","预算TC","理想TC","实际TC","差异"],
                    sheetHeader: ["月份", "船名", "航次号","币别","船型","航线","货品","货量","租家","运费","预算TC","理想TC","实际TC","差异"],
                },
            ];
            var toExcel = new ExportJsonExcel(option); 
            toExcel.saveExcel();
        },
        async getdata() {
            //异步获取页面的数据的方法
            let data = await ajax(
                "/tcSummary/getTCSummary",
                { limit: this.limit, page: 1, flag: 1 },
                "post"
            );
            
            console.log(data);
            let max = data.data.endWeek;
            console.log(max);
            if (max < 5) {
                console.log("afdsf");
                for (let i = max; i >= 1; i--) {
                    this.week.push(i + "w");
                }
                for (let i = 4 - max; i >= 0; i--) {
                    this.week.push(data.data.stratWeek + i + "w");
                }
            } else {
                for (let i = 1; i < 6; i++) {
                    this.week.push(max - i + "w");
                }
            }
            this.count = data.data.voyageSum;
            this.data1 = data.data.tcSummarys;
            console.log(data.data.tcSummarys);
            this.loading = false;
        },
       async pagedata(limit,page=1,){
            this.loading=true;
            let data=await ajax("/tcSummary/getTCSummary",{
                limit,page
            },"post");
            console.log(data);
            this.data1=data.data.tcSummarys
            this.loading=false

        },
        goye(page) {
            //页数切选
           this.pagedata(this.limit,page)
        },
        numb(tlel) {
            //一页几条切换事件
            console.log(tlel);
            this.limit=tlel;
            this.pagedata(this.limit,1)
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getdata();
    },
    mounted() {
         
    },
};
</script>
<style lang="less">
.voyage {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    // background-color: white;
    font-size: 0.42rem;
    .voyagebox {
        width: 100%;
        height: 97%;
        border: 1px solid #ccc;
        border-radius: 4px;
        background-color: white;
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .top {
            height: 60px;
            // background-color: red;
            width: 100%;
            position: relative;
            ul {
                li {
                    float: left;
                    width: 55px;
                    height: 30px;
                    text-align: center;
                    line-height: 30px;
                    font-weight: 700;
                    cursor: pointer;
                    background-color: rgba(170, 231, 234, 1);
                    border-right: 1px solid #ccc;
                    transition: all 0.3s;
                    &:hover {
                        color: white;
                    }
                }
                .ative {
                    color: white;
                    transform: scale(1.1, 1.1);
                    background-color: #3399cc;
                }
            }
            .right {
                width: 40%;
                position: absolute;
                right: 30px;
                top: 10px;
                height: 50px;
                text-align: right;
                .ivu-btn {
                    margin-right: 30px;
                    width: 80px;
                }
            }
        }
        .sumbox {
            display: flex;
            width: 50%;
            justify-content: space-around;
            height: 35px;
            align-items: center;
            margin-top: 3px;
            font-weight: 700;
            font-size: 0.44rem;
        }
        .tabbox {
            width: 99.5%;
            height: auto;
            margin: 0 auto;
            border: 1px solid #ccc;
            padding: 10px 10px;
            border-radius: 6px;
        }
        .botm {
            display: flex;
            justify-content: flex-end;
            width: 94%;
            margin-top: 1rem;
        }
    }
}
</style>
