<!-- 确认会议人员的记录页面 -->
<template>
    <div class="pettable">
        <div class="tabbox">
            <Table stripe :columns="columns1" :data="data1"></Table>
        </div>
        <div class="btom">
            <Button type="primary" @click="$router.go(-1)">返回</Button>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ajax from "@/api/ajax.js"
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            columns1: [
                {
                    title: "确认部门",
                    key: "deptName",
                    align: "center",
                },
                {
                    title: "确认责任人",
                    key: "personInCharge",
                    align: "center",
                },
                {
                    title: "确认时间",
                    key: "consultDate",
                    align: "center",
                },
            ],
            data1: [
                
            ],
            
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        let obj=JSON.parse(sessionStorage.getItem("headerubd"))
        ajax("http://192.168.0.90:8011/dh-mdept-consult/finalConsult",{
             reportName:obj.reportName,
             meetingDate:obj.meetingDate 
        },"get").then(res=>{
            console.log(res.data.Consult)
            this.data1=res.data.Consult

        })
    },
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
    
    .btom{
        display: flex;
        justify-content: center;
    
    }
}
</style>

