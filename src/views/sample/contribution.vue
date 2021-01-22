<!-- 贡献度分析页面 -->
<template>
    <div class="contribution">
        <Breadcrumb>
            <BreadcrumbItem to="/">航次管理</BreadcrumbItem>
            <BreadcrumbItem to="contribution">贡献度分析</BreadcrumbItem>
        </Breadcrumb>
        <div class="conbox">
            <div class="topbox">
                <div class="top">
                    <div class="npm nb">
                        <span>船名: </span>
                        <Select v-model="form.dhVoybebVoyage.vesselNo" clearable style="width: 4.5rem">
                            <Option
                                v-for="item in cm"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="nb">
                        <span>航线: </span>
                        <Select v-model="form.dhVoybebVoyage.route" clearable style="width: 4.5rem">
                            <Option
                                v-for="item in hx"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="nb">
                        <span>船队总管: </span>
                        
                        <Select v-model="form.dhVoybebVoyage.fleetManager" clearable style="width: 4.5rem">
                            <Option
                                v-for="item in cd"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="nb">
                        <span> 海务主管: </span>
                        
                         <Select v-model="form.dhVoybebVoyage.maritimeOfficer" clearable style="width: 4.5rem">
                            <Option
                                v-for="item in hw"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="nb">
                        <span>时间范围: </span>
                        <DatePicker
                            type="datetime"
                            placeholder="__年__月_日"
                            @on-change="start"
                        ></DatePicker>
                        <span class="kong">~</span>
                        <DatePicker
                            type="datetime"
                            placeholder="__年__月_日"
                            @on-change="end"
                        ></DatePicker>
                        <Button type="primary" @click="search">查询</Button>
                    </div>
                </div>
            </div>

            <div class="sumbox">
                <div class="contrleft">
                    <div class="hsum">航次总数: {{voyageSum}}</div>
                    <div class="Tc">TC损失:{{Number(tcSum)}}美金</div>
                </div>
                <div><Button type="warning" @click="updta">导出</Button></div>
            </div>
            <div class="tabbox">
                <Table
                    border
                    ref="tables"
                    :columns="columns4"
                    :data="data1"
                    @on-select="fn"
                    :height="hig"
                >
                 <template slot-scope="{row}" slot="voyageEndTime">
                  <span>{{row.voyageEndTime.substring(0,7)}}</span>
        </template>
                </Table>
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
            form:{
               endTime:"",
               startTime:"",
               limit:"",
               page:"",
               dhVoybebVoyage:{
                   vesselNo:"",
                   route:"",
                   fleetManager:"",
                   maritimeOfficer:"",
               }
            },
            hig: "",
            limit:6,
            count:0,
            tcSum:"",
            value14:"",
            voyageSum:"",
            cm:[],
            cd:[],
            hw:[],
            hx:[],
            model1: "",
            columns4: [
                {
                    type: "selection",
                    width: 60,
                    align: "center",
                },
                {
                    title: "月份",
                    slot: "voyageEndTime",
                    width: 90,
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
                    title: "航线",
                    key: "route",
                    tooltip: true,
                },
                {
                    title: "币种",
                    key: "currency",
                },
                {
                    title: "理想TC",
                    key: "idealTc",
                    tooltip: true,
                },
                {
                    title: "实际TC",
                    key: "actualTc",
                    tooltip: true,
                },
                {
                    title: "速度影响-转速",
                    width: 130,
                    key: "rotationalSpeedOffhire",
                },
                {
                    title: "速度影响-天气",

                    key: "weatherOffhire",
                    width: 130,
                },
                {
                    title: "卸货速度",
                    key: "dischargeCargoSpeedOffhire",
                    width: 120,
                },
                {
                    title: "在港时间",
                    key: "atportDateOffhire",
                    width: 120,
                },
                {
                    title: "吃水",
                    key: "draftOffhire",
                },
                {
                    title: "燃油",
                    key: "fueloilOffhire",
                },
                {
                    title: "加油",
                    key: "addOilOffhire",
                },
                {
                    title: "offhire",
                    key: "offhireOffhireExplanation",
                },
                {
                    title: "间接offhire",
                    width: 110,
                    key: "indirectOffhireOffhire",
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
        fn(a) {
            console.log(a);
        },
        math(arr,newarr){
            arr.forEach(item => {
                let obj={
                    label:item,
                    value:item,
                }
                newarr.push(obj)
            });
        },
       async getda(){
           let res=await ajax("/common/getSelectContributionSummary",{},"get");
           this.math(res.data.fleetManagerList,this.cd)
           this.math(res.data.maritimeOfficerList,this.hw);
           this.math(res.data.routeList,this.hx);
           this.math(res.data.vesselNoList,this.cm)  
        },
        updta() {//此功能用于导出表格功能
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
                            "航线": data[i].route,
                            "币种":data[i].currency,
                            "预算TC": data[i].budgetTc,
                            "理想TC": data[i].idealTc,
                            "实际TC": data[i].actualTc,
                            "速度影响-转速":data[i].rotationalSpeedOffhire,
                            "速度影响-天气":data[i].weatherOffhire,
                            "卸货速度":data[i].dischargeCargoSpeedOffhire,
                            "在港时间":data[i].atportDateOffhire,
                            "吃水":data[i].draftOffhire,
                            "燃油":data[i].fueloilOffhire,
                            "加油":data[i].addOilOffhire,
                            "offhire":data[i].offhireOffhireExplanation,
                            "间接offhire":data[i].indirectOffhireOffhire
                            
                        };
                        dataTable.push(obj);
                    }
                }
            }
            option.fileName = "贡献度分析表";
            option.datas = [
                {
                    sheetData: dataTable,
                    sheetName: "sheet",
                    sheetFilter: ["月份", "船名", "航次号","航线","币种","理想TC","实际TC","速度影响-转速","速度影响-天气","卸货速度","在港时间","吃水","燃油","加油","offhire","间接offhire"],
                    sheetHeader: ["月份", "船名", "航次号","航线","币种","理想TC","实际TC","速度影响-转速","速度影响-天气","卸货速度","在港时间","吃水","燃油","加油","offhire","间接offhire"],
                },
            ];
            var toExcel = new ExportJsonExcel(option); 
            toExcel.saveExcel();
        },
        getdata(limit = 6, page = 1) {
            ajax(
                "/contributionSummary/getDhVoybebContributionSummary",
                {
                    limit,
                    page,
                },
                "post"
            ).then((data) => {
               
                this.voyageSum=data.data.voyageSum;
                this.tcSum=data.data.tcSum
               
                this.data1=data.data.ContributionSummarys
                this.count=data.data.voyageSum;
            });
        },
        goye(e){
           this.page=e;
           this.getdata(this.limit,this.page)
        },
        numb(e){
           this.limit=e;
           this.getdata(this.limit,this.page)
        },
        start(data){
          this.form.startTime=data;
        },
        end(data){
          this.form.endTime=data;
        },
       async search(){
            this.form.limit=this.limit;
            this.form.page=1;
            let res=await ajax("/contributionSummary/getDhVoybebContributionSummary",this.form,"post");
            console.log(res)
            this.voyageSum=res.data.voyageSum;
            this.tcSum=res.data.tcSum
            this.data1=res.data.ContributionSummarys;
            this.count=res.data.voyageSum;
            
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getdata();
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.getda()
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
.contribution {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    font-size: 0.42rem;
    .conbox {
        width: 100%;
        height: 97%;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .topbox {
            width: 100%;
            height: 1.51rem;
            margin-top: 0.75rem;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .top {
                display: flex;
                // background-color: red;
                height: 100%;
                width: 99%;
                align-items: center;
                .npm {
                    margin-left: 1.06rem;
                }
                .nb {
                    width: auto;
                    height: 100%;
                    margin-right: 0.6rem;
                    display: flex;
                    align-items: center;
                    .ivu-date-picker {
                        margin-right: 0;
                    }
                    span {
                        margin-right: 0.25rem;
                        white-space: nowrap;
                    }
                    .kong {
                        margin: 0.33rem;
                    }
                    .ivu-btn {
                        margin-left: 3.21rem;
                        width: 2.72rem;
                    }
                }
            }
        }

        .sumbox {
            display: flex;
            width: 95%;
            height: 1.5rem;
            justify-content: space-between;
            align-items: center;
            .contrleft {
                width: 60%;
                display: flex;
                div {
                    width: 30%;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
            }
            .ivu-btn {
                width: 2.72rem;
            }
        }
        .tabbox {
            width: 99%;
            height: auto;
            margin: 0 auto;
            padding: 0.33rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            .botm {
                display: flex;
                width: 96%;
                justify-content: flex-end;
                align-items: center;
                height: 50px;
            }
        }
    }
}
</style>

