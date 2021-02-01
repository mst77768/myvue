<!-- 修改页面周例会 -->
<template>
    <div class="updatezou">
        <div class="xinbox">
            <div class="top">修改周例会</div>
            <div class="inputbox">
                <div class="itme">
                    <b>报告类型：</b>
                    <Select
                        clearable
                        style="width: 4.54rem"
                        disabled
                        v-model="form.reportType"
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
                        disabled
                        type="date"
                        placeholder="年/月/日"
                        :value="form.meetingDate"
                        style="width: 4.54rem"
                    ></DatePicker>
                </div>
                <div class="itme">
                    <b>报告名称：</b>
                    <Input
                       disabled
                        v-model="form.reportName"
                        placeholder="请输入..."
                        style="width: 4.54rem"
                    />
                </div>
            </div>
            <div class="addmain">
                <div class="ativetab">
                    <div class="inputb">
                        <div class="item">
                            <b>会议地点：</b>
                            <Input
                                v-model="form.meetingPlace"
                                placeholder="请输入..."
                                style="width: 4.5rem"
                            />
                        </div>
                        <div class="item">
                            <b></b>
                            <Button
                                type="primary"
                                style="margin-bottom: -0.6rem"
                                @click="$router.push('/person')"
                                >选择人员</Button
                            >
                        </div>
                        <div class="item">
                            <b>参会人员：</b>
                            <Input
                                v-model="form.participation"
                                placeholder=""
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 2 }"
                                style="width: 90%"
                            />
                        </div>
                        <div class="item">
                            <b>缺席人员：</b>
                            <Input
                                v-model="form.absent"
                                placeholder=""
                                style="width: 90%"
                            />
                        </div>
                    </div>
                    <div class="tabbox">
                        <h3>本周公司及船队各轮需重点关注及解决的事项</h3>
                        <Table border :columns="columns1" :data="data1">
                            <template
                                slot-scope="{ row, index }"
                                slot="reportContent"
                            >
                                <span>
                                    <Input
                                        v-model="data1[index].reportContent"
                                        type="textarea"
                                        placeholder="请输入..."
                                        :autosize="{ minRows: 1, maxRows: 10 }"
                                    />
                                </span>
                            </template>
                            <template slot-scope="{}" slot="operation">
                            </template>
                        </Table>
                        <p id="p1">+ 新增</p>
                        <h3>总裁指示</h3>
                        <Input
                            v-model="boss.reportContent"
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 9 }"
                        />
                        <div class="updata">
                            <Upload
                                multiple
                                action="http://192.168.0.90:8011/dh-annex-table/file"
                                :default-file-list="defaultList"
                                :on-remove="remove"
                                :on-success="sucess"
                                :before-upload="bginupdata"
                                :data="da"
                            >
                                <Button @click="btn" icon="ios-cloud-upload-outline"
                                    >上传附件</Button
                                >
                            </Upload>
                        </div>
                    </div>
                    <div class="botm">
                        <Button size="large" type="primary" @click="update">修改</Button>
                        
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
            filelist:[],
            defaultList: [],
            form: {
                meetingDate: "",
                meetingPlace: "",
                participation: "",
                reportName: "",
                reportType: "",
                absent: "",
            },
            boss: {
                reportContent: "",
            },
            da: {
                meetingDate: "",
                reportName: "",
                token: "",
            },
            columns1: [
                {
                    title: "部门名称",
                    key: "deptName",
                    width: "150",
                    align: "center",
                },
                {
                    title: "本周汇报及需要协调事项",
                    slot: "reportContent",
                    align: "center",
                },
                {
                    title: "操作",
                    slot: "operation",
                    width: "100",
                    align: "center",
                },
            ],
            cityList: [
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
            data1: [],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        getlook(form) {
            ajax(
                "http://192.168.0.90:8011/dh-mreport/SelReport",
                form,
                "get"
            ).then((res) => {
                console.log(res.data);
                console.log(res.data.Annex);
                let MeTile = res.data.MeTile[0];
                let Annex = res.data.Annex;
                let Report = res.data.Report;
                if (Annex.length >= 1) {
                    Annex.forEach((element) => {
                        let obj = {
                            id:element.id,
                            name: element.attachmentsName,
                            url: element.fileUrl,
                        };
                        this.defaultList.push(obj);
                    });
                }
                if (Report.length >= 1) {
                    this.data1 = Report.slice(0, -1);
                    this.boss.reportContent = Report.slice(-1)[0].reportContent;
                }
                this.form = {
                    meetingDate: MeTile.meetingDate,
                    meetingPlace: MeTile.meetingPlace,
                    participation: MeTile.participation,
                    reportName: MeTile.reportName,
                    reportType: MeTile.reportType,
                    absent: MeTile.absent,
                };
                if (JSON.parse(sessionStorage.getItem("proson"))) {
                    let obj = JSON.parse(sessionStorage.getItem("proson"));
                    this.form.participation = obj.a;
                    this.form.absent = obj.b;
                }
            });
        },
        update(){
            let arr=JSON.parse(JSON.stringify(this.data1));
            let form=JSON.parse(JSON.stringify(this.form));
            form.reportStatus=2,
            form.absent=form.absent.toString();
            form.participation=form.participation.toString()
            let newarr=[];
            arr.forEach(item=>{
                newarr.push(Object.assign(item,form))
            })
            let obj={
                deptName:"总裁",
                fileUrl:"",
                reportStatus:"",
                reportTitle:"",
                reportContent:this.boss.reportContent
            }
            newarr.push(Object.assign(obj,form))
            console.log(newarr)

             ajax("http://192.168.0.90:8011/dh-meeting-title/updateMreport",newarr,"post").then(res=>{
                 console.log(res.data)
                 if(res.code==200){
                      this.$Message.success(res.msg);
                      this.$router.go(-1);
                 }else{
                     this.$Message.error(res.msg);
                 }
             })
        },
      async remove(file,filelist){//文件删除操作
           let id=file.id;
           let res = await ajax(
                "http://192.168.0.90:8011/dh-annex-table/deleteFile",
                {
                    id: id
                },
                "get"
            );
            console.log(res)
            this.filelist=filelist;
        },
        bginupdata(file) {
            //上传文件之前的钩子函数
            console.log(file);
            let flag = true;
            this.filelist.forEach((item) => {
                if (item.name == file.name) {
                    flag = false;
                    this.$Notice.info({
                        title: "系统提醒！",
                        desc: "上传文件重复！请重新上传文件！",
                    });
                }
            });
            if (!flag) {
                return false;
            }
        },
       async sucess(req,file,filelist){
             console.log(req)
             console.log(file)
             this.filelist=filelist;
       },
       btn(){
          this.da={
            meetingDate: this.form.meetingDate,
            reportName: this.form.reportName,
            token: sessionStorage.getItem("token"),
          }
       }
    
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        let row = JSON.parse(sessionStorage.getItem("look"));

        console.log(row);
        let form = {
            reportType: row.reportType,
            reportName: row.reportName,
            meetingDate: row.meetingDate,
        };
        this.getlook(form);
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
.updatezou {
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
                        height: auto;
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
                    .updata {
                        margin-top: 0.5rem;
                        .ivu-btn {
                            color: #2d8cf0;
                        }
                    }
                }

                .botm {
                    width: 20%;
                    display: flex;
                    margin: 15px auto;
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