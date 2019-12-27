<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">门店管理</a>
        <span> > </span>
        <a href="">项目管理</a>
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-top">
                <div class="user-outline">
                    <div class="max-icons-wrap project-icon"></div>
                    <label>项目情况</label>
                </div>
                <div class="user-sum">
                    <label>项目数</label>
                    <span>2</span>
                </div>
                <div class="user-normal">
                    <label>运行中</label>
                    <span>1</span>
                </div>
                <div class="user-stop">
                    <label>已结束</label>
                    <span>1</span>
                </div>
            </div>
            <div class="l-main-tab" >
                <div class="tab"  v-for="(value,index) in operations" :key="value.id" @click="toggleTab(value.key,index)" ><a :class="{ui_on:index===isActive}">{{value.label}}</a></div>
            </div>
            <div class="l-main-tabCon">
                <project_table :opfields="project_fields" :urls="project_urls" keep-alive></project_table>
            </div>
    </div>
</div>
</template>

<script>
import project_table from "./project_table.vue";
export default {
    name:"project_content",
    data () {
        return {
            isActive:0,
            project_fields: [
                {
                    key: "projectCode",
                    label: "项目ID",
                    isshow:false,
                },
                { key: "name", label: "项目名称"},
                { key: "createTime", label: "发布时间",isshow:false},
                { key: "missions_name", label: "任务绑定",fieldsType:"select",fieldsOptions:[{value:"Q1任务",text:"Q1任务"},{value:"Q2任务",text:"Q2任务"},{value:"Q3任务",text:"Q3任务"}]},
                { key: "shops_groups", label: "绑定门店",fieldsType:"checkbox",fieldsOptions:[{value:"无需目的型",text:"无需目的型"},{value:"仓山店",text:"仓山店"},{value:"万达店",text:"万达店"}]},
                { key: "user_num", label: "项目参与人数",isshow:false },
                { key: "status", label: "项目状态",fieldsType:"select",fieldsOptions:[{value:"待审核",text:"待审核"},{value:"已中止",text:"已中止"},{value:"进行中",text:"进行中"}]},
                { key: "actions", label: "Actions" ,isshow:false}               
                // { key: "total_project_num", label: "总工程数" },
                // { key: "publish_project_num", label: "进行中的工程数" },
                // { key: "finish_project_num", label: "已完结的工程数" },
                // { key: "end_time", label: "结束时间" },
            ],
            project_urls: [
                { url: "/user",method:"post",label: "添加"},
                { url: "/user",method:"delete", label: "删除"},
                { url: "/user",method:"put", label: "修改"},
                { url: "/users",method:"get", label: "查找全部"},
            ],
            operations: [
                { key: "project", label: "项目管理" },
            ],
        };
    },
    components: {
        project_table
    },
    methods: {
        toggleTab: function(tab,a) {
            if(tab==='project'){
                this.current_fields=this.project_fields
                this.current_urls=this.project_urls
                this.isActive=a
            }
        }
    }
};
</script>
<style>
.project-icon {
    background: url(../../assets/project-icon.png) no-repeat 1em .2em;
    background-size: 3em 3em;
}
</style>


