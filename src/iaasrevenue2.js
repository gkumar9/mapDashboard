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
    var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    axios({
      url: config.iaasrevenueyearly,
      method: "POST",
      data: { requestId: 1 },
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      let z = res.data.data.list;
      for (let i = 0; i < z.length; i++) {
        arr1.push({
          name: z[i].xCoordinate,
          y: parseInt(z[i].value),
          drilldown: z[i].xCoordinate + "_month",
          Districts: z[i].district,
          Patvans: z[i].patvan,
          Farmers: z[i].farmer
        });
      }
      function onrevenueclick(year) {
        console.log(year);
        
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
          url: config.iaasrevenuemonthly + year,
          method: "POST",
          data: { requestId: 1 },
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(res => {
            console.log("res", res.data.data);
            let z = res.data.data.list;
            for (let i = 0; i < z.length; i++) {

                arr2.push({
                  name: months[z[i].xCoordinate-1],
                  y: parseInt(z[i].value),
                  Districts: z[i].district,
                  Patvans: z[i].patvan,
                  Farmers: z[i].farmer
                });
              }
              chart.series[0].setData(arr2,true);
              chart.xAxis[0].setCategories(months,true);
              $('#drilldown').highcharts().redraw();
            
          })
          .catch(e => {
            console.log(e);
          });
      }

     let chart=Highcharts.chart("container1", {
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
          backgroundColor: "#f2f2f2"
          // events: {
          //     drilldown: function (e) {

          //         if (!e.seriesOptions) {

          //             var chart = this
          //             console.log(e.point.name)
          //             //     series = drilldowns[e.point.name];

          //             // // Show the loading label
          //             // chart.showLoading('Simulating Ajax ...');

          //             // setTimeout(function () {
          //             //     chart.hideLoading();
          //             //     chart.addSeriesAsDrilldown(e.point, series);
          //             // }, 1000);
          //         }

          //     }
          // }
        },

        credits: {
          enabled: false
        },
        xAxis: {
          type: "category"
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
            cursor: "pointer",
            borderWidth: 0,
            dataLabels: {
              enabled: true
            },
            // enableMouseTracking: true,

            // to enable he click function on the highchart
            point: {
              events: {
                click: function() {
                  // location.href = 'https://en.wikipedia.org/wiki/' +
                  // this.options.key;
                  // console.log(this.name)
                  onrevenueclick(this.name);
                  //if key is not found then no action
                  // if(this.key == null){
                  // console.log('this.key')
                  // }
                  // //else function call
                  // else{
                  //     //  opendate(this.key);
                  //     console.log('else')
                  // }
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
          }
        ],
        drilldown: {
          series: []
        }

        //to set the position of drillup button
        // drilldown: {drillUpButton: {
        //                 relativeTo: 'spacingBox',
        //                 position: {
        //                     y: 0,
        //                     x: -50
        //                 }},
        //     series: arr2

        //             },
        //     xAxis: {
        //         type: 'category'
        // }
      });
    });
  }

  render() {
    return <div style={{ marginTop: "64px" }} id="container1" />;
  }
}
export default IaasRevenue;
