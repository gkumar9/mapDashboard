import React, { Component } from "react";
import Highcharts from "highcharts/highstock";
import drilldown from "highcharts-drilldown";
import axios from "axios";
import config from "./config.js";
const $ = require("jquery");
$.DataTable = require("datatables.net");

class IaasRevenue extends Component {
  constructor(props) {
    super(props);
    this.state = { tabledata: {} };
  }
  componentDidMount() {
    // let chart;
    // eslint-disable-next-line no-undef
    // if (window.screen.width <= 480) {
    //   if(chart){
    //     chart.destroy()
    //   }

    // }
    drilldown(Highcharts);
    Highcharts.setOptions({
      lang: {
        thousandsSep: ","
      }
    });

    var arr1 = [];
    // var arr2 = [];
    // var arr3 = [];
    let self = this;
    let stateiaas = [];
    axios({
      url: config.iaasrevenueyearly,
      method: "POST",
      data: { requestId: 1 },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        let z = res.data.data.list;
        let year = 0;
        let month = 0;
        var arr2 = [];
        var arr3 = [];
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
        // var monthn = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
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
        let yearxaxis = [];
        // let count1;
        for (let i = 0; i < z.length; i++) {
          yearxaxis.push(z[i].xCoordinate);
          arr1.push({
            name: z[i].xCoordinate,
            y: parseInt(z[i].value),
            drilldown: z[i].xCoordinate + "_month",
            Districts: z[i].district,
            Patvans: z[i].patvan,
            Farmers: z[i].farmer
          });
        }

        let chart = Highcharts.chart("container1", {
          tooltip: {
            formatter: function() {
              if (this.point.key == null) {
                return (
                  "<div style='font-family:gotham-light'><h5><u>Revenue:<b>" +
                  this.y +
                  "</b></u></h5>Patvans: <b>" +
                  this.point.Patvans +
                  "</b><br/>Districts: <b>" +
                  this.point.Districts +
                  "</b><br/>Farmers: <b>" +
                  this.point.Farmers +
                  "</b></div>"
                );
              }
              //else function call
              else {
                return "Ravenue:<b>" + this.y + "</b><br/>click to view Data";
              }
            },
            useHTML: true,
            borderColor: "#4848d3"
          },
          chart: {
            type: "bar",
            backgroundColor: "#f2f2f2",
            style: {
              fontFamily: "gotham-light"
            },
            height: "700",
            spacingRight: 30,
            events: {
              redraw: function(event) {
                this.series[0].options.pointWidth = 15;
              }
            }
          },

          credits: {
            enabled: false
          },
          xAxis: {
            type: "category",

            title: {
              text: "Time",
              style: {
                fontFamily: "gotham-medium"
              }
            }
          },

          legend: {
            enabled: false
          },
          title: {
            text: "",

            showEmpty: false,
            style: {
              fontFamily: "gotham-medium"
            }
          },
          yAxis: {
            title: {
              text: "Revenue (Rs)",
              style: {
                fontFamily: "gotham-medium"
              }
            }
          },

          plotOptions: {
            series: {
              cursor: "pointer",
              borderWidth: 0,
              borderRadiusTopLeft: 3,
              borderRadiusTopRight: 3,
              pointWidth: 28,
              dataLabels: {
                enabled: true,
                crop: false,
                overflow: "none",
                style: {
                  "font-family": "gotham-light",
                  color: "black"
                }
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
                    document.getElementById("drillUp").style.display = "block";
                    //if key is not found then no action
                    // if(this.key == null){
                    // }
                    // //else function call
                    // else{
                    //      opendate(this.key);
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
              // pointWidth: 35,
              type: "column",
              name: "Year",
              color: "#315ca6",
              data: arr1
            }
          ]
          //   responsive: {
          //     rules: [
          //       {
          //         condition: {
          //           maxWidth: 500
          //         },
          //         chartOptions: {
          //           width: 400,
          //           legend: {
          //             align: "center",
          //             verticalAlign: "bottom",
          //             layout: "horizontal"
          //           },
          //           plotOptions: {
          //             series: {

          //             borderRadiusTopLeft: 3,
          //             borderRadiusTopRight: 3,
          //               pointWidth: 8
          //             },
          //           },
          //           yAxis: {
          //             // labels: {
          //             //     align: 'right',
          //             //     x: 0,
          //             //     y: -5
          //             // },
          //             title: {
          //               text: null
          //             }
          //           },
          //           subtitle: {
          //             text: null
          //           },
          //           credits: {
          //             enabled: false
          //           }
          //         }
          //       }
          //     ]
          //   }
          // responsive: {
          //   rules: [{
          //       condition: {
          //           maxWidth: 500
          //       },
          //       chartOptions: {
          //           legend: {
          //               align: 'center',
          //               verticalAlign: 'bottom',
          //               layout: 'horizontal'
          //           },
          //           plotOptions:{
          //             series:{
          //               pointWidth:null
          //             }
          //           },
          //           yAxis: {
          //               labels: {
          //                   align: 'right',
          //                   x: 0,
          //                   y: -5
          //               },
          //               title: {
          //                   text: null
          //               }
          //           },
          //           subtitle: {
          //               text: null
          //           },
          //           credits: {
          //               enabled: false
          //           }
          //       }
          //   }]
          // }
          // drilldown: {
          //   series: []
          // }

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
        $("#drillUp").click(function() {
          document.getElementById("tablerevenue").style.display = "none";
          document.getElementById("iaas").style.display = "block";

          let removed = stateiaas.pop();
          if (stateiaas.length === 0) {
            document.getElementById("drillUp").style.display = "none";
            chart.series[0].setData(arr1, true);
            chart.xAxis[0].setCategories(yearxaxis, true);
            chart.xAxis[0].setTitle({ text: "Time" });
            chart.redraw();
          } else if (stateiaas.length === 1) {
            // console.log(arr2, months);
            chart.series[0].setData(arr2, true);
            chart.xAxis[0].setCategories(months, true);
            chart.xAxis[0].setTitle({ text: stateiaas[0] });
            chart.redraw();
          } else if (stateiaas.length === 2) {
            chart.series[0].setData(arr3, true);
            chart.xAxis[0].setCategories(days, true);
            chart.xAxis[0].setTitle({
              text: stateiaas[0] + "/" + stateiaas[1]
            });
            chart.redraw();
          }
        });
        function onrevenueclick(type) {
          var itIsNumber = /^\d{4}$/.test(type);
          let itstwonumber = /^\d{2}$/.test(type);
          let itsonenumber = /^\d{1}$/.test(type);
          //   console.log(type)

          if (typeof type === "number" && itIsNumber) {
            stateiaas.push(type);
            arr2 = [];
            year = type;
            axios({
              url: config.iaasrevenuemonthly + type,
              method: "POST",
              data: { requestId: 1 },
              headers: {
                "Content-Type": "application/json"
              }
            })
              .then(res => {
                let z = res.data.data.list;
                for (let i = 1; i <= months.length; i++) {
                  let check = false;
                  let numbers;
                  z.map((item, number) => {
                    if (item.xCoordinate === i) {
                      check = true;
                      numbers = number;
                    }
                  });
                  if (check) {
                    arr2.push({
                      name: months[i - 1],
                      y: parseInt(z[numbers].value),
                      Districts: z[numbers].district,
                      Patvans: z[numbers].patvan,
                      Farmers: z[numbers].farmer
                    });
                  } else {
                    arr2.push({
                      name: months[i - 1],
                      y: 0,
                      Districts: 0,
                      Patvans: 0,
                      Farmers: 0
                    });
                  }
                }

                chart.series[0].setData(arr2, true);
                chart.xAxis[0].setCategories(months, true);
                chart.xAxis[0].setTitle({ text: type });
                chart.redraw();
              })
              .catch(e => {
                console.log(e);
              });
          } else if (typeof type === "string") {
            stateiaas.push(type);
            arr3 = [];
            let monthnumber;
            months.map((item, number) => {
              if (item === type) {
                monthnumber = number + 1;
                month = monthnumber;
              }
            });
            axios({
              url: config.iaasrevenuedaily + year + "/" + monthnumber,
              method: "POST",
              data: { requestId: 1 },
              headers: {
                "Content-Type": "application/json"
              }
            }).then(res => {
              let z = res.data.data.list;
              for (let i = 0; i < days.length; i++) {
                let check = false;
                let numbers;
                z.map((item, number) => {
                  if (item.xCoordinate === days[i]) {
                    check = true;
                    numbers = number;
                  }
                });
                if (check) {
                  arr3.push({
                    name: days[i],
                    y: parseInt(z[numbers].value),
                    Districts: z[numbers].district,
                    Patvans: z[numbers].patvan,
                    Farmers: z[numbers].farmer
                  });
                } else {
                  arr3.push({
                    name: days[i],
                    y: 0,
                    Districts: 0,
                    Patvans: 0,
                    Farmers: 0
                  });
                }
              }

              chart.series[0].setData(arr3, true);
              chart.xAxis[0].setCategories(days, true);
              chart.xAxis[0].setTitle({
                text: stateiaas[0] + "/" + stateiaas[1]
              });
              chart.redraw();
            });
          } else if (
            typeof type === "number" &&
            (itstwonumber || itsonenumber)
          ) {
            stateiaas.push(type);
            let date = year + "-" + month + "-" + type;
            opendate(date);
          }
        }
        function opendate(key) {
          document.getElementById("tablerevenue").style.display = "block";
          document.getElementById("iaas").style.display = "none";
          var date = key;
          let datatable;

          $.ajax({
            method: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            url: config.transactionlist,
            data: JSON.stringify({ reqDate: date }),
            success: function(status) {
              datatable = status.data.list;
              let sum = 0;
              datatable.map(item => {
                sum = sum + item.amount;
              });
              let temp = {};
              temp["date"] = date;
              temp["number"] = datatable.length;
              temp["sum"] = sum;
              self.setState({ tabledata: temp });
              var table = $("#example").DataTable({
                data: datatable,
                destroy: true,
                scrollY: 380,
                scrollX: true,
                columns: [
                  { data: "transactionId" },
                  { data: "farmerName" },
                  { data: "patvanName" },
                  { data: "flow" },
                  { data: "startTime" },
                  { data: "endTime" },
                  { data: "amount" }
                ],
                paging: false,
                ordering: true,
                responsive: true
              });
            }
          });
        }
      })
      .catch(e => {
        // eslint-disable-next-line no-undef
        console.log(e);
      });
  }
  componentWillUnmount() {
    // eslint-disable-next-line no-undef
    Highcharts.chart("container1", { series: [] }).destroy();
  }

  render() {
    return (
      <div>
        <div className="iaasbutton">
          <div
            className="row"
            style={{ marginLeft: "0", marginRight: "0", marginTop: "10px" }}
          >
            {" "}
            <button
              id="drillUp"
              type="button"
              className="btn btn-default backbuttoniaas"
              aria-label="Left Align"
              style={{
                display: "none"
              }}
            >
              <span
                className="glyphicon glyphicon-menu-left"
                style={{ marginRight: "6px" }}
                aria-hidden="true"
              />
              Back
            </button>
          </div>

          <div
            className="row"
            id="iaas"
            style={{ marginLeft: "0", marginRight: "0" }}
          >
            <div style={{ marginTop: "24px" }} id="container1" />
          </div>
          <div
            id="tablerevenue"
            style={{
              display: "none",
              marginTop: "12px",
              fontFamily: "gotham-light",
              padding: "0.5em"
            }}
            className="container"
          >
            <div style={{ marginTop: "-50px", marginLeft: "-30px" }}>
              <ul style={{ paddingInlineStart: "30px" }}>
                {/* <li>
                  {" "}
                  <i className="fa fa-calendar" aria-hidden="true" />
                  <span> {this.state.tabledata.date}</span>
                </li> */}
                <li style={{ marginTop: "6px" }}>
                  <b>Total Revenue:</b> {this.state.tabledata.sum} &#8377;
                </li>
              </ul>
            </div>
            <table
              id="example"
              style={{ marginTop: "20px" }}
              className=" table table-striped table-hover responsive no-wrap"
              width="100%"
            >
              <thead>
                <tr>
                  <th>Transaction Id</th>
                  <th>Farmer's Name</th>
                  <th>Patvan Id</th>

                  <th>Flow</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th>Amount</th>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
export default IaasRevenue;
