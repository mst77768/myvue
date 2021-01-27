<!-- iframe页面 -->
<template>
    <div class="iframe">
        <div class="banxin">
            <iframe
                id="shipIframe"
                frameborder="0"
                scrolling="auto"
                :src="enstation"
                class="inner-frame"
                :style="frameStyle"
            ></iframe>
            <!-- <a :href="enstation">点击跳转</a>  -->
        </div>
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
            frameStyle: {
                height: "",
                minHeight: "674px",
            },
            enstation: "",
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
       
        setCookie(name, value, exdays) {
            let cookie = name + "=" + value + ";";
            if (exdays) {
                let d = new Date();
                d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
                let expires = "expires=" + d.toGMTString();
                cookie = cookie + " " + expires;
            }
            document.cookie = cookie;
        },
         getlogin() {
            axios.get("https://www.enstation.com/yzkj_login?usr=dingheng&pwd=yzkj2020").then((res) => {
                    console.log(res.data.user_info);
                     let info=res.data.user_info;
                    this.setCookie("lang","zh",1);
                    this.setCookie("user",info.user_name,1);
                    this.setCookie("auth","1",1);
                    this.setCookie("random",info.user_name,1);
                    this.setCookie("nick_name",info.user_name,1);
                    this.setCookie("user_id",info.user_id,1);
                    this.setCookie("Token",info.Token,1);
                    console.log(info.Token)
                    this.enstation=`https://www.enstation.com/pages/iBoat/main.html?sn=P0&Token=${info.Token}&name=${info.user_name}`
                });
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {
        this.getlogin()
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
.iframe {
    width: 99%;
    height: 99%;
    margin: 4px auto;
    font-size: 14px;
    .banxin {
        width: 100%;
        height: 99%;
        background-color: white;
        border-radius: 6px;
        overflow: hidden;
        position: relative;
        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
        .inner-frame {
            position: absolute;
            // border-radius: 6px;
            width: 100%;
            height: 100%;
        }
    }
}
</style>