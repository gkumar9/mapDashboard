import React, { Component } from 'react';
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import { Link } from "react-router-dom";
import ReactHighcharts from 'react-highcharts'
import rmsdata from './rmsdata.json'
import RmsSidebardata from './RmsSidebardata.js'
const $ = require('jquery')
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const config = {
      chart: {
            type: 'column',
            events: {
              load: function () {
                var fin = new Date();
                var finDate = fin.getDate();

                var finMonth = fin.getMonth() ;
                var finYear = fin.getFullYear();

                var ini = new Date();
                ini.setFullYear(ini.getFullYear() - 1 );
                var iniDate = ini.getDate();
                var iniMonth = ini.getMonth() ;
                var iniYear = ini.getFullYear();
                if(this.yAxis[0].dataMax ==0 ){
                  this.yAxis[0].setExtremes(null,1);
                }
                //this.yAxis.set

                this.xAxis[0].setExtremes(Date.UTC(iniYear, iniMonth, iniDate), Date.UTC(finYear, finMonth, finDate));

              },

              drilldown: function (e) {



                var charts_this = this;
                var inidrillDate = new Date(e.point.x)
                setTimeout(function () {
                  inidrillDate.setDate(0);
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


                  charts_this.xAxis[0].setExtremes(Date.UTC(YearinidrillDate, MonthinidrillDate, DateinidrillDate), Date.UTC(YearfindrillDate, MonthfindrillDate, DatefindrillDate));
                  
                  if(charts_this.yAxis[0].dataMax ==0 ){
                    charts_this.yAxis[0].setExtremes(null,1);
                  }

                }, 0);
              }
            },
            style: {
                backgroundColor:'lightgrey',
                fontFamily: 'Lato'
            }

          },
        title: {
          text: '<p class="energy_gen">Energy Generated</p>'
        },
        exporting: { enabled: false },
        xAxis: {
          type : 'datetime',
          labels: {
            step: 1,
          },
          dateTimeLabelFormats: {
            day: '%e'
          }
        },
        yAxis: {

          title: {
            text: 'kWh'
          }
        },
        credits: {
          enabled: false
        },
        plotOptions: {
            series: {
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '{point.y}',  
              },
              color: '#fcd562',
              point :{
                events: {
                  click: function (event) {
                    if(this.options != null)
                    {
                      var dayOfYear=new Date(this.x).getFullYear() +"-"+(new Date(this.x).getMonth()+1)+"-"+new Date(this.x).getDate();
                      var formatted_date = new Date(this.x).getDate() + " " + months[(new Date(this.x).getMonth())] +" "+ new Date(this.x).getFullYear();
                      document.getElementById('chart_date_id').innerHTML = formatted_date;    //setting modal title with current date
                      $('#container').bind('mousemove touchmove touchstart', function (e) {

                        var chart,
                        point,
                        i,
                        event;
                        var sync_charts = $('.chart');
                        for (i = 0; i < sync_charts.length; i = i + 1) {

                          var chart_1 = sync_charts[i];
                          var chart_2 = chart_1.getAttribute('data-highcharts-chart');
                          chart=ReactHighcharts.charts[chart_2];
                          event = chart.pointer.normalize(e.originalEvent);
                          point = chart.series[0].searchPoint(event, true);

                          if (point) {
                            point.highlight(e);
                          }
                        }
                      });
                      ReactHighcharts.Pointer.prototype.reset = function () {

                        return undefined;
                      };
                      ReactHighcharts.Point.prototype.highlight = function (event) {

                        event = this.series.chart.pointer.normalize(event);
                        this.onMouseOver(); // Show the hover marker
                        this.series.chart.tooltip.refresh(this); // Show the tooltip
                        this.series.chart.xAxis[0].drawCrosshair(event, this); // Show the crosshair
                      };
                      function syncExtremes(e) {

                        var thisChart = this.chart;

                        if (e.trigger !== 'syncExtremes') { // Prevent feedback loop
                          ReactHighcharts.each(ReactHighcharts.charts, function (chart) {
                            if (chart !== thisChart) {
                              if (chart.xAxis[0].setExtremes) { // It is null while updating
                                chart.xAxis[0].setExtremes(
                                    e.min,
                                    e.max,
                                    undefined,
                                    false,
                                    { trigger: 'syncExtremes' }
                                );
                              }
                            }
                          });
                        }
                      }
                      // $.post(
                      //     "api/pump_day",{date:dayOfYear,vfd:ID},
                      //     function (activity) {
                      //       activity = $.parseJSON(activity);
                      //       if($('.chart')){
                      //         $('.chart').remove();
                      //       }
                      //       var isDataAvail = true;
                      //       if(activity.xData=="NA") {
                      //         isDataAvail = false;
                      //       }
                      //       $.each(activity.datasets, function (i, dataset) {

                      //         $('<div class="chart">')
                      //         .appendTo('#container')
                      //         .highcharts({
                      //           chart: {
                      //             marginLeft: 40, // Keep all charts left aligned
                      //             spacingTop: 20,
                      //             spacingBottom: 20
                      //           },
                      //           plotOptions: {
                      //             series: {
                      //               marker:{
                      //                 enabled:false
                      //               }
                      //             }
                      //           },
                      //           exporting: { enabled: false },
                      //           title: {
                      //             text: dataset.name,
                      //             align: 'left',
                      //             margin: 0,
                      //             x: 30
                      //           },
                      //           credits: {
                      //             enabled: false
                      //           },
                      //           legend: {
                      //             enabled: false
                      //           },
                      //           xAxis: {
                      //             crosshair:{ width: 3},
                      //             events: {
                      //               setExtremes: syncExtremes
                      //             },
                      //             labels: {
                      //               format: '{value}'
                      //             },categories: activity.xData
                      //           },
                      //           yAxis: {
                      //             title: {
                      //               text: null
                      //             }
                      //           },
                      //           series: [{
                      //             data: dataset
                      //           }],
                      //           tooltip: {
                      //             positioner: function () {
                      //               return {
                      //                 x: this.chart.chartWidth - this.label.width,
                      //                 y: 10 // align to title
                      //               };
                      //             },
                      //             borderWidth: 0,
                      //             backgroundColor: 'none',
                      //             pointFormat: '{point.y}',
                      //             headerFormat: '',
                      //             shadow: false,
                      //             style: {
                      //               fontSize: '18px'
                      //             },
                      //             valueDecimals: dataset.valueDecimals
                      //           },
                      //           series: [{
                      //             data: dataset.data,
                      //             name: dataset.name,
                      //             type: dataset.type,
                      //             color: ReactHighcharts.getOptions().colors[i],
                      //             fillOpacity: 0.3,
                      //             tooltip: {
                      //               valueSuffix: ' ' + dataset.unit
                      //             }
                      //           }]
                      //         });
                      //       });
                      //       if(isDataAvail) {
                      //         $("#Modal_e_1").modal();
                      //       }

                      //       else {
                      //         $("#myModal").modal();
                      //       }
                      //     }
                      // );
                    }

                  }
                }
              }
            }
          },
        drilldown : {
            "series": rmsdata.energy_graph.data,
          },
        series: [rmsdata.energy_graph]
};

