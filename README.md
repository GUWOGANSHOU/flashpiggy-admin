# 项目概述
- 对接小程序端：闪电猪——直达对象的定制化调研工具，实现超级管理员对商家、门店、项目、礼品、成就、用户等信息的增删改查管理，对门店项目数据统计并进行可视化分析。商家经授权后可在平台上发布自定义市场调研任务，对门店项目、礼品库、成就规则库进行管理，查看门店项目数据等。
- 技术栈：vue2.0 + bootstrap-vue + vue-cli + vue-router  + axios + vue-axios + echarts
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
# 项目小记
>写这篇文章很仓促，先暂时搬运做这个项目时的笔记，之后再慢慢整理。
##### 一、路由导航
##### 1.声明式导航：使用 <router-link> 创建<a>标签来定义导航链接
```
<router-link to="/achievement_info">奖励成就</router-link>
```
- 点击 <router-link> 时，这个方法会在内部调用，所以说，点击 <router-link to="..."> 等同于调用 router.push(...)。
- Tips：如果在同一个父组件下使用router-link切换子组件，子组件不会重新挂载（挂载钩子函数mouted()不会执行)，若想子组件重新挂载，可给子组件加上一个key值标识。
##### 2.编程式导航：使用router.push 方法 
```
  this.$router.push({path:"/shop_info", query: {business_code:row.userCode}});
```
- 这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL
- 该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
```
// 字符串                                                               
router.push('home')                                                                                                                  
// 对象                         
router.push({ path: 'home' })                  
// 命名的路由           
router.push({ name: 'user', params: { userId: 123 }})    
// 带查询参数，变成 /register?plan=private            
router.push({ path: 'register', query: { plan: 'private' }})

```
- Tips：获取参数，this.$route.query.plan    -> private
- 如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。
取而代之的是下面例子的做法，需要提供路由的 name 或手写完整的带有参数的 path：
```
const userId = 123                                                                  
router.push({ name: 'user', params: { userId }}) // -> /user/123    
router.push({ path: `/user/${userId}` }) // -> /user/123               
// 这里的 params 不生效                                                          
router.push({ path: '/user', params: { userId }}) // -> /user 
```
同样的规则也适用于 router-link 组件的 to 属性。
##### 二、Vue组件
##### 1.局部注册组件
```
import TheSidebar from "./components/reuse/sidebar.vue";
import Layout from "./components/reuse/layout.vue";
export default {
  name: "app",
  components: {
    'TheSidebar': TheSidebar,
    'Layout': Layout
  }
};
```
##### 2.使用组件
```
<template>
  <div id="app">
    <layout /> 
    <TheSidebar />
  </div>
</template>
```
##### 3.动态组件
- 使用 is 特性来切换不同的组件并使用<keep-alive>缓存组件状态，避免反复重渲染导致的性能问题。
```

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
                <goods_table :is="currentTab" :opfields="current_fields" :urls="current_urls" keep-alive></goods_table>
            </div>
    </div>

```

