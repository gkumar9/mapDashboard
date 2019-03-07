import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import drilldown from "highcharts-drilldown";
import axios from "axios";
import config from "./config.js";
const $ = require("jquery");

class IaasRevenue extends Component {
  componentDidMount() {
    drilldown(Highcharts);
    var arr1 = [];
    var arr2 = [];
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    var monthn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var days = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
      24,
      25,
      26,
      27,
      28,
      29,
      30,
      31
    ];
    axios({
      url: config.revenue,
      method: "POST",
      data: { requestId: 1 },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        let z = res.data.data.list;
        for (let i = 0; i < z.length; i++) {
          arr1.push({
            name: z[i].year,
            y: parseInt(z[i].value),
            drilldown: z[i].year + "_month",
            Districts: z[i].district,
            Patvans: z[i].patvan,
            Farmers: z[i].farmer
          });
        }
        for (let i = 0; i < z.length; i++) {
          var arrA = [];

          //loop for all 12 elemnts in month[]
          for (let k = 0; k < 12; k++) {
            var a = 0;
            var b;

            for (let j = 0; j < z[i].drillMonths.length; j++) {
              // to check which month is in json data from the month array

              if (month[k] === z[i].drillMonths[j].month) {
                a++;
                b = j;
              }
              //str=z.Data[0].RevenueTimeline[0].drillyear[i].drillmonth[j].month;
              //console.log(str);
            }
            // console.log(a)
            // if month exist in the json data then there's further more drilldown
            if (a === 1) {
              let x = parseInt(z[i].drillMonths[b].value);
              // console.log(x)
              arrA.push({
                name: months[k],
                y: x,
                drilldown:
                  z[i].year + "_" + z[i].drillMonths[b].month + "_days",
                // drilldown: z[i].drillMonths[b].drillDays,
                Districts: z[i].drillMonths[b].district,
                Patvans: z[i].drillMonths[b].patvan,
                Farmers: z[i].drillMonths[b].farmer
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
            type: "column",
            color: "#4848d3",
            name: "Month",
            id: z[i].year + "_month",
            data: arrA
          });
        }
        for (let i = 0; i < z.length; i++) {
          for (let j = 0; j < z[i].drillMonths.length; j++) {
            let arrB = [];
            //   console.log(z.Data[0].RevenueTimeline[0].drillyear[i].year);

            // console.log(z.Data[0].RevenueTimeline[0].drillyear[i].drillmonth[j].month);

            //get the index of month from the json in the month[] and then get the corresponding no of days from monthn[] i.e no of days in the month that contains data in json
            var n = monthn[month.indexOf(z[i].drillMonths[j].month)];

            for (let k = 1; k <= n; k++) {
              var t = 0;
              var r;
              // loop to get if there's json data for a specific date or not
              for (let l = 0; l < z[i].drillMonths[j].drillDays.length; l++) {
                if (z[i].drillMonths[j].drillDays[l].day == k) {
                  t++;
                  r = l;
                }
              }

              //if a date has data then it is pushed in arrB
              if (t == 0) {
                arrB.push({
                  name: days[k - 1],
                  y: null
                });

                // console.log(arrB);
              }
              // if not then the place is empty with the date
              else {
                var x = parseInt(z[i].drillMonths[j].drillDays[r].value);
                //console.log(x);
                arrB.push({
                  name: days[k - 1],
                  y: x,
                  // key stores the date in format yyyy-mm-dd which is to be send to datatable
                  key:
                    z[i].Year +
                    "-" +
                    z[i].drillMonths[j].month +
                    "-" +
                    z[i].drillMonths[j].drillDays[r].day,
                  Districts: z[i].drillMonths[j].drillDays[r].district,
                  Patvans: z[i].drillMonths[j].drillDays[r].patvan,
                  Farmers: z[i].drillMonths[j].drillDays[r].farmer
                });
              }
              t = 0;
            }
            //data from arrB is pushed in arr2 which contains the drilldown of hte highchart
            arr2.push({
              type: "column",
              color: "#4848d3",
              name: "Date",
              id: z[i].year + "_" + z[i].drillMonths[j].month + "_days",
              data: arrB
            });
            // console.log(arrB);
          } // console.log(arrB);
        }
        // console.log('arr2',arr2)
        Highcharts.chart("container1", {
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
              if (this.point.key == null) {
                return (
                  "<h5><u>Revenue:<b>" +
                  this.y +
                  "</b></u></h5>Patvans: <b>" +
                  this.point.Patvans +
                  "</b><br/>Districts: <b>" +
                  this.point.Districts +
                  "</b><br/>Farmers: <b>" +
                  this.point.Farmers +
                  "</b>"
                );
              }
              //else function call
              else {
                return "Ravenue:<b>" + this.y + "</b><br/>click to view Data";
              }
            },
            useHTML: true
          },
          chart: {
            backgroundColor: "#f2f2f2",
            events: {
              load: function(event) {
                this.series[0].data[2].doDrilldown();
              }
            }
          },

          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          title: {
            text: "Revenue Timeline",
            style: {
              fontWeight: "bold"
            }
          },
          yAxis: {
            title: {
              text: "Revenue"
            }
          },

          plotOptions: {
            series: {
              borderWidth: 0,
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: true,

              // to enable he click function on the highchart
              point: {
                events: {
                  click: function() {
                    // location.href = 'https://en.wikipedia.org/wiki/' +
                    // this.options.key;

                    //if key is not found then no action
                    if (this.key == null) {
                      console.log("this.key");
                    }
                    //else function call
                    else {
                      //  opendate(this.key);
                      console.log("else");
                    }
                  }
                }
              }
            }
          },
          series: [
            {
              // to set the width of column bar
              pointWidth: 40,
              type: "column",
              name: "Year",
              //colorByPoint:true,
              color: "#4848d3",
              data: arr1
            } /*,
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
            }*/
          ],

          //to set the position of drillup button
          drilldown: {
            drillUpButton: {
              relativeTo: "spacingBox",
              position: {
                y: 0,
                x: -50
              }
            },
            series: arr2
          },
          xAxis: {
            type: "category"
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    return <div style={{ marginTop: "64px" }} id="container1" />;
  }
}
export default IaasRevenue;
