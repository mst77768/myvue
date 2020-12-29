<!--  -->
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
            <Seach v-if="!flag"/>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import Seach from "./componts/seach"
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        Seach
    },
    data() {
        //这里存放数据
        return {
            
            week: ["51w", "52w", "53w", "54w", "55w"],
            card: 0, //默认第一
            flag: true,
            columns4: [
                {
                    type: "selection",
                    width: 60,
                    align: "center",
                },
                {
                    title: "月份",
                    key: "yue",
                },
                {
                    title: "船名",
                    key: "chaun",
                },
                {
                    title: "航次号",
                    key: "hangchihao",
                },
                {
                    title: "币别",
                    key: "bibie",
                },
                {
                    title: "船型",
                    key: "chuanxing",
                },
                {
                    title: "航线",
                    key: "hangxian",
                },
                {
                    title: "货品",
                    key: "huopin",
                },
                {
                    title: "货量",
                    key: "huoliang",
                },
                {
                    title: "租家",
                    key: "zhujia",
                },
                {
                    title: "运费",
                    key: "yufei",
                },
                {
                    title: "预算TC",
                    key: "Tc",
                },
                {
                    title: "理想TC",
                    key: "lTc",
                },
                {
                    title: "实际TC",
                    key: "STc",
                },
                {
                    title: "差异",
                    key: "cha",
                    slot: "cha",
                    fixed: "right",
                },
            ],
            data1: [
                {
                    yue: "2020-12",
                    chaun: "DHA",
                    hangchihao: "V2001",
                    bibie: "RBM",
                    chuanxing: "8K",
                    hangxian: "A-B",
                    huopin: "乙醇",
                    huoliang: "4200吨",
                    zhujia: "中海壳",
                    yufei: "1000W",
                    Tc: "2500",
                    lTc: "2800",
                    STc: "2300",
                    cha: "-500",
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
        getweek(i) {
            this.card = i; //点击修改数据
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
            console.log(this.$refs.tables.exportCsv);
            this.$refs.tables.exportCsv({
                filename: `table-${new Date().valueOf()}.csv`,
            });
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        var data = this.data1[0];
        for (let i = 0; i < 15; i++) {
            this.data1.push(data);
        }
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
    }
}
</style>
