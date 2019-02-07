import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import axios from "axios";
import config from "./config.js";
import Swal from "sweetalert2";
import CO2 from "./pins/1.png";
import FLOW from "./pins/2.png";
import SOLARENERGY from "./pins/3.png";
import SUBMERSIBLE from "./pins/4.png";
import STATES from "./pins/5.png";
import revenue from './revenu.json'
import Highcharts from 'highcharts/highstock'
import drilldown from "highcharts-drilldown";
const $ = require("jquery");

class IaasHeader extends Component {
    render() {
      return (
        <div className="container">
          <nav id="filter" className="navbar navbar-default">
            <div
              className="container-fluid"
              style={{ textAlign: "center", marginTop: "10px" }}
            >
              <Link to="/">
                <button
                  style={{
                    marginTop: "-2px",
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
                  Home{" "}
                </button>
              </Link>
              <span style={{ fontSize: "large", color: "blue" }}>
                Irrigation as a Service{" "}
              </span>
            </div>
          </nav>
        </div>
      );
    }
  }

class IaasSidebar extends Component {
    render() {
      return (
        <div style={{
          borderRightStyle: "groove",
          minHeight: "100vh",
          textAlign: "center"
        }} className="col-xs-2 rmssidebar">
              <h4 style={{ marginTop: "40px", color: "gray", fontSize: "large" }}>Our Impact</h4>
              <ul style={{ marginTop: "40px", color: "black" }}>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="CO2" src={CO2} style={{ width: "46px",marginLeft:'-11px' }}  />
                    </div>
                    <div className="col-xs-9">
                    <span><b>802.0 Kg</b></span>
                    <p ><small>CO2 Saved</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="flow" src={FLOW} style={{ width: "32px",marginLeft:'-11px' }}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>7914.0 kL</b></span>
                    <p ><small>Water Discharged</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="SOLARENERGY" src={SOLARENERGY} style={{ width: "37px",marginLeft:'-11px' }}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>1488 Acre</b></span>
                    <p ><small>Land Irrigated</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="submersible" src={SUBMERSIBLE} style={{ width: "42px",marginLeft:'-11px' }}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>50</b></span>
                    <p ><small>No of Patvans</small></p>
                    </div>
                  </div>
                </li>
                <li className="rmssidebar">
                  <div className="row">
                    <div className="col-xs-3">
                      <img alt="states" src={STATES} style={{ width: "42px",marginLeft:'-11px' }}  />
                    </div>
                    <div className="col-xs-9">
                    <span ><b>184</b></span>
                    <p ><small>No of Farmers</small></p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
      );
    }
  }
class iaas extends Component {

  async componentDidMount() {
    drilldown(Highcharts);
    var arr1=[];
    var arr2=[];
    var months=["Jan","Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var month=[1,2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var monthn= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var days= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
    let z=revenue.data.list
    for(let i=0; i<z.length; i++) {
      arr1.push({
        name: z[i].year,
        y: parseInt(z[i].value),
        drilldown: z[i].year+'_month',
        Districts : z[i].district,
        Patvans : z[i].patvan,
        Farmers : z[i].farmer,
        
            });
    }
    for(let i=0; i<z.length; i++) {
      var arrA = [];
              
              //loop for all 12 elemnts in month[]
      for(let k=0;k<12;k++) {
        var a=0;
        var b;
    
            for(let j=0; j<z[i].drillMonths.length; j++) {
                // to check which month is in json data from the month array
                
                if(month[k]===z[i].drillMonths[j].month) {
                  
                    a++;
                    b=j;
                }
                //str=z.Data[0].RevenueTimeline[0].drillyear[i].drillmonth[j].month;
                //console.log(str);
            }
            // console.log(a)
            // if month exist in the json data then there's further more drilldown
            if(a===1) {
                let x = parseInt(z[i].drillMonths[b].value);
                // console.log(x)
                arrA.push({
                    name: months[k],
                    y: x,
                    drilldown: z[i].year+"_"+z[i].drillMonths[b].month+"_days",
                    // drilldown: z[i].drillMonths[b].drillDays,
                    Districts : z[i].drillMonths[b].district,
                    Patvans : z[i].drillMonths[b].patvan,
                    Farmers : z[i].drillMonths[b].farmer,
                });

            }
        
            // if the month does not exist in json data then the place is left with the name of that month
            else {
                    //alert(month[k] +"is not");
                arrA.push({
                    name: months[k],
                    y: null
                });
            }

  
        }
              
          //console.log(arrA);
                        
                        //to push the months in the column drilldown highchart 
          arr2.push({
            type: 'column',
            color:"#4848d3",
            name: 'Month',
            id: z[i].year+'_month',
            data: arrA,
                            
          });

          }
          for(let i=0; i<z.length; i++) {
                        
                           
                          
            for(let j=0; j<z[i].drillMonths.length; j++) {
                 let arrB= [];
             //   console.log(z.Data[0].RevenueTimeline[0].drillyear[i].year);
                    
                // console.log(z.Data[0].RevenueTimeline[0].drillyear[i].drillmonth[j].month);
                 
                //get the index of month from the json in the month[] and then get the corresponding no of days from monthn[] i.e no of days in the month that contains data in json
               var n = (monthn[month.indexOf(z[i].drillMonths[j].month)]);
                
                
                for(let k=1;k<=n;k++)
                {
                    var t = 0;
                    var r;
                    // loop to get if there's json data for a specific date or not
                    for(let l=0;l<z[i].drillMonths[j].drillDays.length;l++)
                   { 
             
                       if(z[i].drillMonths[j].drillDays[l].day==k){
                           t++;
                           r = l;
                           
                       }
                           
                     }
                    
                    //if a date has data then it is pushed in arrB 
                 if(t==0)
                     {
                   
                   arrB.push({
                         name: days[k-1],
                         y: null
                     });
                        
                        // console.log(arrB);
        
                     }
                    // if not then the place is empty with the date
                 else{
                    var x= parseInt(z[i].drillMonths[j].drillDays[r].value);
                      //console.log(x);
                      arrB.push ({
                          name: days[k-1],
                          y: x,
                          // key stores the date in format yyyy-mm-dd which is to be send to datatable
                          key: z[i].Year+ "-" + z[i].drillMonths[j].month +"-" + z[i].drillMonths[j].drillDays[r].day,  
                          Districts : z[i].drillMonths[j].drillDays[r].district,
          Patvans : z[i].drillMonths[j].drillDays[r].patvan,
          Farmers : z[i].drillMonths[j].drillDays[r].farmer,
                      });
         
                }
                  t = 0;
                
            }    
                //data from arrB is pushed in arr2 which contains the drilldown of hte highchart
                 arr2.push({
                  type: 'column',
                  color:"#4848d3",
                  name: 'Date',
                  id: z[i].year+"_"+z[i].drillMonths[j].month+"_days",
                  data: arrB

});
               // console.log(arrB);
                
          }// console.log(arrB);
        

     }
          // console.log('arr2',arr2)
		Highcharts.chart('container1', {
      /*chart: {
          type: 'column',
          events: {
            drilldown: function(e) {
              var chart = this,
                drilldowns = chart.userOptions.drilldown.series,
                series = [];
              e.preventDefault();
              Highcharts.each(drilldowns, function(p, i) {
                if (p.id.includes(e.point.name)) {
                  console.log(p.id);
                  chart.addSingleSeriesAsDrilldown(e.point, p);
                }
              });
              chart.applyDrilldown();
            }
        }
    },*/
      
      tooltip: {
        formatter: function() {	
          
          if(this.point.key == null){
            return '<h5><u>Revenue:<b>'+this.y+'</b></u></h5>Patvans: <b>' + this.point.Patvans + '</b><br/>Districts: <b>' + this.point.Districts + '</b><br/>Farmers: <b>' + this.point.Farmers + '</b>';
                          }
                           //else function call
                          else{
                            return 'Ravenue:<b>'+this.y+'</b><br/>click to view Data'
                          }
          
              
          },
          useHTML: true
      
      },
       chart: {
        backgroundColor: "#f2f2f2",
         events:{
            load : function(event)
            {
              this.series[0].data[2].doDrilldown();
            }
          },
  
          },

      
      credits:{
        enabled:false
      },
       legend: {
                    enabled:false },
      title:{
        text:'Revenue Timeline',
        style: {
                        
                        fontWeight: 'bold'
                    }
      },
      yAxis:{
                   
                  title:{
                      text:'Revenue',
                    }
              },  
                  
                  plotOptions: {
                      series: {
                          borderWidth: 0,
                          dataLabels: {
                              enabled: true
                              ,
                          } ,
                          enableMouseTracking: true,
                
                          
                              // to enable he click function on the highchart        
                              point: {
                                  events: {
                                      click: function () {
                                         // location.href = 'https://en.wikipedia.org/wiki/' +
                                             // this.options.key;

                                          //if key is not found then no action 
                                         if(this.key == null){
                                          console.log('this.key')
                                         }
                                          //else function call
                                         else{
                                            //  opendate(this.key);
                                            console.log('else')
                                         }
                                      }
                                  }
                              }
                          }
                      },
      series: [{
                      
                      // to set the width of column bar
                      pointWidth: 70,
        type: 'column',
        name: 'Year',
        //colorByPoint:true,
        color:"#4848d3",
        data: arr1
      }/*,
                  {
                     // for spline
        type: 'spline',
        name: 'Year',
                      dashStyle: 'ShortDash',
        //colorByPoint:true,
        color:'#212121',
                      marker: {
                          symbol: 'diamond'
                      },
        data: arr7
      }*/],
                  
                  //to set the position of drillup button
      drilldown: {drillUpButton: {
                    relativeTo: 'spacingBox',
                    position: {
                        y: 0,
                        x: -50
                    }},
        series: arr2
                     
                  },
                    xAxis: {
                          type: 'category'
                  }
                  
                  
                  
      
    });
    
  }
  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
            <Sidebar history={this.props.history} />
            <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <IaasHeader />
            <div className="container">
              <div className="row">
                  <IaasSidebar />
                  <div className="col-xs-10">
                    <div>
                        <ul className="nav nav-tabs" role="tablist">
                          <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Revenue Timeline</a></li>
                          <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Patvan's Revenue</a></li>
                          <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Operations per Transaction</a></li>
                        </ul>

                        <div className="tab-content">
                          <div role="tabpanel" className="tab-pane active" id="home">
                            <div id="container1"></div>
                          </div>
                          <div role="tabpanel" className="tab-pane" id="profile">profile</div>
                          <div role="tabpanel" className="tab-pane" id="messages">asdasd</div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default iaas;