class RmsHeader extends Component{
  render(){
    return(
        <div className="container ">
          <nav id="filter" className="navbar navbar-default">
            <div className="container-fluid" style={{'textAlign':'center'}}>                 
            <Link to="/"><button style={{'marginTop':'6px','backgroundColor': 'transparent','float': 'left'}} type="button" className="btn btn-default" aria-label="Left Align"><span  className="glyphicon glyphicon-menu-left" style={{'marginRight':'6px'}} aria-hidden="true"></span>Home </button></Link>
            <Link  to="/rms"><button style={{'marginTop':'6px','marginLeft':'10px','backgroundColor': 'transparent','float': 'left'}} type="button" className="btn btn-default" aria-label="Left Align"><span  className="glyphicon glyphicon-menu-left" style={{'marginRight':'6px'}} aria-hidden="true"></span>Rms </button></Link>
            <span style={{'fontSize': 'x-large','color':'blue'}}>Remote Monitoring System </span>
            </div>
          </nav>
        </div>
      )
  }
}

 
class Rms extends Component{
  
  componentDidMount(){
    let chart = this.refs.chart.getChart();
    chart.series[0].addPoint({x: 10, y: 12});
    
  }
	render(){
		return(
			<div >  
        <Header />
        <div className="mainbody">
          <Sidebar />
          <div style={{'backgroundColor':'#F2F2F2'}}className="main">
            <RmsHeader />
            <div className="container">
              <div className="row">
              <RmsSidebardata />
              <div style={{'padding':'30px'}} className="col-xs-10">
              <ReactHighcharts config={config} ref="chart"></ReactHighcharts>
              </div>
              </div>
            </div>
            
          </div>
        </div>
        </div>
			)
	}
}

export default Rms;