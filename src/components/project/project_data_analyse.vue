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
            <div class="l-main-chart">
                <div id="chart1"></div>
                <div id="chart2"></div>
            </div>
            <div class="l-main-chart">
                <div id="chart3"></div>
                <div id="chart4"></div>
            </div>
        </div>
    </div>
</template>
<script>
//require 可以直接从 node_modules 中查找，而 import 必须把路径写全
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
    name:"project_data_analyse",
    data(){
        return{
        }
    },
    methods:{
        drawLine() {
            
            // 基于准备好的dom，初始化echarts实例
            let chart1 = echarts.init(document.getElementById('chart1'))
            let chart2 = echarts.init(document.getElementById('chart2'))
            let chart3 = echarts.init(document.getElementById('chart3'))
            let chart4 = echarts.init(document.getElementById('chart4'))
            // 绘制图表
            chart1.setOption({
                title :{
                    text:'图表一'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }      
                },
                legend: {
                    data:['任务数','任务频数','参与人数']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    
                    {
                        name:'任务数',
                        type:'bar',
                        barWidth:30,
                        stack: '项目',
                        data:[120, 132, 101, 134, 90, 230, 210,200,150,300,420,260]
                    },
                    {
                        name:'任务频数',
                        type:'bar',
                        stack: '项目',
                        data:[220, 182, 191, 234, 290, 330, 310,220,230,240,190,220]
                    },
                    {
                        name:'参与人数',
                        type:'bar',
                        stack: '项目',
                        data:[150, 232, 201, 154, 190, 330, 410,300,280,260,210,170]
                    },
                
                ]
            });
            chart2.setOption({
                title :{
                    text:'图表二'
                },
                color: ['red'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        {
                            name:'异常项目',
                            type:'bar',
                            barWidth: '60%',
                            data:[10, 52, 200, 334, 390, 330, 220, 150, 210, 235, 198, 156]
                        }
                    ]
            });
            chart3.setOption({
                title :{
                    text:'图表三'
                },
                tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['已用基金','积分']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [
                        
                        {
                            name:'已用基金',
                            type:'bar',
                            barWidth:30,
                            stack: '项目',
                            data:[120, 132, 101, 134, 90, 230, 210,200,150,300,420,260]
                        },
                        {
                            name:'积分',
                            type:'bar',
                            stack: '项目',
                            data:[220, 182, 191, 234, 290, 330, 310,220,230,240,190,220]
                        },
                    
                    ]
            });
            chart4.setOption({
                title :{
                    text:'图表四'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                xAxis: {
                    type: 'category',
                    data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name:'评分',
                    data: [820, 932, 901, 934, 1290, 1330, 1320, 1420, 1300, 1208, 1068, 1250],
                    type: 'line',
                    smooth: true
                }]
            });
        }
    },
    mounted(){
        this.drawLine();
    },
}
</script>

<style>
.l-main-chart {
    display: flex;
    justify-content: space-between;
}
#chart1 , #chart2, #chart3 ,#chart4{
    width: 35em;
    margin-right: 1em;
    height: 25em;
}
.l-main-content {
    height:55em;
}
</style>
