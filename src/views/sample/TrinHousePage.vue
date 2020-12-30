<!-- 海务输入页面 -->
<template>
    <div class="TrinHousePage">
        <Breadcrumb>
            <BreadcrumbItem to="/">航次管理</BreadcrumbItem>
            <BreadcrumbItem to="Trintyhouse">海务填报</BreadcrumbItem>
        </Breadcrumb>
        <div class="Trinbox">
            <div class="boxitem">
                <div class="boxtop">
                    <div class="itme1">
                        <Button type="warning">编辑</Button>
                    </div>
                    <div class="itme2">
                        <Button type="primary">提交</Button>
                    </div>
                </div>
                <div class="banxin">
                    <p>航次基本信息</p>
                    <div class="formitem">
                        <div class="inputitem">
                            <span>船名：</span>
                            <Select v-model="model1" style="width: 150px">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                    >{{ item.label }}</Option
                                >
                            </Select>
                        </div>
                        <div class="inputitem">
                            <span>航次号：</span>
                            <Select v-model="model1" style="width: 150px">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                    >{{ item.label }}</Option
                                >
                            </Select>
                        </div>
                        <div class="inputitem">
                            <span>TC预算：</span>
                            <Select v-model="model1" style="width: 150px">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                    >{{ item.label }}</Option
                                >
                            </Select>
                        </div>
                        <div class="inputitem">
                            <span>业务主管：</span>
                            <Select v-model="model1" style="width: 150px">
                                <Option
                                    v-for="item in cityList"
                                    :value="item.value"
                                    :key="item.value"
                                    >{{ item.label }}</Option
                                >
                            </Select>
                        </div>
                        <div class="inputitem">
                            <span>填报日期：</span>
                            <DatePicker
                                type="date"
                                placeholder="__年__月__日"
                                style="width: 150px"
                            ></DatePicker>
                        </div>
                    </div>
                    <p>费用信息</p>
                    <div class="fenyong">
                        <div>
                            <span>运费：</span>
                            <Input
                                v-model="value"
                                placeholder="请输入..."
                                style="width: 150px"
                            />
                        </div>
                        <div>
                            <span>滞期费:</span>
                            <Input
                                v-model="value"
                                placeholder="请输入..."
                                style="width: 150px"
                            />
                        </div>
                        <div>
                            <span>佣金比例:</span>
                            <Input
                                v-model="value"
                                placeholder="请输入..."
                                style="width: 150px"
                            />
                        </div>
                        <div>
                            <span>其他费用:</span>
                            <Input
                                v-model="value"
                                placeholder="请输入..."
                                style="width: 150px"
                            />
                        </div>
                    </div>
                    <p>港使费信息</p>
                    <div class="gangshi">
                        <div v-for="(item, key) in 5" :key="key">
                            <div class="flist">
                                <span>装港{{ item }}港使费:</span>
                                <Input
                                    v-model="value"
                                    placeholder="请输入..."
                                    style="width: 120px"
                                />
                            </div>
                            <div>
                                <span>卸港{{ item }}港使费:</span>
                                <Input
                                    v-model="value"
                                    placeholder="请输入..."
                                    style="width: 120px"
                                />
                            </div>
                        </div>
                    </div>
                    <p class="teshu">其他信息</p>
                    <div class="qita1">
                        <div class="hhleft">
                            <b>offhire</b>
                            <span style="margin-left: 60px">
                                <RadioGroup v-model="phone" on-change="fn">
                                    <Radio label="true">
                                        <span>是</span>
                                    </Radio>
                                    <Radio label="false">
                                        <span>否</span>
                                    </Radio>
                                </RadioGroup>
                            </span>
                        </div>

                        <div class="right" v-show="phone == 'true'">
                            <div class="itme1">
                                <div>
                                    <span>offhire开始时间:</span>
                                    <DatePicker
                                        type="date"
                                        placeholder="__年__月__日"
                                        style="width: 150px"
                                    ></DatePicker>
                                </div>
                                <div>
                                    <span>offhire结束时间:</span>
                                    <DatePicker
                                        type="date"
                                        placeholder="__年__月__日"
                                        style="width: 150px"
                                    ></DatePicker>
                                </div>
                            </div>
                            <div class="itme2">
                                <div>
                                    <span>间接offhire开始时间:</span>
                                    <DatePicker
                                        type="date"
                                        placeholder="__年__月__日"
                                        style="width: 150px"
                                    ></DatePicker>
                                </div>
                                <div>
                                    <span>间接offhire结束时间:</span>
                                    <DatePicker
                                        type="date"
                                        placeholder="__年__月__日"
                                        style="width: 150px"
                                    ></DatePicker>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="qita1">
                        <div class="hhleft">
                            <b>营运时间加油</b>
                            <span style="margin-left: 20px">
                                <RadioGroup v-model="phone1" on-change="fn">
                                    <Radio label="true">
                                        <span>是</span>
                                    </Radio>
                                    <Radio label="false">
                                        <span>否</span>
                                    </Radio>
                                </RadioGroup>
                            </span>
                        </div>

                        <div class="right" v-show="phone1 == 'true'">
                            <div class="itme1">
                                <div>
                                    <span>营运时间加油船舶抵达锚地时间:</span>
                                    <DatePicker
                                        type="date"
                                        placeholder="__年__月__日"
                                        style="width: 150px"
                                    ></DatePicker>
                                </div>
                                <div>
                                    <span>营运时间加油结束时间:</span>
                                    <DatePicker
                                        type="date"
                                        placeholder="__年__月__日"
                                        style="width: 150px"
                                    ></DatePicker>
                                </div>
                            </div>
                            <div class="itme2">
                                <div>
                                    <span style="white-space: nowrap"
                                        >加油绕航距离:<Input
                                            v-model="value"
                                            placeholder="请输入..."
                                            style="width: 150px"
                                    /></span>
                                </div>
                            </div>
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

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            value: "",
            phone: "false",
            phone1: "false",
            // phone1: "true",
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
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {},
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
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
.TrinHousePage {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    font-size: 0.42rem;
    .Trinbox {
        width: 100%;
        height: 97%;
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .boxitem {
            width: 99%;
            height: 98%;
            margin: 8px auto;
            border: 1px solid #ccc;
            .boxtop {
                display: flex;
                height: 40px;
                align-items: center;
                border-bottom: 1px solid #ccc;
                div {
                    margin-left: 30px;
                    .ivu-btn {
                        width: 60px;
                    }
                }
            }
            .banxin {
                width: 98%;
                margin: 0 auto;
                height: 500px;
                p {
                    border-bottom: 1px solid #ccc;
                    font-weight: 800;
                    font-size: 15px;
                    margin-top: 30px;
                    text-indent: 6px;
                    margin-bottom: 10px;
                }
                .teshu {
                    margin-top: 40px;
                }
                .formitem {
                    width: 78%;
                    height: 60px;
                    display: flex;
                    margin-left: 20px;
                    align-items: center;
                    justify-content: space-between;
                }
                .fenyong {
                    width: 60.8%;
                    height: 60px;
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                    justify-content: space-between;
                    div {
                        span {
                            margin-right: 6px;
                        }
                    }
                }
                .gangshi {
                    width: 78%;
                    height: auto;
                    display: flex;
                    margin-top: 20px;
                    margin-left: 20px;
                    align-content: space-around;
                    justify-content: space-between;
                    div {
                        .flist {
                            margin-bottom: 20px;
                        }
                        div {
                            span {
                                margin-right: 10px;
                            }
                        }
                    }
                }
                .qita1 {
                    width: 1000px;
                    height: 90px;
                    margin-top: 30px;
                    display: flex;
                    // background-color: red;
                    margin-left: 20px;
                    .hhleft {
                        width: 25%;
                        height: 100%;
                        float: left;
                    }
                    .right {
                        width: 70%;
                        height: 100%;
                        float: right;
                        display: flex;
                        justify-content: space-between;
                        .itme1,
                        .itme2 {
                            display: flex;
                            flex-wrap: wrap;
                            align-content: space-between;
                            div {
                                // display: flex;
                                // align-items: center;
                            }
                            .ivu-date-picker {
                                margin-left: 10px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>