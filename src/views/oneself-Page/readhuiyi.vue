<!-- 查看周例会会议 -->
<template>
    <div class="readhuiyi" id="printMe">
        <div class="xinbox"  ref="bin" >
                <Icon type="md-print" class="bbbq" @click="gof"  v-print="'#printMe'"/>
            <div class="top">会议报告</div>
            <div class="inputbox">
                <div class="itme">
                    <b>报告类型：</b>
                    <Input
                        v-model="header.reportType"
                        placeholder="请输入..."
                        style="width: 150px"
                    />
                </div>
                <div class="itme">
                    <b>报告日期：</b>
                    <DatePicker
                        type="date"
                        placeholder="年/月/日"
                        style="width: 150px"
                        :value="header.meetingDate"
                    ></DatePicker>
                </div>
                <div class="itme">
                    <b>报告名称：</b>
                    <Input
                        v-model="header.reportName"
                        placeholder="请输入..."
                        style="width: 230px"
                    />
                </div>
            </div>
            <div class="addmain">
                <div class="ativetab">
                    <div class="inputb">
                        <div class="item">
                            <b>会议地点：</b>
                            <Input
                                v-model="header.meetingPlace"
                                placeholder="请输入..."
                                style="width: 150px"
                            />
                        </div>

                        <div class="item">
                            <b>参会人员：</b>
                            <Input
                                v-model="header.participation"
                                placeholder=""
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 2 }"
                                style="width: 90%"
                            />
                        </div>
                        <div class="item">
                            <b>缺席人员：</b>
                            <Input
                                v-model="header.absent"
                                placeholder=""
                                style="width: 90%"
                            />
                        </div>
                    </div>
                    <div class="tabbox">
                        <h3>本周公司及船队各轮需重点关注及解决的事项</h3>
                        <Table border :columns="columns1" :data="data1">
                            <template slot-scope="{ row }" slot="name">
                                <span >{{ row.deptName }}</span>
                            </template>
                            <template slot-scope="{ row }" slot="reportContent">
                                <Poptip
                                    trigger="hover"
                                    word-wrap
                                    width="400"
                                    :content="row.reportContent"
                                >
                                    <span>{{ row.reportContent }}</span>
                                </Poptip>
                            </template>
                            <template slot-scope="{  }" slot="operation">
                                <span > </span>
                               
                            </template>
                        </Table>

                        <h3>总裁指示</h3>
                        <Input
                            v-model="boss"
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 9 }"
                        />
                        <div class="updata">
                            <!-- <Upload
                                action="//jsonplaceholder.typicode.com/posts/"
                                :default-file-list="defaultList"
                                :on-success="fn"
                            >
                                <span v-show="false"
                                    ><Button
                                        type="info"
                                        icon="ios-cloud-upload-outline"
                                        >上传附件</Button
                                    >
                                </span>
                            </Upload> -->
                            <h4>附件:</h4>
                            <p v-for="(item,index) in defaultList" :key="index" style="margin-top:0.3rem">
                                <a :href="item.fileUrl" :title="item.attachmentsName" :download="item.attachmentsName"  >{{item.attachmentsName}}</a>
                            </p>
                        </div>
                        <p class="text">已确认部门:<b @click="$router.push('/pertale')">{{totle}}</b></p>
                    </div>
                    <div class="botm">
                        <Button
                            size="large"
                            type="primary"
                            @click="btn"
                            >{{textarr[number]}}</Button
                        >
                       
                    </div>
                </div>
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
            boss:"",
            totle:3,
            number:0,
            textarr:["确认完成","返回首页"],
            defaultList: [
                
            ],
            
            columns1: [
                {
                    title: "部门名称",
                    slot: "name",
                    width:"180",
                    align: "center",
                },
                {
                    title: "本周汇报及需要协调事项",
                    slot: "reportContent",
                    width: "720",
                    align: "center",
                },
                {
                    title: "操作",
                    slot: "operation",
                    align: "center",
                },
            ],
            data1: [],
           
            header:{

            },
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn() {
            alert("上发");
        },
        gof(){
          console.log(this.$refs.bin)
        },
        btn(){//
        let obj=JSON.parse(sessionStorage.getItem("look"))
           if(this.number){
               this.$router.push("huiyi")
           }else{
               this.number=1;
               ajax("http://192.168.0.90:8011/sys-user/SysDeptUser",{
                   reportName:obj.reportName,
                   meetingDate:obj.meetingDate,
               },"get").then(res=>{
                //    console.log(res.code==200)
                   if(res.code==200){
                         this.$Message.success('确认已成功！');
                   }
               })
           }
        }
       
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
            "get"
        ).then((data) => {
            this.totle=data.data.DeptTotal
            let arr=data.data.Annex;
            console.log(arr)
            this.defaultList=arr  
          this.boss=data.data.Report.pop().reportContent;
            this.data1=data.data.Report
            console.log(data.data.MeTile[0]);
            this.header=data.data.MeTile[0]
        });
        ajax("http://192.168.0.90:8011/dh-mdept-consult/finalTotal",{
            reportName:obj.reportName,
            meetingDate:obj.meetingDate,
        },"get").then(res=>{
            // console.log(res.data.total)
            // this.number=res.data.total?res.data.total:0;
            console.log(res.data.personInCharge)
            let person=res.data.personInCharge;
            let username=res.data.username;
            if(person==username && res.data.total==0){
                this.number=0
            }else{
                this.number=1
            }
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
.readhuiyi {
    width: 100%;
    height: 100%;
   
   
    overflow-x: scroll;
    font-size: 0.42rem;
    background-color: rgba(242, 242, 242, 1);
    .xinbox {
        width: 1122px;
        height: 1700px;
        margin: 8px auto;
        border: 1px solid #ccc;
        position: relative;
        background-color: white;
        .bbbq {
            font-size: 35px;
            position: absolute;
            right: 2.5rem;
            top: 0.6rem;
            color: #83c7ff;
            cursor: pointer;
        }
        .top {
            width: 92%;
            height: 60px;
            border-bottom: 1px solid #ccc;
            line-height: 60px;
            margin: 0 auto;
            text-align: center;
            font-size: 18px;
        }
        .inputbox {
            width: 80%;
            height: 80px;
            display: flex;
            margin-left: 60px;

            justify-content: space-between;
            align-items: center;
           
            .itme b {
                font-size: 16px;
                font-weight: 500;
                margin-right: 10px;
            }
        }
        .addmain {
            width: 90%;
            margin: 0 auto;
            height: auto;
            padding-bottom: 30px;
            .ativetab {
                width: 100%;
                height: auto;
                border-top: 1px solid #ccc;
                .inputb {
                    width: 100%;
                    box-sizing: border-box;
                    height: 200px;
                    display: flex;
                    align-content: space-around;
                    justify-content: center;
                    flex-wrap: wrap;
                    .item {
                        width: 100%;
                        height: 50px;
                        line-height: 50px;
                        b {
                            font-size: 16px;
                            margin-right: 10px;
                            font-weight: 500;
                            display: inline-block;
                            width: 82px;
                        }
                    }
                }
                .tabbox {
                    width: 100%;
                    height: auto;
                    box-sizing: border-box;
                    padding: 10px;
                    border: 1px solid #ccc;
                    .ivu-table-header thead tr th {
                        background-color: #a5e4ea;
                    }
                    h3 {
                        margin-bottom: 4px;
                    }
                    #p1 {
                        width: 100%;
                        height: 35px;
                        line-height: 35px;
                        text-align: center;
                        border: 1px dashed #ccc;
                        margin-bottom: 20px;
                        transition: all 0.5s;
                        &:hover {
                            color: darkturquoise;
                            cursor: pointer;
                            border-color: darkturquoise;
                        }
                    }
                    .ivu-table-wrapper {
                        overflow: visible;
                    }
                    .updata {
                        margin-top: 0.5rem;
                        .ivu-btn {
                            color: #2d8cf0;
                        }
                    }
                    .text {
                        margin-top: 1rem;
                        font-size: 16px;
                        b {
                            color: blue;
                            margin-left: 0.23rem;
                        }
                    }
                }

                .botm {
                    width: 10%;

                    margin: 15px auto;
                    justify-content: space-between;
                    .ivu-btn {
                        width: 100px;
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