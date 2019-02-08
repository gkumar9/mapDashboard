import React, { Component } from "react";
import Highcharts from 'highcharts/highstock'
import drilldown from "highcharts-drilldown";
import axios from 'axios'
import config from './config.js'
const $ = require("jquery");

class Iaashourtans extends Component{
    componentDidMount(){
        drilldown(Highcharts);
        axios({
            url: config.hourtrans,
            method: "POST",
            data: {  "requestId": 1},
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((res)=>{
              var data121 = res.data.data.valueList;
                var dataSum = 0;
                for (var i=0;i < data121.length;i++) {
                    dataSum += data121[i]
                }
              var chart = new Highcharts.Chart({
                chart: {
                    renderTo:'tranvsrev',
                    type:'column',
                    backgroundColor: "#f2f2f2",
                },
                title:{
                    text:'Hours of Operation per Transaction',
                    style: {
                        
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    formatter: function() {	
                        
                    
                            return '<table><tr><td>No. Of Transactions </td><td><b>:'+this.y+'</b></td></tr><tr><td>Duration</td><td><b>:'+this.key+' hrs</b></td></tr></table>'
                     
                        
                        
                    },
                    useHTML: true
                
                },
    
                credits:{enabled:false},
                legend: {
                    enabled:false },
                plotOptions: {
                      series: {
                          
                          shadow:false,
                          borderWidth:0,
                          dataLabels:{
                              enabled:true,
                             
                         
                              formatter:function() {
                                  var pcnt = (this.y / dataSum) * 100;
                                  return Highcharts.numberFormat(pcnt,1) + '%';
                              },
                             
                          }
                      },
                      
                },
                xAxis: [{
                    categories: res.data.data.durationList,
                    crosshair: true,
                    title:{
                        text:'Hours',
                      }
                }],
                yAxis:{
                   
                    title:{
                        text:'No of Transactions',
                      }
                },    
                series: [{
                    pointWidth: 35,
                    data: res.data.data.valueList,
                    color:"#4848d3",
                }]
                
                
            });
          })
          .catch((e)=>{
              console.log(e)
          })
        
    }
    render(){
        return(
            <div style={{'marginTop':'64px'}} id="tranvsrev" ></div>
        )
    }
}
export default Iaashourtans;