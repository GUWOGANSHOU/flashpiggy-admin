<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">门店管理</a>
        <span> > </span>
        <a href="">项目管理</a>
        <span> > </span>
        <a href="">答案管理</a>    
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-tab" >
                <div class="tab"  v-for="value in operations" :key="value.id" @click="toggleTab(value.key)" ><a :class="{ui_on:isActive}">{{value.label}}</a></div>
            </div>
            <div class="l-main-tabCon">
                <answer_table :opfields="answer_fields"  keep-alive></answer_table>
            </div>
    </div>
</div>
</template>

<script>
import answer_table from "./answer_table.vue";
export default {
    name:"answer_content",
    data () {
        return { 
            isActive:true,
            answer_fields: [
                { key: "answersCode", label: "答案ID", 
                    sortable: true,
                    sortDirection: "desc",
                    isshow:false,
                },
                {
                    key: "missionCode",label: "任务ID",isshow:false
                },
                { key: "questionCode", label: "问题ID" ,isshow:false},
                { key: "userCode", label: "用户ID" ,isshow:false},
                { key: "createTime", label: "创建时间" ,isshow:false},
                { key: "answers", label:"答案",isshow:false},
                { key:"status", label:"状态",fieldsType:"select",fieldsOptions:[{value:"1",text:"已审核"},{value:"0",text:"未审核"}]},
                { key:"goals", label:"得分"},
                { key: "actions", label: "Actions" ,isshow:false }
            ],

            operations: [
                { key: "question", label: "答案管理" },
            ],
            };
    },
    components: {
        answer_table  
    },
    methods: {
    }
};
</script>



