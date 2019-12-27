<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">门店管理</a>
        <span> > </span>
        <a href="">门店列表</a>
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-top">
                <div class="user-outline">
                    <div class="max-icons-wrap shop-icon_blue"></div>
                    <label>门店情况</label>
                </div>
                <div class="user-sum">
                    <label>门店数</label>
                    <span>100</span>
                </div>
                <div class="user-normal">
                    <label>正常</label>
                    <span>80</span>
                </div>
                <div class="user-stop">
                    <label>下线</label>
                    <span>20</span>
                </div>
            </div>
            <div class="l-main-tab" >
                <div class="tab"  v-for="value in operations" :key="value.id" @click="toggleTab(value.key)" ><a :class="{ui_on:isActive}">{{value.label}}</a></div>
            </div>
            <div class="l-main-tabCon">
                <shop_table :opfields="shop_fields" :urls="shop_urls" keep-alive></shop_table>
            </div>
    </div>
</div>
</template>

<script>
import shop_table from "./shop_table.vue";
export default {
    name:"business_content",
    data () {
        return { 
            isActive:true,
            // currentTab: 'shop_table', // currentTab 用于标识当前触发的子组件
            // current_fields:[],
            // current_urls:[],
            shop_fields: [
                { key: "shopCode", label: "门店ID" ,isshow:false},
                { key: "name", label: "门店名称" },
                { key: "address", label: "地址" },
                { key: "admin", label: "负责人" },
                { key: "mobile", label: "联系方式" },
                { key: "shop_time", label: "营业时间" },
                { key: "actions", label: "Actions" ,isshow:false}
            ],
            shop_urls: [
                { url: "/user",method:"post",label: "添加"},
                { url: "/user",method:"delete", label: "删除"},
                { url: "/user",method:"put", label: "修改"},
                { url: "/users",method:"get", label: "查找全部"},
            ],
            operations: [
                { key: "shop", label: "门店列表" },
            ],
            };
    },
    components: {
        shop_table      
    },
    methods: {
        // toggleTab: function(tab) {
        //     if(tab==='shop'){
        //         this.current_fields=this.shop_fields
        //         this.current_urls=this.shop_urls
        //     }
        // }
    }
};
</script>
<style>
.shop-icon_blue {
    background: url(../../assets/shop-icon_blue.png) no-repeat 1em .2em;
    background-size: 3em 3em;
}
</style>




