<!-- 贡献度分析页面 -->
<template>
    <div class="contribution">
        <Breadcrumb>
            <BreadcrumbItem to="/">航次管理</BreadcrumbItem>
            <BreadcrumbItem to="contribution">贡献度分析</BreadcrumbItem>
        </Breadcrumb>
        <div class="conbox">
            <div class="topbox">
                <div class="top">
                    <div class="npm nb">
                        <span>船名: </span>
                        <Select v-model="model1" style="width: 3.9rem">
                            <Option
                                v-for="item in cityList"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="nb">
                        <span>航线: </span>
                        <Select v-model="model1" style="width: 3.9rem">
                            <Option
                                v-for="item in cityList"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </div>
                    <div class="nb">
                        <span>船队总管: </span>
                        <Input
                            v-model="value14"
                            placeholder="请输入..."
                            clearable
                            
                        />
                    </div>
                    <div class="nb">
                        <span> 海务主管: </span>
                        <Input
                            v-model="value14"
                            placeholder="请输入..."
                            clearable
                            
                        />
                    </div>
                    <div class="nb">
                        <span>油料部: </span>
                        <Input
                            v-model="value14"
                            placeholder="请输入..."
                            clearable
                            style="width: 4.2rem"
                        />
                    </div>
                    <div class="nb">
                        <span> 月份范围: </span>
                        <DatePicker
                            type="date"
                            placeholder="__年__月__日"
                           
                        ></DatePicker>
                        <span class="kong"></span>
                        <DatePicker
                            type="date"
                            placeholder="__年__月__日"
                            
                        ></DatePicker>
                        <Button type="primary">查询</Button>
                    </div>
                </div>
            </div>

            <div class="sumbox">
                <div class="contrleft">
                    <div class="hsum">航次总数: 100</div>
                    <div class="Tc">TC损失:5000美金</div>
                </div>
                <div><Button type="warning" @click="updta">导出</Button></div>
            </div>
            <div class="tabbox">
                 <Table
                    border
                    ref="tables"
                    :columns="columns4"
                    :data="data1"
                    @on-select="fn"
                    :height="hig"
                ></Table>
            </div>
        </div>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            hig:"",
            value14: "",
            cityList: [
                {
                    value: "New York",
                    label: "New York",
                },
                {
                    value: "London",
                    label: "London",
                },
                {
                    value: "Sydney",
                    label: "Sydney",
                },
                {
                    value: "Ottawa",
                    label: "Ottawa",
                },
                {
                    value: "Paris",
                    label: "Paris",
                },
                {
                    value: "Canberra",
                    label: "Canberra",
                },
            ],
            model1: "",
            columns4: [
                {
                    type: "selection",
                    width: 60,
                    align: "center",
                },
                {
                    title: "月份",
                    key: "yue",
                    width:90,
                },
                {
                    title: "船名",
                    key: "cm",
                },
                {
                    title: "航次号",
                    key: "hch",
                },
                {
                    title: "航线",
                    key: "hx",
                },
                {
                    title: "币种",
                    key: "bz",
                },
                {
                    title: "理想TC",
                    key: "lxtc",
                },
                {
                    title: "实际TC",
                    key: "sjtc",
                },
                {
                    title: "速度影响-转速",
                    width:130,
                    key: "sdzs",
                },
                {
                    title: "速度影响-天气",
                    
                    key: "sdtq",
                    width:130
                },
                {
                    title: "卸货速度",
                    key: "xhsd",
                    width:120,
                },
                {
                    title: "在港时间",
                    key: "zgsj",
                    width:120,
                },
                {
                    title: "吃水",
                    key: "cs",
                },
                {
                    title: "燃油",
                    key: "ry",
                },
                {
                    title:"加油",
                    key:"jy"
                },
                {
                    title:"offhire",
                    key:"off"
                },
                {
                    title:"间接offhire",
                    width:110,
                    key:"jjoff"
                }

            ],
            data1: [
                {
                    yue: "2020-12",
                    cm: "DHA",
                    hch: "V2001",
                    hx: "RBM",
                    bz:"8K",
                    lxtc:"A-B",
                    sjtc:"乙醇",
                    sdzs:"4200吨",
                    sdtq:"中海壳",
                    xhsd:"1000W",
                    zgsj:"2500",
                    cs:"2800",
                    ry:"2300",
                    jy:"-500",
                    off:"",
                    jjoff:""
                }  
            ],
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
         fn(a) {
            console.log(a);
        },
        updta(){
           
            console.log(this.$refs.tables.exportCsv)
            this.$refs.tables.exportCsv({
                filename: `table-${(new Date()).valueOf()}.csv`
            })
        
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
       for(let i=0;i<3;i++){
           this.data1.push(this.data1[0])
       }
    },
    beforeMount() {}, //生命周期 - 挂载之前
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.hig=window.innerHeight/4
    },
    beforeUpdate() {}, //生命周期 - 更新之前
    updated() {}, //生命周期 - 更新之后
    beforeDestroy() {}, //生命周期 - 销毁之前
    destroyed() {}, //生命周期 - 销毁完成
    activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang="less" scoped>
.contribution {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    font-size: 0.42rem;
    .conbox {
        width: 100%;
        height: 97%;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .topbox {
            width: 100%;
            height: 1.51rem;
            margin-top: 0.75rem;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;
            .top {
                display: flex;
                // background-color: red;
                height: 100%;
                width: 99%;
                align-items: center;
                .npm {
                    margin-left: 1.06rem;
                }
                .nb {
                    width: auto;
                    height: 100%;
                    margin-right: 0.6rem;
                    display: flex;
                    align-items: center;
                    .ivu-date-picker {
                        margin-right: 0;
                    }
                    span {
                        margin-right: 0.25rem;
                        white-space: nowrap;
                    }
                    .kong {
                        margin:  0.33rem;
                    }
                    .ivu-btn {
                        margin-left: 3.21rem;
                        width: 2.72rem;
                    }
                }
            }
        }

        .sumbox {
            display: flex;
            width: 95%;
            height: 1.5rem;
            justify-content: space-between;
            align-items: center;
            .contrleft {
                width: 60%;
                display: flex;
                div {
                    width: 30%;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
            }
            .ivu-btn {
                width: 2.72rem;
            }
        }
        .tabbox {
            width: 99%;
            height: auto;
            margin: 0 auto;
            padding: 0.33rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            
        }
    }
}
</style>

