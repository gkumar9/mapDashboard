import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import Highcharts from 'highcharts/highstock'
import Swal from "sweetalert2";
import drilldown from "highcharts-drilldown";
import rmsdata from "./rmsdata.json";
import axios from "axios";
import config from "./config.js";
import RmsSidebardata from "./RmsSidebardata.js";
import nodata from './pins/nodata.png'
import fvc from './fvc.json'
const $ = require("jquery");
Highcharts.setOptions({
  time: {
      timezone: 'Asia/Kolkata'
  }
});
class RmsHeader extends Component {
  render() {
    return (
      <div className="container rmssidebar">
        <nav id="filter" className="navbar navbar-default">
          <div
            className="container-fluid"
            style={{ textAlign: "center", marginTop: "10px" }}
          >
            
            <Link to="/rms">
              <button
                style={{
                  marginTop: "-2px",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                  float: "left"
                }}
                type="button"
                className="btn btn-default"
                aria-label="Left Align"
              >
                <span
                  className="glyphicon glyphicon-menu-left"
                  style={{ marginRight: "6px" }}
                  aria-hidden="true"
                />
                RMS{" "}
              </button>
            </Link>
            <span style={{ fontSize: "large", color: "blue" ,"marginLeft":"-82px"}}>
              Remote Monitoring System{" "}
            </span>
          </div>
        </nav>
      </div>
    );
  }
}

