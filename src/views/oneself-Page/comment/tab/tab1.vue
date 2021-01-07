<!--  -->
<template>
    <div class="n1">
        <div class="main">
            <div class="itme" v-for="(item, index) in arr" :key="index">
                <div class="mtop">
                    <Input
                        v-model="item.value16"
                        size="large"
                        show-word-limit
                        placeholder="编辑标题（例：一、本月重要工作和成绩）"
                        style="width: 100%"
                    >
                        <span slot="prepend">标题{{ index + 1 }}:</span>
                    </Input>
                </div>
                <div class="bb">
                    <Input
                        v-model="item.value6"
                        type="textarea"
                        :rows="9"
                        placeholder="请输入正文
（例：1完成DHG接船并顺利投入营运。2收入、利润、安全管理分别取得靓丽的成绩！）"
                    />
                </div>
            </div>
            <p class="ip" @click="add">+新增</p>
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
            arr: [
                {
                    value16: "",
                    value6: "",
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
        add() {
            let obj = {
                value16: "",
                value6: "",
            };
            this.arr.push(obj);
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
.n1 {
    width: 100%;
    // min-height: 700px;
    padding-bottom: 30px;
    height: auto;
    
    .main {
        width: 100%;
        height: auto;
        border: 1px solid #ccc;
        .itme {
            width: auto;
            height: auto;
        }
        .ip {
            height: 35px;
            border: 1px dashed #ccc;
            text-align: center;
            line-height: 35px;
            cursor: pointer;
            &:hover {
                border-color: blue;
                color: blue;
            }
        }
        .mtop {
            display: flex;
            align-items: center;
            height: 50px;
            margin: 2px auto;
            font-weight: 800;
            font-size: 18px;
            color: black;
            .ivu-input-type-text {
                font-size: 25px;
                font-weight: 800;
            }
        }
        .bb {
            margin-top: 15px;
        }
    }
}
</style>