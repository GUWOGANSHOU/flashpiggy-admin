<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">门店管理</a>
        <span> > </span>
        <a href="">项目管理</a>
        <span> > </span>
        <a href="">任务管理</a>
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-top">
                <div class="user-outline">
                    <div class="max-icons-wrap shop-icon_blue"></div>
                    <label>任务情况</label>
                </div>
                <div class="user-sum">
                    <label>任务数</label>
                    <span>10</span>
                </div>
                <div class="user-normal">
                    <label>投放中</label>
                    <span>8</span>
                </div>
                <div class="user-stop">
                    <label></label>
                    <span></span>
                </div>
            </div>
            <div class="l-main-tab" >
                <div class="tab"  v-for="value in operations" :key="value.id" @click="toggleTab(value.key)" ><a :class="{ui_on:isActive}">{{value.label}}</a></div>
            </div>
            <div class="l-main-tabCon">
                <mission_table :opfields="mission_fields"  keep-alive></mission_table>
            </div>
    </div>
</div>
</template>

<script>
import mission_table from "./mission_table.vue";
export default {
    name:"mission_content",
    data () {
        return { 
            isActive:true,
              mission_fields: [
                { key: "missionsCode", label: "任务ID" ,isshow: false},
                { key: "missionsName", label: "任务名称" },
                { key: "maxNum", label: "限制人数"},
                { key: "base_points", label: "基础积分" },
                { key: "picture_points", label: "奖励积分" },
                { key: "actions", label: "Actions" ,isshow:false}
            ],
            // mission_urls: [
            //     { url: "/achievement",method:"post",label: "添加"},
            //     { url: "/achievement",method:"delete", label: "删除"},
            //     { url: "/achievement",method:"put", label: "修改"},
            //     { url: "/achievements",method:"get", label: "查找全部"},
            // ],
            operations: [
                { key: "mission", label: "任务列表" },
            ],
            };
    },
    components: {
        mission_table      
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
<style>
.mission-icon {
    background: url(../../assets/mission-icon.png) no-repeat 1em .2em;
    background-size: 3em 3em;
}
</style>

