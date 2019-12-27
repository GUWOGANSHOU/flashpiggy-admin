<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">总商管理</a>
        <span> > </span>
        <a href="">权限配置</a>
    </div>
    <div id="l-main-list-wrap">
            <div class="l-main-tab">
                <div class="tab" ><a>权限管理</a></div>
                <!-- <div class="tab"  @click="toggleTab('business_table')"><a>权限管理</a></div> -->
                <!-- <div class="tab"  @click="toggleTab('tab2')"><a>成就管理</a></div> -->
            </div>
            <!-- <div class="l-main-tabCon"> -->
                    <!-- <business_table :is="currentTab" keep-alive></business_table> -->
            </div>
    </div>
</div>
</template>

<script>
// import business_table from "./business_table.vue";
export default {
    name:"permission_content",
    data () {
        return {
            // currentTab: 'business_table', // currentTab 用于标识当前触发的子组件
            };
    },
    components: {
        // business_table      
    },
    methods: {
        // toggleTab: function(tab) {
        //     this.currentTab = tab; // tab 为当前触发标签页的组件名
        //     }
    }
};
</script>
