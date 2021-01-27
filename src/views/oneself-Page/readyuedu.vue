<!-- 查看会议月度会议页面的 -->
<template>
    <div class="readyuedu" id="btn">
        <div class="box">
            <Icon type="md-print" class="bbbq"   v-print="'#btn'"/>
            <div class="banxin">
                <h2>会议报告</h2>
                <div class="top">
                    <div class="item">
                      <b>报告类型:</b>
                      <Input v-model="form.reportType" style="width: 200px" />
                    </div>
                    <div class="item">
                       <b>报告日期：</b>
                        <DatePicker type="date" :value="form.meetingDate" style="width: 200px"></DatePicker>
                    </div>
                    <div class="item">
                       <b>报告名称：</b>
                        <Input v-model="form.reportName"  style="width: 200px" />
                    </div>
                </div>
                <div class="banner">
                       <tab :arr="arr" :arr2="arr2"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ajax from "@/api/ajax.js"
import tab from "./comment/Ytab"
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        tab
    },
    data() {
        //这里存放数据
        return {
            form:{},
            arr: [
                "月度总结",
                "2020部门目标",
                "2020核心目标和措施",
                "2020－2030利润目标",
                "2020－2022员工收入目标",
                "管理四项基本原则",
                "绩效处罚",
            ],
            arr2: [
                
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
        console.log(JSON.parse(sessionStorage.getItem("look")))
        let obj=JSON.parse(sessionStorage.getItem("look"))
        ajax(
            "http://192.168.0.90:8011/dh-mreport/SelReport",
            {
                reportType: obj.reportType,
                reportName: obj.reportName,
                meetingDate: obj.meetingDate,
            },
            "get").then(data=>{
                console.log(data)
                this.arr2=data.data.Report;
                console.log(this.arr2)
                this.form=data.data.MeTile[0];
                console.log(this.form)
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
<style lang="less" scoped>
.readyuedu {
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    font-size: 0.42rem;
    background-color: rgba(242, 242, 242, 1);
    .box {
        width: 1230px;
        background-color: white;
        margin: 0.33rem auto;
        height: auto;
        padding-bottom: 40px;
        position: relative;
        border: 1px solid #ccc;
        .bbbq{
            position: absolute;
            right: 50px;
            top: 20px;
            font-size: 30px;
            color: #83c7ff;
        }
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
            .top{
                display: flex;
                justify-content: space-around;
                margin-top: 20px;
                .item{
                    b{
                        margin-right: 10px;
                    }
                }
            }
            .banner{
                width: 100%;
                height: auto;
                margin-top: 30px;
            }
        }
    }
}
</style>
