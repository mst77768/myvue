<!-- 查看会议 -->
<template>
    <div class="readhuiyi">
        <div class="xinbox">
            <div class="top">会议报告</div>
            <div class="inputbox">
                <div class="itme">
                    <b>报告类型：</b>
                    <Input
                        v-model="model8"
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
                        :value="model7"
                    ></DatePicker>
                </div>
                <div class="itme">
                    <b>报告名称：</b>
                    <Input
                        v-model="value"
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
                                v-model="value1"
                                placeholder="请输入..."
                                style="width: 150px"
                            />
                        </div>

                        <div class="item">
                            <b>参会人员：</b>
                            <Input
                                v-model="value3"
                                placeholder=""
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 2 }"
                                style="width: 90%"
                            />
                        </div>
                        <div class="item">
                            <b>缺席人员：</b>
                            <Input
                                v-model="value4"
                                placeholder=""
                                style="width: 90%"
                            />
                        </div>
                    </div>
                    <div class="tabbox">
                        <h3>本周公司及船队各轮需重点关注及解决的事项</h3>
                        <Table border :columns="columns1" :data="data1">
                            <template slot-scope="{ row }" slot="name">
                                <span v-if="!row.flag">{{ row.name }}</span>
                                <span v-else>
                                    <Input
                                        v-model="value12"
                                        placeholder="请输入..."
                                        clearable
                                        style="width: 120px"
                                    />
                                </span>
                            </template>
                            <template slot-scope="{ row }" slot="text">
                                <Poptip
                                    trigger="hover"
                                    word-wrap
                                    width="400"
                                    :content="row.text"
                                >
                                    <span>{{ row.text }}</span>
                                </Poptip>
                            </template>
                            <template slot-scope="{ row }" slot="operation">
                                <span v-if="!row.flag"> </span>
                                <span v-else>
                                    <Button type="info" ghost @click="nb(row)"
                                        >确认增加</Button
                                    >
                                </span>
                            </template>
                        </Table>

                        <h3>总裁指示</h3>
                        <Input
                            v-model="textarea"
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 9 }"
                        />
                        <div class="updata">
                            <Upload action="//jsonplaceholder.typicode.com/posts/"  :default-file-list="defaultList" :on-success="fn">
                        <span v-show="flase"><Button  type="info" icon="ios-cloud-upload-outline"
                            >上传附件</Button
                        >
                        </span>
                    </Upload>
                        </div>
                    </div>
                    <div class="botm">
                        <Button
                            size="large"
                            type="primary"
                            @click="$router.push('/rlzz')"
                            >返回首页</Button
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

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
            defaultList: [
                    {
                        'name': '鼎衡船务合同--20200820-修订版-02.doc',
                        'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                    },
                    {
                        'name': '鼎衡船务合同-20200820-修订版-03.doc',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    },
                    {
                        'name': '区块链合同架构.xlsx',
                        'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                    }
                ],
            value: "安全生产周例会纪要2020W49",
            value1: "大会议室",
            value3:
                "李多珠、孙小荣、李兴波、顾雯静、唐宏坤、张书殿、樊哲寰、陈作章、张立志、潘春兰、向志国、王尚君、何玮靓、万千、张勤、李杨、宋卫东、李丽、孙振颖、吴隆隆、马淑贞、倪颖峰、蒙明涛、杨晓飞、马晖博、李涛、吴建强、付宇、郭峰",
            value4:
                "吴勇飞、杨伟杰、陈忠华、李多玉、李娇娇、余明远、廖广彪、傅智豪",
            textarea: `1、HENGXIN货物控制系统问题，要求企管部按“不符合”处理，深入调查根本原因，同时针对船队中现有货物控制系统有问题的船舶进行问题汇总，商修船部、相关船队总管和海务部就系统性整改方案提出建议，12月15日前提交。
2、要求李兴波总经理就航次TCE分析进行改进,对于实际TC与理想TC相差超过10％的航次，列出两到三个对TCE影响较大的因素，进行详细分析。
3、下个月开始，要求全体员工开始准备年终总结，对照本部门职责或个人目标，就如何达成目标，结合“四项基本原则”进行深度思考，特别是第一项，如何保证自己准确全面了解职责范围内各种事项，不仅要有认识而且要有具体行动计划。`,
            flag: true,
            textarea2: "",
            value12: "",
            columns1: [
                {
                    title: "部门名称",
                    slot: "name",
                    width: "150",
                    align: "center",
                },
                {
                    title: "本周汇报及需要协调事项",
                    slot: "text",
                    align: "center",
                },
                {
                    title: "操作",
                    slot: "operation",
                    width: "100",
                    align: "center",
                },
            ],
            data1: [
                {
                    name: "财务部",
                    text: "无",
                    operation: "",
                },
                {
                    name: "业务一部",
                    text: `待泊情况：无。
揽货情况：见动态信息。
需要关注：宁波青峙码头对内贸靠泊船舶出台新的审船规定，针对船龄大于18年、三年内发生过各类事故以及违章处罚不予审核，涉及“鼎衡17”和“鼎衡18”存在不符合标准情况。请海务及时了解码头实际执行标准。`,
                    operation: "",
                },
                {
                    name: "业务二部",
                    text: `待泊情况：无。
揽货情况：见动态信息。
需要关注：无。`,
                    operation: "",
                },
                {
                    name: "船队总管",
                    text: `樊哲寰：无。

杨伟杰：无。

陈作章：AG2轮北上大风浪，船首救生筏及右舷舷梯损伤，需要物资部协调供应救生筏。AG3轮ODME取样探头损坏，需要回国内安排服务商检修更换

陈忠华：无。

张立志： DHE新加坡申请中检。`,
                    operation: "",
                },
                {
                    name: "船员部",
                    text: `本周换班：AG2更换（新晋）船长，需海、机务关注。

需要协调：无。`,
                    operation: "",
                },
                {
                    name: "物资管理部",
                    text: `
需要协调：有机硅油漆在温度低于10度以下施工需增加一层连接漆成本增加40%，建议后续避免冬天使用有机硅油漆。`,
                    operation: "",
                },
                {
                    name: "数据化研发中心",
                    text: `“鼎衡16”试点项目，数据采集已完成，字段设置需海、机务根据实际管理进行修订。今天下午易站科技远程视频会议讨论鼎衡16数据监控APP界面事宜，请相关海机务参加。`,
                    operation: "",
                },
                {
                    name: "人力资源部",
                    text: "无",
                    operation: "",
                },
                {
                    name: "修船部",
                    text: "无",
                    operation: "",
                },
                {
                    name: "行政部",
                    text: "无",
                    operation: "",
                },
                {
                    name: "海务部",
                    text: `SS船舶整体状况良好，船员的服务服从意识良好，从船舶的细节能够感受到前一个管理公司做的还是比较好的。印尼船员上船刚满三个月，船舶总体状态有下降趋势。由于营运棕榈油航线，洗舱、推舱后，未及时清理甲板及生活甲板残留的棕榈油，甲板大面积湿滑，存在人员滑倒受伤的风险。后续重点进行维护保养工作。关于“鼎衡5”V2038航次丙酮货品质量问题，SGS的化验结果已经非常明确，货品问题出在装货港高雄，需要业务部与租家及收货人做好沟通解释`,
                    operation: "",
                },
                {
                    name: "海务副总裁",
                    text: "无",
                    operation: "",
                },
                {
                    name: "孙小荣副总裁",
                    text: "无",
                    operation: "",
                },
                {
                    name: "企管部",
                    text: `外部检查缺陷分析：11月26日AG3 SIRE检查、11月18日HENG XIN 韩国码头检查；11月18日鼎衡18现场监督检查。`,
                    operation: "",
                },
            ],
            model8: "周例会",
            model7: "2020/7/15",
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
    created() {
        console.log(this.$route.params.id); //拿到上个页面传过来的值
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
        width: 1147px;
        height: auto;
        margin: 8px auto;
        border: 1px solid #ccc;
        background-color: white;
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
                    .ivu-table-wrapper {
                        overflow: visible;
                    }
                    .updata {
                        margin-top: 0.5rem;
                        .ivu-btn {
                            color: #2d8cf0;
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