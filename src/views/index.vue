<!-- 页面主入口 -->
<template>
    <div class="home">
        <header>
            <img src="../assets/img/u109.png" alt="" />
        </header>
        <!-- 头部就是一个图片 -->
        <main>
            <div class="left">
                <left />
                <!-- 公共左边的侧边栏导航 -->
            </div>
            <div class="right">
                <router-view></router-view>
                <!-- <div class="xin"></div> -->
                <!-- 右边页面的占位符 -->
            </div>
        </main>
        <!-- 底部也是一个图片 -->
        <footer></footer>
    </div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import left from "@/components/left";
export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        left,
    },
};
</script>
<style lang="less" >
ul,
li {
    list-style: none;
    // font-size: 0.5rem;
}
.ivu-select-selection {
        width: 100% !important;
    }
.home {
    width: 100%;
    height: 100%;
    min-width: 1400px;
    position: relative;
    background-color: rgba(242, 242, 242, 1);
    header {
        width: 100%;
        height: 6.9%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    main {
        width: 100%;
        height: 88%;
        .left {
            width: 13.5%;
            height: 100%;
            float: left;
            background-color: rgb(26, 191, 203);
            box-sizing: border-box;
            padding-top: 2rem;
            background-image: url(../assets/img/left.png);
            background-size: 100% auto !important;
            background-repeat: no-repeat !important;
            background-position: 0 100% !important;
        }
        .right {
            margin-left: 13.6%;
            height: 100%;
            .ivu-breadcrumb{
                font-size: 0.44rem;
            }
            .ivu-table-wrapper {
                overflow: visible;
            }
        }
    }
    footer {
        width: 100%;
        height: 5%;
        background-image: url(../assets/img/footer.png);
        background-size: 100% 48px;
        background-repeat: no-repeat;
        text-align: center;
        line-height: 1.5rem;
        font-size: 0.6rem;
    }
}
.ivu-table-header thead tr th {
    background-color: #a5e4ea;
}
</style>
