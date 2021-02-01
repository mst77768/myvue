<!-- 修改月度会议 -->
<template>
    <div class="updateyue">
        <div class="xinbox">
            <div class="top">月例会修改</div>
            <div class="inputbox">
                <div class="itme">
                    <b>报告类型：</b>
                  
                    <Input
                        v-model="form.reportType"
                        placeholder="请输入..."
                        style="width: 4.54rem"
                        
                    />
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
                <div class="tab2">
                    <div class="top1">
                        
                    </div>
                    <div class="mainx">
                        <div class="tab">
                            <div class="n1">
                                <div class="main">
                                    <div
                                        class="itme"
                                        v-for="(item, index) in arr"
                                        :key="index"
                                    >
                                        <div class="mtop">
                                            <Input
                                                v-model="item.reportTitle"
                                                size="large"
                                                show-word-limit
                                                placeholder="编辑标题（例：一、本月重要工作和成绩）"
                                                style="width: 100%"
                                            >
                                                <span slot="prepend"
                                                    >标题{{ index + 1 }}:</span
                                                >
                                            </Input>
                                        </div>
                                        <div class="bb">
                                            <Input
                                                v-model="item.reportContent"
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
                        </div>
                        <div class="updatab">
                            <Upload
                                multiple
                                action="http://192.168.0.91:8011/ossservice/oss/upload"
                                
                            >
                                <Button icon="ios-cloud-upload-outline"
                                    >上传附件</Button
                                >
                            </Upload>
                        </div>
                        <div class="bomt">
                            <Button size="large" type="primary" 
                            @click="sumbit"
                                >修改</Button
                            >
                           
                            <Button
                                size="large"
                                type="success"
                                @click="$router.push('huiyi')"
                                >取消</Button
                            >
                        </div>
                    </div>
                </div>
            </div>
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
            form: {
                meetingDate: "",
                meetingPlace: "",
                participation: "",
                reportName: "",
                reportType: "月度会议",
                absent: "",
            },
            arr:[],
            oldmeetingDate:"",
            oldreportName:"",
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
      async getslete(){
            let look=JSON.parse(sessionStorage.getItem("look"));
            console.log(look)
            let meetingDate=look.meetingDate;
            let reportName=look.reportName;
            console.log(meetingDate)
            console.log(reportName)
            let res=await ajax(`http://192.168.0.91:8011//dh-mreport/monthlyMeetingEcho/${meetingDate}/${reportName}`,{},"get");
            console.log(res.data.echo.children)
            console.log(res.data.echo)
            this.form.meetingDate=res.data.echo.meetingDate;
            this.form.reportName=res.data.echo.reportName;
            this.form.titleName=res.data.echo.titleName;
            this.oldreportName=res.data.echo.reportName;
            this.oldmeetingDate=res.data.echo.meetingDate;
            console.log(res.data.echo.reportName)
            // this.form.reportName=res.data.echo.reportName
            this.arr=res.data.echo.children
        },
        add(){
            let obj={
                reportContent:"",
                reportTitle:""
            }
            this.arr.push(obj)
        },
        sumbit(){
            let index=0;
            let arr=["http://192.168.0.91:8011//dh-mreport/updateInsertMonthlyMeeting","http://192.168.0.91:8011//dh-mreport/updateMonthlyMeeting"];
            if(this.oldmeetingDate==this.form.meetingDate&&this.oldreportName==this.form.reportName){
                  index=1
            }
            let children=[];
            for(let i=0;i<this.arr.length;i++){
                if(this.arr[i].reportTitle.trim().length==0){
                    return false
                }else{
                    let obj={
                        reportContent:this.arr[i].reportContent,
                        reportTitle:this.arr[i].reportTitle
                    }
                    children.push(obj)
                }
            }
            let form={
                meetingDate:this.form.meetingDate,
                titleName:this.form.titleName,
                reportName:this.form.reportName,
                reportStatus:2,
                children:children
            }
            ajax(arr[index],form,"post").then(res=>{
                console.log(res.code)
                if(res.code==200){
                    this.$Message.success('修改成功');
                    this.$router.go(-1);
                }else{
                    this.$Message.error(res.data.msg)
                }
            })
        },
        getdate(date){
            this.form.meetingDate=date;
        }

    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
       this.getslete()
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
.updateyue {
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
            .tab2 {
                width: 100%;
                height: auto;

                .top1 {
                    display: flex;
                    height: 45px;
                    width: 100%;
                    margin-top: 10px;
                    align-items: center;
                    justify-content: space-around;
                    background-color: #a5e4ea;
                    div {
                        font-size: 14px;
                        font-weight: 800;
                        cursor: pointer;

                        &:hover {
                            color: white;
                        }
                    }
                    .ative {
                        color: white;
                        font-size: 15px;
                        border-bottom: 3px solid gold;
                        border-radius: 100px;
                    }
                }
                .mainx {
                    width: 100%;
                    height: auto;
                    padding-bottom: 20px;
                    border: 1px solid #ccc;
                    .tab {
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
                    }
                }

                .bomt {
                    width: 25%;
                    display: flex;
                    margin: 15px auto;
                    margin-top: 9.6rem;
                    justify-content: space-between;
                    .ivu-btn {
                        width: 80px;
                    }
                    .ivu-btn-success {
                        background-color: #d7d7d7;
                        border-color: white;
                    }
                }
            }
        }
    }
}
</style>