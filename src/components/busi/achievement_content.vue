<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">总商管理</a>
        <span> > </span>
        <a href="">礼品管理</a>
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-tab" >
                <div
                    class="tab"
                    v-for="(value, index) in operations"
                    @click="toggleTab(value.key,index)"
                >
                    <a :class="{ui_on:index===isActive}">{{value.label}}</a>
                </div>
            </div>
            <div class="l-main-tabCon">
                <!-- <achievement_table :is="currentTab" :opfields="achievement_fields" :urls="achievement_urls" keep-alive></achievement_table> -->
                <goods_table :is="currentTab" :opfields="current_fields" :urls="current_urls" keep-alive></goods_table>
            </div>
    </div>
</div>
</template>

<script>
import achievement_table from "./achievement_table.vue";
import goods_table from "./goods_table.vue";
export default {
    name:"achievement_content",
    data () {
        return {
            isActive:0,
            currentTab: "goods_table", // currentTab 用于标识当前触发的子组件
            current_fields:this.goods_fields,
            current_urls:[],
            achievement_fields: [
                {
                    key: "business_name",
                    label: "商家",
                    sortable: true,
                    sortDirection: "desc"
                },
                { key: "rule_num", label: "规则数"},
                { key: "reach_sum", label: "达成人数" },
                { key: "exchange_point", label: "兑换总积分" },
            ],
            achievement_urls: [
                // { url: "/achievement",method:"post",label: "添加"},
                // { url: "/user",method:"delete", label: "删除"},
                // { url: "/user",method:"put", label: "修改"},
                // { url: "/users",method:"get", label: "查找全部"},
            ],

            goods_fields: [
                {
                    key: "business_name",
                    label: "商家",
                    sortable: true,
                    sortDirection: "desc"
                },
                { key: "sum", label: "礼品总数" },
                { key: "exchange_num", label: "兑现数量" },
                { key: "num", label: "剩余数量" },
            ],
            goods_urls: [
                // { url: "/achievement",method:"post",label: "添加"},
                // { url: "/achievement",method:"delete", label: "删除"},
                // { url: "/achievement",method:"put", label: "修改"},
                // { url: "/achievements",method:"get", label: "查找全部"},
            ],
            operations: [
                { key: "goods_table", label: "礼品管理" },
                { key: "achievement_table", label: "成就管理" },
            ],
        };
    },
    components: {
        achievement_table,
        goods_table
    },
    mounted(){
         this.current_fields=this.goods_fields;
    },
    methods: {
        toggleTab: function(tab,a) {
            if(tab==='achievement_table'){
                this.isActive=a
                this.currentTab=tab
                this.current_fields=this.achievement_fields
            }else if(tab==='goods_table'){
                this.isActive=a
                this.currentTab=tab
                this.current_fields=this.goods_fields
            }
        }
    }
};
</script>

<style>
.l-main {
    padding: .5em 1em;
}
.l-main-header,
.l-main-tab{
    background-color: #ffffff;
    margin: 1em 0;
}
.l-main-tabCon {
    padding: 1.5em 0;
}
.l-main-header {
    height: 1.5em;
    display: flex;
}
.l-main-tab {
    height: 3em;
    cursor: pointer;
    display: flex;
}
.l-main-header a {
    text-decoration: none;
}
.l-main-tab a {
    justify-content: center;
    line-height: 3em;
    list-style: none;
    margin: 0 3em;
}
.l-main-tab a:hover {
        color: #009AFF !important;
            border-bottom: 3px solid #099af0;
            padding-bottom: 1em;
}
.l-main-tab a:active {
    color: #009AFF !important;
    border-bottom: 3px solid #099af0;
    padding-bottom: 1em;
}
#l-main-list-wrap .active {
    border-bottom: 3px solid #009AFF;
}
.l-main-header a {
    color: #464951;
}
.l-main-header>a,
.l-main-header>span,
.zhuye-icon-mini{
    display: block;
    align-items: center;
    line-height: 1.5em;
    margin: 0 .5em;
}
.zhuye-icon-mini {
    display: inline-block;
    width: 1.5em;
    height: 1.5em;
    background: url(../../assets/zhuye-icon.png) no-repeat 0 0;
    background-size: 1.5em;
}
a.ui_on {
    color: #009AFF !important;
    border-bottom: 3px solid #099af0;
    padding-bottom: 1em;    
}
.container-fluid{
    background-color: #ffffff;
}
</style>
