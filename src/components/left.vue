<!--  -->
<template>
    <div class="templ">
        <Menu :open-names="['3-2']" theme="dark">
            <Submenu name="1" to="/nb">
                <template slot="title">
                    <Icon type="ios-menu" />
                    航次管理
                </template>
                <Submenu name="3">
                    <template slot="title">航次分析</template>
                    <MenuItem name="3-3" to="voyagetable"
                        >航次效益分析</MenuItem
                    >
                    <MenuItem name="3-2" to="contribution">贡献度分析</MenuItem>
                    
                    <MenuItem name="3-4" to="Trintyhouse">海务列表</MenuItem>
                </Submenu>
            </Submenu>
            <Submenu name="2">
                <template slot="title">
                    <Icon type="ios-paper" />
                    智能办公
                </template>
                <MenuItem name="2-1" to="huiyi">会议报告</MenuItem>
                <MenuItem name="2-2" to="rlzz">执行力跟踪</MenuItem>
            </Submenu>
            <Submenu name="4">
                <template slot="title">
                    <Icon type="ios-boat" />
                    设备管理
                </template>
                <MenuItem name="4-1" to="database">数据采集</MenuItem>
                <MenuItem name="4-2" to="iframe">数据监控</MenuItem>
                
            </Submenu>
        </Menu>
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
        return {};
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
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
.templ {
    width: 100%;
    height: 100%;
    ul {
        width: 100% !important;
    }
    .ivu-menu-dark {
        background-color: rgb(26, 191, 203);
        font-size: 21px;
        color: gray;
    }
}
</style>

