<!-- 海务页面 -->
<template>
    <div class="TrinityHouse">
        <Breadcrumb>
            <BreadcrumbItem to="/">航次管理</BreadcrumbItem>
            <BreadcrumbItem to="Trintyhouse">海务填报</BreadcrumbItem>
        </Breadcrumb>
        <div class="tabbox">
            <div class="top">
                <div class="topxin">
                    <div>
                        <span>船名:</span>
                        <Select
                            v-model="form.dhVoybebVoyage.vesselNo"
                            style="width: 4.2rem"
                            clearable
                        >
                            <Option
                                v-for="item in cm"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div>
                        <span>航线：</span>
                        <Select
                            v-model="form.dhVoybebVoyage.route"
                            style="width: 4.2rem"
                            clearable
                        >
                            <Option
                                v-for="item in hx"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div>
                        <span>海务主管：</span>

                        <Select
                            v-model="form.dhVoybebVoyage.maritimeOfficer"
                            style="width: 4.2rem"
                            clearable
                        >
                            <Option
                                v-for="item in zg"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="yue">
                        <span>月份范围：</span>
                        <DatePicker
                            type="datetime"
                            placeholder="__年__月__日"
                            style="width: 4.2rem"
                            @on-change="start"
                        ></DatePicker>
                        <div class="kong"></div>
                        <DatePicker
                            type="datetime"
                            placeholder="__年__月__日"
                            style="width: 4.2rem"
                            @on-change="end"
                        ></DatePicker>
                    </div>
                    <div>
                        <Button type="primary" @click="seach">查询</Button>
                        <div class="kong"></div>
                        <Button type="warning" class="btn" @click="updta"
                            >导出</Button
                        >
                    </div>
                </div>
            </div>
            <div class="tablebox">
                <Table
                    border
                    :columns="columns2"
                    :data="data3"
                    :height="hig"
                    ref="tables"
                >
                    <template slot-scope="{ row }" slot="updateTime">
                        <span v-if="row.updateTime">
                            {{ row.updateTime.substring(0, 7) }}
                        </span>
                        <span v-else> </span>

                        <!-- 这里是显示月份的 -->
                    </template>
                    <template slot-scope="{ row }" slot="voyageNo">
                        <a style="color: red" @click="goupdate(row)">
                            {{ row.voyageNo }}</a
                        >
                        <!-- 这里是差异 -->
                    </template>
                    <template slot-scope="{ row }" slot="zg1">
                        {{ row.zg1.portName }}
                        <!-- 这里是显示月份的 -->
                    </template>
                    <template slot-scope="{ row }" slot="xg1">
                        {{ row.xg1.portName }}
                        <!-- 这里是显示月份的 -->
                    </template>
                </Table>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ExportJsonExcel from "js-export-excel";
