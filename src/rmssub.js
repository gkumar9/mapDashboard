import React, { Component } from "react";
import Header from "./Header.js";
import Sidebar from "./Sidebar.js";
import { Link } from "react-router-dom";
import Highcharts from "highcharts";
import drilldown from "highcharts-drilldown";
import rmsdata from "./rmsdata.json";
import axios from "axios";
import config from "./config.js";
import RmsSidebardata from "./RmsSidebardata.js";
const $ = require("jquery");

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

class RmsHeader extends Component {
  render() {
    return (
      <div className="container ">
        <nav id="filter" className="navbar navbar-default">
          <div
            className="container-fluid"
            style={{ textAlign: "center", marginTop: "4px" }}
          >
            <Link to="/">
              <button
                style={{
                  marginTop: "1px",
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
            <Link to="/rms">
              <button
                style={{
                  marginTop: "1px",
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
                Rms{" "}
              </button>
            </Link>
            <span style={{ fontSize: "x-large", color: "blue" }}>
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
    console.log(this.props.location.state.detail);
    this.state = { singleassetstat: {} };
  }
  async componentDidMount() {
    let singleassetstatttemp = {};
    await axios({
      url: config.allassetstat,
      method: "POST",
      data: {},
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        singleassetstatttemp = res.data.data;
        this.setState({ singleassetstat: singleassetstatttemp });
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
      .then(res => {
        let obj = {};
        obj["data"] = res.data.data.list;
        obj["name"] = "Energy";
        drilldown(Highcharts);
        Highcharts.chart("energy_chart", {
          chart: {
            type: "column",
            backgroundColor: "#f2f2f2",
            events: {
              load: function() {
                var fin = new Date();
                var finDate = fin.getDate();

                var finMonth = fin.getMonth();
                var finYear = fin.getFullYear();

                var ini = new Date();
                ini.setFullYear(ini.getFullYear() - 1);
                var iniDate = ini.getDate();
                var iniMonth = ini.getMonth();
                var iniYear = ini.getFullYear();
                if (this.yAxis[0].dataMax == 0) {
                  this.yAxis[0].setExtremes(null, 1);
                }
                //this.yAxis.set

                this.xAxis[0].setExtremes(
                  Date.UTC(iniYear, iniMonth, iniDate),
                  Date.UTC(finYear, finMonth, finDate)
                );
              },

              drilldown: function(e) {
                var charts_this = this;
                var inidrillDate = new Date(e.point.x);
                setTimeout(function() {
                  inidrillDate.setDate(0);
                  inidrillDate.setMonth(inidrillDate.getMonth());
                  var DateinidrillDate = inidrillDate.getDate();
                  var MonthinidrillDate = inidrillDate.getMonth();
                  var YearinidrillDate = inidrillDate.getFullYear();
                  var findrillDate = inidrillDate;
                  findrillDate.setMonth(findrillDate.getMonth() + 1);
                  findrillDate.setDate(findrillDate.getDate() - 1);
                  var DatefindrillDate = findrillDate.getDate();
                  var MonthfindrillDate = findrillDate.getMonth();
                  var YearfindrillDate = findrillDate.getFullYear();

                  charts_this.xAxis[0].setExtremes(
                    Date.UTC(
                      YearinidrillDate,
                      MonthinidrillDate,
                      DateinidrillDate
                    ),
                    Date.UTC(
                      YearfindrillDate,
                      MonthfindrillDate,
                      DatefindrillDate
                    )
                  );

                  if (charts_this.yAxis[0].dataMax == 0) {
                    charts_this.yAxis[0].setExtremes(null, 1);
                  }
                }, 0);
              }
            }
          },
          title: {
            text: '<p class="energy_gen">Energy Generated</p>'
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
          tooltip: {
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
          plotOptions: {
            series: {
              cursor: "pointer",
              dataLabels: {
                enabled: true,
                format: "{point.y}"
              },
              color: "#fcd562",
              point: {
                events: {
                  click: function(event) {
                    if (this.options != null) {
                      var dayOfYear =
                        new Date(this.x).getFullYear() +
                        "-" +
                        (new Date(this.x).getMonth() + 1) +
                        "-" +
                        new Date(this.x).getDate();
                      var formatted_date =
                        new Date(this.x).getDate() +
                        " " +
                        months[new Date(this.x).getMonth()] +
                        " " +
                        new Date(this.x).getFullYear();
                      document.getElementById(
                        "chart_date_id"
                      ).innerHTML = formatted_date; //setting modal title with current date
                      $("#energy_chart").bind(
                        "mousemove touchmove touchstart",
                        function(e) {
                          var chart, point, i, event;
                          var sync_charts = $(".chart");
                          for (i = 0; i < sync_charts.length; i = i + 1) {
                            var chart_1 = sync_charts[i];
                            var chart_2 = chart_1.getAttribute(
                              "data-highcharts-chart"
                            );
                            chart = Highcharts.charts[chart_2];
                            event = chart.pointer.normalize(e.originalEvent);
                            point = chart.series[0].searchPoint(event, true);

                            if (point) {
                              point.highlight(e);
                            }
                          }
                        }
                      );
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

                        if (e.trigger !== "syncExtremes") {
                          // Prevent feedback loop
                          Highcharts.each(Highcharts.charts, function(chart) {
                            if (chart !== thisChart) {
                              if (chart.xAxis[0].setExtremes) {
                                // It is null while updating
                                chart.xAxis[0].setExtremes(
                                  e.min,
                                  e.max,
                                  undefined,
                                  false,
                                  { trigger: "syncExtremes" }
                                );
                              }
                            }
                          });
                        }
                      }
                      $.ajax({
                        "url":"http://staging2.clarolabs.in/rms/api/rs/asset/activity",
                        "method":"post",
                        "data":"{\"customerId\":\"600015\",\"rmsVendorId\":1007,\"date\":\"2018-09-19\",\"powerType\":\"AC\"}",
                        "headers": {
                          "content-type": "application/json"
                        },
                        "success":function (test) {
                          
                          let activity = test.data
                          console.log(activity)
                          if($('.chart')){
                            $('.chart').remove();
                          }
                          var isDataAvail = true;
                          if(activity.xData=="NA") {
                            isDataAvail = false;
                          }
                          $.each(activity.datasets, function (i, dataset) {
                            console.log($('<div class="chart">').appendTo('#energy_chart').highcharts())
                            $('<div class="chart">')
                            .appendTo('#energy_chart')
                            .highcharts({
                              chart: {
                                marginLeft: 40, // Keep all charts left aligned
                                spacingTop: 20,
                                spacingBottom: 20
                              },
                              plotOptions: {
                                series: {
                                  marker:{
                                    enabled:false
                                  }
                                }
                              },
                              exporting: { enabled: false },
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
                                crosshair:{ width: 3},
                                events: {
                                  setExtremes: syncExtremes
                                },
                                labels: {
                                  format: '{value}'
                                },categories: activity.xData
                              },
                              yAxis: {
                                title: {
                                  text: null
                                }
                              },
                              series: [{
                                data: dataset
                              }],
                              tooltip: {
                                positioner: function () {
                                  return {
                                    x: this.chart.chartWidth - this.label.width,
                                    y: 10 // align to title
                                  };
                                },
                                borderWidth: 0,
                                backgroundColor: 'none',
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
                          });
                          if(isDataAvail) {
                            $("#Modal_e_1").modal();
                          }

                          else {
                            $("#myModal").modal();
                          }
                        }
                      })
                      
                    }
                  }
                }
              }
            }
          },

          series: [rmsdata.energy_graph],
          drilldown: {
            series: rmsdata.energy_graph.data
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  }
  render() {
    return (
      <div>
        <Header />
        <div className="mainbody">
          <Sidebar />
          <div style={{ backgroundColor: "#F2F2F2" }} className="main">
            <RmsHeader />
            <div className="container">
              <div className="row">
                <RmsSidebardata
                  allassetstat={this.state.singleassetstat}
                  rmsubstate={this.props.location.state.detail}
                />
                <div style={{ padding: "30px" }} className="col-xs-10">
                  <div id="energy_chart" />
                  <div
                    className="modal fade"
                    id="Modal_e_1"
                    tabindex="-1"
                    role="dialog"
                  >
                    <div className="modal-dialog" id="Modal_e_2">
                      <div className="modal-content">
                        <div
                          className="modal-header"
                          style={{ "backgroundColor": "#ffbf00" }}
                        >
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            &times;
                          </button>
                          <h4
                            id="chart_date_id"
                            className="modal-title"
                            align="center"
                          />
                        </div>
                        <div className="modal-body">
                          <div id="container" />
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                            style={{ "backgroundColor": "#ffbf00" }}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="modal fade"
                    id="myModal"
                    tabindex="-1"
                    role="dialog"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                          >
                            &times;
                          </button>
                          <h4 className="modal-title">
                            Remote Monitoring System
                          </h4>
                        </div>
                        <div className="modal-body">
                          <p>No data to display.</p>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-default"
                            data-dismiss="modal"
                          >
                            Close
                          </button>
                        </div>
                      </div>
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

export default Rms;