class Rms extends Component {
  constructor(props) {
    super(props);
    this.state = { singleassetstat: {},open: false };
  }
  async componentDidMount() {
    // console.log('didmount')
    let chartarray;
    
    // console.log(Highcharts.Chart.destroy())
    if (!Highcharts.Chart.prototype.addSeriesAsDrilldown) {
      drilldown(Highcharts);
      
  }
  
    
		let singleassetstatttemp = {};
    let self=this;
    if(this.props.location.state!==undefined){
      await axios({
        url: config.singleassetstat,
        method: "POST",
        data: {
          customerId: this.props.location.state.detail.customerId,
          rmsVendorId: this.props.location.state.detail.rmsVendorId
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          if(res.data.data!== null){
          singleassetstatttemp = res.data.data;
          this.setState({ singleassetstat: singleassetstatttemp });
          }
          else if (res.data.error !== undefined) {
            if (res.data.error.errorCode === 153) {
              window.location.href = "../login.html?redirect=maps";
            } else {
              Swal({
                type: "error",
                title: "Oops...",
                text: res.data.error.errorMsg
              });
            }
          }
        })
        .catch(e => {
          console.log(e);
        });
      await axios({
        url: config.highchartdata,
        method: "POST",
        data: {
          customerId: this.props.location.state.detail.customerId,
          rmsVendorId: this.props.location.state.detail.rmsVendorId
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((res) => {
          let obj = {};
          // console.log('rmssub',res.data.data.list)
          obj["data"] = res.data.data.list;
          // obj["data"] = rmsdata.energy_graph.data;
          obj["name"] = "Energy";
          
          document.getElementById('drillUp').addEventListener('click', function(){
           
            document.getElementById('energy_chart').style.display = "block";
            document.getElementById('drilldownContainer').style.display = "none";
            // document.getElementById('drilldownContainer').innerHTML=''
            document.getElementById('drillUp').style.display = 'none';
          });
          
          

        
          Highcharts.Pointer.prototype.reset = function() {
              return undefined;
          };
        
      
        Highcharts.Point.prototype.highlight = function(event) {
            event = this.series.chart.pointer.normalize(event);
            this.onMouseOver(); // Show the hover marker
            this.series.chart.tooltip.refresh(this); // Show the tooltip
            this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
        };

        function syncExtremes(e) {
            var thisChart = this.chart;
        
            if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                Highcharts.each(Highcharts.charts, function(chart) {
                    if (chart !== thisChart) {
                        if (chart.xAxis[0].setExtremes) { // It is null while updating
                            chart.xAxis[0].setExtremes(
                                e.min,
                                e.max,
                                undefined,
                                false, {
                                    trigger: 'syncExtremes'
                                }
                            );
                        }
                    }
                });
            }
        }
        function createDrillDownCharts(activity) {
          // let activity = fvc.data;
          // console.log('activity', activity)
          let temp={}
          chartarray=[]
          activity.datasets.forEach(function(dataset, i) {
            
              // Add X values
              dataset.data = Highcharts.map(dataset.data, function(val, j) {
                  return [activity.xData[j], val];
              });
              // console.log(dataset.data)
              var chartDiv = document.createElement('div');
              chartDiv.className = 'chart';
              document.getElementById('drilldownContainer').appendChild(chartDiv);
              temp=new Highcharts.chart(chartDiv, {
                  chart: {
                      spacingBottom: 15,
                      spacingTop: 10,
                      spacingLeft: 10,
                      spacingRight: 10,
                      marginRight: 30,
                      height: 195,
                      backgroundColor: "#f2f2f2",
                  },
                  title: {
                      text: dataset.name,
                      align: 'left',
                      margin: 0,
                      x: 30
                  },
                  credits: {
                      enabled: false
                  },
                  legend: {
                      enabled: false
                  },
                  xAxis: {
                      crosshair: {
                          width: 3
                      },
                      events: {
                          setExtremes: syncExtremes
                      },
                      labels: {
                          format: '{value}'
                      },
                      categories: activity.xData
                  },
                  yAxis: {
                      title: {
                          text: null
                      }
                  },
                  tooltip: {
                      positioner: function() {
                          return {
                              // right aligned
                              x: this.chart.chartWidth - this.label.width - 50,
                              y: 10 // align to title
                          };
                      },
                      borderWidth: 0,
                      backgroundColor: 'none',
                      borderColor:'#4848d3',
                      pointFormat: '{point.y}',
                      headerFormat: '',
                      shadow: false,
                      style: {
                          fontSize: '18px'
                      },
                      valueDecimals: dataset.valueDecimals
                  },
                  series: [{
                      data: dataset.data,
                      name: dataset.name,
                      type: dataset.type,
                      color: Highcharts.getOptions().colors[i],
                      fillOpacity: 0.3,
                      tooltip: {
                          valueSuffix: ' ' + dataset.unit
                      }
                  }],
                  responsive: {
                    rules: [{
                        condition: {
                            minWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                layout: 'horizontal'
                            },
                            yAxis: {
                                labels: {
                                    align: 'left',
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
              chartarray.push(temp)

          });
        }
        function updateDrillDownCharts(activity) {
          // console.log('update')
          
          if(chartarray!==undefined){
            activity.datasets.forEach(function(dataset, i) {
              // console.log(i,dataset.data)
                /* dataset.data = Highcharts.map(dataset.data, function(val, j) {
                    return [activity.xData[j], val];
                
                }); */
                // arr.push(dataset.data)
                chartarray[i].update({
                    series: [{
                        data: dataset.data
                    }]
                }, true, true)
                chartarray[i].redraw();
            })
          }
          else{
            let temp={}
            chartarray=[]
            activity.datasets.forEach(function(dataset, i) {
            
              // Add X values
              dataset.data = Highcharts.map(dataset.data, function(val, j) {
                  return [activity.xData[j], val];
              });
              // console.log(dataset.data)
              var chartDiv = document.createElement('div');
              chartDiv.className = 'chart';
              document.getElementById('drilldownContainer').appendChild(chartDiv);
              temp=new Highcharts.chart(chartDiv, {
                  chart: {
                      spacingBottom: 15,
                      spacingTop: 10,
                      spacingLeft: 10,
                      spacingRight: 10,
                      marginRight: 30,
                      height: 195,
                      backgroundColor: "#f2f2f2",
                  },
                  title: {
                      text: dataset.name,
                      align: 'left',
                      margin: 0,
                      x: 30
                  },
                  credits: {
                      enabled: false
                  },
                  legend: {
                      enabled: false
                  },
                  xAxis: {
                      crosshair: {
                          width: 3
                      },
                      events: {
                          setExtremes: syncExtremes
                      },
                      labels: {
                          format: '{value}'
                      },
                      categories: activity.xData
                  },
                  yAxis: {
                      title: {
                          text: null
                      }
                  },
                  tooltip: {
                      positioner: function() {
                          return {
                              // right aligned
                              x: this.chart.chartWidth - this.label.width - 50,
                              y: 10 // align to title
                          };
                      },
                      borderWidth: 0,
                      backgroundColor: 'none',
                      borderColor:'#4848d3',
                      pointFormat: '{point.y}',
                      headerFormat: '',
                      shadow: false,
                      style: {
                          fontSize: '18px'
                      },
                      valueDecimals: dataset.valueDecimals
                  },
                  series: [{
                      data: dataset.data,
                      name: dataset.name,
                      type: dataset.type,
                      color: Highcharts.getOptions().colors[i],
                      fillOpacity: 0.3,
                      tooltip: {
                          valueSuffix: ' ' + dataset.unit
                      }
                  }]
              });
              chartarray.push(temp)

          });
          // console.log(chartarray)
          activity.datasets.forEach(function(dataset, i) {
            // console.log(i,dataset.data)
              /* dataset.data = Highcharts.map(dataset.data, function(val, j) {
                  return [activity.xData[j], val];
              
              }); */
              // arr.push(dataset.data)
              chartarray[i].update({
                  series: [{
                      data: dataset.data
                  }]
              }, true, true)
              chartarray[i].redraw();
          })
          }
          // activity.datasets.forEach(function(dataset, i) {
          //   dataset.data = Highcharts.map(dataset.data, function(val, j) {
          //     return [activity.xData[j], val];
      
          // });
          // console.log(dataset.data,chartarray[i])
          // chartarray[i].series[0].setData(dataset.data,true);
          // chartarray[i].xAxis[0].setCategories(activity.xData,true);
          // chartarray[i].redraw();
      
          // })
          // let arr=[];
          // console.log(chartarray)
          
      
      
          // Highcharts.charts.forEach(function(chart, i) {
      
          //     if (i) {
          //         chart.update({
          //             series: [{
          //                 data: arr[i]
          //             }]
          //         }, true, true)
          //     }
          // });
      }
      ['mousemove', 'touchmove', 'touchstart'].forEach(function(eventType) {
          document.getElementById('drilldownContainer').addEventListener(
              eventType,
              function(e) {
                  var chart,
                      point,
                      i,
                      event;
      
                  for (i = 0; i < Highcharts.charts.length; i = i + 1) {
                      chart = Highcharts.charts[i];
                      // Find coordinates within the chart
                      event = chart.pointer.normalize(e);
                      // Get the hovered point
                      point = chart.series[0].searchPoint(event, true);
      
                      if (point) {
                          point.highlight(e);
                      }
                  }
              }
          );
      });
        Highcharts.chart("energy_chart", {
          chart: {
            type: "column",
            spacingBottom: 15,
            spacingTop: 10,
            spacingLeft: 10,
            spacingRight: 10,
            backgroundColor: "#f2f2f2",
            events: {
              load: function() {
                var fin = new Date();
                var finDate = fin.getDate();

                var finMonth = fin.getMonth();
                var finYear = fin.getFullYear();

                var ini = new Date();
                ini.setFullYear(ini.getFullYear() - 2);
                var iniDate = ini.getDate();
                var iniMonth = ini.getMonth();
                var iniYear = ini.getFullYear();
                if (this.yAxis[0].dataMax === 0) {
                  this.yAxis[0].setExtremes(null, 1);
                }
                // this.yAxis.set
                this.xAxis[0].setExtremes(
                  Date.UTC(iniYear, iniMonth, iniDate),
                  Date.UTC(finYear, finMonth, finDate)
                );
              },

              drilldown: function(e) {
                var charts_this = this;
                var inidrillDate = new Date(e.point.x)
                // var findrillDate =  inidrillDate;
                console.log(inidrillDate,e.point.x)
								setTimeout(function () {
                  inidrillDate.setDate(1);
									inidrillDate.setMonth(inidrillDate.getMonth());
									var DateinidrillDate = inidrillDate.getDate();
									var MonthinidrillDate = inidrillDate.getMonth();
									var YearinidrillDate = inidrillDate.getFullYear();
									var findrillDate =  inidrillDate;
									findrillDate.setMonth(findrillDate.getMonth()+1);
									findrillDate.setDate(findrillDate.getDate()-1);
									var DatefindrillDate = findrillDate.getDate();
									var MonthfindrillDate = findrillDate.getMonth();
									var YearfindrillDate = findrillDate.getFullYear();

                  console.log(DateinidrillDate,MonthinidrillDate,YearinidrillDate)
                  console.log(DatefindrillDate,MonthfindrillDate,YearfindrillDate)
									charts_this.xAxis[0].setExtremes(Date.UTC(YearinidrillDate, MonthinidrillDate, DateinidrillDate), Date.UTC(YearfindrillDate, MonthfindrillDate, DatefindrillDate));
									
									if(charts_this.yAxis[0].dataMax ===0 ){
										charts_this.yAxis[0].setExtremes(null,1);
									}

								}, 0);
                
              }
            } 
          },
          title: {
            text: '<p className="energy_gen">Energy Generated</p>'
          },
          exporting: { enabled: false },
          xAxis: {
            type: "datetime",
            labels: {
              step: 1
            },
            dateTimeLabelFormats: {
              day: "%e"
            }
          },
          yAxis: {
            title: {
              text: "kWh"
            }
          },
          credits: {
            enabled: false
          },
          plotOptions: {
            series: {
              cursor: "pointer",
              pointWidth: 30,
              dataLabels: {
                enabled: true,
                format: "{point.y}"
              },
              color: "#ff4081",
              point:{
                events:{
                  click:function(){
                    if(this.options!=null){
                    var dayOfYear=new Date(this.x).getFullYear() +"-"+("0"+(new Date(this.x).getMonth()+1)).slice(-2)+"-"+("0" + new Date(this.x).getDate()).slice(-2);
                      // console.log(dayOfYear)
                      
                    
                    // if($('.chart')){
                    //   $('.chart').remove();
                    // }
                      axios({
                      url: config.fvcstat,
                      method: "POST",
                      data: {
                        "customerId":self.props.location.state.detail.customerId,"rmsVendorId":self.props.location.state.detail.rmsVendorId,
                        "date":dayOfYear,
                        "powerType":self.props.location.state.detail.powerType
                      },
                      headers: {
                        "Content-Type": "application/json"
                      }
                    })
                    .then((res)=>{
                      // console.log(res.data.data)
                      // let activity = fvc.data;
                    let activity=res.data.data
                      // createDrillDownCharts(activity);
                      if(activity.datasets.length!==0){
                        if (Highcharts.charts.length === 1) {
                          createDrillDownCharts(activity);
                      } else {
                          updateDrillDownCharts(activity);
                      }
                      document.getElementById('energy_chart').style.display = 'none';
                      document.getElementById('drilldownContainer').style.display = 'block';
                      document.getElementById('drillUp').style.display = 'block';
                      }
                      else{
                        console.log('no data',res.data)
                      }
                      
                    })
                  
                      
                    }		
                  }
                }
              }
            }
          },
          tooltip: {
            borderColor:'#4848d3',
            formatter: function() {
              if (this.point.options.drilldown) {
                return (
                  "Energy generated: <b> " +
                  this.y +
                  "</b> kWh " +
                  "<br>" +
                  Highcharts.dateFormat("%b %Y", new Date(this.x))
                );
              } else {
                return (
                  "Energy generated: <b> " +
                  this.y +
                  "</b> kWh " +
                  "<br>" +
                  Highcharts.dateFormat("%e %b %Y", new Date(this.x))
                );
              }
            }
          },
          series: [{'data':obj.data,'name':obj.name,"color":"#ff4081"}],
          drilldown: {
            series: obj.data
          },
          responsive: {
            rules: [{
                condition: {
                    maxWidth: 500
                },
                chartOptions: {
                    width:400,
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
                        // labels: {
                        //     align: 'right',
                        //     x: 0,
                        //     y: -5
                        // },
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
        .catch(e => {
          console.log(e);
        })
    }
    
  }
  render() {
      return (
        <div>
          <Header />
          <div className="mainbody">
            <Sidebar history={this.props.history} />
            <div style={{ backgroundColor: "#F2F2F2" }} className="main">
              <RmsHeader />
              <div className="container">
                <div className="row">
                {
                  this.props.location.state!==undefined ?(
                      <RmsSidebardata
                        allassetstat={this.state.singleassetstat}
                        rmsubstate={this.props.location.state.detail}
                        rmscapacity={this.props.location.state.detail.capacity}
                      />
                      
                 
                  ):(
                      <RmsSidebardata
                        allassetstat={this.state.singleassetstat}
                        rmsubstate={{
                        capacity: "NA",
                        customerId: "NA",
                        customerName: "NA",
                        district: "NA",
                        doi: "NA",
                        imei: "NA",
                        powerType: "NA",
                        rmsVendorId: null,
                        serverConfig: null,
                        state: "NA",
                        vfdSno: "NA"}}
                        rmscapacity={'NA'}
                      />
                  )
                }
                 <div style={{ paddingLeft: "30px" }} className="col-xs-10">
                {
                  this.props.location.state!==undefined ?(
                  <div>
                  
                      <h4>{this.props.location.state.detail.customerName}</h4>
                      <i className="fa fa-calendar" aria-hidden="true"></i><span style={{'marginLeft':'8px'}}>{this.props.location.state.detail.doi}</span>
                      <div style={{'margin':'10px'}} id="energy_chart" />	
                      <button id="drillUp" style={{display: 'none','float':'right','marginTop':'-24px','marginRight':'30px','backgroundColor': "#f2f2f2"}}>
                      <span
                        className="glyphicon glyphicon-menu-left"
                        style={{ marginRight: "6px" }}
                        aria-hidden="true"
                      />Back</button>
                      <div id="drilldownContainer" style={{display: 'none'}}>
                      </div>	
                      
                  </div>
                  ):(
                    <div>
                    
                  
                      <h4>NA</h4>
                      <i className="fa fa-calendar" aria-hidden="true"></i><span style={{'marginLeft':'8px'}}>NA</span>
                      <img style={{width:"40%"}} className="center"src={nodata} alt="no data" />
                  </div>
                  )
                }
                
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      );
    
  }
}

export default Rms;
