<!-- 修改页面周例会 -->
<template>
    <div class="updatezou">
        <div class="xinbox">
            <div class="top">周例会修改</div>
            <div class="inputbox">
                <div class="itme">
                    <b>报告类型：</b>
                    <Select
                        v-model="form.reportType"
                        clearable
                        style="width: 4.54rem"
                        @on-change="fn"
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
                        type="date"
                        placeholder="年/月/日"
                        :value="form.meetingDate"
                        @on-change="getdate"
                        style="width: 4.54rem"
                    ></DatePicker>
                </div>
                <div class="itme">
                    <b>报告名称：</b>
                    <Input
                        v-model="form.reportName"
                        placeholder="请输入..."
                        style="width: 4.54rem"
                        @on-change="text1"
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
                                <Button
                                    icon="ios-cloud-upload-outline"
                                    >上传附件</Button
                                >
                            </Upload>
                        </div>
                    </div>
                    <div class="botm">
                        <Button size="large" type="primary" 
                            >修改</Button
                        >
                        
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

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {},
    data() {
        //这里存放数据
        return {};
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
        }
    }
}
</style>