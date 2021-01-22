<template>
    <div id="app" >
        <router-view />
    </div>
</template>

<style lang="less">
@import "./assets/css/public.css";
.size {
    width: 100%;
    height: 100%;
    
}
html,
body {
    .size;
    overflow: hidden;
    margin: 0;
    padding: 0;
   
}
#app {
    .size;  
}
</style>
