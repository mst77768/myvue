<!-- 航次效益分析表页面搜索表单组件 -->
<template>
    <div class="seach">
        <div class="seachbox" >
            <div>
                <span>船名: </span>
                <Select v-model="form.vesselNo" clearable style="width: 3.8rem">
                    <Option
                        v-for="item in vonlist"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                    >
                </Select>
            </div>
            <div>
                <span>航次号:</span>
                <Select v-model="form.voyageNo" clearable style="width: 3.8rem">
                    <Option
                        v-for="item in yonlist"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                    >
                </Select>
            </div>
            <div>
                <span>租家:</span>
                <Select v-model="form.charterer" clearable style="width: 3.8rem">
                    <Option
                        v-for="item in Zlist"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option
                    >
                </Select>
            </div>
            <div>
                <span>航线:</span>
                <Select
                v-model="form.route"
                filterable
                clearable
                :remote-method="remoteMethod1"
                :loading="loading1"
                style="width: 4.7rem">
                <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
            </div>
            <div class="yue">
                <span>月份范围:</span>
                <DatePicker
                    type="datetime"
                    placeholder="__年__月__日"
                    style="width: 3.6rem"
                    @on-change="fn"
                ></DatePicker>
                <div class="kong"></div>
                <DatePicker
                    type="datetime"
                    placeholder="__年__月__日"
                    style="width: 3.6rem"
                    @on-change="fn2"
                ></DatePicker>
            </div>
            <div><Button type="primary" style="width: 2.42rem" @click="seach">查询</Button></div>
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
            loading1: false,
            vonlist:[],//船名的数据
            yonlist:[],//航次号的数据
            Zlist:[],//租家的数据
            list:[],//航线的数据
            value14: "123",
            cityList: [],
            options1:[],
            form:{
                charterer:"",
                voyageNo:"",
                route:"",
                vesselNo:""
           },
           endTime:"",
           startTime:"",
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        fn(data) {//获取开始的时间
            //监听日期的改变
             this.startTime=data
            console.log(data)
        },
        fn2(data){//获取结束的时间
          this.endTime=data;
        },
        cat(arr,oldarr){//这是封装的一个转换数据格式法法
          oldarr.forEach(item => {
              let obj={
                  value:item,
                  label:item
              }
              arr.push(obj)
          });          
        },
         remoteMethod1 (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            },
            seach(){
                let obj={
                    dhVoybebVoyage:this.form,
                    endTime:this.endTime,
                    startTime:this.startTime,
                    page:1
                }
                this.$emit("seach",obj)
            }
           
      
       
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        ajax("/common/getSelectTCSummary",{},"get").then(data=>{
             console.log(data)
             let arr1=data.data.chartererList;//租家的数据】
             let arr2=data.data.routeList//航线的数据
             let arr3=data.data.vesselNoList//船名的数据
             let arr4=data.data.voyageNoList//航次号的数据
             this.cat(this.Zlist,arr1)
            //  this.cat(this.Hlist,arr2)
             this.list=arr2
             this.cat(this.vonlist,arr3)
             this.cat(this.yonlist,arr4)
         })
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        
             
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.seach {
    width: 100%;
    border-top: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    height: 50px;
    .ivu-select-selection{
        width: 100% !important;
    }
    .seachbox {
        width: 88%;
        margin-left: 30px;
        display: flex;
        height: 100%;
        align-content: center;
        justify-content: space-around;
        div {
            height: 100%;
            display: flex;
            align-items: center;
            width: auto;
            span {
                margin-right: 15px;
            }
        }
        .yue {
            // flex: 1.2;
            margin-left: 20px;
            .kong {
                width: 15px;
            }
        }
    }
}
</style>