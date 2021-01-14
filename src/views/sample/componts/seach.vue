<!-- 航次效益分析表页面搜索表单组件 -->
<template>
    <div class="seach">
        <div class="seachbox" >
            <div>
                <span>船名: </span>
                <Select v-model="model1" style="width: 3.8rem">
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                    >
                </Select>
            </div>
            <div>
                <span>航次号:</span>
                <Select v-model="model1" style="width: 3.8rem">
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                    >
                </Select>
            </div>
            <div>
                <span>租家:</span>
                <Select v-model="model1" style="width: 3.8rem">
                    <Option
                        v-for="item in cityList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                    >
                </Select>
            </div>
            <div>
                <span>航线:</span>
                <Input
                    v-model="value14"
                    placeholder="请输入"
                    clearable
                    style="width: 4.54rem"
                />
            </div>
            <div class="yue">
                <span>月份范围:</span>
                <DatePicker
                    type="month"
                    placeholder="__年__月__日"
                    style="width: 3.6rem"
                    @on-change="fn"
                ></DatePicker>
                <div class="kong"></div>
                <DatePicker
                    type="month"
                    placeholder="__年__月__日"
                    style="width: 3.6rem"
                ></DatePicker>
            </div>
            <div><Button type="primary" style="width: 2.42rem">查询</Button></div>
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
            value14: "123",
            cityList: [
                {
                    value: "New York",
                    label: "dh2",
                },
                {
                    value: "London",
                    label: "dh3",
                },
                {
                    value: "Sydney",
                    label: "dh4",
                },
                {
                    value: "Ottawa",
                    label: "dh5",
                },
                {
                    value: "Paris",
                    label: "dh6",
                },
                {
                    value: "Canberra",
                    label: "dh10",
                },
            ],
            model8: "",
            model1: "",
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn(a, b) {
            //监听日期的改变
            console.log(a); //拿到了修改后的日期
            console.log(b); //这是日期的类型
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.seach {
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 50px;
    .ivu-select-selection{
        width: 100% !important;
    }
    .seachbox {
        width: 88%;
        margin-left: 30px;
        display: flex;
        height: 100%;
        align-content: center;
        justify-content: space-around;
        div {
            height: 100%;
            display: flex;
            align-items: center;
            width: auto;
            span {
                margin-right: 15px;
            }
        }
        .yue {
            // flex: 1.2;
            margin-left: 20px;
            .kong {
                width: 15px;
            }
        }
    }
}
</style>