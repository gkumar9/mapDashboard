import React, { Component } from "react";
import Highcharts from 'highcharts/highstock'
import drilldown from "highcharts-drilldown";
import axios from 'axios'
import config from './config.js'
// import iaaspatvan from './iaaspatvan.json'
const $ = require("jquery");

class Iaaspatvan extends Component{
    componentDidMount(){
        drilldown(Highcharts);
        axios({
            url: config.iaaspatvan,
            method: "POST",
            data: {  "requestId": 1},
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then((res)=>{
            var p;
            p=res.data.data
            
        // p=iaaspatvan.data
        var page_load_times = 0;

        var chartpatvsrev;
        var highest;
        var month_button_array = document.getElementsByClassName("month_button");
        function add_year() {
            for(let op=0;op<p['year'].length;op++)
            {
                var x = document.getElementById("sel");
                var option = document.createElement("option");
                var op_val = p['year'][op]
                option.text = op_val;
                option.value=op_val;
                x.add(option);
            }
        }
        
        var month_name = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var month=["1","2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
        var month_n= [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var days= [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
        
        var curr_date = new Date();
        var curr_year = curr_date.getFullYear();
        
        var series_array=[];

        var month_yet_found=0;

        var Patvan_Lists = [];

        function cumulative(){
			highest = 0;
			series_array = [];
			Patvan_Lists = [];
            for(let sel_pat=0; sel_pat<p.patvanList.length; sel_pat++)
            {	
                var pat=p.patvanList[sel_pat];
                // console.log(pat)
                
                if(p.patvanRevenue[pat]!==undefined){
                    Patvan_Lists.push(pat);
                    var pat1  = p.patvanRevenue[pat]['total'];
                    if(highest<pat1)
                    {
                        highest=pat1;
                    }
                    series_array.push(pat1);
                }
                					 
            }
            // console.log(series_array)
            sorting_array(series_array)
        }
        
        cumulative();add_year();
        		 
        function sorting_array(dataArray)
        {
            // console.log(dataArray)
            var sorted_patvan1 = [];
            var sorted_Data1 = [];
            
            var a2d=[];
            for(let da=0;da<dataArray.length;da++)
                {
                if(dataArray[da]==null)
                    {
                    a2d.push([0,Patvan_Lists[da]]);
                    
                    }
                else
                    {
                    a2d.push([dataArray[da],Patvan_Lists[da]]);
                    
                    }
                }
            
            
            
            
            
            
            
            a2d.sort(function(a,b) {
            return b[0]-a[0]
            });
            //console.log("Now Sorting Array");
            //console.log("now Separating Array");

            //console.log(a2d.length);
            for(let sa=0;sa<a2d.length;sa++)
            {	
                //console.log(a2d[sa][0] +"-"+ a2d[sa][0]);
                sorted_patvan1.push(a2d[sa][1]);
                if(a2d[sa][0]===0)
                {
                    sorted_Data1.push(null);
                    
                }	
                else
                    {
                    sorted_Data1.push(a2d[sa][0]);
                    
                    }
                }
                // console.log(sorted_Data1);
                // console.log(sorted_patvan1);
            Sorted_Data2(sorted_Data1,sorted_patvan1)
            
        }
        		 
        function Sorted_Data2(a1,a2){
            if(page_load_times === 0)
                {
                page_load_times++;
                }
            else
                {
                // $('#patrev').highcharts().destroy();
                
                }
            
                chartpatvsrev =   Highcharts.chart('patrev', {
                chart: {
                type: 'bar',
                backgroundColor: "#f2f2f2",
                events: {
                    load: function(event) {
                    
                        this.yAxis[0].setExtremes(0,highest);
                    
                    }
                }
                },
                title: {
                text: null
                },
                exporting: { 
                enabled: false 
                },
                xAxis: {
                categories: a2,
            
                type:'category',
                title: {
                text: null,
                offset: 0,
                rotation: 0,
                y: 3,
                align: 'high'
            
                },
                max:19,
                scrollbar: {
                            enabled: true,
                        buttonArrowColor: 'black',
                                    buttonBorderRadius: 7,
                                    buttonBorderWidth: 4,
                                    rifleColor: 'black',
                                trackBorderWidth: 1,
                        trackBorderRadius: 7,
                            barBorderRadius: 7,
                        barBorderWidth: 0,
                            barBackgroundColor: '#565655'
                        }
                },
                yAxis: {
                min: 0,
                title: {
                text: 'Revenue in (Rs)'
                },
                },
                credits: {
                enabled: false
                },
            
                legend: {enabled: false
                },
                tooltip: {
                valueSuffix: ' Rs',
                borderColor:'#4848d3'
                },
                plotOptions: {
                    series: {
                        pointPadding: 0,
                        groupPadding: 0,
                        pointWidth: 12,
                    },
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
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
                  },
            
                series: [{
                name : 'Revenue',
                data: a1,
                color:"#ff4081",
                }]
                },
                function(chart) {
                Highcharts.addEvent(
                chart.container,
                document.onmousewheel === undefined ? 'DOMMouseScroll' : 'mousewheel',
                function(e) {
                var delta,
                xAxis = chart.xAxis[0],
                range = xAxis.max - xAxis.min,
                newMin, newMax;
            
                e = chart.pointer.normalize(e);
            
                //Firefox uses e.detail, WebKit and IE uses wheelDelta
                delta = e.detail || -(e.wheelDelta / 120);
            
                if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
                newMin = xAxis.min + range * delta;
                newMax = xAxis.max + range * delta;
            
                if (newMin < xAxis.dataMin) {
                newMin = xAxis.dataMin;
                newMax = newMin + range;
                }
            
                if (newMax > xAxis.dataMax) {
                newMax = xAxis.dataMax;
                newMin = newMax - range;
                }
            
                xAxis.setExtremes(
                newMin,
                newMax,
                true,
                false
                );
                }
                e.preventDefault();
                }
                )
                });
                
                
        }

        function Sorted_Data(){



            chartpatvsrev = new Highcharts.chart('patrev', {
            chart: {
            type: 'bar',
            events: {
                 load: function(event) {
                 
                    this.yAxis[0].setExtremes(0,highest);
                   
                }
            }
            },
            title: {
            text: null
            },
            exporting: { 
            enabled: false 
            },
            xAxis: {
            categories: Patvan_Lists,
        
            type:'category',
            title: {
            text: null,
            offset: 0,
             rotation: 0,
              y: 3,
             align: 'high'
        
            },
            // max:19,
            // scrollbar: {
            //               enabled: true,
            //            buttonArrowColor: 'black',
            //                     buttonBorderRadius: 7,
            //                      buttonBorderWidth: 4,
            //                       rifleColor: 'black',
            //                  trackBorderWidth: 1,
            //           trackBorderRadius: 7,
            //              barBorderRadius: 7,
            //           barBorderWidth: 0,
            //              barBackgroundColor: '#565655'
            //          }
            },
            yAxis: {
            min: 0,
            title: {
            text: 'Revenue in (Rs)'
            },
            },
            credits: {
            enabled: false
            },
        
            legend: {enabled: false
            },
            tooltip: {
            valueSuffix: ' Rs'
            },
            plotOptions: {
                 series: {
                     pointPadding: 0,
                     groupPadding: 0,
                    pointWidth: 20,
                 },
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
        
            series: [{
            name : 'Revenue',
            data: series_array,
            color: '#ffd480'
            }]
            },
            function(chart) {
            Highcharts.addEvent(
            chart.container,
            document.onmousewheel === undefined ? 'DOMMouseScroll' : 'mousewheel',
            function(e) {
            var delta,
            xAxis = chart.xAxis[0],
            range = xAxis.max - xAxis.min,
            newMin, newMax;
        
            e = chart.pointer.normalize(e);
        
            //Firefox uses e.detail, WebKit and IE uses wheelDelta
            delta = e.detail || -(e.wheelDelta / 120);
        
            if (chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop)) {
            newMin = xAxis.min + range * delta;
            newMax = xAxis.max + range * delta;
        
            if (newMin < xAxis.dataMin) {
            newMin = xAxis.dataMin;
            newMax = newMin + range;
            }
        
            if (newMax > xAxis.dataMax) {
            newMax = xAxis.dataMax;
            newMin = newMax - range;
            }
        
            xAxis.setExtremes(
            newMin,
            newMax,
            true,
            false
            );
            }
            e.preventDefault();
            }
            )
            });
            
            
        }
        $(".month_button").click(function(){
    
            // console.log('month_button')

            if(!$(this).hasClass("disabled"))
            {
                
            var selected = $('#sel').val();
            // console.log('selected',selected)
        ///////////////////////
        
        var aa = $(this)[0].id;
        // console.log(aa)
        var maximum_y =0;
        
                   series_array = [];
                         for(let yr=0; yr<p.patvanList.length; yr++)
                            {		
                                    var pat1  = p['patvanList'][yr];
                                    // console.log(pat1)	
                                        //console.log(pat1+'->'+selected+'-->'+aa);		
                                        if(p.patvanRevenue[pat1]!==undefined){
                                            if(p.patvanRevenue[pat1].patvanYearDataList[selected])
                                            {
                                                		
                                                // console.log(p.patvanRevenue[pat1].patvanYearData[selected].monthDataList[aa])
                                                if(p.patvanRevenue[pat1].patvanYearDataList[selected].monthDataList[aa])
                                                {
                
                                                    var data2= parseInt(p.patvanRevenue[pat1].patvanYearDataList[selected].monthDataList[aa]);	
                                                    series_array.push(data2);	
                                                    if(data2>maximum_y)
                                                    {
                                                        maximum_y = data2;
                                                    }
                                                }
                                                else
                                                {
                                                    series_array.push(null);
                                                }
                                    
                                            }
                                        else{   
                                            series_array.push(null);		
                                            }	
                                        }
                                    							
                            }
                         sorting_array(series_array)
        
        
        
        
        
        ///////////////////////////
        
            }
            else
            {
                alert("No Data Available in this month");
            }
        
        
        });

        $('#sel').change(function(){
            var selected = $(this).val();
           
           if(selected === '0')
           {
               
           
           
           
           for(let yr1=0; yr1<month_button_array.length; yr1++)
           {
               var ss = month_button_array[yr1]
               var sss = ss.id;
                   //debugger;
               ss.className = "";
               
               ss.className = 'month_button disabled pvlist';
           
                       
               
           
           }
           var maximum_y =0;
           
                      series_array = [];
                            for(let yr=0; yr<p.patvanList.length; yr++)
                               {		
                               var pat1  = p['patvanList'][yr];	
                                           
                               if(p.patvanRevenue[pat1])
                               {				
                                       var data2= parseInt(p.patvanRevenue[pat1]['total']);	
                                   series_array.push(data2);	
                                   if(data2>maximum_y)
                                   {
                                       maximum_y = data2;
                                   }	
                       }
                           else{   
                               series_array.push(null);		
                               }								
               }
                            sorting_array(series_array);
           
           
           }
           else
           {
           
           
           
        //    console.log(selected)
        // console.log(month_button_array)
        for(let yr1=0; yr1<month_button_array.length; yr1++)
        {
             ss = month_button_array[yr1]
             sss = parseInt(ss.id);
                //debugger;
            ss.className ="";
            
            // console.log(p['month'][selected])
            let check=false
            // eslint-disable-next-line no-loop-func
            p['month'][selected].map((item)=>{
                if(item===sss){
                    check=true
                }

            })
            if(check){
                ss.className = 'month_button active pvlist';
            }
            else{
                ss.className = 'month_button disabled pvlist';
            }
            // if(p['month'][selected][yr1]=== sss)
            // {
            //     ss.className = 'month_button disabled pvlist';
        
                    
            // }
            // else
            // {   

            //     ss.className = 'month_button active pvlist';
            
            // }
        
        }
        maximum_y =0;
        
        series_array = [];
        for(let yr=0; yr<p.patvanList.length; yr++)
                        {		
                        pat1  = p["patvanList"][yr];	
                            // console.log('patvan:',pat1)
                        if(p.patvanRevenue[pat1].patvanYearDataList[selected])
                        {	    
                                data2= (p.patvanRevenue[pat1].patvanYearDataList[selected]['total']);
                                //  console.log('data:',data2)
                                if(data2 ===0)
                                    {
                                    series_array.push(null);
                                    }
                                else
                                    {
                                    series_array.push(data2);
                                    }
                                
                            if(data2>maximum_y)
                            {
                                maximum_y = data2;
                            }	
                        }
                    else{   
                       series_array.push(null);		
                        }								
        }
        sorting_array(series_array);
               
           
           
           }
           
           });

           $(document).ready(function(){
            $(function() {
                  $( 'ul.nav.pvlist li.pvlist' ).on( 'click', function() {
                  $( this ).parent().find( 'li.pvlist.active' ).removeClass( 'active' );
                        $( this ).addClass( 'active' );
                         $( this ).parent().find( 'li.pvlist.disabled' ).removeClass( 'active' );
                        
                  });
            });  });
          })
          .catch((e)=>{
              console.log(e)
          })
        
    }
    render(){
        return(
            <div style={{'marginTop':'64px'}}>
            <center><h5><b>Patvan wise Revenue</b></h5></center>
            <ul className="nav nav-pills pvlist"  style={{'marginLeft':'0px', 'marginRight':'0px'}}>
            <li className = 'pvlist' style={{'marginRight':'15px', 'marginTop':'4px'}}>
                <select  className="form-control" id="sel">
                <option value="0">Overall</option>

                </select>
                </li>
                <li className="month_button disabled pvlist" id="01" ><a  >Jan</a></li>
                <li className="month_button disabled pvlist" id="02"><a>Feb </a></li>
                <li className="month_button disabled pvlist"  id="03" ><a >Mar</a></li>
                <li className="month_button disabled pvlist" id="04"><a >Apr </a></li>
                <li className="month_button disabled pvlist" id="05"><a  >May </a></li>
                <li className="month_button disabled pvlist" id="06"><a  >Jun</a></li>
                <li className="month_button disabled pvlist" id="07"><a >Jul</a></li>
                <li className="month_button disabled pvlist" id="08"><a  >Aug </a></li>
                <li className="month_button disabled pvlist" id="09"><a  >Sep </a></li>
                <li  className="month_button disabled pvlist" id="10"><a >Oct </a></li>
                <li className="month_button disabled pvlist" id="11"><a >Nov </a></li>
                <li className="month_button disabled pvlist" id="12"><a>Dec </a></li>
            </ul>
            <div id="patrev" /></div>
            
        )
    }
}
export default Iaaspatvan;