import React, { Component } from 'react';
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import { Link } from "react-router-dom";
import Highcharts from 'highcharts';
import drilldown from 'highcharts-drilldown';
import rmsdata from './rmsdata.json'
import axios from 'axios'
import config from './config.js'
import RmsSidebardata from './RmsSidebardata.js'
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


class RmsHeader extends Component{
  render(){
    return(
        <div className="container ">
          <nav id="filter" className="navbar navbar-default">
            <div className="container-fluid" style={{'textAlign':'center','marginTop':'4px'}}>                 
            <Link to="/"><button style={{'marginTop':'1px','backgroundColor': 'transparent','float': 'left'}} type="button" className="btn btn-default" aria-label="Left Align"><span  className="glyphicon glyphicon-menu-left" style={{'marginRight':'6px'}} aria-hidden="true"></span>Home </button></Link>
            <Link  to="/rms"><button style={{'marginTop':'1px','marginLeft':'10px','backgroundColor': 'transparent','float': 'left'}} type="button" className="btn btn-default" aria-label="Left Align"><span  className="glyphicon glyphicon-menu-left" style={{'marginRight':'6px'}} aria-hidden="true"></span>Rms </button></Link>
            <span style={{'fontSize': 'x-large','color':'blue'}}>Remote Monitoring System </span>
            </div>
          </nav>
        </div>
      )
  }
}

 
class Rms extends Component{
  constructor(props){
    super(props)
    console.log(this.props.location.state.detail)
    this.state={singleassetstat:{}}
  }
  async componentDidMount(){
    let singleassetstatttemp={}
    await axios({
			url:config.allassetstat,
			method:'POST',
			data:{
      },
			headers:{
				'Content-Type': 'application/json'
			}
    })
    .then((res)=>{
      singleassetstatttemp=res.data.data
      this.setState({singleassetstat:singleassetstatttemp})
    }).catch((e)=>{
      console.log(e)
    })
    await axios({
			url:config.highchartdata,
			method:'POST',
			data:{
        customerId:this.props.location.state.detail.customerId,
        rmsVendorId:this.props.location.state.detail.rmsVendorId
      },
			headers:{
				'Content-Type': 'application/json'
			}
		}).then((res)=>{
      let obj={}
      obj['data']=res.data.data.list
      obj['name']='Energy'
      drilldown(Highcharts);
      Highcharts.chart('energy_chart', {
        chart: {
          type: 'column',
          backgroundColor:'#f2f2f2',
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
        tooltip: {
          formatter: function() {
            if(this.point.options.drilldown)
            {
              return 'Energy generated: <b> ' + this.y + '</b> kWh '+'<br>'+(Highcharts.dateFormat('%b %Y', new Date(this.x))) ;

            }
            else
            {
              return 'Energy generated: <b> ' + this.y + '</b> kWh '+'<br>'+(Highcharts.dateFormat('%e %b %Y', new Date(this.x))) ;

            }


          }
        },
        
        "series" : [rmsdata.energy_graph],
        "drilldown" : {
          "series":rmsdata.energy_graph.data,
        }
      });
      })
    .catch((e)=>{
      console.log(e)
    })
    
    
  }
	render(){
    // console.log(this.props.match.params)
		return(
		<div >  
        <Header />
        <div className="mainbody">
          <Sidebar />
          <div style={{'backgroundColor':'#F2F2F2'}} className="main">
            <RmsHeader />
            <div className="container">
              <div className="row">
              <RmsSidebardata allassetstat={this.state.singleassetstat} rmsubstate={this.props.location.state.detail}/>
              <div style={{'padding':'30px'}} className="col-xs-10">
              <div id="energy_chart"></div>
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