import ajax from "@/api/ajax.js";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            hig: "", //表格的高度
            form: {
                //表单的数据双向数据绑定
                dhVoybebVoyage: {
                    vesselNo: "",
                    route: "",
                    maritimeOfficer: "",
                },
                startTime: "",
                endTime: "",
                limit: 10,
                page: 1,
            },
            cm: [],
            hx: [],
            zg: [],
            cityList: [
                {
                    value: "New York",
                    label: "New York",
                },
                {
                    value: "London",
                    label: "London",
                },
                {
                    value: "Sydney",
                    label: "Sydney",
                },
                {
                    value: "Ottawa",
                    label: "Ottawa",
                },
                {
                    value: "Paris",
                    label: "Paris",
                },
                {
                    value: "Canberra",
                    label: "Canberra",
                },
            ],
            loading1: "",
            columns2: [
                {
                    title: "月份",
                    slot: "updateTime",
                    width: 130,
                },
                {
                    title: "船名",
                    key: "vesselNo",
                    width: 100,
                },
                {
                    title: "航次号",
                    slot: "voyageNo",
                    width: 100,
                    
                },
                {
                    title: "预算TC",
                    key: "budgetTc",
                    width: 100,
                },
                {
                    title: "海务主管",
                    key: "salesManager",
                    width: 100,
                },
                {
                    title: "运费",
                    key: "freight",
                    width: 100,
                },
                {
                    title: "滞期费",
                    key: "demurrage",
                    width: 100,
                },
                {
                    title: "佣金比例",
                    key: "commissionRatio",
                    width: 100,
                },
                {
                    title: "其他费用",
                    key: "otherMoney",
                    width: 100,
                },
                {
                    title: "装港1港使费",
                    key: "zg1",
                    width: 130,
                },
                {
                    title: "卸港1港使费",
                    key: "xg1",
                    width: 130,
                },
                {
                    title: "装港2港使费",
                    key: "zg2",
                    width: 130,
                },
                {
                    title: "卸港2港使费",
                    key: "xg2",
                    width: 130,
                },
                {
                    title: "装港3港使费",
                    key: "zg3",
                    width: 130,
                },
                {
                    title: "卸港3港使费",
                    key: "xg3",
                    width: 130,
                },
                {
                    title: "装港4港使费",
                    key: "zg4",
                    width: 130,
                },
                {
                    title: "卸港4港使费",
                    key: "xg4",
                    width: 130,
                },
                {
                    title: "装港5港使费",
                    key: "zg5",
                    width: 130,
                },
                {
                    title: "卸港5港使费",
                    key: "xg5",
                    width: 130,
                },
                {
                    title: "offhire开始时间",
                    key: "offhireStartTime",
                    width: 140,
                },
                {
                    title: "offhire结束时间",
                    key: "offhireEndTime",
                    width: 140,
                },
                {
                    title: "间接offhire开始时间",
                    key: "indirectOffhireStartTime",
                    width: 170,
                },
                {
                    title: "间接offhire结束时间",
                    key: "indirectOffhireStartTime",
                    width: 170,
                },
                {
                    title: "营运时间加油船舶抵达锚地时间",
                    key: "droppedAnchor",
                    width: 150,
                },
                {
                    title: "营运时间加油结束时间",
                    key: "refuelingShipEndTime",
                    width: 130,
                },
                {
                    title: "加油绕航距离",
                    key: "rgDistance",
                    width: 130,
                },
                {
                    title: "创建时间",
                    key: "createTime",
                    width: 110,
                },
            ],
            data3: [], //该数组用于存放表格数据
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        math(arr, newarr) {
            arr.forEach((item) => {
                let obj = {
                    label: item,
                    value: item,
                };
                newarr.push(obj);
            });
        },
        start(date) {
            //获取开始的时间
            this.form.startTime = date;
        },
        end(date) {
            //获取结束的时间
            // this.form.endTime = date;
            this.form.endTime = date;
            // console.log(this.form);
        },
        goupdate(row) {
            //用于路由跳转页面
            console.log(row);
            sessionStorage.setItem("haiwu", JSON.stringify(row));
            this.$router.push("TrinHousePage");
        },
        updta() {
            //该方法用于打印表格数据
            // console.log(this.$refs.tables.exportCsv);
            // this.$refs.tables.exportCsv({
            //     filename: `table-${new Date().valueOf()}.csv`,
            // });
            const data = this.data3 ? this.data3 : ""; //表格数据
            var option = {};
            let dataTable = [];
            if (data) {
                for (let i in data) {
                    if (data) {
                        let obj = {
                            月份: data[i].updateTime,
                            船名: data[i].vesselNo,
                            航次号: data[i].voyageNo,
                            预算TC: data[i].budgetTc,
                            海务主管: data[i].vesselType,
                            运费: data[i].freight,
                            滞期费: data[i].demurrage,
                            佣金比例: data[i].commissionRatio,
                            其他费用: data[i].otherMoney,
                            装港1港使费: data[i].zg1,
                            卸港1港使费: data[i].xg1,
                            装港2港使费: data[i].zg2,
                            卸港2港使费: data[i].xg2,
                            装港3港使费: data[i].zg3,
                            卸港3港使费:data[i].xg3,
                            装港4港使费:data[i].zg4,
                            卸港4港使费:data[i].xg4,
                            装港5港使费:data[i].zg5,
                            卸港5港使费:data[i].xg5,
                            offhire开始时间:data[i].offhireStartTime,
                            offhire结束时间:data[i].offhireEndTime,
                            间接offhire开始时间:data[i].indirectOffhireStartTime,
                            间接offhire结束时间:data[i].indirectOffhireStartTime,
                            营运时间加油船舶抵达锚地时间:data[i].droppedAnchor,
                            营运时间加油结束时间:data[i].refuelingShipEndTime,
                            加油绕航距离:data[i].rgDistance,
                            创建时间:data[i].createTime,
                        };
                        dataTable.push(obj);
                    }
                }
            }
            option.fileName = "海务填报表";
            option.datas = [
                {
                    sheetData: dataTable,
                    sheetName: "sheet",
                    sheetFilter: [
                        "月份",
                        "船名",
                        "航次号",
                        "预算TC",
                        "海务主管",
                        "运费",
                        "滞期费",
                        "佣金比例",
                        "其他费用",
                        "装港1港使费",
                        "卸港1港使费",
                        "装港2港使费",
                        "卸港2港使费",
                        "装港3港使费",
                        "卸港3港使费",
                        "装港4港使费",
                        "卸港4港使费",
                        "装港5港使费",
                        "卸港5港使费",
                        "offhire开始时间",
                        "offhire结束时间",
                        "间接offhire开始时间",
                        "间接offhire结束时间",
                        "营运时间加油船舶抵达锚地时间",
                        "营运时间加油结束时间",
                        "加油绕航距离",
                        "创建时间",

                    ],
                    sheetHeader: [
                        "月份",
                        "船名",
                        "航次号",
                        "预算TC",
                        "海务主管",
                        "运费",
                        "滞期费",
                        "佣金比例",
                        "其他费用",
                        "装港1港使费",
                        "卸港1港使费",
                        "装港2港使费",
                        "卸港2港使费",
                        "装港3港使费",
                        "卸港3港使费",
                        "装港4港使费",
                        "卸港4港使费",
                        "装港5港使费",
                        "卸港5港使费",
                        "offhire开始时间",
                        "offhire结束时间",
                        "间接offhire开始时间",
                        "间接offhire结束时间",
                        "营运时间加油船舶抵达锚地时间",
                        "营运时间加油结束时间",
                        "加油绕航距离",
                        "创建时间",
                    ],
                },
            ];
            var toExcel = new ExportJsonExcel(option);
            toExcel.saveExcel();

        },
        async getdata(form) {
            //该方法用于请求数据
            let data = "";
            if (form) {
                data = await ajax(
                    "/dhVoybebHwsr/getDhVoybebHwsr",
                    form,
                    "post"
                );
            } else {
                data = await ajax(
                    "/dhVoybebHwsr/getDhVoybebHwsr",
                    {
                        //请求接口并返回数据
                        page: 1,
                        limit: 10,
                    },
                    "post"
                );
            }

            console.log(data);
            let arr = data.data.dhVoybebHwsrList;
            for (let i = 0; i < arr.length; i++) {
                //该方法把数据特殊处理一下
                let item = arr[i].dhVoybebPortChargeMap;
                for (let key in item) {
                    arr[i][key] =
                        item[key].portName + "(" + item[key].portCharge + ")";
                }
            }
            console.log(arr);
            this.data3 = arr; //将请求的数据赋值给data3变量
        },
        async getda() {
            let res = await ajax("/common/getSelectDhVoybebHwsr", {}, "get");
            console.log(res.data);

            //    this.zg=res.data.maritimeOfficerList;
            this.math(res.data.maritimeOfficerList, this.zg);
            console.log(res.data.routeList);
            this.math(res.data.routeList, this.hx);
            console.log(res.data.vesselNoList);
            this.math(res.data.vesselNoList, this.cm);
        },
        remoteMethod1(query) {
            if (query !== "") {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    const list = this.zg.map((item) => {
                        return {
                            value: item,
                            label: item,
                        };
                    });
                    this.zg = list.filter(
                        (item) => item.label.indexOf(query) != -1
                    );
                }, 100);
            } else {
                this.zg = [];
            }
        },
        seach() {
            console.log(this.form);
            this.getdata(this.form);
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getdata(); //请求数据
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.hig = (window.innerHeight / 3) * 2;
        console.log(new Date());

        this.getda();
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.TrinityHouse {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    font-size: 0.42rem;
    .tabbox {
        width: 100%;
        height: 97%;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .top {
            width: 100%;
            height: 1.5rem;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            margin-top: 0.6rem;
            .topxin {
                width: 82%;
                margin-left: 1.1rem;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: space-around;
                div {
                    width: auto;
                    display: flex;
                    align-items: center;
                    span {
                        white-space: nowrap;
                        margin-right: 0.2rem;
                    }
                    .kong {
                        width: 0.3rem;
                    }
                    .ivu-btn {
                        margin-right: 0.33rem;
                        width: 2.5rem;
                    }
                }
            }
        }
        .tablebox {
            width: 99%;
            height: auto;
            margin: 0.8rem auto;
            border: 1px solid #ccc;
        }
    }
}
</style>
