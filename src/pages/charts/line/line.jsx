import React,{Component} from 'react'
import ReactECharts from 'echarts-for-react'
import { Card } from "antd";

class Line extends Component {
    getOption=()=>{
        return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'line'
            }]
        }
    }
    render(){
        return (
            <Card title="图表Line">
                <ReactECharts option={this.getOption()}/>
            </Card>
        )
    }
}

export default Line