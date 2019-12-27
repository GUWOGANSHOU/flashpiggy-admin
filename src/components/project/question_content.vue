<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">门店管理</a>
        <span> > </span>
        <a href="">项目管理</a>
        <span> > </span>
        <a href="">问题管理</a>    
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-tab" >
                <div class="tab"  v-for="value in operations" :key="value.id" @click="toggleTab(value.key)" ><a :class="{ui_on:isActive}">{{value.label}}</a></div>
            </div>
            <div class="l-main-tabCon">
                <question_table :opfields="business_fields" :urls="business_urls" keep-alive></question_table>
            </div>
    </div>
</div>
</template>

<script>
import question_table from "./question_table.vue";
export default {
    name:"question_content",
    data () {
        return { 
            isActive:true,
            business_fields: [
                { key: "questionsCode", label: "问题ID", 
                    sortable: true,
                    sortDirection: "desc",
                    isshow:false,
                },
                {
                    key: "title",label: "题目",
                },
                { key: "questionsType", label: "题目类型" ,fieldsType:"select",fieldsOptions:[{value:0,text:"拍照"},{value:1,text:"选择"}]},
                { key: "questionsOptions", label: "题目选项（选项间用#隔开）" },
                { key: "claim", label: "题目要求" },
                {key: "url", label:"样例",fieldsType:"fileinput"},
                { key: "actions", label: "Actions" ,isshow:false }
            ],
            business_urls: [
                { url: "/user",method:"post",label: "添加"},
                { url: "/user",method:"delete", label: "删除"},
                { url: "/user",method:"put", label: "修改"},
                { url: "/users",method:"get", label: "查找全部"},
            ],
            operations: [
                { key: "question", label: "问题管理" },
            ],
            };
    },
    components: {
        question_table  
    },
    methods: {
    }
};
</script>



