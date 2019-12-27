<template>
<div class="l-main">
    <div class="l-main-header">
        <div class="zhuye-icon-mini"></div>
        <a href="">用户管理</a>
        <span> > </span>
        <a href="">用户数据</a>
        <span> > </span>
        <a href="">用户详情</a>
    </div>
    <div id="l-main-list-wrap">
        <div class="l-main-list-header">
            <span>1001a001</span>
            <span>小小酥</span>
            <span>男</span>
            <span>13110521477</span>
            <span>正常</span>
            <label>2000</label>
            <label>积分</label>
        </div>
        <div class="l-main-list-content">
        <div class="invite-data">
            <div class="invite-outline">
                <div class="max-icons-wrap invite-icon"></div>
                <label>邀请情况</label>
            </div>
            <div class="invited-data">
                <label>已邀请</label>
                <span>100</span>
            </div>
            <div class="register-data">
                <label>注册数</label>
                <span>80</span>
            </div>
            <div class="action">
                <label>任务动作</label>
                <span>200</span>
            </div>
            <div class="bonus-point">
                <label>获得积分</label>
                <span>200</span>
            </div>
        </div>
        <div class="mission-data">
            <div class="invite-outline">
                <div class="max-icons-wrap mission-icon"></div>
                <label>任务情况</label>
            </div>
            <div class="invited-data">
                <label>已接</label>
                <span>200</span>
            </div>
            <div class="register-data">
                <label>快速</label>
                <span>80</span>
            </div>
            <div class="action">
                <label>图片通过</label>
                <span>20</span>
            </div>
            <div class="bonus-point">
                <label>获得积分</label>
                <span>200</span>
            </div>
        </div>
        <div class="achi-data">
            <div class="invite-outline">
                <div class="max-icons-wrap achi-icon"></div>
                <label>成就情况</label>
            </div>
            <div class="invited-data">
                <label>已达成</label>
                <span>100</span>
            </div>
            <div class="action">
                <label>涉及商家</label>
                <span>80</span>
            </div>
            <div class="bonus-point">
                <label>获得积分</label>
                <span>200</span>
            </div>

        </div>
        <div class="goods-data">
            <div class="invite-outline">
                <div class="max-icons-wrap goods-icon"></div>
                <label>礼品兑换</label>
            </div>
            <div class="invited-data">
                <label>已兑换</label>
                <span>100</span>
            </div>
            <div class="register-data">
                <label>已使用</label>
                <span>80</span>
            </div>
            <div class="action">
                <label>未使用</label>
                <span>20</span>
            </div>
            <div class="bonus-point">
                <label>消耗积分</label>
                <span>200</span>
            </div>

        </div>
        </div>
    </div>
</div>
</template>
<style>
.l-main-list-header {
    background-color: #ffffff;
}
.invite-data,
.mission-data,
.achi-data,
.goods-data {
    height: 7.6em;
    padding: 1em 5em;
    background-color: #ffffff;
    display: flex;
    justify-content: space-between;
    margin: 1em 0;
}
.l-main-list-content label{
    display: block;
    font-size: 1.3em;
}
.l-main-list-content span {
    font-size: 2.1em;
}
.l-main-list-content label,
.l-main-list-content span {
    font-weight: 550;
}
.l-main-list-header span {
    font-size: 1em !important;
    display: inline-block;
    margin: 0 5em;
    padding: 1em 0;
}
.l-main-list-header label:nth-of-type(1) {
    color: #009aff;
    font-size: 1.3em;
    margin-right: .5em;
}
.invite-icon {
    background: url(../../assets/invite-icon.png) no-repeat 1em .2em;
    background-size: 3em 3em;
}
.mission-icon {
    background: url(../../assets/mission-icon.png) no-repeat 1em .2em;
    background-size: 3em 3em;
}
.achi-icon {
    background: url(../../assets/achi-icon.png) no-repeat 1em .2em;
    background-size: 3em 3em;
}
.goods-icon {
    background: url(../../assets/goods-icon.png) no-repeat 1em .2em;
    background-size: 3em 3em;
}
</style>
