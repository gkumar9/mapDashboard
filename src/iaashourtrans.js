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
            //   var data121 = res.data.data.list;
              // let durationlist=res.data.data.list.map((item)=>{
              //     let temp=parseInt(item.durationList)+1
              //     return item.durationList +'-'+temp
							// })
							let durationlist=[]
							for(let i=0;i< 10;i++){
								// if(i===10){
								// 	durationlist.push(i+'+')
								// }
								// else{
									durationlist.push(i+'-'+(i+1))
								// }
								
							}
							// console.log(durationlist)
              let valuelist=durationlist.map((item,number)=>{
									let value=0;
									res.data.data.list.map((listvalue)=>{
										if( parseInt(listvalue.durationList)===number){
											value=listvalue.valueList
										}
									})
									return value
							})

                var dataSum = 0;
                for (var i=0;i < valuelist.length;i++) {
                    dataSum += valuelist[i]
                }
              var chart = new Highcharts.Chart({
                chart: {
                    renderTo:'tranvsrev',
                    type:'column',
                    backgroundColor: "#f2f2f2",
                    style: {
                        fontFamily: 'gotham-light'
                    },
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
                    useHTML: true,
                    borderColor:'#4848d3'
                
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
                    categories:durationlist,
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
                    borderRadiusTopLeft: 3,
                    borderRadiusTopRight: 3,
                    data: valuelist,
                    color:"#315ca6",
                }],
                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            plotOptions:{
                                series:{
                                  pointWidth:null
                                }
                              },
                            yAxis: {
                                labels: {
                                    align: 'right',
                                    x: 0,
                                    y: -5
                                },
                                title: {
                                    text: null
                                }
                            },
                            subtitle: {
                                text: null
                            },
                            credits: {
                                enabled: false
                            }
                        }
                    }]
                  }
                
                
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