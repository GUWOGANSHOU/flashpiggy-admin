<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">门店管理</a>
        <span> > </span>
        <a href="">项目管理</a>
        <span> > </span>
        <a href="">问卷管理</a>
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-tab" >
                <div class="tab" >
                    <router-link to="/project_info/answer_info/list" :class="{ui_on:isTab1}">问卷管理</router-link>
                </div>
            </div>
            <div class="l-main-tabCon">
                <router-view></router-view>
                <!-- <qs-List></qs-List> -->
            </div>
    </div>
</div>
</template>

<script>
import qsList from "./QS-list.vue";
import qsEdit from "./QS-edit.vue";
import qsFill from "./QS-fill.vue";
import qsData from "./QS-data.vue";
export default {
    name:"answer_content",
    data () {
        return {
             isTab1:true,
            // currentTab: 'answer_table', // currentTab 用于标识当前触发的子组件

            // current_fields:[],
            // current_urls:[],
            // answers_fields: [
            //     { key: "answers_code", label: "回答编号" },
            //     { key: "missions_code", label: "任务ID" },
            //     { key: "user_code", label: "用户ID" },
            //     { key: "question_code", label: "所属问题编号" },
            //     { key: "create_by", label: "创建者" },
            //     { key: "create_time", label: "创建时间" },
            //     { key: "answers", label: "答案" },
            //     { key: "answers_status", label: "问卷状态" },
            //     { key: "goals", label: "得分" },
            // ],
            // answers_urls: [
            //     { url: "/answer",method:"post",label: "添加"},
            //     { url: "/answer",method:"delete", label: "删除"},
            //     { url: "/answer",method:"put", label: "修改"},
            //     { url: "/answers",method:"get", label: "查找全部"},
            // ],



        };
    },
    components: {
        qsList,
        qsEdit,
        qsFill,
        qsData
    },
    methods: {
        // toggleTab: function(tab) {
        //     this.currentTab = tab;
        //     if(this.currentTab === 'answer_table'){
        //         this.isTab1 = true;
        //         this.isTab2 = false;
        //     }
        // }
    }
};
</script>

