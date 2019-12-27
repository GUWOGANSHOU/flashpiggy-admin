<template>
<div class="l-sidebar-extra">
    <ul class="l-sidebar-extra_list">
        <li class=ui_on1>
            <router-link to="/user_info">用户数据</router-link>
        </li>
    </ul>
</div>
</template>
<script>
export default {
     data(){
        return{
            
        }
    }
}
</script>
<style>
.l-sidebar-extra_list a{
    text-decoration: none !important;
    color: #ffffff !important;
}
.l-sidebar-extra {
    float: left;
}
.l-sidebar-extra_list{
    margin: 1.5em 2em;
}
.l-sidebar-extra_list li{
    height: 2em;
    margin: 1em 0;
}
.l-sidebar-extra_list li.ui_on1::after {
    content: "";
    position: absolute;
    top: 6.75em;
    left: 11.5em;
    width: 1.2em;
    height: .6em;
    background-color: #009AFF;
    border-radius: .3em;
}

</style>

