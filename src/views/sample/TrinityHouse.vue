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
                        <Select v-model="model1" style="width:140px">
                            <Option
                                v-for="item in cityList"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div>
                        <span>航线：</span>
                        <Select v-model="model1" style="width:140px">
                            <Option
                                v-for="item in cityList"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div>
                        <span>海务主管：</span>
                        <Input
                            v-model="value14"
                            placeholder="请输入..."
                            clearable
                           
                        />
                    </div>
                    <div class="yue">
                        <span>月份范围：</span>
                        <DatePicker
                            type="date"
                            placeholder="__年__月__日"
                            style="width:140px"
                        ></DatePicker>
                        <div class="kong"></div>
                        <DatePicker
                            type="date"
                            placeholder="__年__月__日"
                            style="width:140px"
                        ></DatePicker>
                    </div>
                    <div>
                        <Button type="primary">查询</Button>
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
                    <template slot-scope="{ row }" slot="hch">
                        <a style="color: red" @click="goupdate(row.hch)">{{
                            row.hch
                        }}</a>
                        <!-- 这里是差异 -->
                    </template>
                </Table>
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
            hig:"",
            value14: "无休波",
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
            model1: "",
            columns2: [
                {
                    title: "月份",
                    key: "yue",
                    width: 130,
                },
                {
                    title: "船名",
                    key: "cm",
                    width: 100,
                },
                {
                    title: "航次号",
                    key: "hch",
                    width: 100,
                    slot: "hch",
                },
                {
                    title: "预算TC",
                    key: "ystc",
                    width: 100,
                },
                {
                    title: "业务主管",
                    key: "ywzg",
                    width: 100,
                },
                {
                    title: "运费",
                    key: "yf",
                    width: 100,
                },
                {
                    title: "滞期费",
                    key: "zq",
                    width: 100,
                },
                {
                    title: "佣金比例",
                    key: "yj",
                    width: 100,
                },
                {
                    title: "其他费用",
                    key: "qt",
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
                    key: "offstart",
                    width: 140,
                },
                {
                    title: "offhire结束时间",
                    key: "offend",
                    width: 140,
                },
                {
                    title: "间接offhire开始时间",
                    key: "jjoffstart",
                    width: 170,
                },
                {
                    title: "间接offhire结束时间",
                    key: "jjoffend",
                    width: 170,
                },
                {
                    title: "营运时间加油船舶抵达锚地时间",
                    key: "mdsj",
                    width: 150,
                },
                {
                    title: "营运时间加油结束时间",
                    key: "jssj",
                    width: 130,
                },
                {
                    title: "加油绕航距离",
                    key: "jyrhjl",
                    width: 130,
                },
                {
                    title: "创建时间",
                    key: "cjsj",
                    width: 110,
                },
            ],
            data3: [
                {
                    yue: "2020-11",
                    cm: "DH1",
                    hch: "V2001",
                    ystc: "3500",
                    ywzg: "严谨",
                    yf: "2960",
                    zq: "1200",
                    yj: "0.5",
                    qt: "1500",
                    zg1: "500",
                    xg1: "",
                    zg2: "",
                    xg2: "520",
                    zg3: "",
                    xg3: "",
                    zg4: "",
                    xg4: "",
                    zg5: "",
                    xg5: "",
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
         goupdate(a) {
            console.log(a);
            this.$router.push("TrinHousePage")
        },
         updta(){

            console.log(this.$refs.tables.exportCsv)
            this.$refs.tables.exportCsv({
                filename: `table-${(new Date()).valueOf()}.csv`
            })
        
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.hig=window.innerHeight/3*2
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
                div{
                    width: auto;
                    display: flex;
                    align-items: center;
                    span{
                        white-space: nowrap;
                        margin-right: 0.2rem;
                    }
                    .kong{
                        width: 0.3rem;
                    }
                    .ivu-btn {
                        margin-right: 0.33rem;
                        width: 2.5rem;
                    }
                }
                
            }
        }
        .tablebox{
            width: 99%;
            height: auto;
            margin: 0.8rem auto;
            border: 1px solid #ccc;
        }
    }
}
</style>
