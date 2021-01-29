<!--新增执行力跟踪信息页面 -->
<template>
    <div class="huiyi">
        <div class="infoxin">
            <h3>新增执行力跟踪信息</h3>
            <div class="addbox">
                <div class="itme">
                    <span>来源：</span>
                    <Select
                        v-model="form.source"
                        clearable
                        style="width: 160px"
                        aria-placeholder="请选择"
                        @on-change="liayuan"
                    >
                        <Option
                            v-for="item in select1"
                            :value="item.label"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <div class="itme">
                    <span>会议报告：</span>
                    <Select
                        v-model="form.reportName"
                        clearable
                        style="width: 280px"
                        aria-placeholder="请选择"
                        @on-change="baogao"
                    >
                        <Option
                            v-for="item in huiyiarr"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <div class="itme">
                    <span>发布日期：</span>
                    <!-- <DatePicker
                        type="date"
                        placeholder=" 年/月/日"
                        style="width: 190px"
                    ></DatePicker> -->
                    <Select
                        v-model="form.meetingDate"
                        clearable
                        style="width: 280px"
                        aria-placeholder="请选择"
                    >
                        <Option
                            v-for="item in datearr"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <div class="item">
                    <Button type="info" @click="addw">添加</Button>
                </div>
            </div>
            <div class="tablebox">
                <Table
                    border
                    :columns="columns1"
                    :data="data1"
                    width="100%"
                    height="600"
                    @on-row-click="row"
                >
                    <template slot-scope="{ row }" slot="address">
                        <span v-if="!row.flag">
                            {{ row.address }}
                        </span>
                        <span v-else>
                            <Input
                                v-model="textarea"
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 5 }"
                                placeholder="请输入..."
                            />
                            
                        </span>
                    </template>
                    <template slot-scope="{ row, index }" slot="a">
                        <Select
                            v-model="data1[index].a.selsemode1"
                            clearable
                            style="width: 130px"
                            aria-placeholder="请选择"
                            @on-change="select"
                        >
                            <Option
                                v-for="item in row.a.seleitem"
                                :value="item.label"
                                :key="item.label"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </template>
                    <template slot-scope="{ row, index }" slot="b">
                        
                        <Input v-model="data1[index].b.selsemode1" placeholder="请选择..." clearable style="width: 130px" />
                    </template>
                    <template slot-scope="{ row, index }" slot="c">
                        <Select
                            v-model="data1[index].c.selsemode1"
                            clearable
                            style="width: 130px"
                            aria-placeholder="请选择"
                            @on-change="selectc"
                        >
                            <Option
                                v-for="item in row.c.seleitem"
                                :value="item.label"
                                :key="item.label"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </template>
                    <template slot-scope="{ row, index }" slot="d">
                         <Input v-model="data1[index].d.selsemode1" placeholder="请选择..." clearable style="width: 130px" />
                    </template>
                    <template slot-scope="{ row, index }" slot="e">
                        <Select
                            v-model="data1[index].e.selsemode1"
                            clearable
                            style="width: 130px"
                            aria-placeholder="请选择"
                        >
                            <Option
                                v-for="item in row.e.seleitem"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </template>
                    <template slot-scope="{ index }" slot="f">
                        <span @click="bg(index)">
                            <DatePicker
                                type="date"
                                @on-change="fn"
                                
                                placeholder="/年/月/日"
                                style="width: 130px"
                            ></DatePicker>
                        </span>
                    </template>
                    <template slot-scope="{ row, index }" slot="g">
                        <Select
                            v-model="data1[index].g.selsemode1"
                            clearable
                            style="width: 130px"
                            aria-placeholder="请选择"
                        >
                            <Option
                                v-for="item in row.g.seleitem"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </template>
                </Table>
               
            </div>
            <div class="btombotn">
                <Button type="primary" size="large" @click="tijiao"
                    >提交</Button
                >
                <Button type="warning" size="large" @click="quxiao"
                    >取消</Button
                >
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import ajax from "@/api/ajax.js";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            form:{
               source:"月度会议",
               meetingDate:"",
               reportName:""
            },
            huiyiarr:[],
            datearr:[],
            index:0,
            textarea: "",
            columns1: [
                {
                    title: "序号",
                    key: "name",
                    align: "center",
                    width: 80,
                },
                {
                    title: "总裁指示",
                    slot: "address",
                    align: "center",
                    width: 500,
                },
                {
                    title: "责任部门",
                    slot: "a",
                    align: "center",
                    width: 160,
                },
                {
                    title: "责任人",
                    slot: "b",
                    align: "center",
                    width: 160,
                },
                {
                    title: "协调部门",
                    slot: "c",
                    align: "center",
                    width: 160,
                },
                {
                    title: "协调人",
                    slot: "d",
                    align: "center",
                    width: 160,
                },
                {
                    title: "时效类型",
                    slot: "e",
                    align: "center",
                    width: 160,
                },
                {
                    title: "要求完成时间",
                    slot: "f",
                    align: "center",
                    width: 160,
                },
                {
                    title: "汇报频率",
                    slot: "g",
                    align: "center",
                    width: 160,
                },
            ],
            data1: [],
            select1: [
                {
                    value: "月度会议",
                    label: "月度会议",
                },
                {
                    value: "周例会",
                    label: "周例会",
                },
                {
                    value: "其他会议",
                    label: "其他会议",
                },
            ],
            smode1: 0,
            smode2: "",
            select2: [
                [
                    {
                        value: "2020年7月份月度总结报告",
                        label: "2020年7月份月度总结报告",
                    },
                    {
                        value: "2020年8月份月度总结报告",
                        label: "2020年8月份月度总结报告",
                    },
                    {
                        value: "2020年9月份月度总结报告",
                        label: "2020年9月份月度总结报告",
                    },
                    {
                        value: "2020年10月份月度总结报告",
                        label: "2020年10月份月度总结报告",
                    },
                    {
                        value: "2020年11月份月度总结报告",
                        label: "2020年11月份月度总结报告",
                    },
                ],
                [
                    {
                        value: "安全生产周例会纪要2020W51",
                        label: "安全生产周例会纪要2020W51",
                    },
                    {
                        value: "安全生产周例会纪要2020W52",
                        label: "安全生产周例会纪要2020W52",
                    },
                    {
                        value: "安全生产周例会纪要2020W53",
                        label: "安全生产周例会纪要2020W53",
                    },
                    {
                        value: "安全生产周例会纪要2020W54",
                        label: "安全生产周例会纪要2020W54",
                    },
                    {
                        value: "安全生产周例会纪要2020W55",
                        label: "安全生产周例会纪要2020W55",
                    },
                    {
                        value: "安全生产周例会纪要2020W56",
                        label: "安全生产周例会纪要2020W56",
                    },
                    {
                        value: "安全生产周例会纪要2020W57",
                        label: "安全生产周例会纪要2020W57",
                    },
                ],
                [
                    {
                        value: "其他会议",
                        label: "其他会议",
                    },
                ],
            ],
            flag: true,
            
        };
        
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        // add() {
            
        //     // if (this.flag) {
        //     //     obj.name = (this.data1.length + 1).toString();
        //     //     obj.flag = true;
        //     //     this.data1.push(obj);
        //     //     this.flag = false;
        //     // } else {
        //     //     this.$Notice.info({
        //     //         title: "系统提醒！",
        //     //         desc: "你上条数据未操作完成！",
        //     //     });
        //     // }
        // },
        fn(a) {//获取时间
            //这个方法是设置对应的索引的
            console.log(a);
            console.log(this.data1[this.index].f.data);
            this.data1[this.index].f.selsemode1 = a;    
        },
        bg(index) {
            //修改当前的索引看到哪一行了
            console.log(index);
            this.index = index;
        },
        tijiao() {
            //提交按钮的事件
            // if (!this.flag) {
            //     let index = this.data1.length - 1;
            //     this.data1[index].address = this.textarea;
            //     this.textarea = "";
            //     this.data1[index].flag = false;
            //     this.flag = true;
            //     this.$Notice.success({
            //         title: "系统提醒！",
            //         desc: "提交成功！小伙子！",
            //     });
            // }
            // setTimeout(() => {
            //     this.$router.go(-1);
            // }, 1000);
            console.log(this.data1)
            let arr=[];
            this.data1.forEach(item=>{
                let obj={
                    executiveDepartment:item.a.selsemode1,//责任部门
                    leadingCadre:item.b.selsemode1,//责任人
                    meetingDate:this.form.meetingDate,//会议时间
                    prescriptionType:Boolean(item.e.selsemode1),//时效类型
                    reportName:item.reportName,//报告名称
                    reportingFrequency:item.g.selsemode1,//频率
                    requiredCompletionTime:item.f.selsemode1,//要求完成时间
                    coordinationDepartment:item.c.selsemode1,//协调部门
                    coordinator:item.d.selsemode1,//协调人
                    executionContent:item.address,//总裁指示
                    source:this.form.source
                };
                arr.push(JSON.parse(JSON.stringify(obj)))
            });
            ajax("http://192.168.0.91:8011/dh-executive-tracking/saveExecutiveTrackingContent",arr,"post").then(res=>{
                console.log(res)
                if(res.code===200){
                    this.$Message.success("添加完成");
                    this.$router.push("/rlzz");
                }else{
                    this.$Message.error(res.data.msg);
                }
            })
            
        },
        quxiao() {
            //取消按钮的事件
            if (this.flag == false) {
                this.data1.splice(this.data1.length - 1, 1);
                this.flag = true;
            }
            setTimeout(() => {
                this.$router.go(-1);
            }, 1000);
        },
        liayuan(value){
            ajax("http://192.168.0.91:8011/dh-executive-tracking/searchExecutiveTitle",{
               source:value
            },"post").then(res=>{
               this.form.reportName=res.data.reportName[0].value
               this.huiyiarr=res.data.reportName
            })
        },
        baogao(value){
            ajax("http://192.168.0.91:8011/dh-executive-tracking/searchTrackingTitle",{
               reportName:value 
            },"post").then(res=>{
                this.form.meetingDate=res.data.meetingDate[0].value
                console.log(res.data.meetingDate)
                this.datearr=res.data.meetingDate
            })
        },
        async addw(){
            this.data1=[];
            let res2=await ajax("http://192.168.0.91:8011/dh-executive-tracking/saveExecutiveTrackingInstructions",this.form,"post");
            console.log(res2.data.msg);
            if(res2.code===201){
                this.$Message.error(res2.data.msg);
                return false
            }
            let arr=[];
            arr=res2.data.instructionsVoList;
            console.log(arr)
            let seleitem=sessionStorage.getItem("bumen")
            let obj={
                name:'',//序号
                address:"",//仲裁指示
                a:{
                    selsemode1: "",
                    seleitem: JSON.parse(seleitem),
                },
                b:{
                    selsemode1: "",
                },
                c:{
                    selsemode1: "",
                    seleitem: JSON.parse(seleitem),
                },
                d:{
                    selsemode1: "",
                },
                e:{
                    selsemode1: "",
                    seleitem: [
                        {
                            value:0,
                            label:"非时效",
                        },{
                            value:1,
                            label:"时效"
                        }
                    ],
                },
                f:{//要求完成的时间
                    selsemode1: "",
                },
                g:{
                    selsemode1: "",
                    seleitem: [
                        {
                            value: "每日",
                            label: "每日",
                        },{
                            value: "周末",
                            label: "周末",
                        },{
                            value: "月末",
                            label: "月末",
                        }
                    ],
                }
            };
            // arr.foreach((item,index)=>{
            //     obj.name=Number(index+1);
            //     obj.address=item.executionContent
            //     obj.meetingDate=item.meetingDate,
            //     obj.reportName=item.reportName
            //     this.data1.push(obj)
            // })
            for(let i=0;i<arr.length;i++){
                obj.name=Number(i+1);
                obj.address=arr[i].executionContent;
                obj.reportName=arr[i].reportName
                this.data1.push(JSON.parse(JSON.stringify(obj)))
            }
            
            console.log(arr)

        },
       async select(value){
           console.log(value)
           let res=await ajax("http://192.168.0.91:8011/sys-dept/findDepartmentHead",{
               name:value
           },"get");
           console.log(res.data.username)
           this.data1[this.index].b.selsemode1=res.data.username
        },
        async selectc(value){
           let res=await ajax("http://192.168.0.91:8011/sys-dept/findDepartmentHead",{
               name:value
           },"get");
           console.log(res.data.username)
           this.data1[this.index].d.selsemode1=res.data.username
        },
        row(item,index){//单击表格某一行
           console.log(item)
           console.log(index)
           this.index=index
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        ajax("http://192.168.0.91:8011/dh-executive-tracking/searchExecutiveTitle",{
            source:this.form.source
        },"post").then(res=>{
            console.log(res.data.reportName)
            this.huiyiarr=res.data.reportName
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
.huiyi {
    width: 100%;
    height: auto;
    background-color: rgba(242, 242, 242, 1);
    position: relative;
    font-size: 0.42rem;
    .infoxin {
        width: 1363px;
        height: 1033px;
        background-color: white;
        margin: 0 auto;
        border: 1px solid #ccc;
        transition: all 0.5s;
        box-sizing: border-box;
        padding: 10px 25px;
        h3 {
            text-align: center;
            height: 55px;
            line-height: 40px;
            border-bottom: 1px solid #ccc;
            margin-top: 10px;
            font-size: 21px;
            margin-bottom: 20px;
            font-weight: 600;
        }
        .addbox {
            display: flex;
            justify-content: space-around;
            align-items: flex-end;
            margin-bottom: 40px;
            .item {
                width: auto;
                height: auto;
                .ivu-btn {
                    width: 100px;
                    margin-left: -50px;
                }
                span {
                    margin-right: 4px;
                    font-size: 14px;
                }
            }
        }
        .tablebox {
            width: auto;
            height: auto;
            .ivu-table-wrapper {
                overflow: visible;
            }
            p {
                height: 35px;
                line-height: 35px;
                border: 1px dashed #ccc;
                text-align: center;
                cursor: pointer;
                transition: all 0.5s;
                &:hover {
                    color: #2db7f5;
                    font-size: 15px;
                }
            }
        }
        .btombotn {
            width: 20%;
            margin: 40px auto;
            display: flex;
            justify-content: space-between;
            .ivu-btn {
                width: 100px;
            }
        }
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
    }
}
</style>