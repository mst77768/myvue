<!-- 新增会议报告页面 -->
<template>
    <div class="addpage">
        <div class="xinbox">
            <div class="top">新增会议报告</div>
            <div class="inputbox">
                <div class="itme">
                    <b>报告类型：</b>
                    <Select
                        v-model="form.reportType"
                        clearable
                        style="width: 4.54rem"
                        @on-change="fn"
                    >
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <div class="itme">
                    <b>会议日期：</b>
                    <DatePicker
                        type="date"
                        placeholder="年/月/日"
                        :value="form.meetingDate"
                        @on-change="getdate"
                        style="width: 4.54rem"
                    ></DatePicker>
                </div>
                <div class="itme">
                    <b>报告名称：</b>
                    <Input
                        v-model="form.reportName"
                        placeholder="请输入..."
                        style="width: 4.54rem"
                    />
                </div>
            </div>
            <div class="addmain">
                <!-- 这里是tab两个大的自定义组件 -->
                <tab1 v-if="form.reportType === '周例会'" @fn="fn1" />
                <tab2 v-else />
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ajax from "@/api/ajax.js";
import tab1 from "./comment/tab1";
import tab2 from "./comment/tab2";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        tab1,
        tab2,
    },
    data() {
        //这里存放数据
        return {
            cityList: [
                {
                    value: "周例会",
                    label: "周例会",
                },
                {
                    value: "月度会议",
                    label: "月度会议",
                },
            ],
            form: {
                reportType: "周例会",
                meetingDate: "",
                reportName: "",
            },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn(index) {
            //一会要tab切换
            console.log(index);
        },
        fn1(data) {
            //拿到儿子传的值
            var str = localStorage.getItem("tab1") || "[]";
            let arr=JSON.parse(str);
            let newarr=[];
            arr.forEach(item => {
                let obj={
                    deptName:item.name,
                    reportContent:item.reportContent,
                    reportName:this.form.reportName,
                    meetingDate:this.form.meetingDate
                }
                newarr.push(obj)
            });
            newarr.push({
                deptName:"总裁",
                reportContent:data.textarea,
                reportName:this.form.reportName,
                meetingDate:this.form.meetingDate
            })
            console.log(newarr)
            let obj = JSON.parse(JSON.stringify(this.form));
           
            let bak = Object.assign(obj, data);//添加会议报告内容
            console.log(newarr)
            ajax("http://192.168.0.90:8011/dh-meeting-title/saveMreport",newarr,"post").then(date=>{
                console.log(date);
            })
            ajax(
                "http://192.168.0.90:8011/dh-meeting-title/saveMeeting",//添加会议表头
                bak,
                "post"
            ).then((data) => {
                console.log(data);
            });
            sessionStorage.removeItem("meet");//用完把他删除
        },
        getdate(date) {
            this.form.meetingDate = date;
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        if(sessionStorage.getItem("perform")){
            this.form=JSON.parse(sessionStorage.getItem("perform"))
        }
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
    beforeRouteLeave(to, from, next) {//组件里面的路由守卫
       if(to.path=="/person"){
           sessionStorage.setItem("perform",JSON.stringify(this.form))
           next()
       }else{
           if(sessionStorage.getItem("perform")){
               sessionStorage.removeItem("perform")
           }
           next()
       }
    },
};
</script>
<style lang="less" scoped>
.addpage {
    width: 100%;
    height: 100%;
    overflow-x: scroll;
    // overflow: hidden;
    font-size: 0.42rem;
    background-color: rgba(242, 242, 242, 1);
    .xinbox {
        width: 1147px;
        height: auto;
        margin: 8px auto;
        border: 1px solid #ccc;
        background-color: white;
        .top {
            width: 92%;
            height: 1.8rem;
            border-bottom: 1px solid #ccc;
            line-height: 1.8rem;
            margin: 0 auto;
            text-align: center;
            font-size: 18px;
        }
        .inputbox {
            width: 80%;
            height: 2.4rem;
            display: flex;
            margin-left: 1.8rem;

            justify-content: space-between;
            align-items: center;
            .itme b {
                font-size: 16px;
                font-weight: 500;
                margin-right: 0.33rem;
            }
        }
        .addmain {
            width: 90%;
            margin: 0 auto;
            height: auto;
            padding-bottom: 0.9rem;
        }
    }
}
</style>