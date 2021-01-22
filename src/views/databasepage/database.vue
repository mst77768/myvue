<!-- 数据采集展示页面 -->
<template>
    <div class="database">
        <div class="databox">
            <div class="tablebox">
                <Table :columns="columns11" :data="data10" border :height="hig">
                </Table>
            </div>
        </div>
        <Modal
            width="1600"
            draggable=true
            v-model="flag"
            title="数据采集表单填写"
            @on-ok="ok"
            @on-cancel="cancel"
        >
           <div style="height:120px; display: flex;overflow-x: scroll;">
               <div style="white-space: nowrap;margin-right: 20px;">
                   <Select v-model="shipId" prefix="md-boat" placeholder="请选择船名" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>   
               </div>
                <div style="white-space: nowrap;margin-right: 20px;">
                <span>日期</span>:
                <DatePicker type="date" :vlaue="form.recordriqi" placeholder="年/月/日" style="width: 140px;"></DatePicker>
                </div>
                <div style="white-space: nowrap;margin-right: 30px;">
                <span>时间</span>:
                 <TimePicker type="time" :value="form.recordshijian" placeholder="时/分/秒" style="width: 140px"></TimePicker>
                </div>
                <div  v-for="(item,index) of titlearr" :key="index" style="white-space: nowrap;margin-right: 30px;">
                    <span>{{item.title}}</span>:
                    <Input v-model="item.models" type="number" :placeholder="item.title" clearable style="width: 140px" />
                </div>
                <div style="white-space: nowrap;margin-right: 30px;">
                    <span>轴向振动量 mm</span>:
                    <Input v-model="form.zhouxiangzhendongliang" type="number" placeholder="轴向振动量 mm" clearable style="width: 140px" />
                </div>
                <div style="white-space: nowrap;margin-right: 30px;">
                    <span>中间轴轴承温度℃</span>:
                    <Input v-model="form.zhongjianzhouzhouchengwendu" type="number" placeholder="中间轴轴承温度℃" clearable style="width: 140px" />
                </div>
            </div>
            
        </Modal>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import axios from "axios";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            hig: "",
            flag: true,
            titlearr:[],
            cityList:[],
            form:{
               recordriqi:"",
               recordshijian:"",
               zhouxiangzhendongliang:"",
               zhongjianzhouzhouchengwendu:""
            },
            shipId:"",
            columns11: [
                {
                    title: "日期",
                    key: "recordriqi",
                    align: "center",
                    width: 150,
                },
                {
                    title: "时间",
                    key: "recordshijian",
                    align: "center",
                    width: 150,
                },
                {
                    title: "增压系统",
                    align: "center",
                    children: [
                        {
                            title: "机舱温度",
                            key: "jicangwendu",
                            align: "center",
                            width: 130,
                        },
                        {
                            title: "海水温度",
                            key: "haishuiwendu",
                            align: "center",
                            width: 130,
                        },
                        {
                            title: "机舱温度",
                            key: "jicangwendu",
                            align: "center",
                            width: 130,
                        },
                        {
                            title: "海水温度",
                            key: "haishuiwendu",
                            width: 130,
                        },
                        {
                            title: "主机扫气压力Mpa",
                            key: "zhujisaoqiyali",
                            width: 130,
                        },
                        {
                            title: "增压器转速RPM",
                            key: "zengyaqizhuansu",
                            width: 130,
                        },
                        {
                            title: "增压器透平废气进口℃",
                            key: "zengyaqitoupingfeiqijinkou",
                            width: 130,
                        },
                        {
                            title: "增压器透平废气出口℃",
                            key: "zengyaqitoupingfeiqichukou",
                            width: 130,
                        },
                        {
                            title: "增压器透平进出口废气温差℃",
                            key: "zengyaqitoupingjinchukoufeiqiwencha",
                            width: 130,
                        },
                        {
                            title: "增压器润滑油进口温度℃",
                            key: "zengyaqirunhuayoujinkouwendu",
                            width: 130,
                        },
                        {
                            title: "增压器润滑油出口温度℃",
                            key: "zengyaqirunhuayouchukouwendu",
                            width: 130,
                        },
                    ],
                },
                {
                    title: "增压系统",
                    align: "center",
                    width: 500,
                    children: [
                        {
                            title: "排气进透平压力bar ",
                            key: "paiqijintoupingyali",
                            width: 130,
                        },
                        {
                            title: "透平出口背压mmHg  ",
                            key: "toupingchukoubeiya",
                            width: 130,
                        },
                        {
                            title: "空冷器进出压差mmwc",
                            key: "konglengqijinchuyacha",
                            width: 130,
                        },
                        {
                            title: "增压器空气滤器压差mmwc",
                            key: "zengyaqikongqilvqiyacha",
                            width: 130,
                        },
                        {
                            title: "扫气箱放残管阀检查",
                            key: "saoqixiangfangcanguanfajiancha",
                            width: 130,
                        },
                        {
                            title: "空冷器低温水进口温度℃",
                            key: "konglengqidiwenshuijinkouwendu",
                            width: 130,
                        },
                        {
                            title: "空冷器低温水出口温度℃",
                            key: "konglengqidiwenshuichukouwendu",
                            width: 130,
                        },
                        {
                            title: "空冷器冷却水进出口温度差℃",
                            key: "konglengqilengqueshuijinchukouwenducha",
                            width: 130,
                        },
                        {
                            title: "空气进口温度℃",
                            key: "kongqijinkouwendu",
                            width: 130,
                        },
                        {
                            title: "空气出口温度℃",
                            key: "kongqichukouwendu",
                            width: 130,
                        },
                        {
                            title: "空气进出口温度差℃",
                            key: "kongqijinchukouwenducha",
                            width: 130,
                        },
                        {
                            title: "扫气温度℃",
                            key: "saoqiwendu",
                            width: 130,
                        },
                        {
                            title: "NO.1扫气箱温度℃",
                            key: "no1saoqixiangwendu",
                            width: 130,
                        },
                        {
                            title: "NO.2扫气箱温度℃",
                            key: "no2saoqixiangwendu",
                            width: 130,
                        },
                        {
                            title: "NO.3扫气箱温度℃",
                            key: "no3saoqixiangwendu",
                            width: 130,
                        },
                        {
                            title: "NO.4扫气箱温度℃",
                            key: "no4saoqixiangwendu",
                            width: 130,
                        },
                        {
                            title: "NO.5扫气箱温度℃",
                            key: "no5saoqixiangwendu",
                            width: 130,
                        },
                        {
                            title: "NO.6扫气箱温度℃",
                            key: "no6saoqixiangwendu",
                            width: 130,
                        },
                        {
                            title: "NO.7扫气箱温度℃",
                            key: "no7saoqixiangwendu",
                            width: 130,
                        },
                        {
                            title: "NO.8扫气箱温度℃",
                            key: "no8saoqixiangwendu",
                            width: 130,
                        },
                        {
                            title: "NO.9扫气箱温度℃",
                            key: "no9saoqixiangwendu",
                            width: 130,
                        },
                    ],
                },
                {
                    title: "气缸燃烧状态",
                    align: "center",

                    children: [
                        {
                            title: "压缩压力No.1",
                            key: "yasuoyalino1",
                            width: 130,
                        },
                        {
                            title: "压缩压力No.2",
                            key: "yasuoyalino2",
                            width: 130,
                        },
                        {
                            title: "压缩压力No.3",
                            key: "yasuoyalino3",
                            width: 130,
                        },
                        {
                            title: "压缩压力No.4",
                            key: "yasuoyalino4",
                            width: 130,
                        },
                        {
                            title: "压缩压力No.5",
                            key: "yasuoyalino5",
                            width: 130,
                        },
                        {
                            title: "压缩压力No.6",
                            key: "yasuoyalino6",
                            width: 130,
                        },
                        {
                            title: "压缩压力No.7",
                            key: "yasuoyalino7",
                            width: 130,
                        },
                        {
                            title: "压缩压力No.8",
                            key: "yasuoyalino8",
                            width: 130,
                        },
                        {
                            title: "压缩压力No.9",
                            key: "yasuoyalino9",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.1",
                            key: "baozhayalino1",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.2",
                            key: "baozhayalino2",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.3",
                            key: "baozhayalino3",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.4",
                            key: "baozhayalino4",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.5",
                            key: "baozhayalino5",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.6",
                            key: "baozhayalino6",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.7",
                            key: "baozhayalino7",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.8",
                            key: "baozhayalino8",
                            width: 130,
                        },
                        {
                            title: "爆炸压力No.9",
                            key: "baozhayalino9",
                            width: 130,
                        },
                        {
                            title: "平均压缩比（P压缩/P扫气）",
                            key: "pingjunyasuobi",
                            width: 130,
                        },
                        {
                            title: "各缸平均指示压力Pi bar",
                            key: "gegangpingjunzhishiyali",
                            width: 130,
                        },
                        {
                            title: "排气温度No.1",
                            key: "paiqiwenduno1",
                            width: 130,
                        },
                        {
                            title: "排气温度No.2",
                            key: "paiqiwenduno2",
                            width: 130,
                        },
                        {
                            title: "排气温度No.3",
                            key: "paiqiwenduno3",
                            width: 130,
                        },
                        {
                            title: "排气温度No.4",
                            key: "paiqiwenduno4",
                            width: 130,
                        },
                        {
                            title: "排气温度No.5",
                            key: "paiqiwenduno5",
                            width: 130,
                        },
                        {
                            title: "排气温度No.6",
                            key: "paiqiwenduno6",
                            width: 130,
                        },
                        {
                            title: "排气温度No.7",
                            key: "paiqiwenduno7",
                            width: 130,
                        },
                        {
                            title: "排气温度No.8",
                            key: "paiqiwenduno8",
                            width: 130,
                        },
                        {
                            title: "排气温度No.9",
                            key: "paiqiwenduno9",
                            width: 130,
                        },
                    ],
                },
                {
                    title: "燃油系统",
                    align: "center",
                    children: [
                        {
                            title: "重油进机压力Mpa",
                            key: "zhongyoujinjiyali",
                            width: 130,
                        },
                        {
                            title: "柴油进机压力Mpa",
                            key: "chaiyoujinjiyali",
                            width: 130,
                        },
                        {
                            title: "燃油粘度cst",
                            key: "ranyouzhanducst",
                            width: 130,
                        },
                        {
                            title: "重油进机温度（℃）",
                            key: "zhongyoujinjiwendu",
                            width: 130,
                        },
                        {
                            title: "喷油提前角No.1",
                            key: "penyoutiqianjiaono1",
                            width: 130,
                        },
                        {
                            title: "喷油提前角No.2",
                            key: "penyoutiqianjiaono2",
                            width: 130,
                        },
                        {
                            title: "喷油提前角No.3",
                            key: "penyoutiqianjiaono3",
                            width: 130,
                        },
                        {
                            title: "喷油提前角No.4",
                            key: "penyoutiqianjiaono4",
                            width: 130,
                        },
                        {
                            title: "喷油提前角No.5",
                            key: "penyoutiqianjiaono5",
                            width: 130,
                        },
                        {
                            title: "喷油提前角No.6",
                            key: "penyoutiqianjiaono6",
                            width: 130,
                        },
                        {
                            title: "液压油压力Mpa",
                            key: "yeyayouyali",
                            width: 130,
                        },
                        {
                            title: "液压油温度℃",
                            key: "yeyayouwendu",
                            width: 130,
                        },
                    ],
                },
                {
                    title: "滑油系统",
                    align: "center",
                    children: [
                        { title: "进机压力Mpa", key: "jinjiyali", width: 130 },
                        { title: "进机温度℃", key: "jinjiwendu", width: 130 },
                        { title: "出机温度℃", key: "chujiwendu", width: 130 },
                        {
                            title: "分油机工作小时 H",
                            key: "fenyoujigongzuoxiaoshi",
                            width: 130,
                        },
                        {
                            title: "推力轴承温度℃",
                            key: "tuilizhouchengwendu",
                            width: 130,
                        },
                        {
                            title: "系统滑油日耗量 L",
                            key: "xitonghuayourihaoliang",
                            width: 130,
                        },
                        {
                            title: "滑油消耗率g/kWh",
                            key: "huayouxiaohaolv",
                            width: 130,
                        },
                        {
                            title: "高碱汽缸油日耗量 L",
                            key: "gaojianqigangyourihaoliang",
                            width: 130,
                        },
                        {
                            title: "低碱汽缸油日耗量 L",
                            key: "dijianqigangyourihaoliang",
                            width: 130,
                        },
                        {
                            title: "汽缸油消耗率g/kWh",
                            key: "qigangyouxiaohaolv",
                            width: 130,
                        },
                    ],
                },
                {
                    title: "海水系统",
                    align: "center",
                    children: [
                        {
                            title: "海水进口温度℃",
                            key: "haishuijinkouwendu",
                            width: 130,
                        },
                        {
                            title: "海水出口温度℃",
                            key: "haishuichukouwendu",
                            width: 130,
                        },
                        {
                            title: "海水进出口温度差℃",
                            key: "haishuijinchukouwenducha",
                            width: 130,
                        },
                        {
                            title: "海水泵出口压力Mpa",
                            key: "haishuibengchukouyali",
                            width: 130,
                        },
                    ],
                },
                {
                    title: "淡水系统",
                    align: "center",
                    children: [
                        {
                            title: "低温淡水进口温度℃",
                            key: "diwendanshuijinkouwendu",
                            width: 130,
                        },
                        {
                            title: "低温淡水出口温度℃",
                            key: "diwendanshuichukouwendu",
                            width: 130,
                        },
                        {
                            title: "淡水进出口温度差℃",
                            key: "danshuijinchukouwenducha",
                            width: 130,
                        },
                        {
                            title: "高温淡水进机温度 ℃",
                            key: "gaowendanshuijinjiwendu",
                            width: 130,
                        },
                        {
                            title: "No.1高温淡水出机温度 ℃",
                            key: "no1gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "No.2高温淡水出机温度 ℃",
                            key: "no2gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "No.3高温淡水出机温度 ℃",
                            key: "no3gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "No.4高温淡水出机温度 ℃",
                            key: "no4gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "No.5高温淡水出机温度 ℃",
                            key: "no5gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "No.6高温淡水出机温度 ℃",
                            key: "no6gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "No.7高温淡水出机温度 ℃",
                            key: "no7gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "No.8高温淡水出机温度 ℃",
                            key: "no8gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "No.9高温淡水出机温度 ℃",
                            key: "no9gaowendanshuichujiwendu",
                            width: 130,
                        },
                        {
                            title: "高温淡水出机总管温度",
                            key: "gaowendanshuichujizongguanwendu",
                            width: 130,
                        },
                        {
                            title: "高温淡水进出机温差 ℃",
                            key: "gaowendanshuijinchujiwencha",
                            width: 130,
                        },
                        {
                            title: "高温淡水压力Mpa)",
                            key: "gaowendanshuiyali",
                            width: 130,
                        },
                    ],
                },
                {
                    title: "空气系统",
                    align: "center",
                    children: [
                        {
                            title: "控制空气压力Mpa.",
                            key: "kongzhikongqiyali",
                            width: 130,
                        },
                        {
                            title: "启动空气压力Mpa.",
                            key: "qidongkongqiyali",
                            width: 130,
                        },
                        {
                            title: "安保空气压力Mpa.",
                            key: "anbaokongqiyali",
                            width: 130,
                        },
                    ],
                },
                {
                    title: "轴向振动量 mm",
                    key: "zhouxiangzhendongliang",
                    width: 160,
                },
                {
                    title: "中间轴轴承温度℃",
                    key: "zhongjianzhouzhouchengwendu",
                    width: 160,
                },
            ],
            data10: [],//用于获取后端返回的数据
            
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        ok(){//点击提交按钮
            let obj={};
            this.titlearr.forEach(item=>{
                 obj[item.key]=item.models
            });
            let newobj=Object.assign(obj,)
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        axios("http://192.168.0.101:8067/equipment/ship/getshipNameEn",{},"get").then(res=>{
            console.log(res.data.data.vesselNoList)//接收后端返回的垃圾接口
             let arr=res.data.data.vesselNoList;
            let newarr=[];
            arr.forEach(item=>{
                let obj={
                    value: item.id,
                    label: item.shipNameEn,
                };
                newarr.push(obj);
            })
            this.cityList=newarr
        })
        let titlearr=[];
        let arr=this.columns11;
        for(let i=2;i<=arr.length-3;i++){
            if(arr[i].children){
                let newarr=arr[i].children;
                newarr.forEach(item=>{
                     let obj={
                         title:item.title,
                         models:"",
                         key:item.key,    
                     }
                     titlearr.push(obj)
                })
            }
        }
        console.log(titlearr)
        this.titlearr=titlearr

    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.hig = (window.innerHeight / 2) * 1.5;
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.database {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    font-size: 14px;
    
    .databox {
        width: 100%;
        height: 99%;
        background-color: white;
        border-radius: 6px;
        padding: 20px;
        box-sizing: border-box;
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .tablebox {
            width: 100%;
            height: 80px;
            
            

        }
     
    }
    
}
</style>
    
