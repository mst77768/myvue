<!-- 选择参会人员的页面 -->
<template>
    <div class="person">
        <div class="banner">
            <div class="top">选择参会人员</div>
            <div class="p">
                <div>
                    <Select v-model="model1" placeholder="请选择部门" style="width: 150px">
                        <Option
                            v-for="item in cityList"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <div>
                    <Select v-model="model2" placeholder="请选择岗位" style="width: 150px">
                        <Option
                            v-for="item in cityList2"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
            </div>
            <div class="main">
                <Transfer
                    :data="data2"
                    :list-style="listStyle"
                    :target-keys="targetKeys2"
                    filterable
                    @on-change="handleChange2"
                    :titles="title"
                ></Transfer>
            </div>
            <div class="botm">
                <Button type="primary" @click="fn">确认</Button>
                <Button @click="fn2">返回</Button>
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
            cityList: [
                {
                    value: 0,
                    label: "企管部",
                },
                {
                    value: 1,
                    label: '信息化部门',
                }, 
            ],
            cityList2:[{
                value:"01",
                label:"经理",
            },{
                value:"02",
                label:"主管",
            },{
                value:"03",
                label:"总监"
                },{
                value:"04",
                label:"小喽喽"
            }],
            model1: "",
            model2: "",
            title: ["未选人员", "已选人员"],
            listStyle: {
                width: "320px",
                height: "400px",
            },
            data2:[],
            targetKeys2: [],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        handleChange2(a) {
            console.log(a);
            this.targetKeys2 = a;
        },
        fn(){
            sessionStorage.setItem("proson", JSON.stringify(this.targetKeys2));
            this.$router.go(-1);
        },
        fn2(){
            this.$router.go(-1);
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        ajax("http://192.168.0.90:8080/sys/SysUser","get").then(data=>{
            console.log(data.data.list)
            // let date=data.data.sysUsers;
            
            
            // // date.forEach(item => {
            // //      let obj={};
            // //      obj["key"]=item.username;
            // //      obj["label"]=item.username;
            // //      arr.push(obj);
            // // });
           
             this.data2=data.data.list
        })
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {},
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {
        
    }, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less">
.person {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f2f2f2;

    .banner {
        width: 1025px;
        height: 688px;
        background-color: white;
        border-radius: 5px;
        transition: all 0.5s;
        border: 1px solid #ccc;
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .top {
            width: 90%;
            height: 50px;
            margin: 0 auto;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            border-bottom: 1px solid #ccc;
        }
        .p {
            width: 32%;
            height: 45px;
            
            margin-left: 150px;
            margin-top: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .main {
            width: 80%;
            height: 400px;
            margin: 10px auto;
            display: flex;
            box-sizing: border-box;
            padding-left: 50px;

            // text-align: center;
        }
        .botm {
            width: 18%;
            display: flex;
            margin: 20px auto;
            margin-top: 40px;
            justify-content: space-between;
        }
    }
}
</style>