<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">总商管理</a>
        <span> > </span>
        <a href="">礼品管理</a>
        <span> > </span>
        <a href="">礼品详情</a>
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
                <div class="tabCon_header">
                    <div class="busiName">
                        <label>商家</label>
                        <span>星巴克</span>
                    </div>
                    <div class="goodSum">
                        <label>礼品总数</label>
                        <span>100</span>
                    </div>
                    <div class="exchangeNum">
                        <label>兑现数量</label>
                        <span>20</span>
                    </div>
                    <div class="remainNum">
                        <label>剩余数量</label>
                        <span>10</span>
                    </div>
                </div>
                <goods_table_detail :opfields="goods_fields" :urls="goods_urls" keep-alive></goods_table_detail>
            </div>
    </div>
</div>
</template>

<script>
import goods_table_detail from "./goods_table_detail.vue";
export default {
  name: "achi_content",
  data() {
    return {
      isActive: 0,

      goods_fields: [
        { key: "good_code", label: "礼品ID" },
        { key: "key_code", label: "KEY" },
        { key: "url", label: "图片", fieldsType:"fileinput" },
        { key: "goods_name", label: "礼品名称" },
        { key: "introduce", label: "礼品介绍", fieldsType: "textarea" },
        { key: "points", label: "兑换积分" },
        { key: "end_time", label: "截止时间" },
        { key: "sum", label: "发布数量" },
        // { key: "num", label: "剩余数量" },
        {
          key: "state",
          label: "状态",
          fieldsType: "select",
          fieldsOptions: [
            { opvalue: 1, text: "已上架" },
            { opvalue: 2, text: "已下架" },
            { opvalue: 2, text: "待审核" }
          ]
        },
        { key: "actions", label: "Actions", isshow: false }
      ],
      goods_urls: [
        { url: "/achievement", method: "post", label: "添加" },
        { url: "/achievement", method: "delete", label: "删除" },
        { url: "/achievement", method: "put", label: "修改" },
        { url: "/achievements", method: "get", label: "查找全部" }
      ],
      operations: [
        { key: "goods", label: "礼品管理" },
        { key: "achievement", label: "成就管理" }
      ]
    };
  },
  components: {
    goods_table_detail
  },
  methods: {
    toggleTab: function(tab, a) {
      if (tab === "achievement") {
        this.$router.push({path:"/achievement_info"});
        this.isActive = a;
      }else if(tab === "goods") {
        this.$router.push({path:"/achievement_info"});
        this.isActive = a;
      }
    }
  }
};
</script>

<style>
.l-main {
  padding: 0.5em 1em;
}
.l-main-header,
.l-main-tab {
  background-color: #ffffff;
  margin: 1em 0;
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
  color: #009aff !important;
  border-bottom: 3px solid #099af0;
  padding-bottom: 1em;
}
.l-main-tab a:active {
  color: #009aff !important;
  border-bottom: 3px solid #099af0;
  padding-bottom: 1em;
}
a.ui_on {
  color: #009aff !important;
  border-bottom: 3px solid #099af0;
  padding-bottom: 1em;
}
.tabCon_header {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 3em;
  margin-bottom: 1em;
  background-color: #ffffff;
}
.tabCon_header label {
  font-size: 1.4em;
  line-height: 1.4em;
}
.tabCon_header span {
  margin-left: 0.5em;
  color: #009aff;
  font-weight: 700;
  font-size: 1.2em;
  line-height: 1.2em;
}
#l-main-list-wrap .active {
  border-bottom: 3px solid #009aff;
}
.l-main-header a {
  color: #464951;
}
.l-main-header > a,
.l-main-header > span,
.zhuye-icon-mini {
  display: block;
  align-items: center;
  line-height: 1.5em;
  margin: 0 0.5em;
}
.zhuye-icon-mini {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  background: url(../../assets/zhuye-icon.png) no-repeat 0 0;
  background-size: 1.5em;
}
.container-fluid {
  background-color: #ffffff;
}
</style>


