<!-- 查看会议月度会议页面的 -->
<template>
    <div class="readyuedu" id="btn">
        <div class="box">
            <div class="banxin">
                <h2>会议报告</h2>
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
<style lang="less" scoped>
.readyuedu {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow-x: scroll;
    font-size: 0.42rem;
    background-color: rgba(242, 242, 242, 1);
    .box {
        width: 70%;
        background-color: white;
        margin: 0.33rem auto;
        height: 1800px;
        border: 1px solid #ccc;
        .banxin {
            width: 95%;
            height: 100%;
            margin: 0 auto;
            h2 {
                text-align: center;
                margin-top: 0.33rem;
                border-bottom: 1px solid #ccc;
                padding-bottom: 15px;
            }
        }
    }
}
</style>
