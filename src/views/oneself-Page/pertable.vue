<!-- 确认会议人员的记录页面 -->
<template>
    <div class="pettable">
        <div class="tabbox">
            <Table stripe :columns="columns1" :data="data1"></Table>
        </div>
        <div class="tree">
            <Tree
                :data="data4"
                :show-checkbox="true"
                :check-strictly="true"
                :check-directly="true"
                @on-check-change="select"
                select-node
            ></Tree>
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
                    title: "确认部门",
                    key: "name",
                    align: "center",
                },
                {
                    title: "确认责任人",
                    key: "age",
                    align: "center",
                },
                {
                    title: "确认时间",
                    key: "address",
                    align: "center",
                },
            ],
            data1: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03",
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01",
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02",
                },
                {
                    name: "Jon Snow",
                    age: 26,
                    address: "Ottawa No. 2 Lake Park",
                    date: "2016-10-04",
                },
            ],
            data4: [
                {
                    title: "parent 1",
                    expand: true,
                    children: [
                        {
                            title: "parent 1-1",
                            expand: true,
                            children: [
                                {
                                    title: "leaf 1-1-1",
                                    expand:true,
                                    children:[
                                        {
                                            title:"马帅涛",
                                            expand:true,
                                            children:[{
                                                title:"大货车"
                                            }]
                                        }
                                    ]
                                    // disabled: true
                                },
                                {
                                    title: "leaf 1-1-2",
                                },
                            ],
                        },
                        {
                            title: "parent 1-2",
                            expand: true,
                            children: [
                                {
                                    title: "leaf 1-2-1",
                                    // checked: true,
                                },
                                {
                                    title: "leaf 1-2-1",
                                },
                            ],
                        },
                    ],
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
        select(arr, item) {
            arr.forEach((item) => {
                item.checked = false;
            });
            item.checked = true;
            console.log(item.title);
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
<style lang="less">
.pettable {
    width: 100%;
    height: 100%;
    position: relative;
    // background-color: greenyellow;
    overflow: hidden;
    .tabbox {
        width: 580px;
        height: auto;
        min-height: 200px;
        border: 1px solid #ccc;
        margin: 40px auto;
    }
    .tree {
        width: 100px;
        .ivu-checkbox-inner {
            border-radius: 50%;
        }
    }
}
</style>

