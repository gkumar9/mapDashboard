import React, { Component } from "react";
import Header from "../../Header.jsx";
import Sidebar from "../../Sidebar.js";
import axios from "axios";
import { Link } from "react-router-dom";
import Filter from "./filtermap.js";
// import imgmapcluster from "../../pins/iconmapcluster.png";
// import user from "../../pins/user1copy.png";
import Swal from "sweetalert2";
// import farmerimg from "../../pins/user.png";
import config from "../../config.js";
import Map from "./Map.js";
class DemoApp extends Component {
  constructor(props) {
    super(props)
    this.state={
      markers: [],
      filteredpins:[],
      isOpen: false,
      InfoWindowobject: {},
      filter: {
        SolarIrrigationPump: true,
        SolarDrinkingWaterPump: true,
        SolarIrrigationService: true,
        SolarMiniGrid: true
      }
    }
  }
  handleReset = () => {
    let newfilter = {
      SolarIrrigationPump: true,
      SolarDrinkingWaterPump: true,
      SolarIrrigationService: true,
      SolarMiniGrid: true
    };
    this.setState(prevState => ({
      ...prevState,
      filter: newfilter,
      filteredpins: prevState.markers
    }));
  };
  handleApply= ()=> {
    let filterpins = [];
    // console.log('apply',this.state.markers,this.state.filter)
    // this.setState({filteredpins: filterpins});
     this.state.markers.map((item) => {
      if(item.vertical==='Solar Irrigation Pump'){
        if (this.state.filter.SolarIrrigationPump) {
          filterpins.push(item);
        }
      }
      else if(item.vertical==='Solar Drinking Water Pump'){
        if (this.state.filter.SolarDrinkingWaterPump) {
          filterpins.push(item);
        }
      }
      else if(item.vertical==='Solar Irrigation Service'){
        if (this.state.filter.SolarIrrigationService) {
          filterpins.push(item);
        }
      }
      else if(item.vertical==='Solar Mini Grid'){
        if (this.state.filter.SolarMiniGrid) {
          filterpins.push(item);
        }
      }
      
    });

    this.setState({filteredpins: filterpins});
    // this.forceUpdate();
  }
  handleFilterChange=(filtervalue)=> {
    // console.log('filter')
    this.setState(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [filtervalue]: !prevState.filter[filtervalue]
      }
    }));
  }

  componentDidMount() {
    axios({
      url: config.farmercoordinates,
      method: "POST",
      data: {
        temp: "temp"
      },
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if(res.data.data){
          // var half_length = Math.ceil(85*(res.data.data.list.length) / (100));    

          // var leftSide = res.data.data.list.splice(half_length,res.data.data.list.length);
          this.setState({
            markers: res.data.data.list,
            filteredpins:  res.data.data.list
          });
        }
        
      })
      .catch(e => {
        if (e.response !== undefined && e.response.status === 401) {
          window.location.reload();
        } else if (e.response !== undefined && e.response.status === 403) {
          Swal({
            type: "error",
            title: "Forbidden"
          });
          // this.props.history.push({
          //   pathname: "/rms"
          // });
        } else {
          // this.setState({ isloaderactive: false });
          Swal({
            type: "error",
            title: "Oops...",
            text: e
          });
          // this.props.history.push({
          //   pathname: "/rms"
          // });
        }
      });
  }
  unmountpins=()=>{
    this.setState({filteredpins:[]})
  }

  render() {
    // console.log("state", this.state.filteredpins.length);
    return (
      <div className="main">
        <Filter
          filter={this.state.filter}
          onChangeFilter={this.handleFilterChange}
          onFilterReset={this.handleReset}
          onFilterApply={this.handleApply}
        />
        <Map
          unmountpins={this.unmountpins}
          datapins={this.state.filteredpins}
          filter={this.state.filter}
        />
      </div>
    );
  }
}


class Farmer extends Component {


  render() {
    return (
      <div className="gauravwwwagro">
        <Header  kc={this.props.kc} />
        <div className="mainbody">
          <Sidebar kc={this.props.kc} history={this.props.history} />
          <div style={{ backgroundColor: "#F2F2F2"}} className="main">
            {/* <FarmerHeader  /> */}
            <DemoApp />
          </div>
        </div>
      </div>
    );
  }
}
export default Farmer;