##### 三、BoostrapVue表格组件
```
<template>
   <b-table show-empty
      :hover="hover"
      :striped="striped"
       stacked="md"
       :items="items"
       :fields="fields"
       :current-page="currentPage"
       :per-page="perPage"
       :filter="filter"
       :sort-by.sync="sortBy" 
       :sort-desc.sync="sortDesc"
       :sort-direction="sortDirection"
       @filtered="onFiltered"
       @row-clicked="rowClick"
   >    
   <template slot="name" slot-scope="row">{{row.value}}</template>
   <template slot="actions" slot-scope="row">
     <b-button size="sm" class="mr-1" @click="showOverlay(row.index+ ( currentPage - 1 ) * 5)">修改</b-button>
     <b-button size="sm" data-toggle="modal" data-target="#layer" @click="deleteMsg(row.index+ ( currentPage - 1 ) * 5)">删除</b-button>
   </template>
   </b-table>
</template>
<script>
    const items = [
  {   
    business_name: "星巴克",
    business_code:"1001",
    exchange_num: 2,
    sum: 5,
    num: 2,
  },
  {    
    business_name: "资生堂",
    business_code:"1010",
    exchange_num: 2,
    sum: 5,
    num: 2,
  }
];
export default {
  data() {
    return {
      hover: true,
      striped:true,
      items: items,
      selectedlist: {},
      selected: -1,
      isShow: false,
      currentPage: 1,
      perPage: 5,
      totalRows: items.length,
      sortBy: null,
      sortDesc: false,
      sortDirection: "asc",
      filter: null
    };
  },
    props:['opfields','urls'],
    computed: {
        fields :function(){
            // this.searchAll();
            return this.opfields;
        },
    sortOptions() {
      // Create an options list from our fields
      return this.opfields.filter(f => f.sortable).map(f => {
        return { text: f.label, value: f.key };
      });
    }
</script>
```
##### 四、表格数据增删改查
##### 1.以项目列表project_table为例
- 根据isShow判断是否显示
```
<template>
<!-- selectedlist用来暂存弹层数据 -->
 <XPopLayer :list="selectedlist" :fields="fields" v-show="isShow" @updateShow="updateTheModelShow" @modify="modify" ></XPopLayer>
<div class="main-icon main-icon_add" @click="toggleAdd()"></div>
<b-button size="sm" class="mr-1" @click="showOverlay(row.index+ ( currentPage - 1 ) * 5)">修改</b-button>
<b-button size="sm" data-toggle="modal" data-target="#layer" @click="deleteMsg(row.index+ ( currentPage - 1 ) * 5)">删除</b-button>
</tempalte>   

<script>
    //新增按钮
    toggleAdd: function() {
      this.isShow = !this.isShow;  //isShow在data里设为false
    },
    //修改按钮
    showOverlay(index) {
      this.selected = index;     //selected在data里设为-1
      this.selectedlist = this.items[index];
      this.toggleAdd();
    },
    //删除按钮
    deleteMsg: function(n) {
      this.items.splice(n, 1);
    },
</script>

```
#####2.弹层组件内容
- 根据fieldsType判断表单输入框类型：默认普通文本框，    文本域框，单选框，复选框，文件输入框等
```
<tempalte>   
//关闭按钮
   <i class="main-icon main-icon_close" @click="close()"></i>  

//PopLayer的内容
 <div class="add-business_main">
                    <div v-for="value in modifyfields" :key="value.id">
                      <b-row v-if="!value.hasOwnProperty('isshow')||value.isshow">
                        <b-col md="3"> <label>{{value.label}}</label></b-col>
                        <b-col md="6" v-if="value.hasOwnProperty('fieldsType')&&value.fieldsType==='select'">
                          <b-form-select size="sm" v-model="modifylist[value.key]">
                            <option v-for="option in value.fieldsOptions" :value="option.value" :key="option.id">{{option.text}}</option>
                          </b-form-select>             
                        </b-col>
                        <b-col md="6" v-else-if="value.hasOwnProperty('fieldsType')&&value.fieldsType==='textarea'">
                          <b-form-textarea v-model="modifylist[value.key]" :rows="3"
                                           :max-rows="6"></b-form-textarea>
                        </b-col>
                        <b-col md="6" v-else-if="value.hasOwnProperty('fieldsType')&&value.fieldsType==='checkbox'">
                          <b-form-checkbox-group  id="checkboxes1" v-model="selected"  :options="value.fieldsOptions"></b-form-checkbox-group>
                        </b-col>
                        <b-col md="6" v-else-if="value.hasOwnProperty('fieldsType')&&value.fieldsType==='fileinput'">
                          <b-form-file accept=".jpg, .png, .gif" v-model="file" :state="Boolean(file)" placeholder="请选择图片"></b-form-file>
                        </b-col>
                        <b-col md="6" v-else>
                          <b-form-input size="sm" v-model="modifylist[value.key]"></b-form-input>
                        </b-col>
                        <br>
                      </b-row>
                    </div>

//提交按钮
<b-col md="3" offset-md="5"><b-button size="md" @click="modify()">提交</b-button></b-col>
</tempalte>   

```
##### 3.父子组件之间通信
- 这里使用组件自定义事件，子组件冒泡触发父组件的方法。
>[vm.$emit( eventName, […args] )](https://cn.vuejs.org/v2/api/#vm-emit)

触发当前实例上的事件。附加参数都会传给监听器回调。

```
<script>
    //关闭总商弹层
    close: function() {
      this.$emit("updateShow", false);      
    },
    //提交按钮
    modify: function() {
      this.$emit("modify", this.modifylist);
    }
</script>
```
父组件以project_table.vue为例：

>[Vue.set( target, key, value )](https://cn.vuejs.org/v2/api/#Vue-set)

向响应式对象中添加一个属性，并确保这个新属性同样是响应式的，且触发视图更新。它必须用于向响应式对象上添加新属性，因为 Vue 无法探测普通的新增属性 
(比如 this.myObject.newProperty = 'hi')

>arrayObject.push(newelement1,newelement2,....,newelementX)

- push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
push() 方法可把它的参数顺序添加到 arrayObject 的尾部。它直接修改 arrayObject，而不是创建一个新的数组。push() 方法和 pop() 方法使用数组提供的先进后出栈的功能。
```
<script>
    //子组件提交按钮冒泡触发
    modify(arr) {
      if (this.selected > -1) {  
  //修改->提交          点击修改时，selected值取的是index(0,1,2...)，必定>-1
      this.$set(this.items, this.selected, arr);    //这是全局 Vue.set 的别名
        this.selected = -1;      //重置selected为-1
      } else {
        this.items.push(arr);     //-1表示点击顺序为新增->提交
      }
      this.toggleAdd();
    },
    updateTheModelShow(s) {
      this.isShow = s;
    },
</script>
```
##### 五、Axios
>留个坑
##### 六、CSS3简单图片轮播
##### 1.CSS3 动画属性（Animation）
值 |  说明 |  
-|-
| *[animation-name](https://www.runoob.com/cssref/css3-pr-animation-name.html)* | 指定要绑定到选择器的关键帧的名称 |
| *[animation-duration](https://www.runoob.com/cssref/css3-pr-animation-duration.html)* | 动画指定需要多少秒或毫秒完成 |
| *[animation-timing-function](https://www.runoob.com/cssref/css3-pr-animation-timing-function.html)* | 设置动画将如何完成一个周期 |
| *[animation-delay](https://www.runoob.com/cssref/css3-pr-animation-delay.html)* | 设置动画在启动前的延迟间隔。 |
| *[animation-iteration-count](https://www.runoob.com/cssref/css3-pr-animation-iteration-count.html)* | 定义动画的播放次数。 |
| *[animation-direction](https://www.runoob.com/cssref/css3-pr-animation-direction.html)* | 指定是否应该轮流反向播放动画。 |
| [animation-fill-mode](https://www.runoob.com/cssref/css3-pr-animation-fill-mode.html) | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |
| *[animation-play-state](https://www.runoob.com/cssref/css3-pr-animation-play-state.html)* | 指定动画是否正在运行或已暂停。 |
| *[initial](https://www.runoob.com/cssref/css-inherit.html)* | 设置属性为其默认值。  |
| [inherit](https://www.runoob.com/cssref/css-inherit.html) | 从父元素继承属性。 
##### 2.基本思路
- 基本布局
将5张图片左浮动横向并排放入一个div容器（#photos）内，图片设置统一尺寸，div宽度设置5个图片的总尺寸，然后放入相框容器div（#frame），相框设置1个图片的大小并设置溢出隐藏，以保证正确显示一个照片。
- 设置动画
然后使用css3动画，通过对photos进行位移，从而达到显示不同的图片，每次偏移一个图片的宽度，即可显示下一张图片。5张图片，需要切换4次，定义动画0%，20%，40%，80%，100%。
- 动画分解
为了让图片切换后静置一段时间，可以将动画细分为：位移切换和静置两个阶段。即20%~40%里面包含切换到第二张图片并且将第二张图片静置。另外，根据需要可以对各个图片添加相应的序号和图片简介。
- 其他事件
如果需要点击事件的话，配合js完成其他特效（如：点击序号显示相应的图片、上一张下一张等）
```
<div class="slide" v-on:mouseover="stop()" v-on:mouseout="move()">
  <div class="slideshow">
    <transition-group tag="ul" name="image">
      <li v-for="(img, index) in imgArray" :key="index" v-show="index === mark">
        <a href="">
        <img :src='img'>
        </a>
      </li>
    </transition-group>
  </div>
   <div class="bar">
     <span v-for="(item, index) in imgArray" :key="index"
        :class="{'active':index === mark}" @click="change(index)"></span>
   </div>
</div>
/* 图片轮播 */
.slide {
    width: 300px;
    height: 200px;
    overflow: hidden;
    position: relative;
}

.slideshow {
    width: 300px;
    height: 200px;
}
.slideshow li {
    position: absolute;
}
.slideshow img {
    width: 300px;
    height: 200px;
}
.bar {
    position: absolute;
    width: 100%;
    bottom: 10px;
    margin: 0 auto;
    z-index: 10;
    text-align: center;
  }
  .bar span {
    width: 20px;
    height: 5px;
    background: white;
    display: inline-block;
    margin-right: 10px;
    border-radius: 5px;
  }
  .active {
    background: #009aff !important;
  }
.image-enter-active {
    transform: translateX(0%);
    transition: all 1.5s ease;
}
.image-leave-active {
    transform: translateX(-100%);
    transition: all 1.5s ease;
}
.image-enter {
    transform: translateX(100%);
}
.image-leave {
    transform: translateX(0%);
}
```
##### 七、使用Echarts图表组件
>待续

