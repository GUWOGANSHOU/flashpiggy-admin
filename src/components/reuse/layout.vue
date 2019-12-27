<template>
            <div class="l-content-wrap">
                <div id="l-content">
                    <div class="l-top"></div>
                    <!-- <business_content/> -->
                    <!-- <achievement_content/> -->
                    <router-view></router-view>
                </div>
            </div>
</template>
<script>
//import permission_content from "./permission_content.vue"
//import achievement_content from "./achievement_content.vue";
//import business_content from "./business_content.vue";
export default {
    name: "layout",
    components: {
        //business_content,
        //achievement_content,
        //permission_content      
    }
};

</script>


<style>
/* reset */
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
    font-size: 12px;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
    margin-top: .5em;
}

.l-content-wrap {
    float: left;
    height: 100em;
    background-color: #edf2f6;
    width: 100%;
}
#l-content {
    margin-left: 15em;
}
.l-top {
    height: 5em;
    background-color: #323641;
}


</style>

