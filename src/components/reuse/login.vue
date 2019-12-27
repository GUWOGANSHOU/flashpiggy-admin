<template>
    <div id="login_container" class="login">
        <p>请扫描二维码登录</p>
    </div>
</template>



<script>
export default {
    data(){
        return{

        };
    },
    methods:{
        GetRequest:function(value){
            var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
            var object = {};
            if(url.indexOf("?") != -1)//url中存在问号，也就说有参数。  
            {   
            var str = url.substr(1);  //得到?后面的字符串
            var strs = str.split("&");  //将得到的参数分隔成数组[id="123456",Name="bicycle"];
            for(var i = 0; i < strs.length; i ++)  
                {   
            　　　　　　　　object[strs[i].split("=")[0]]=strs[i].split("=")[1]
            　　　　　　}
            　　}

            return object[value];
            console.log(object[value]);
        }
    },

    mounted(){
        var obj = new WxLogin({
        self_redirect:false,
        id:"login_container",
        appid: "wxfe52409f98db30ba",
        scope: "snsapi_login",
        redirect_uri: "http%3a%2f%2fmobee.gaocimi.cn%2fapi-manager%2flogin",
        state: "gaocimi",
        style: "white",
        href: ""          //相关css样式文件,用来覆盖微信二维码授权页面默认样式
    }); 
    this.GetRequest();
    }
   
};



</script>
