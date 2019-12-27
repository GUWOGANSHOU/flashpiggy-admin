<template>
    <div class="l-main">
        <div class="l-main-header">
            <div class="zhuye-icon-mini"></div>
            <a href="">门店管理</a>
            <span> > </span>
            <a href="">项目管理</a>
            <span> > </span>
            <a href="">数据详情</a>
        </div>
        <div class="l-main-content">
            <div class="l-main-content_header">
                <div class="header1">
                    <div class="rect"></div>
                    <div class="analyse_select">
                        <b-form-select v-model="selected" :options="options" class="mb-3 myselect" size="sm" />
                    </div>  
                </div>
                <div class="header2">
                    <span>当前项目完成情况</span>
                    <div class="rect"></div>
                </div>
            </div>
            <div class="l-main-content_left">
                <router-link to="/project_info/project_data_analyse"  :key="2"></router-link>
                <div class="project-state">
                    <img src="../../assets/project-analyse_null.png">
                    <img src="../../assets/project-analyse_error.png">
                    <img src="../../assets/project-analyse_normal.png">
                    <img src="../../assets/project-analyse_ing.png">
                </div>
            </div>
            <div class="l-mian-content_right">
                <div class="rightCon">
                    <div class="rightCon_header">
                         <div class="rect"></div>
                        <span>地址</span>
                    </div>
                    <div class="rightCon_main">
                        <p>福建省福州市闽侯县上街镇福州大学生活三区玫瑰园二楼鹿谷制茶</p>
                    </div>
                </div>
                <div class="rightCon">
                    <div class="rightCon_header">
                         <div class="rect"></div>
                        <span>任务响应时间</span>
                    </div>
                    <div class="rightCon_main">
                        <p>2018年12月13日09:46:00</p>
                    </div>
                </div>
                <div class="rightCon">
                    <div class="rightCon_header">
                         <div class="rect"></div>
                        <span>图片</span>
                    </div>
                    <div class="rightCon_main">
                        <div class="slide" v-on:mouseover="stop()" v-on:mouseout="move()">
                            <div class="slideshow">
                        <!-- <div id="frame">
                            <transition 
                            appear 
                            appear-active-class="swing"
                            >
                                <div id="images" v-if="show">
                                    <img src="../../assets/image1.jpg" alt="">
                                    <img src="../../assets/image2.jpg" alt="">
                                    <img src="../../assets/image3.jpg" alt="">
                                    <img src="../../assets/image4.jpg" alt="">
                                    <img src="../../assets/image5.jpg" alt="">
                                </div>
                            </transition>
                        </div> -->
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
                    </div>
                </div>
            </div>
            <div class="footer">
                <div class="attention">
                    <img src="../../assets/project-analyse_null.png">
                    <span>无</span>
                </div>
                <div class="attention">
                    <img src="../../assets/project-analyse_normal.png"> 
                    <span>正常</span>
                </div>
                <div class="attention">
                    <img src="../../assets/project-analyse_ing.png">
                    <span>进行中</span>
                </div>  
                <div class="attention">                
                    <img src="../../assets/project-analyse_error.png">
                    <span>异常</span>
                </div>  
                   
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            imgArray: [
                require('../../assets/image1.jpg'),
                require('../../assets/image2.jpg'),
                require('../../assets/image3.jpg'),
                require('../../assets/image4.jpg'),
                require('../../assets/image5.jpg'),
            ],
            mark: 0,
            timer:null,
            selected: null,
            options: [
                { value: null, text: "请选择需要分析的单选项" },
                { value: "option1", text: "单选一" },
                { value: "option2", text: "单选二" },
            ]
        }
    },
    methods:{
        autoPlay(){
            this.mark++;
            if(this.mark === 5){
                this.mark = 0;
            }
        },
        play(){
            this.timer = setInterval(this.autoPlay, 3000);
        },
        change(i){
            this.mark = i;
        },
        stop(){
            clearInterval(this.timer);
        },
        move(){
            this.timer = setInterval(this.autoPlay, 3000);
        }
    },
    created(){
        this.play();
    }
}
</script>

<style>
.l-main-content {
    height: 50em;
    background-color: #ffffff;
    padding: 1em;
    margin-bottom: 1em;
}
.l-main-content_header {
    margin: 2em 0;
    display: flex;
    justify-content: space-between;
}
.analyse_select {
    width: 18em;
    display: inline-block;
    margin-left: 1em;
}
.myselect {
    margin-bottom: 0 !important;
}
.rect {
    width: 1em;
    height: 2em;
    display: inline-block;
    background-color: #009aff;
    vertical-align: middle;
}
.header2 span {
    margin-right: .5em;
}
.rightCon_header span {
    margin-left: .5em;
}
.rightCon_header {
    padding-bottom: 1em;
}
.rightCon {
    margin-bottom: 2em;
}
.l-main-content_left {
    float: left;
    width: 60em;
    height: 30em;
    background-color: seashell;
    padding-right: 20em;
}
.l-mian-content_right {
    margin-left: 60em;
    height: 30em;
    padding-right: 1.5em;
}

/* 图片轮播 */
/* #frame {
    position: absolute;
    width: 300px;
    height: 200px;
    border-radius: 5px;
    overflow: hidden;
}
#images { 
    position: absolute;
    z-index: 9px;
    width: calc(300px*5);     /* 设置图片总宽度 */
/* }
#images img{
    float: left;
    width: 300px;
    height: 200px;
} */ 
/*.bounce-enter-active {
    animation: bounce-in, 2s, ease-out, infinite, alternate;    慢速播放，无限播放，轮流播放 
}*/
/* .play {
    animation: bounce-in, 5s, ease-out, infinite, alternate;   
/* } */ 
/* .swing{
  animation: bounce-in 5s ease-out infinite alternate;  /* 慢速播放，无限播放，轮流播放 
} */
/* .bounce-leave-active {
  animation: bounce-in 5s reverse;
} */
/* 图片切换，动画分为位移和静置 */
/* @keyframes bounce-in{  
    0%{ transform: translate(0px); }
    25%{  transform: translate(-300px); }
    45%{  transform: translate(-600px);}
    65%{  transform: translate(-900px);}
    100%{  transform: translate(-1200px); } 
} */
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

.l-main-content_left {
    background: url(../../assets/project-analyse_bg.png) no-repeat 3em 0;
}
.l-main-content_left a {
    display: inline-block;
    width: 35em;
    height: 30em;
}
.project-state img:nth-child(1){
    position: absolute;
    top: 40em;
    left: 30em;
}
.project-state img:nth-child(2){
    position: absolute;
    top: 42em;
    left: 36em;
}
.project-state img:nth-child(3){
    position: absolute;
    top: 26em;
    left: 50em;
}
.project-state img:nth-child(4){
    position: absolute;
    top: 30em;
    left: 30em;
}
.footer{
    clear: both;
    margin-top: 3em;
}
.attention {
    display: inline;
    margin: 3.2em;
}
</style>
