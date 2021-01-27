<!-- 默认显示的一个tab组件 -->
<template>
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
                    @click="goperon"
                    type="primary"
                    style="margin-bottom: -0.6rem"
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
                <template slot-scope="{ row, index }" slot="name">
                    <span v-if="!row.flag">{{ row.name }}</span>
                    <span v-else>
                        <Input
                            v-model="data1[index].name"
                            placeholder="请输入..."
                            clearable
                            style="width: 3.6rem"
                        />
                    </span>
                </template>
                <template slot-scope="{ row, index }" slot="reportContent">
                    <span>
                        <Input
                            v-model="data1[index].reportContent"
                            type="textarea"
                            placeholder="请输入..."
                            :autosize="{ minRows: 1, maxRows: 10 }"
                        />
                    </span>
                </template>
                <template slot-scope="{}" slot="operation"> </template>
            </Table>
            <p id="p1" @click="add">+ 新增</p>
            <h3>总裁指示</h3>
            <Input
                v-model="form.textarea"
                type="textarea"
                :autosize="{ minRows: 5, maxRows: 9 }"
            />
            <div class="updata">
                <Upload
                    multiple
                    action="http://192.168.0.90:8011/dh-annex-table/file"
                    :on-remove="remove"
                    :before-upload="bginupdata"
                    :data="da"
                    :on-success="sucessupdata"
                >
                    <Button icon="ios-cloud-upload-outline" @click="btn"
                        >上传附件</Button
                    >
                </Upload>
            </div>
        </div>
        <div class="botm">
            <Button size="large" type="primary" @click="hhh">提交</Button>
            <Button size="large" type="success" @click="$router.push('huiyi')"
                >取消</Button
            >
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
            filelist: [],
            flag: true,
            da: {
                meetingDate: "",
                reportName: "",
                token:"",
            },
            columns1: [
                {
                    title: "部门名称",
                    slot: "name",
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
            data1: [], //用于存放后端返回的数据
            form: {
                //表单数据
                meetingPlace: "",
                participation: "",
                absent: "",
                textarea: "",
            },
            value12: "",
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {
        
    },
    //方法集合
    methods: {
        add() {
            if (this.flag) {
                let obj = {
                    flag: true,
                    name: "",
                    reportContent: "",
                    operation: "",
                };
                this.data1.push(obj);
                this.flag = false;
            } else {
                this.$Notice.info({
                    title: "系统提醒！",
                    desc: "你上条数据未操作完成！",
                });
            }
        },
        nb(obj) {
            //确定添加按钮事件
            console.log(obj);
        },
        nb2(index) {
            alert(index);
        },
        hhh() {
            let arr = JSON.parse(JSON.stringify(this.data1));
            localStorage.setItem("tab1", JSON.stringify(arr));
            this.$emit("fn", this.form); //子传父亲
        },
        goperon() {
            sessionStorage.setItem(
                "meet",
                JSON.stringify(this.form.meetingPlace)
            );
            this.$router.push("/person");
        },
        btn() {
            let obj = JSON.parse(sessionStorage.getItem("wenjiantype")); //拿到父亲里面的值
            this.da.meetingDate = obj.meetingDate;
            this.da.reportName = obj.reportName;
            this.da=sessionStorage.getItem("token");
            if (!this.da.meetingDate) {
                this.$Notice.warning({
                    title: "系统提醒！",
                    desc: "会议日期未选择",
                });
            } else if (!this.da.reportName) {
                this.$Notice.warning({
                    title: "系统提醒！",
                    desc: "报告名称未选择！",
                });
            }
        },
        async remove(file, arr) {
            //删除文件
            console.log(arr);
            let res = await ajax(
                "http://192.168.0.90:8011/dh-annex-table/deleteFile",
                {
                    id: file.response.data.dhAnnexTable.id,
                },
                "get"
            );
            console.log(res.msg);
            this.$Notice.success({
                title: "系统提醒！",
                desc: res.msg,
            });
        },
        bginupdata(file) {//上传文件之前的钩子函数
            console.log(file);
            let flag=true;
            this.filelist.forEach((item) => {
                if (item.name == file.name) {
                    flag=false;
                    this.$Notice.info({
                        title: "系统提醒！",
                        desc: "上传文件重复！请重新上传文件！",
                    });  
                }
            });
            if(!flag){
               return false
            }
            
        },
        sucessupdata(req, file, filelist) {//上传文件成功的钩子函数
            console.log(req);
            console.log(file);
            console.log(filelist);
            this.filelist = filelist;
        },
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        ajax("http://192.168.0.90:8011/sys-dept/SysDept", "get").then(
            (data) => {
                console.log(data.data.sysDept);
                this.data1 = data.data.sysDept.slice(0, -1); //把数组截取
            }
        );
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        var str = sessionStorage.getItem("proson") || "[]";
        // this.form.meetingPlace = sessionStorage.getItem("meetingPlace") || "";
        console.log(this.form.meetingPlace);
        var obj = JSON.parse(str); //选择参会人员
        if (!(obj instanceof Array)) {
            this.form.participation = obj.a.toString();
            this.form.absent = obj.b.toString();
        }
        if (sessionStorage.getItem("meet")) {
            this.form.meetingPlace = JSON.parse(sessionStorage.getItem("meet"));
        }
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {
        sessionStorage.setItem("meetingPlace", JSON.stringify(this.form));
        sessionStorage.removeItem("proson"); //清除本地的
    }, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" >
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
        width: 23%;
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
</style>