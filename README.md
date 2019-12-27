# 项目概述
- 对接小程序端：闪电猪——直达对象的定制化调研工具，实现超级管理员对商家、门店、项目、礼品、成就、用户等信息的增删改查管理，对门店项目数据统计并进行可视化分析。商家经授权后可在平台上发布自定义市场调研任务，对门店项目、礼品库、成就规则库进行管理，查看门店项目数据等。
- 技术栈：vue2.0 + bootstrap-vue + vue-cli + vue-router  + axios + vue-axios 
- 项目地址：[flashpiggy-admin](https://github.com/GUWOGANSHOU/flashpiggy-admin)
- 运行：npm run serve

# 项目结构
```
├── dist/  #打包后的文件存放目录
├── node_modules/ #模块文件
├── src/ #项目入口目录
    ├── assets/   #前端资源目录(图片)
    ├── components/   # vue组件目录/.vue文件存放目录
         ├─busi #总商管理组件目录
             ├── business_extrabar.vue #总商管理副侧边栏组件
             ├── business_content.vue #总商信息主内容组件
             ├── permission_content.vue #权限配置主内容组件
             ├── achievement_content.vue #成就管理主内容组件
             ├── achi_content_detail.vue #成就详情主内容组件
             ├── goods_content_detail.vue #礼品详情主内容组件
             ├── business_table.vue #总商概述列表组件（点击跳转门店详情）
             ├── achievement_table.vue #成就概述列表组件（点击查看成就详情）
             ├── goods_table.vue #礼品列表组件（点击查看礼品详情）
             ├── achi_table_detail.vue #成就详情列表组件
             ├── goods_table_detail.vue #礼品详情列表组件
         ├─project #项目管理组件目录
             ├──project_extrabar.vue #项目管理副侧边栏组件 
             ├── shop_content.vue #门店主内容组件
             ├── project_content.vue #项目主内容组件
             ├── mission_content.vue #任务主内容组件
             ├── question_content.vue #问卷主内容组件
             ├── answer_content.vue #答案主内容组件
             ├── shop_table.vue #门店列表组件
             ├── project_table.vue #项目列表组件
             ├── mission_table.vue #任务列表组件
             ├── question_table.vue #问卷列表组件
             ├── answer_table.vue #答案列表组件
             ├── project_data_detail.vue #项目管理->门店项目详情组件
             ├── project_data_analyse.vue  #项目数据图表分析组件
         ├─reuse #重用组件目录 
             ├── layout.vue #总布局组件
             ├── login.vue #登陆组件
             ├── sidebar.vue #侧边栏组件
             ├── XPopLayer.vue #弹出层组件
         └─user #用户管理组件目录
             ├── user_extrabar.vue #用户管理副侧边栏组件
             ├── user_content.vue #用户信息主内容组件
             ├── user_table.vue #用户信息列表组件
             ├── user_table_detail.vue #用户详情列表组件
         ├─setting #系统设置组件目录
    ├── App.vue # 项目根组件
    ├── main.js # 项目入口文件(vue路由管理)
├── package.json #包文件信息
├── babel.config.js
├── .gitignore
├── README.md
```
