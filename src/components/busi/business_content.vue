<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">总商管理</a>
        <span> > </span>
        <a href="">总商信息</a>
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-tab" >
                <div class="tab"  v-for="value in operations" :key="value.id" @click="toggleTab(value.key)" ><a :class="{ui_on:isActive}">{{value.label}}</a></div>
            </div>
            <div class="l-main-tabCon">
                <business_table :opfields="business_fields" :urls="business_urls" keep-alive></business_table>
            </div>
    </div>
</div>
</template>

<script>
import business_table from "./business_table.vue";
export default {
    name:"business_content",
    data () {
        return { 
            isActive:true,
            // currentTab: 'business_table', // currentTab 用于标识当前触发的子组件
            // current_fields:[],
            // current_urls:[],
            business_fields: [
                { key: "userCode", label: "总商ID"  ,isshow:false},
                {
                    key: "businessName",
                    label: "商家",
                    sortable: true,
                    sortDirection: "desc",
                  
                },
                { key: "totalProjectNum", label: "总项目数"},
                { key: "publishProjectNum", label: "进行中项目数"},
                { key: "finishProjectNum", label: "已完成项目数"},
                // { key: "login_code", label: "账号" },
                // { key: "password", label: "密码" },
                // { key: "total_shops_num", label: "分店数" },
                // { key: "role_type", label: "角色" },
                {key: "logo", label:"LOGO",fieldsType:"fileinput"},
                { key: "actions", label: "Actions" ,isshow:false }
            ],
            business_urls: [
                { url: "/user",method:"post",label: "添加"},
                { url: "/user",method:"delete", label: "删除"},
                { url: "/user",method:"put", label: "修改"},
                { url: "/users",method:"get", label: "查找全部"},
            ],
            operations: [
                { key: "business", label: "总商信息" },
            ],
            };
    },
    components: {
        business_table      
    },
    methods: {
        // toggleTab: function(tab) {
        //     if(tab==='business'){
        //         this.current_fields=this.business_fields
        //         this.current_urls=this.business_urls
        //     }
        // }
    }
};
</script>



