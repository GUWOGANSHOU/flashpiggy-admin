import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
Vue.use(VueRouter);
import BootstrapVue from "bootstrap-vue";
Vue.use(BootstrapVue);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";


import permission_content from "./components/busi/permission_content.vue";
import achievement_content from "./components/busi/achievement_content.vue";
import goods_content_detail from "./components/busi/goods_content_detail.vue";
import achi_content_detail from "./components/busi/achi_content_detail.vue";
import business_content from "./components/busi/business_content.vue";
import user_content from "./components/user/user_content.vue";
import user_table_detail from "./components/user/user_table_detail.vue";
import shop_content from "./components/project/shop_content.vue";
import project_content from "./components/project/project_content.vue";
import project_data_detail from "./components/project/project_data_detail.vue";
import project_data_analyse from "./components/project/project_data_analyse.vue"
import mission_content from "./components/project/mission_content.vue";
import question_content from "./components/project/question_content.vue";
import answer_content from "./components/project/answer_content.vue";
import server_content from "./components/set/server_content.vue";
import WXAPI_content from "./components/set/wxapi_content.vue";
import adminAPI_content from "./components/set/adminapi_content.vue";
import Message_content from "./components/set/message_content.vue";
import link_content from "./components/set/link_content.vue";
import adminconn_content from "./components/set/adminconn_content.vue";
import wxconn_content from "./components/set/wxconn_content.vue";
import setonline_content from "./components/set/setonline_content.vue";

// import login from "./components/reuse/login.vue"
// import qsList from './components/project/qslist.vue'
// import qsList from '@/components/project/QS-list'
// import qsData from '@/components/project/QS-data'
// import qsFill from '@/components/project/QS-fill'
// import qsEdit from '@/components/project/QS-edit'



import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

//定义router（router与组件匹配）
const routes = [
  // {
  //   path:'/login',
  //   component:login
  // },
  { 
    path: '/business_info', 
    component: business_content 
  },
  { 
    path: '/achievement_info', 
    component: achievement_content 
  },
  {
    path:'/achi_content_detail',
    component:achi_content_detail
  },
  {
    path:'/goods_content_detail',
    component:goods_content_detail
  },
  { 
    path: '/user_info', 
    component: user_content 
  },
  {
    path:'/user_table.detail',
    component: user_table_detail
  },
  { 
    path: '/permission_info', 
    component: permission_content 
  },
  { 
    path: '/shop_info', 
    component: shop_content 
  },
  { 
    path: '/project_info', 
    component: project_content 
  },
  {
    path:'/project_info/project_data_detail',
    component:project_data_detail
  },
  {
    path:'/project_info/project_data_analyse',
    component:project_data_analyse
  },
  { 
    path: '/project_info/mission_info', 
    component: mission_content 
  },
  {
    path:'/project_info/question_info',
    component: question_content
  },
  {
    path:'/project_info/answer_info',
    component:answer_content
  },
  {
    path:'/system_set/server_info',
    component:server_content
  },
  {
    path:'/system_set/WXAPI_info',
    component:WXAPI_content
  },
  {
    path:'/system_set/adminAPI_info',
    component:adminAPI_content
  },
  {
    path:'/system_set/Message_info',
    component:Message_content
  },
  {
    path:'/system_set/link_info',
    component:link_content
  },
  {
    path:'/system_set/adminconn_info',
    component:adminconn_content
  },
  {
    path:'/system_set/wxconn_info',
    component:wxconn_content
  },
  {
    path:'/system_set/setonline_info',
    component:setonline_content
  },
  // { 
  //   path: '/project_info/answer_info', component: answer_content,
  //   children:[
  //     {
  //       path:'list',
  //       name:'qsList',
  //       component:qsList,
  //     },
  //     {
  //       path: 'data/:num',
  //       name: 'qsData',
  //       component: qsData
  //     },
  //     {
  //       path: 'fill/:num',
  //       name: 'qsFill',
  //       component: qsFill
  //     },
  //     {
  //         path: 'edit/:num',
  //         name: 'qsEdit',
  //         component: qsEdit
  //     }
  //   ]
  // },

];
//创建router实例
const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  el: '#app',
  router,              //把router挂载到root实例，注入rooter选项
  render: h => h(App)
}).$mount("#app");
