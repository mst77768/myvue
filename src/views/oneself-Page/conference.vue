<!--新增执行力跟踪信息页面 -->
<template>
    <div class="huiyi">
        <div class="infoxin">
            <h3>新增执行力跟踪信息</h3>
            <div class="addbox">
                <div class="itme">
                    <span>来源：</span>
                    <Select
                        v-model="smode1"
                        clearable
                        style="width: 160px"
                        aria-placeholder="请选择"
                    >
                        <Option
                            v-for="item in select1"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <div class="itme">
                    <span>会议报告：</span>
                    <Select
                        v-model="smode2"
                        clearable
                        style="width: 280px"
                        aria-placeholder="请选择"
                    >
                        <Option
                            v-for="item in select2[smode1]"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option
                        >
                    </Select>
                </div>
                <div class="itme">
                    <span>发布日期：</span>
                    <DatePicker
                        type="date"
                        placeholder=" 年/月/日"
                        style="width: 190px"
                    ></DatePicker>
                </div>
                <div class="item">
                    <Button type="info">添加</Button>
                </div>
            </div>
            <div class="tablebox">
                <Table
                    border
                    :columns="columns1"
                    :data="data1"
                    width="100%"
                    height="600"
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
                        >
                            <Option
                                v-for="item in row.a.seleitem"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </template>
                    <template slot-scope="{ row, index }" slot="b">
                        <Select
                            v-model="data1[index].b.selsemode1"
                            clearable
                            style="width: 130px"
                            aria-placeholder="请选择"
                        >
                            <Option
                                v-for="item in row.b.seleitem"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </template>
                    <template slot-scope="{ row, index }" slot="c">
                        <Select
                            v-model="data1[index].c.selsemode1"
                            clearable
                            style="width: 130px"
                            aria-placeholder="请选择"
                        >
                            <Option
                                v-for="item in row.c.seleitem"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
                    </template>
                    <template slot-scope="{ row, index }" slot="d">
                        <Select
                            v-model="data1[index].d.selsemode1"
                            clearable
                            style="width: 130px"
                            aria-placeholder="请选择"
                        >
                            <Option
                                v-for="item in row.d.seleitem"
                                :value="item.value"
                                :key="item.value"
                                >{{ item.label }}</Option
                            >
                        </Select>
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
                                @click="hh(index)"
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
                <p @click="add">+新增</p>
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

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {
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
            data1: [
                {
                    name: "1",
                    address:
                        "当前公司首要任务是确保公司员工特别是船员避免受到新冠疫情侵害。要求船员部高度重视，建立健全相关制度，采取一切可行措施保证船员尽量避免与外界接触，适时监控船舶执行情况，每日在公司微信群发布“船员防疫监控日报”。",
                    a: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "海员部",
                                label: "海员部",
                            },
                            {
                                value: "海务部",
                                label: "海务部",
                            },
                            {
                                value: "数据化研发中心",
                                label: "数据化研发中心",
                            },
                            {
                                value: "财务部",
                                label: "财务部",
                            },
                        ],
                    },
                    b: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    c: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    d: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    e: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    f: {
                        data: "",
                    },
                    g: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                },
                {
                    name: "2",
                    address:
                        "目前，整个国家正在处在危机中。如果疫情短时间不能好转，将会有大量民营企业企业破产，鼎衡也会面临重大困难。我们必须做好三个月（即直到5月底）才能恢复正常的准备。",
                    a: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "海员部",
                                label: "海员部",
                            },
                            {
                                value: "海务部",
                                label: "海务部",
                            },
                            {
                                value: "数据化研发中心",
                                label: "数据化研发中心",
                            },
                            {
                                value: "财务部",
                                label: "财务部",
                            },
                        ],
                    },
                    b: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    c: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    d: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    e: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    f: {
                        data: "",
                    },
                    g: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                },
                {
                    name: "3",
                    address:
                        "装载易凝固货物船舶加装伴温管解决防冻问题，10月份之前全部完成",
                    a: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "海员部",
                                label: "海员部",
                            },
                            {
                                value: "海务部",
                                label: "海务部",
                            },
                            {
                                value: "数据化研发中心",
                                label: "数据化研发中心",
                            },
                            {
                                value: "财务部",
                                label: "财务部",
                            },
                        ],
                    },
                    b: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    c: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    d: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    e: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    f: {
                        data: "",
                    },
                    g: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                },
                {
                    name: "4",
                    address:
                        "最近这几艘船舶报表主机平均转速均达不到115转左右，远低于设计转速。要弄明白为什么？用主机健康管理程序中的表格进行分析，判断是主机是否处于健康状态，或污底或螺旋桨问题。脱开轴发只是权宜之计，根本解决办法还是要让船舶恢复到试航状态。目前油价很低，船舶能够开快一点对效益提升立竿见影。要想方设法发掘主机潜力，合理配载，增加航速。",
                    a: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "海员部",
                                label: "海员部",
                            },
                            {
                                value: "海务部",
                                label: "海务部",
                            },
                            {
                                value: "数据化研发中心",
                                label: "数据化研发中心",
                            },
                            {
                                value: "财务部",
                                label: "财务部",
                            },
                        ],
                    },
                    b: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    c: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    d: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    e: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                    f: {
                        data: "",
                    },
                    g: {
                        selsemode1: "",
                        seleitem: [
                            {
                                value: "月度会议",
                                label: "月度会议",
                            },
                            {
                                value: "周例会",
                                label: "周例会",
                            },
                            {
                                value: "邮件",
                                label: "邮件",
                            },
                            {
                                value: "微信",
                                label: "微信",
                            },
                            {
                                value: "不符合",
                                label: "不符合",
                            },
                        ],
                    },
                },
            ],
            select1: [
                {
                    value: 0,
                    label: "月度会议",
                },
                {
                    value: 1,
                    label: "周例会",
                },
                {
                    value: 2,
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
            index: 0,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        add() {
            let obj = {
                name: "1",
                address:
                    "当前公司首要任务是确保公司员工特别是船员避免受到新冠疫情侵害。要求船员部高度重视，建立健全相关制度，采取一切可行措施保证船员尽量避免与外界接触，适时监控船舶执行情况，每日在公司微信群发布“船员防疫监控日报”。",
                a: {
                    selsemode1: "",
                    seleitem: [
                        {
                            value: "海员部",
                            label: "海员部",
                        },
                        {
                            value: "海务部",
                            label: "海务部",
                        },
                        {
                            value: "数据化研发中心",
                            label: "数据化研发中心",
                        },
                        {
                            value: "财务部",
                            label: "财务部",
                        },
                    ],
                },
                b: {
                    selsemode1: "",
                    seleitem: [
                        {
                            value: "月度会议",
                            label: "月度会议",
                        },
                        {
                            value: "周例会",
                            label: "周例会",
                        },
                        {
                            value: "邮件",
                            label: "邮件",
                        },
                        {
                            value: "微信",
                            label: "微信",
                        },
                        {
                            value: "不符合",
                            label: "不符合",
                        },
                    ],
                },
                c: {
                    selsemode1: "",
                    seleitem: [
                        {
                            value: "月度会议",
                            label: "月度会议",
                        },
                        {
                            value: "周例会",
                            label: "周例会",
                        },
                        {
                            value: "邮件",
                            label: "邮件",
                        },
                        {
                            value: "微信",
                            label: "微信",
                        },
                        {
                            value: "不符合",
                            label: "不符合",
                        },
                    ],
                },
                d: {
                    selsemode1: "",
                    seleitem: [
                        {
                            value: "月度会议",
                            label: "月度会议",
                        },
                        {
                            value: "周例会",
                            label: "周例会",
                        },
                        {
                            value: "邮件",
                            label: "邮件",
                        },
                        {
                            value: "微信",
                            label: "微信",
                        },
                        {
                            value: "不符合",
                            label: "不符合",
                        },
                    ],
                },
                e: {
                    selsemode1: "",
                    seleitem: [
                        {
                            value: "月度会议",
                            label: "月度会议",
                        },
                        {
                            value: "周例会",
                            label: "周例会",
                        },
                        {
                            value: "邮件",
                            label: "邮件",
                        },
                        {
                            value: "微信",
                            label: "微信",
                        },
                        {
                            value: "不符合",
                            label: "不符合",
                        },
                    ],
                },
                f: {
                    data: "",
                },
                g: {
                    selsemode1: "",
                    seleitem: [
                        {
                            value: "月度会议",
                            label: "月度会议",
                        },
                        {
                            value: "周例会",
                            label: "周例会",
                        },
                        {
                            value: "邮件",
                            label: "邮件",
                        },
                        {
                            value: "微信",
                            label: "微信",
                        },
                        {
                            value: "不符合",
                            label: "不符合",
                        },
                    ],
                },
            };
            if (this.flag) {
                obj.name = (this.data1.length + 1).toString();
                obj.flag = true;
                this.data1.push(obj);
                this.flag = false;
            } else {
                this.$Notice.info({
                    title: "系统提醒！",
                    desc: "你上条数据未操作完成！",
                });
            }
        },
        fn(a) {
            //这个方法是设置对应的索引的
            console.log(a);
            console.log(this.data1[this.index].f.data);
            this.data1[this.index].f.data = a;
            // console.log(this.data1[this.index].f.data);
            console.log(this.data1);
        },
        bg(index) {
            //修改当前的索引看到哪一行了
            console.log(index);
            this.index = index;
        },
        tijiao() {
            //提交按钮的事件
            if (!this.flag) {
                let index = this.data1.length - 1;
                this.data1[index].address = this.textarea;
                this.textarea = "";
                this.data1[index].flag = false;
                this.flag = true;
                this.$Notice.success({
                    title: "系统提醒！",
                    desc: "提交成功！小伙子！",
                });
            }
            setTimeout(() => {
                this.$router.go(-1);
            }, 1000);
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
    },
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