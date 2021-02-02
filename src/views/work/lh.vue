<!-- 模拟练习 -->
<template>
    <div class="lh">
        <h2 style="text-align: center">{{title}}</h2>
        <Table :columns="columns11" :data="data10" border height="500"></Table>
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
            columns11: [],
            data10: [],
            title:"",
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getcolumns() {
            let arr = [
                {
                    eq_id: "CBFDCYJZ",
                    eq_name: "船舶发电柴油机组",
                    sort: 1,
                    title_mark: 1,
                },
                {
                    eq_id: "YXZJ",
                    eq_name: "运行机组",
                    father_id: "CBFDCYJZ",
                    sort: 2,
                    value_type: "string",
                },
                {
                    eq_id: "DRYXXS",
                    eq_name: "当日运行小时",
                    father_id: "CBFDCYJZ",
                    sort: 3,
                    value_type: "int",
                },
                {
                    eq_id: "YXLJXS",
                    eq_name: "运行累计小时",
                    father_id: "CBFDCYJZ",
                    sort: 4,
                    value_type: "int",
                },
                {
                    eq_id: "QDKQYL",
                    eq_name: "启动空气压力",
                    father_id: "CBFDCYJZ",
                    sort: 5,
                    title_mark: 0,
                    value_type: "int",
                },
                {
                    eq_id: "ZS",
                    eq_name: "转速",
                    father_id: "CBFDCYJZ",
                    sort: 6,
                    title_mark: 0,
                    value_type: "int",
                },
                {
                    eq_id: "FJGL",
                    eq_name: "副机功率kW",
                    father_id: "CBFDCYJZ",
                    sort: 7,
                    title_mark: 0,
                    value_type: "int",
                },
                {
                    eq_id: "YL",
                    eq_name: "压力 Mpa",
                    father_id: "CBFDCYJZ",
                    sort: 8,
                    title_mark: 1,
                },
                {
                    eq_id: "YLHY",
                    eq_name: "滑油",
                    father_id: "YL",
                    grandfather_id: "CBFDCYJZ",
                    sort: 9,
                    title_mark: 1,
                },
                {
                    eq_id: "YLHYJK",
                    eq_name: "进口",
                    father_id: "YLHY",
                    grandfather_id: "YL",
                    great_grandfather_id: "CBFDCYJZ",
                    sort: 10,
                    value_type: "int",
                },
                {
                    eq_id: "YLHYCK",
                    eq_name: "出口",
                    father_id: "YLHY",
                    grandfather_id: "YL",
                    great_grandfather_id: "CBFDCYJZ",
                    sort: 21,
                    value_type: "int",
                },
                {
                    eq_id: "YLHS",
                    eq_name: "海水",
                    father_id: "YL",
                    grandfather_id: "CBFDCYJZ",
                    sort: 22,
                    title_mark: 1,
                },
                {
                    eq_id: "YLHSJK",
                    eq_name: "进口",
                    father_id: "YLHS",
                    grandfather_id: "YL",
                    great_grandfather_id: "CBFDCYJZ",
                    sort: 23,
                    value_type: "float",
                },
                {
                    eq_id: "YLHSCK",
                    eq_name: "出口",
                    father_id: "YLHS",
                    grandfather_id: "YL",
                    great_grandfather_id: "CBFDCYJZ",
                    sort: 24,
                    value_type: "float",
                },
                {
                    eq_id: "YLDS",
                    eq_name: "淡水",
                    father_id: "YL",
                    grandfather_id: "CBFDCYJZ",
                    sort: 25,
                    title_mark: 1,
                },
                {
                    eq_id: "YLDSJK",
                    eq_name: "进口",
                    father_id: "YLDS",
                    grandfather_id: "YL",
                    great_grandfather_id: "CBFDCYJZ",
                    "sort:": 26,
                    value_type: "float",
                },
                {
                    eq_id: "YLDSCK",
                    eq_name: "出口",
                    father_id: "YLDS",
                    grandfather_id: "YL",
                    great_grandfather_id: "CBFDCYJZ",
                    "sort:": 27,
                    value_type: "float",
                },
                {
                    eq_id: "YLRYJJ",
                    eq_name: "燃油进机",
                    father_id: "YL",
                    grandfather_id: "CBFDCYJZ",
                    sort: 28,
                    value_type: "float",
                },
                {
                    eq_id: "YTLQ",
                    eq_name: "油头冷却",
                    father_id: "YL",
                    grandfather_id: "CBFDCYJZ",
                    sort: 29,
                    value_type: "float",
                },
            ];
            // let colunsl1=[];
            this.title=arr[0].eq_name;
            let newarr=arr.filter(item=>{//取出所以输入的数据
                return item.value_type
            })
            
            console.log(newarr)
           
            
            
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getcolumns();
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        setTimeout(() => {
            this.columns11 = [
                {
                    title: "Name",
                    key: "name",
                    align: "center",
                    width: 200,
                },
                {
                    title: "Other",
                    align: "center",
                    children: [
                        {
                            title: "Age",
                            key: "age",
                            align: "center",
                            width: 200,
                            sortable: true,
                        },
                        {
                            title: "Address",
                            align: "center",
                            children: [
                                {
                                    title: "Street",
                                    key: "street",
                                    align: "center",
                                    width: 200,
                                },
                                {
                                    title: "Block",
                                    align: "center",
                                    children: [
                                        {
                                            title: "Building",
                                            key: "building",
                                            align: "center",
                                            width: 200,
                                            sortable: true,
                                        },
                                        {
                                            title: "Door No.",
                                            key: "door",
                                            align: "center",
                                            width: 200,
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "Company",
                    align: "center",
                    children: [
                        {
                            title: "Company Address",
                            key: "caddress",
                            align: "center",
                            width: 200,
                        },
                        {
                            title: "Company Name",
                            key: "cname",
                            align: "center",
                            width: 200,
                        },
                    ],
                },
                {
                    title: "Gender",
                    key: "gender",
                    align: "center",
                    width: 200,
                },
            ];
        }, 1000);
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.lh {
    font-size: 16px;
    width: 99%;
    height: 99%;
   
}
</style>