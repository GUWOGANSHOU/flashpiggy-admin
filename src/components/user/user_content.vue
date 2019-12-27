<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">用户管理</a>
        <span> > </span>
        <a href="">用户数据</a>
    </div>
    <div id="l-main-list-wrap">
            <!-- <div class="l-main-tab" >
                <div class="tab"  v-for="value in operations" :key="value.id"  ><a :class="{ui_on:isActive}">{{value.label}}</a></div>
            </div> -->
            <div class="l-main-top">
                <div class="user-outline">
                    <div class="max-icons-wrap user-icon_blue"></div>
                    <label>用户概览</label>
                </div>
                <div class="user-sum">
                    <label>用户数</label>
                    <span>100</span>
                </div>
                <div class="user-normal">
                    <label>正常</label>
                    <span>80</span>
                </div>
                <div class="user-stop">
                    <label>封号</label>
                    <span>20</span>
                </div>
            </div>
            <div class="l-main-tabCon">
                <!-- <user_table :opfields="user_fields" :urls="user_urls" keep-alive></user_table> -->
                <user_table :opfields="user_fields"  keep-alive></user_table>
            </div>
    </div>
</div>
</template>

<script>
import user_table from "./user_table.vue";
export default {
    name:"business_content",
    data () {
        return { 
            isActive:true,
            // currentTab: 'user_table', // currentTab 用于标识当前触发的子组件
            user_fields: [
                { 
                    key: "userCode", 
                    label: "用户ID",
                    // sortable: true,
                    // sortDirection: "desc"
                    },
                { key: "userName", label: "微信昵称" },
                { key: "sex", label: "性别" },
                { key: "mobile", label: "联系方式" },
                {key: "lastLoginDate", label:"最近登陆时间"},
                {key: "completion_rate", label:"任务完成率"},
                // { key: "actions", label: "Actions" ,isshow:false}
            ],
            // user_urls: [
            //     { url: "/user",method:"post",label: "添加"},
            //     { url: "/user",method:"delete", label: "删除"},
            //     { url: "/user",method:"put", label: "修改"},
            //     { url: "/users",method:"get", label: "查找全部"},
            // ],
            operations: [
                { key: "user", label: "用户数据" },
            ],
            };
    },
    components: {
        user_table      
    },
    methods: {
        // toggleTab: function(tab) {
        //     if(tab==='user'){
        //         this.current_fields=this.user_fields
        //         this.current_urls=this.user_urls
        //         this.isActive=true
        //     }
        // }
    }
};
</script>

<style>
.l-main-top {
    height: 7.6em;
    padding: 1em;
    background-color: #ffffff;
    display: flex;
    justify-content: space-around;
}
.l-main-top label {
    display: block;
    font-size: 1.3em;
}
.l-main-top span {
    font-size: 2.1em;
}
.user-stop span {
    color: red;
}
.l-main-top label,
.l-main-top span {
    font-weight: 550;
}
.max-icons-wrap{
    display: inline-block;
    width: 4em;
    height: 3em;
}
.user-icon_blue {
    background: url(../../assets/user-icon_blue.png) no-repeat 1em .2em;
    background-size: 3em 3em;
}
</style>



