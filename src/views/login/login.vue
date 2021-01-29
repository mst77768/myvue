<template>
    <div class="home">
        <div class="home-constor">
            <div class="loginbox">
                <div class="loginleft">
                    <img
                        src="https://www.dh-platform.com/img/loginTxt.6878bae3.png"
                        alt=""
                    />
                </div>
                <div class="login-right">
                    <form>
                        <div class="imagtop">
                            <img
                                src="https://www.dh-platform.com/img/logo_title.0b4f6db6.png"
                                alt=""
                            />
                        </div>
                        <div class="cut">
                            <a @click="tab(0)" :class="{ ative: 0 == index }"
                                >密码登录</a
                            >
                            <span>|</span>
                            <a @click="tab(1)" :class="{ ative: 1 == index }"
                                >短信登录</a
                            >
                        </div>
                        <div class="inputbox" v-if="0 == index">
                            <input type="text" v-model="user" placeholder="账号" />
                            <input type="text" v-model="password" placeholder="密码" />
                        </div>
                        <div class="inputbox" v-else>短信验证</div>
                        <p id="po">
                              <Button type="warning" @click="login">登录</Button>
                        </p>
                        
                    </form>
                </div>
            </div>
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
            user:"孙小荣",
            password:"123",
            index: 0,
        };
    },
    //监听属性 类似于data概念
    computed: {},
    //监控data中的数据变化
    watch: {},
    //方法集合
    methods: {
        tab(index) {
            this.index = index;
        },
        login(){
            axios.post("http://192.168.0.90:9090/Auth/login",{
                captcha: "111",
password: this.password,
username: this.user,
uuid: "1111",
            }).then(res=>{
                if(res.data.msg=="success"){
                     this.$Message.success('登录成功！欢迎光临！')
                    this.$router.push("/voyagetable");
                }
                console.log(res.data.data.token)
                sessionStorage.setItem("token",res.data.data.token)
                 axios.defaults.headers.common["token"] = res.data.data.token;
                axios.get("http://192.168.0.90:9090/Auth/sys/user/getLoginUser").then(res=>{
                    console.log(res)
                })
            })
        }
    },
    beforeCreate() {}, //生命周期 - 创建之前
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
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
<style lang="less">
.home-constor {
    width: 100%;
    height: 100vh;
    position: relative;
    font-size: 0.42rem;

    background-color: #53cfd7;
    .loginbox {
        width: 600px;
        height: 400px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -300px;
        margin-top: -200px;
        background-color: white;
        border-radius: 11px;
        overflow: hidden;
        .loginleft {
            width: 306px;
            height: 100%;
            float: left;
            background-color: #fbf3e8;
            img {
                margin: 28px 49px;
                width: 187px;
            }
        }
        .login-right {
            width: 290px;
            height: 100%;
            float: left;
            form {
                width: 240px;
                height: 351px;
                margin: 12px auto;
                margin-top: 30px;
                .imagtop {
                    width: 95%;
                    height: 50px;
                    margin: 0 auto;
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .cut {
                    width: 220px;
                    height: 40px;
                    text-align: right;
                    margin-top: 25px;
                    font-size: 14px;
                    a {
                        margin-left: 10px;
                        margin-right: 10px;
                        cursor: pointer;
                        padding-bottom: 8px;
                    }
                    .ative {
                        border-bottom: 2px solid #1890ff;
                    }
                }
                .inputbox {
                    width: 100%;
                    height: auto;
                    padding-top: 8px;
                    input {
                        width: 100%;
                        border: 0px;
                        border-bottom: 1px solid #9999;
                        margin-bottom: 30px;
                        outline:none;
                        height: 35px;
                        padding-left: 5px;

                        background-color: #E8F0FE;
                        &:hover{
                            border: 2px solid #1e5658;
                        }
                        
                    }
                }
            }
        }
    }
    #po{
        text-align:center;
        .ivu-btn{
            width: 100%;
        }
    }
}
</style>